"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Header from "@/components/header/Header";
import QuestionCardList from "@/components/questionMain/QuestionCardList";
import QuestionCardListSkeleton from "@/components/common/skeletons/QuestionCardListSkeleton";
import CommonPagination from "@/components/common/CommonPagination";
import QuestionFilteringBottomSheet from "@/components/common/QuestionFilteringBottomSheet";
import ActiveQuestionFilters from "@/components/common/ActiveQuestionFilters";
import { LEFT_ITEM, RIGHT_ITEM } from "@/types/header";
import { questionPostApi } from "@/apis/questionPostApi";
import { QuestionPost } from "@/types/api/entities/postgres/questionPost";
import { QuestionCommand } from "@/types/api/requests/questionCommand";
import { setQuestionFilteringOpen } from "@/global/store/bottomSheetSlice";

export default function AllQuestionPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  // 상태 관리
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [questionData, setQuestionData] = useState<QuestionPost[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  // 현재 적용된 필터링 상태
  const [currentFiltering, setCurrentFiltering] = useState<Partial<QuestionCommand>>({
    sortType: "LATEST",
    chaetaekStatus: "ALL",
    questionPresetTags: [],
  });

  // 데이터 로드 함수
  const fetchAllQuestions = useCallback(
    async (page: number = 0, filtering: Partial<QuestionCommand> = currentFiltering) => {
      setIsLoading(true);
      try {
        const response = await questionPostApi.getFilteredQuestionPosts({
          pageNumber: page,
          pageSize: 10,
          sortType: filtering.sortType || "LATEST",
          chaetaekStatus: filtering.chaetaekStatus,
          questionPresetTags: filtering.questionPresetTags,
        });

        if (response && response.questionPostsPage) {
          setQuestionData(response.questionPostsPage.content || []);
          setTotalPages(response.questionPostsPage.totalPages || 0);
        }
      } catch (error) {
        setQuestionData([]);
        setTotalPages(0);
      } finally {
        setIsLoading(false);
      }
    },
    [currentFiltering],
  );

  // 초기 데이터 로드
  useEffect(() => {
    fetchAllQuestions(currentPage);
  }, [currentPage, fetchAllQuestions]);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleBackClick = () => {
    router.back();
  };

  // 필터링 핸들러들
  const handleQuestionConfirm = async (filtering: Partial<QuestionCommand>) => {
    // 필터링 상태 업데이트하고 API 호출
    setCurrentFiltering(filtering);
    setCurrentPage(0);
    await fetchAllQuestions(0, filtering);
  };

  const handleFilterReset = async () => {
    const defaultFiltering: Partial<QuestionCommand> = {
      sortType: "LATEST",
      chaetaekStatus: "ALL",
      questionPresetTags: [],
    };
    setCurrentFiltering(defaultFiltering);
    setCurrentPage(0);
    await fetchAllQuestions(0, defaultFiltering);
  };

  const handleRemoveFilter = async (filterType: "sortType" | "chaetaekStatus" | "tag", value?: string) => {
    const newFiltering: Partial<QuestionCommand> = { ...currentFiltering };

    if (filterType === "sortType") {
      delete newFiltering.sortType;
    } else if (filterType === "chaetaekStatus") {
      delete newFiltering.chaetaekStatus;
    } else if (filterType === "tag" && value) {
      newFiltering.questionPresetTags = (newFiltering.questionPresetTags || []).filter(tag => tag !== value);
      if (newFiltering.questionPresetTags.length === 0) delete newFiltering.questionPresetTags;
    }

    setCurrentFiltering(newFiltering);
    setCurrentPage(0);
    await fetchAllQuestions(0, newFiltering);
  };

  // 오른쪽 메뉴 아이콘 클릭 핸들러
  const handleMenuClick = () => {
    dispatch(setQuestionFilteringOpen(true));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="fixed top-0 z-50 w-full max-w-[640px] bg-white">
        <Header
          title="질문 게시판"
          leftType={LEFT_ITEM.BACK}
          rightType={RIGHT_ITEM.MENU}
          onLeftClick={handleBackClick}
          onRightClick={handleMenuClick}
        />
      </div>
      {/* 헤더 높이만큼 스페이서 (4rem) */}
      <div className="h-16 w-full" />

      {/* 메인 콘텐츠 */}
      <div className="px-5">
        {/* 24px 공백 */}
        <div className="h-6" />

        {/* 현재 적용된 필터 */}
        <ActiveQuestionFilters
          currentFiltering={currentFiltering}
          onReset={handleFilterReset}
          onRemoveFilter={handleRemoveFilter}
        />

        {/* 검색 컴포넌트 */}
        {/* <section aria-label="qustion-detail-page-search" className="mb-5">
          <QuestionDetailPageSearchComponent />
        </section> */}

        {/* 최근검색 컴포넌트 */}
        {/* <section aria-label="recent-search" className="mb-5">
          <RecentSearchComponent />
        </section> */}

        {/* 질문 리스트 */}
        <div className="w-full bg-white">
          {isLoading && <QuestionCardListSkeleton />}
          {!isLoading && questionData.length > 0 && <QuestionCardList data={questionData} />}
          {!isLoading && questionData.length === 0 && (
            <div className="flex h-40 items-center justify-center">
              <span className="text-SUIT_14 font-medium text-[#C5C5C5]">표시할 질문이 없습니다.</span>
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

      <QuestionFilteringBottomSheet
        onReset={handleFilterReset}
        onConfirm={handleQuestionConfirm}
        currentFiltering={currentFiltering} // 현재 적용된 필터링 상태 전달
        trigger={<div />} // 빈 트리거 (Header의 메뉴 버튼으로 제어)
      />
    </div>
  );
}
