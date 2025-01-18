"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import QnaFilterFacultyCategory from "@/components/board/question/QnaFilterFacultyCategory";
import QuestionCardList from "@/components/board/question/QuestionCardList";
import MovingCardQuestion from "@/components/landing/MovingCardQuestion";
import QnaFilterControlBar from "@/components/board/question/QnaFilterControlBar";
import QnaPageNav from "@/components/nav/QnaPageNav";
import getUnansweredQNAs from "@/apis/question/getUnansweredQNAs";
import getCategoryQNAs from "@/apis/question/getCategoryQNAs";
import UploadQFAB from "@/components/common/UploadQFAB";
import Pagination from "@/components/common/Pagination";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { QnaCard } from "@/types/QnaCard";
import { setFilterOptions } from "@/store/filterOptionsSlice";

export default function QuestionBoardPage() {
  const dispatch = useDispatch();

  // Redux 상태
  const selectedFaculty = useSelector((state: RootState) => state.facultyState.selectedFacultyMapByBoard.question);
  const filterOptions = useSelector((state: RootState) => state.filterOptions);

  // "전체" 버튼 상태
  const [isAllFacultySelected, setIsAllFacultySelected] = useState(false);

  // 데이터 상태
  const [unansweredQNAs, setUnansweredQNAs] = useState<null | any[]>(null);
  const [categoryQNAs, setCategoryQNAs] = useState<QnaCard[]>([]);

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);
  const [isUnansweredLoading, setIsUnansweredLoading] = useState(false);

  // 페이지네이션 상태
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(15);
  const [totalPages, setTotalPages] = useState(1);

  // FAB 버튼 표시/숨김
  const [isFABVisible, setIsFABVisible] = useState(true);

  // API 호출 함수
  const loadAllData = async (faculty: string | undefined) => {
    setIsLoading(true);
    setIsUnansweredLoading(true);
    try {
      // 미답변 질문
      const unansweredData = await getUnansweredQNAs({ faculty });
      setUnansweredQNAs(unansweredData);

      // 필터된 질문
      const params = {
        questionPresetTags: filterOptions.tags,
        faculty,
        isChaetaek: filterOptions.isChaeTaek,
        sortOption: filterOptions.sortOption,
        pageNumber: pageNumber - 1, // 0-based
        pageSize,
      };
      const categoryData = await getCategoryQNAs(params);
      setCategoryQNAs(categoryData.content || []);
      setTotalPages(categoryData.totalPages || 1);
    } catch (error) {
      console.error("데이터 로드 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
      setIsUnansweredLoading(false);
    }
  };

  // 단과대/필터 변경 시 페이지 번호 리셋
  useEffect(() => {
    // 단과대나 필터가 바뀌면 첫 페이지로
    setPageNumber(1);
  }, [selectedFaculty, isAllFacultySelected, filterOptions]);

  // 단과대/필터/페이지 변경 시 API 호출
  useEffect(() => {
    const facultyParam = isAllFacultySelected ? undefined : selectedFaculty;
    loadAllData(facultyParam);
  }, [isAllFacultySelected, selectedFaculty, filterOptions, pageNumber]);

  // 페이지 번호 변경 시 스크롤 최상단
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNumber]);

  // 스크롤 시 FAB 표시/숨김
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.body.offsetHeight;
      setIsFABVisible(scrollPosition < documentHeight - 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      <ScrollToTopOnLoad />
      <div className="relative mx-auto min-h-screen w-full min-w-[386px] max-w-[640px] bg-white">
        <QnaPageNav />

        {/* 단과대 필터 */}
        <QnaFilterFacultyCategory
          onAllFacultySelect={() => {
            // 전체 선택
            setIsAllFacultySelected(true);
          }}
          onFacultySelect={faculty => {
            // 특정 단과대 선택
            setIsAllFacultySelected(false);
          }}
          isAllFacultySelected={isAllFacultySelected}
        />

        {/* 미답변 질문 영역 */}
        <div className="font-pretendard-semibold px-5 pb-3 pt-4 text-lg text-custom-blue-500">
          {/* eslint-disable-next-line no-nested-ternary */}
          {isUnansweredLoading || unansweredQNAs === null
            ? "로딩 중..."
            : unansweredQNAs.length === 0
              ? "전부 답변했어요!"
              : "아직 답변 안 했어요!"}
        </div>
        <div className="flex items-center justify-center bg-[#EEEEEE]">
          {isUnansweredLoading || unansweredQNAs === null ? (
            <LoadingSpinner />
          ) : (
            <MovingCardQuestion data={unansweredQNAs} />
          )}
        </div>

        <div className="h-[2px] w-full bg-[#EEEEEE]" />

        {/* 상단 필터 바 */}
        <QnaFilterControlBar
          filterOptions={filterOptions}
          onFilterChange={newFilterOptions => dispatch(setFilterOptions(newFilterOptions))}
        />

        <div className="h-0.5 bg-[#EEEEEE]" />

        {/* 질문 카드 목록 */}
        <div className="px-5 py-4">
          {isLoading ? <LoadingSpinner /> : <QuestionCardList categoryQNAs={categoryQNAs} />}
        </div>

        {/* 페이지네이션 */}
        <Pagination pageNumber={pageNumber} totalPages={totalPages} onPageChange={newPage => setPageNumber(newPage)} />
      </div>

      <UploadQFAB isFABVisible={isFABVisible} />
    </div>
  );
}
