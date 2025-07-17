"use client";

import { useState, useEffect } from "react";
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
import { memberApi } from "@/apis/memberApi";
import { setQuestionFilteringOpen } from "@/global/store/bottomSheetSlice";

export default function MajorQuestionPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  // 상태 관리
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [questionData, setQuestionData] = useState<QuestionPost[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [memberFaculty, setMemberFaculty] = useState<string>("");

  // 현재 적용된 필터링 상태
  const [currentFiltering, setCurrentFiltering] = useState<Partial<QuestionCommand>>({
    sortType: "LATEST",
    chaetaekStatus: "ALL",
    questionPresetTags: [],
  });

  // 사용자 전공 정보 가져오기
  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const response = await memberApi.getMyInfo({});
        if (response && response.member && response.member.faculties && response.member.faculties.length > 0) {
          setMemberFaculty(response.member.faculties[0]); // 첫 번째 학과 사용
        }
      } catch (error) {
        console.error("사용자 정보를 불러오는데 실패했습니다:", error);
      }
    };

    fetchMemberInfo();
  }, []);

  // 데이터 로드 함수
  const fetchMajorQuestions = async (page: number = 0, filtering: Partial<QuestionCommand> = currentFiltering) => {
    setIsLoading(true);
    try {
      const response = await questionPostApi.getFilteredQuestionPosts({
        pageNumber: page,
        pageSize: 10,
        sortType: filtering.sortType || "LATEST",
        chaetaekStatus: filtering.chaetaekStatus,
        questionPresetTags: filtering.questionPresetTags,
        faculty: memberFaculty, // 사용자 전공으로 필터링
      });

      if (response && response.questionPostsPage) {
        setQuestionData(response.questionPostsPage.content || []);
        setTotalPages(response.questionPostsPage.totalPages || 0);
      }
    } catch (error) {
      console.error("내 전공관련질문을 불러오는데 실패했습니다:", error);
      setQuestionData([]);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  };

  // 데이터 로드 (memberFaculty가 설정된 후에만)
  useEffect(() => {
    if (memberFaculty) {
      fetchMajorQuestions(currentPage);
    }
  }, [currentPage, memberFaculty]);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleBackClick = () => {
    router.back();
  };

  // 필터링 핸들러들
  const handleQuestionConfirm = async (filtering: Partial<QuestionCommand>) => {
    console.log("질문 필터링 적용:", filtering);
    // 필터링 상태 업데이트하고 API 호출
    setCurrentFiltering(filtering);
    setCurrentPage(0);
    await fetchMajorQuestions(0, filtering);
  };

  const handleFilterReset = async () => {
    const defaultFiltering: Partial<QuestionCommand> = {
      sortType: "LATEST",
      chaetaekStatus: "ALL",
      questionPresetTags: [],
    };
    setCurrentFiltering(defaultFiltering);
    setCurrentPage(0);
    if (memberFaculty) await fetchMajorQuestions(0, defaultFiltering);
  };

  const handleRemoveFilter = async (filterType: "sortType" | "chaetaekStatus" | "tag", value?: string) => {
    const newFiltering: Partial<QuestionCommand> = { ...currentFiltering };

    if (filterType === "sortType") {
      newFiltering.sortType = undefined;
    } else if (filterType === "chaetaekStatus") {
      newFiltering.chaetaekStatus = undefined;
    } else if (filterType === "tag" && value) {
      newFiltering.questionPresetTags = (newFiltering.questionPresetTags || []).filter(tag => tag !== value);
      if (newFiltering.questionPresetTags.length === 0) newFiltering.questionPresetTags = undefined;
    }

    setCurrentFiltering(newFiltering);
    setCurrentPage(0);
    if (memberFaculty) await fetchMajorQuestions(0, newFiltering);
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
          title="내 전공 질문"
          subtitle={memberFaculty || "학과 정보 로딩중..."}
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
              <span className="text-SUIT_14 font-medium text-[#C5C5C5]">
                {memberFaculty ? `${memberFaculty} 관련 질문이 없습니다.` : "전공 정보를 불러올 수 없습니다."}
              </span>
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

      {/* QuestionFilteringBottomSheet */}
      <QuestionFilteringBottomSheet
        onReset={handleFilterReset}
        onConfirm={handleQuestionConfirm}
        currentFiltering={currentFiltering} // 현재 적용된 필터링 상태 전달
        trigger={<div />} // 빈 트리거 (Header의 메뉴 버튼으로 제어)
      />
    </div>
  );
}
