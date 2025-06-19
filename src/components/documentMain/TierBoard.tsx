import { useState, useEffect } from "react";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { DocCardProps } from "@/types/docCard.type";
import Pagination from "@/components/common/Pagination";
import { DocFilterOptions } from "@/types/DocFilterOptions";
import { PostTiers, PostTiersKeys } from "@/types/postTiers";
import { PostTier } from "@/types/api/constants/postTier";
import getFilteringDocs from "@/apis/document/getFilteringDocs";
import CommonHeader from "@/components/header/CommonHeader";
import { RIGHT_ITEM } from "@/types/header";
import DocTierPageNav from "@/deprecated/DocTierPageNav";
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

// 헤더 스타일 매핑 (천민과 중인은 CommonHeader, 양반과 왕은 DocTierPageNav)
const USE_COMMON_HEADER: Record<PostTier, boolean> = {
  [PostTier.CHEONMIN]: true,
  [PostTier.JUNGIN]: true,
  [PostTier.YANGBAN]: false,
  [PostTier.KING]: false,
};

export default function TierBoard({ postTier }: TierBoardProps) {
  const [docCards, setDocCards] = useState<DocCardProps[]>([]);
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
  const useCommonHeader = USE_COMMON_HEADER[postTier];

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
    const params = {
      documentTypes: filterOptions.docTypes,
      sortType: filterOptions.sortType,
      postTier: tierKey,
      pageNumber: pageNumber - 1,
      pageSize,
    };

    setIsLoading(true);
    try {
      const response = await getFilteringDocs(params);
      setDocCards(response.content);
      setTotalPages(response.totalPages);
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

  const renderHeader = () => {
    if (useCommonHeader) {
      return <CommonHeader title={`${tierInfo.KR} 게시판`} rightType={RIGHT_ITEM.NONE} />;
    }
    return <DocTierPageNav subTitle={`${tierInfo.KR} 게시판`} />;
  };

  const renderContent = () => (
    <div className="min-h-screen w-full min-w-[386px] max-w-[640px] bg-white">
      <DocFilterControlBar filterOptions={filterOptions} onFilterChange={handleFilterChange} />
      <div className="h-0.5 bg-[#EEEEEE]" />
      <div className="p-5">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          docCards.map((card: DocCardProps) => (
            <DocumentCard
              key={card.documentPostId}
              documentPostId={card.documentPostId}
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <ScrollToTopOnLoad />
      {renderHeader()}
      {/* CommonHeader를 사용하는 경우 헤더 아래 여백 추가 */}
      {useCommonHeader ? <div className="mt-[64px]">{renderContent()}</div> : renderContent()}
    </div>
  );
}
