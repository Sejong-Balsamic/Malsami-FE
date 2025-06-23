"use client";

import { useState, useEffect } from "react";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import CommonHeader from "@/components/header/CommonHeader";
import { RIGHT_ITEM } from "@/types/header";
import Pagination from "@/components/common/Pagination";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { documentPostApi } from "@/apis/documentPostApi"; // 새로운 API 임포트
import { DocumentCommand } from "@/types/api/requests/documentCommand";
import DocumentCard from "@/components/documentMain/DocumentCard";
import { DocumentPost } from "@/types/api/entities/postgres/documentPost";

export default function PopularDaily() {
  // 이름 수정: PopularWeekly -> PopularDaily (경로에 맞게)
  const [docCards, setDocCards] = useState<DocumentPost[]>([]); // API 결과값 저장
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리

  // 페이지네이션 관리
  const [pageNumber, setPageNumber] = useState(1); // 현재 페이지 번호
  const [pageSize] = useState(15); // 페이지 크기 (한 페이지에 표시할 항목 수)
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수

  // 페이지 변경
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageNumber(newPage);
    }
  };

  const fetchDocs = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const command: Partial<DocumentCommand> = {
      pageNumber: pageNumber - 1, // 백엔드에서 0-based index를 사용하므로 -1
      pageSize,
    };
    setIsLoading(true);
    try {
      const response = await documentPostApi.getDailyPopularDocumentPost();
      const content = response.documentPostsPage?.content;
      if (content) {
        setDocCards(content); // DocCardProps와 일치하는 데이터로 설정
        setTotalPages(response.documentPostsPage?.totalPages || 1); // 총 페이지 수 업데이트
      } else {
        console.warn("documentPostsPage.content가 비어 있습니다.");
        setDocCards([]); // 데이터 없으면 빈 배열
      }
    } catch (error) {
      console.error("일간 인기글 목록을 가져오는 중 오류 발생:", error);
      setDocCards([]); // 에러 시 빈 배열
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
    window.scrollTo(0, 0);
  }, [pageNumber]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <ScrollToTopOnLoad />
      <CommonHeader title="일간 인기글" rightType={RIGHT_ITEM.NONE} />
      <div>
        <div className="min-h-screen w-full min-w-[386px] max-w-[640px] bg-white">
          <div className="h-0.5 bg-[#EEEEEE]" />
          <div className="p-5">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              docCards.map((card: DocumentPost) => (
                <DocumentCard
                  key={card.documentPostId}
                  documentPostId={card.documentPostId as string}
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
          {/* 페이지네이션 컴포넌트 */}
          <Pagination pageNumber={pageNumber} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
}
