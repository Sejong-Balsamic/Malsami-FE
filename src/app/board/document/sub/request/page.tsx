"use client";

import { useState, useEffect } from "react";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import { DocFilterOptions } from "@/types/DocFilterOptions";
import DocTierPageNav from "@/components/nav/DocTierPageNav";
import DocRequestFilterControlBar from "@/components/board/document/DocRequestFilterControlBar";
import getRequestDocs from "@/apis/document/getRequestDocs";
import { DocCardProps } from "@/types/docCard.type";
import DocCard from "@/components/board/document/DocCard";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function DocRequestPage() {
  const [docCards, setDocCards] = useState<DocCardProps[]>([]); // API 결과값 저장
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
  const [filterOptions, setFilterOptions] = useState<DocFilterOptions>({
    tags: [],
    sortOption: "",
    faculty: "",
  });

  const handleFilterChange = (newFilterOptions: DocFilterOptions) => {
    setFilterOptions(newFilterOptions);
    sessionStorage.setItem("DocfilterOptions", JSON.stringify(newFilterOptions)); // 스토리지에 저장
  };

  const fetchDocs = async () => {
    const params = {
      documentTypes: filterOptions.tags,
      sortType: filterOptions.sortOption,
      faculty: filterOptions.faculty,
      pageNumber: 0, // 기본 페이지 번호
      pageSize: 12, // 페이지 크기
    };

    setIsLoading(true);
    try {
      const response = await getRequestDocs(params);
      console.log(response);
      setDocCards(response);
    } catch (error) {
      console.error("문서 필터링 목록을 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, [filterOptions]);

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
            docCards.map((card: DocCardProps) => (
              <DocCard
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
      </div>
    </div>
  );
}
