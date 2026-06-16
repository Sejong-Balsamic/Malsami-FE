import { useState, useEffect } from "react";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Pagination from "@/components/common/Pagination";
import { DocFilterOptions } from "@/types/DocFilterOptions";
import { PostTiers, PostTiersKeys } from "@/types/postTiers";
import { PostTier } from "@/types/api/constants/postTier";
import { DocumentCommand } from "@/types/api/requests/documentCommand";
import { DocumentType } from "@/types/api/constants/documentType";
import { DocumentPost } from "@/types/api/entities/postgres/documentPost";
import { documentPostApi } from "@/apis/documentPostApi";
import CommonHeader from "@/components/header/CommonHeader";
import { RIGHT_ITEM } from "@/types/header";
import DocFilterControlBar from "./DocFilterControlBar";
import DocumentCard from "./DocumentCard";

interface TierBoardProps {
  postTier: PostTier;
}

// PostTier에서 PostTiersKeys 인덱스로 매핑
const TIER_INDEX_MAP: Record<PostTier, number> = {
  [PostTier.CHEONMIN]: 0,
  [PostTier.JUNGIN]: 1,
  [PostTier.YANGBAN]: 2,
  [PostTier.KING]: 3,
};

export default function TierBoard({ postTier }: TierBoardProps) {
  const [docCards, setDocCards] = useState<DocumentPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterOptions, setFilterOptions] = useState<DocFilterOptions>({
    docTypes: [],
    sortType: undefined,
  });

  // 페이지네이션 관리
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(15);
  const [totalPages, setTotalPages] = useState(1);

  // 현재 티어의 정보 가져오기
  const tierIndex = TIER_INDEX_MAP[postTier];
  const tierInfo = Object.values(PostTiers)[tierIndex];
  const tierKey = PostTiersKeys[tierIndex];

  // 페이지 변경
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageNumber(newPage);
    }
  };

  const handleFilterChange = (newFilterOptions: DocFilterOptions) => {
    setFilterOptions(newFilterOptions);
    sessionStorage.setItem("DocfilterOptions", JSON.stringify(newFilterOptions));
  };

  const fetchDocs = async () => {
    // DocTypesKey/PostTiersKey는 DocumentType/PostTier와 동일한 문자열 유니언 — Command 타입으로 단언
    const params: Partial<DocumentCommand> = {
      documentTypes: filterOptions.docTypes as DocumentType[],
      sortType: filterOptions.sortType,
      postTier: tierKey as PostTier,
      pageNumber: pageNumber - 1,
      pageSize,
    };

    setIsLoading(true);
    try {
      // 신식 API 패턴(documentPostApi) 사용 — 응답 Dto에서 documentPostsPage 추출
      const response = await documentPostApi.filteredDocumentPost(params);
      const page = response.documentPostsPage;
      setDocCards(page?.content || []);
      setTotalPages(page?.totalPages || 1);
    } catch (error) {
      console.error("문서 필터링 목록을 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPageNumber(1);
    fetchDocs();
  }, [filterOptions]);

  useEffect(() => {
    fetchDocs();
    window.scrollTo(0, 0);
  }, [pageNumber]);

  const renderContent = () => (
    <div className="min-h-screen w-full max-w-[640px] bg-white">
      <DocFilterControlBar filterOptions={filterOptions} onFilterChange={handleFilterChange} />
      <div className="h-0.5 bg-ui-divider-thick" />
      <div className="p-5">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          docCards.map((card: DocumentPost) => (
            <DocumentCard
              key={card.documentPostId}
              documentPostId={card.documentPostId || ""}
              subject={card.subject || "과목명"}
              title={card.title || "타이틀"}
              content={card.content || "내용이 없습니다."}
              documentTypes={card.documentTypes}
              createdDate={card.createdDate || ""}
              thumbnailUrl={card.thumbnailUrl || ""}
              viewCount={card.viewCount || 0}
              likeCount={card.likeCount || 0}
            />
          ))
        )}
      </div>
      <Pagination pageNumber={pageNumber} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100">
      <ScrollToTopOnLoad />
      {/* 모든 티어 공통 헤더로 통일 — 등급명을 제목, "자료 게시판"을 부제목으로 */}
      <CommonHeader title={`${tierInfo.KR} 게시판`} subtitle="자료 게시판" rightType={RIGHT_ITEM.NONE} />
      {renderContent()}
    </div>
  );
}
