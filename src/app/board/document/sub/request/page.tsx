"use client";

import { useState, useEffect } from "react";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import { DocFilterOptions } from "@/types/DocFilterOptions";
import Pagination from "@/components/common/Pagination";
import DocTierPageNav from "@/components/nav/DocTierPageNav";
import DocRequestFilterControlBar from "@/components/board/document/DocRequestFilterControlBar";
import getRequestDocs from "@/apis/document/getRequestDocs";
import { DocRequestCardProps } from "@/types/DocRequestCardProps";
import DocCard from "@/components/board/document/DocCard";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function DocRequestPage() {
  const [docCards, setDocCards] = useState<DocRequestCardProps[]>([]); // API 결과값 저장
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
  const [filterOptions, setFilterOptions] = useState<DocFilterOptions>({
    docTypes: [],
    sortType: undefined,
    faculty: "",
  });

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

  const handleFilterChange = (newFilterOptions: DocFilterOptions) => {
    setFilterOptions(newFilterOptions);
  };

  const fetchDocs = async () => {
    const params = {
      documentTypes: filterOptions.docTypes,
      sortType: filterOptions.sortType,
      faculty: filterOptions.faculty,
      pageNumber: pageNumber - 1,
      pageSize,
    };

    setIsLoading(true);
    try {
      const response = await getRequestDocs(params);
      setDocCards(response.content);
      setTotalPages(response.totalPages); // 총 페이지 수 업데이트
    } catch (error) {
      console.error("문서 필터링 목록을 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPageNumber(1); // 페이지 번호 초기화
    fetchDocs();
  }, [filterOptions]);

  useEffect(() => {
    fetchDocs();
    window.scrollTo(0, 0);
  }, [pageNumber]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <ScrollToTopOnLoad />
      <DocTierPageNav subTitle="자료 요청" />
      <div className="min-h-screen w-full min-w-[386px] max-w-[640px] bg-white">
        <DocRequestFilterControlBar filterOptions={filterOptions} onFilterChange={handleFilterChange} />
        <div className="h-0.5 bg-[#EEEEEE]" />
        <div className="p-5">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            docCards.map((card: DocRequestCardProps) => (
              <DocCard
                key={card.documentRequestPostId}
                documentPostId={card.documentRequestPostId}
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
  );
}
