"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/Header";
import QuestionCardList from "@/components/questionMain/QuestionCardList";
import CommonPagination from "@/components/common/CommonPagination";
import QnaFilterControlBar from "@/components/questionMain/QnaFilterControlBar";
import { LEFT_ITEM } from "@/types/header";
import { questionPostApi } from "@/apis/questionPostApi";
import { QuestionPost } from "@/types/api/entities/postgres/questionPost";
import { QnaFilterOptions } from "@/types/QnaFilterOptions";

export default function AllQuestionPage() {
  const router = useRouter();

  // 상태 관리
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [questionData, setQuestionData] = useState<QuestionPost[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  // 필터 옵션 초기값
  const [filterOptions, setFilterOptions] = useState<QnaFilterOptions>({
    qnaPresetTags: [],
    chaetaekStatus: undefined,
    sortType: "LATEST",
  });

  // 데이터 로드 함수
  const fetchAllQuestions = async (options: QnaFilterOptions, page: number = 0) => {
    setIsLoading(true);
    try {
      const response = await questionPostApi.getFilteredQuestionPosts({
        pageNumber: page,
        pageSize: 10,
        sortType: options.sortType,
        questionPresetTags: options.qnaPresetTags,
        chaetaekStatus: options.chaetaekStatus,
      });

      if (response && response.questionPostsPage) {
        setQuestionData(response.questionPostsPage.content || []);
        setTotalPages(response.questionPostsPage.totalPages || 0);
      }
    } catch (error) {
      console.error("전체 질문을 불러오는데 실패했습니다:", error);
      setQuestionData([]);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchAllQuestions(filterOptions, currentPage);
  }, [currentPage, filterOptions]);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // 필터 변경 핸들러
  const handleFilterChange = (newFilterOptions: QnaFilterOptions) => {
    setFilterOptions(newFilterOptions);
    setCurrentPage(0);
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Header */}
      <div className="fixed top-0 z-50 w-full max-w-[640px] bg-white">
        <Header title="전체 질문" leftType={LEFT_ITEM.BACK} onLeftClick={handleBackClick} />
      </div>

      {/* 헤더 높이만큼 스페이서 (4rem) */}
      <div className="h-16 w-full" />

      {/* 필터 영역 */}
      <QnaFilterControlBar filterOptions={filterOptions} onFilterChange={handleFilterChange} />

      {/* 메인 콘텐츠 */}
      <main className="min-h-screen bg-gray-50 px-5 py-4">
        {isLoading && (
          <div className="flex h-40 items-center justify-center">
            <span className="text-gray-500">로딩 중...</span>
          </div>
        )}
        {!isLoading && questionData.length > 0 && (
          <>
            <QuestionCardList data={questionData} />

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className="mb-6 mt-8">
                <CommonPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              </div>
            )}
          </>
        )}
        {!isLoading && questionData.length === 0 && (
          <div className="flex h-40 items-center justify-center">
            <span className="text-gray-500">표시할 질문이 없습니다.</span>
          </div>
        )}
      </main>
    </div>
  );
}
