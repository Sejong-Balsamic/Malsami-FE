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

export default function BountyQuestionPage() {
  const router = useRouter();

  // 상태 관리
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [questionData, setQuestionData] = useState<QuestionPost[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"최근순" | "높은순">("최근순");

  // 필터 옵션 초기값
  const [filterOptions, setFilterOptions] = useState<QnaFilterOptions>({
    qnaPresetTags: [],
    chaetaekStatus: undefined,
    sortType: "LATEST",
  });

  // 데이터 로드 함수
  const fetchBountyQuestions = async (
    options: QnaFilterOptions,
    tabType: "최근순" | "높은순" = "최근순",
    page: number = 0,
  ) => {
    setIsLoading(true);
    try {
      // TODO: 엽전현상금 관련 API가 필요함. 현재는 전체 질문에서 현상금이 있는 것만 필터링
      const response = await questionPostApi.getFilteredQuestionPosts({
        pageNumber: page,
        pageSize: 10,
        sortType: tabType === "최근순" ? "LATEST" : "REWARD_YEOPJEON_DESCENDING", // 엽전 내림차순 정렬
        questionPresetTags: options.qnaPresetTags,
        chaetaekStatus: options.chaetaekStatus,
        // minYeopjeon: 1, // 최소 엽전 현상금 1 이상 - 필요시 추가
      });

      if (response && response.questionPostsPage) {
        // 현상금이 있는 질문만 필터링
        const bountyQuestions = (response.questionPostsPage.content || []).filter(
          question => question.rewardYeopjeon && question.rewardYeopjeon > 0,
        );
        setQuestionData(bountyQuestions);
        setTotalPages(response.questionPostsPage.totalPages || 0);
      }
    } catch (error) {
      console.error("엽전현상금 질문을 불러오는데 실패했습니다:", error);
      setQuestionData([]);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchBountyQuestions(filterOptions, activeTab, currentPage);
  }, [currentPage, filterOptions, activeTab]);

  // 탭 변경 핸들러
  const handleTabChange = (newTab: "최근순" | "높은순") => {
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
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Header */}
      <div className="fixed top-0 z-50 w-full max-w-[640px] bg-white">
        <Header title="엽전현상금" leftType={LEFT_ITEM.BACK} onLeftClick={handleBackClick} />
      </div>

      {/* 헤더 높이만큼 스페이서 (4rem) */}
      <div className="h-16 w-full" />

      {/* 탭 선택 */}
      <div className="flex border-b border-gray-200 bg-white px-5">
        {["최근순", "높은순"].map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => handleTabChange(tab as "최근순" | "높은순")}
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
            <span className="text-gray-500">엽전 현상금이 걸린 질문이 없습니다.</span>
          </div>
        )}
      </main>
    </div>
  );
}
