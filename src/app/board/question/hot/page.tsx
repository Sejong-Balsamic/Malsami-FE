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

export default function HotQuestionPage() {
  const router = useRouter();

  // 상태 관리
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [questionData, setQuestionData] = useState<QuestionPost[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"주간" | "일간">("주간");

  // 필터 옵션 초기값
  const [filterOptions, setFilterOptions] = useState<QnaFilterOptions>({
    qnaPresetTags: [],
    chaetaekStatus: undefined,
    sortType: undefined,
  });

  // 데이터 로드 함수
  const fetchHotQuestions = async (tabType: "주간" | "일간" = "주간") => {
    setIsLoading(true);
    try {
      const response =
        tabType === "주간"
          ? await questionPostApi.getWeeklyPopularQuestionPost()
          : await questionPostApi.getDailyPopularQuestionPost();

      if (response && response.questionPostsPage) {
        setQuestionData(response.questionPostsPage.content || []);
        setTotalPages(1); // 단일 페이지로 처리
      }
    } catch (error) {
      console.error("HOT 인기질문을 불러오는데 실패했습니다:", error);
      setQuestionData([]);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchHotQuestions(activeTab);
  }, [activeTab]);

  // 탭 변경 핸들러
  const handleTabChange = (newTab: "주간" | "일간") => {
    setActiveTab(newTab);
    setCurrentPage(0);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // 필터 변경 핸들러
  const handleFilterChange = (newFilterOptions: QnaFilterOptions) => {
    setFilterOptions(newFilterOptions);
    setCurrentPage(0);
    // TODO: 필터 적용한 API 호출 구현
  };

  const handleBackClick = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <>
        <Header title="HOT 인기질문" leftType={LEFT_ITEM.BACK} onLeftClick={handleBackClick} />
        <div className="flex h-40 items-center justify-center">
          <span className="text-gray-500">로딩 중...</span>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Header */}
      <Header title="HOT 인기질문" leftType={LEFT_ITEM.BACK} onLeftClick={handleBackClick} />

      {/* 탭 선택 */}
      <div className="flex border-b border-gray-200 bg-white px-5">
        {["주간", "일간"].map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => handleTabChange(tab as "주간" | "일간")}
            className={`font-pretendard-medium flex-1 py-3 text-center text-sm ${
              activeTab === tab ? "border-b-2 border-custom-blue-500 text-custom-blue-500" : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 필터 영역 */}
      <QnaFilterControlBar filterOptions={filterOptions} onFilterChange={handleFilterChange} />

      {/* 메인 콘텐츠 */}
      <main className="min-h-screen bg-gray-50 px-5 py-4">
        {questionData.length > 0 ? (
          <>
            <QuestionCardList data={questionData} />

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className="mb-6 mt-8">
                <CommonPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              </div>
            )}
          </>
        ) : (
          <div className="flex h-40 items-center justify-center">
            <span className="text-gray-500">표시할 인기 질문이 없습니다.</span>
          </div>
        )}
      </main>
    </>
  );
}
