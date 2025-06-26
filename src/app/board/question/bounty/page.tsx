"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/Header";
import QuestionCardList from "@/components/questionMain/QuestionCardList";
import CommonPagination from "@/components/common/CommonPagination";
import TwoTabFilter from "@/components/common/TwoTabFilter";
import { LEFT_ITEM } from "@/types/header";
import { questionPostApi } from "@/apis/questionPostApi";
import { QuestionPost } from "@/types/api/entities/postgres/questionPost";

export default function BountyQuestionPage() {
  const router = useRouter();

  // 상태 관리
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [latestBountyQuestions, setLatestBountyQuestions] = useState<QuestionPost[]>([]);
  const [highestBountyQuestions, setHighestBountyQuestions] = useState<QuestionPost[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"최근순" | "높은순">("최근순");

  // 페이지 로드시 모든 데이터 가져오기
  useEffect(() => {
    const fetchAllBountyData = async () => {
      setIsLoading(true);
      try {
        // 최근순 + 높은순 데이터 동시에 가져오기
        const [latestResponse, highestResponse] = await Promise.all([
          questionPostApi.getFilteredQuestionPosts({
            sortType: "REWARD_YEOPJEON_LATEST",
          }),
          questionPostApi.getFilteredQuestionPosts({
            sortType: "REWARD_YEOPJEON_DESCENDING",
          }),
        ]);

        console.log("엽전현상금 최근순 데이터:", latestResponse);
        console.log("엽전현상금 높은순 데이터:", highestResponse);

        // 현상금이 있는 질문만 필터링
        const latestBountyFiltered = (latestResponse.questionPostsPage?.content || []).filter(
          question => question.rewardYeopjeon && question.rewardYeopjeon > 0,
        );
        const highestBountyFiltered = (highestResponse.questionPostsPage?.content || []).filter(
          question => question.rewardYeopjeon && question.rewardYeopjeon > 0,
        );

        setLatestBountyQuestions(latestBountyFiltered);
        setHighestBountyQuestions(highestBountyFiltered);
      } catch (error) {
        console.error("엽전현상금 질문을 불러오는데 실패했습니다:", error);
        setLatestBountyQuestions([]);
        setHighestBountyQuestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllBountyData();
  }, []);

  // 현재 탭에 따른 데이터 필터링
  const currentQuestions = activeTab === "최근순" ? latestBountyQuestions : highestBountyQuestions;
  const totalPages = Math.ceil(currentQuestions.length / 10); // 페이지당 10개

  // 탭 변경 핸들러 (API 호출 없음, 필터링만)
  const handleTabChange = (newTab: "최근순" | "높은순") => {
    setActiveTab(newTab);
    setCurrentPage(0);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleBackClick = () => {
    router.back();
  };

  // 현재 페이지의 데이터 계산
  const startIndex = currentPage * 10;
  const endIndex = startIndex + 10;
  const currentPageQuestions = currentQuestions.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="fixed top-0 z-50 w-full max-w-[640px] bg-white">
        <Header title="엽전현상금" leftType={LEFT_ITEM.BACK} onLeftClick={handleBackClick} />
      </div>

      {/* 헤더 높이 스페이서 (4rem) */}
      <div className="h-16 w-full" />

      <div className="px-5">
        {/* 최근순/높은순 필터링 컴포넌트 */}
        <TwoTabFilter firstTab="최근순" secondTab="높은순" activeTab={activeTab} onTabChange={handleTabChange} />

        {/* 24px 공백 */}
        <div className="h-6" />

        {/* 메인 콘텐츠 */}
        <div className="w-full bg-white">
          {isLoading && (
            <div className="flex h-40 items-center justify-center">
              <span className="text-SUIT_14 font-medium text-[#C5C5C5]">로딩 중...</span>
            </div>
          )}
          {!isLoading && currentPageQuestions.length > 0 && <QuestionCardList data={currentPageQuestions} />}
          {!isLoading && currentPageQuestions.length === 0 && (
            <div className="flex h-40 items-center justify-center">
              <span className="text-SUIT_14 font-medium text-[#C5C5C5]">표시할 엽전현상금 질문이 없습니다.</span>
            </div>
          )}
        </div>

        {/* 24px 공백 */}
        <div className="h-6" />

        {/* 페이지네이션 */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center">
            <CommonPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        )}

        {/* 61px 하단 여백 (모바일 탭바 고려) */}
        <div className="h-[61px]" />
      </div>
    </div>
  );
}
