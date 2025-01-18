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

  // Redux에서 선택된 단과대 및 필터 옵션 가져오기
  const selectedFaculty = useSelector((state: RootState) => state.facultyState.selectedFacultyMapByBoard.question);
  const filterOptions = useSelector((state: RootState) => state.filterOptions);

  // "전체" 버튼 상태 관리
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

  // FAB 버튼 표시/숨김 관리
  const [isFABVisible, setIsFABVisible] = useState(true);

  // ================== 데이터 로드 함수 ==================

  const loadAllData = async (faculty: string | undefined) => {
    setIsLoading(true);
    setIsUnansweredLoading(true);

    try {
      // 1) 미답변 데이터 가져오기
      const unansweredData = await getUnansweredQNAs({ faculty });
      setUnansweredQNAs(unansweredData);

      // 2) 필터 데이터 가져오기
      const params = {
        questionPresetTags: filterOptions.tags,
        faculty,
        isChaetaek: filterOptions.isChaeTaek,
        sortOption: filterOptions.sortOption,
        pageNumber: pageNumber - 1, // 페이지 번호는 0부터 시작
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

  // ================== useEffect ==================

  // (A) 단과대 변경 또는 "전체" 선택 시 데이터 로드
  useEffect(() => {
    const facultyParam = isAllFacultySelected ? undefined : selectedFaculty;
    loadAllData(facultyParam);
    setPageNumber(1); // 페이지 번호 초기화
  }, [selectedFaculty, isAllFacultySelected, filterOptions]);

  // (B) 페이지 번호 변경 시 데이터 로드
  useEffect(() => {
    const facultyParam = isAllFacultySelected ? undefined : selectedFaculty;
    loadAllData(facultyParam);
    window.scrollTo(0, 0); // 페이지 상단으로 스크롤 이동
  }, [pageNumber]);

  // (C) 스크롤 시 FAB 버튼 표시/숨김
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.body.offsetHeight;
      setIsFABVisible(scrollPosition < documentHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ================== UI ==================
  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      <ScrollToTopOnLoad />
      <div className="relative mx-auto min-h-screen w-full min-w-[386px] max-w-[640px] bg-white">
        {/* 상단 네비게이션 */}
        <QnaPageNav />

        {/* === 단과대 필터 + 전체 버튼 === */}
        <QnaFilterFacultyCategory
          onAllFacultySelect={() => {
            setIsAllFacultySelected(true);
            loadAllData(undefined); // 전체 선택
          }}
          onFacultySelect={(faculty) => {
            setIsAllFacultySelected(false);
            loadAllData(faculty); // 특정 단과대 선택
          }}
          isAllFacultySelected={isAllFacultySelected}
        />

        {/* === 미답변 질문 목록 === */}
        <div className="font-pretendard-semibold px-5 pb-3 pt-4 text-lg text-custom-blue-500">
          {isUnansweredLoading || unansweredQNAs === null ? "로딩 중..." : unansweredQNAs.length === 0 ? "전부 답변했어요!" : "아직 답변 안 했어요!"}
        </div>
        <div className="flex items-center justify-center bg-[#EEEEEE]">
          {isUnansweredLoading || unansweredQNAs === null ? (
            <LoadingSpinner />
          ) : (
            <MovingCardQuestion data={unansweredQNAs} />
          )}
        </div>

        <div className="h-[2px] w-full bg-[#EEEEEE]" />

        {/* === 상단 필터 바 === */}
        <QnaFilterControlBar
          filterOptions={filterOptions}
          onFilterChange={(newFilterOptions) => dispatch(setFilterOptions(newFilterOptions))}
        />

        <div className="h-0.5 bg-[#EEEEEE]" />

        {/* === 질문 카드 목록 === */}
        <div className="px-5 py-4">
          {isLoading ? <LoadingSpinner /> : <QuestionCardList categoryQNAs={categoryQNAs} />}
        </div>

        {/* === 페이지네이션 === */}
        <Pagination pageNumber={pageNumber} totalPages={totalPages} onPageChange={(newPage) => setPageNumber(newPage)} />
      </div>

      <UploadQFAB isFABVisible={isFABVisible} />
    </div>
  );
}
