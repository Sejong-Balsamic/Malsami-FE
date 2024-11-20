"use client";

import { useState, useEffect } from "react";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import QnaFilterFacultyCategory from "@/components/board/question/QnaFilterFacultyCategory";
import QuestionCardList from "@/components/board/question/QuestionCardList";
import MovingCardQuestion from "@/components/landing/MovingCardQuestion";
import FilterControlBar from "@/components/board/question/FilterControlBar";
import QnaPageNav from "@/components/nav/QnaPageNav";
import { QnaFilterOptions } from "@/types/QnaFilterOptions";
import getUnansweredQNAs from "@/apis/question/getUnansweredQNAs";
import getCategoryQNAs from "@/apis/question/getCategoryQNAs";
import FabButton from "@/components/common/FAB";
import Pagination from "@/components/common/Pagination";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { QnaCard } from "@/types/QnaCard";

export default function QuestionBoardPage() {
  const [faculty, setFaculty] = useState("전체");
  const [filterOptions, setFilterOptions] = useState<QnaFilterOptions>({
    isChaeTaek: "",
    tags: [],
    sortOption: "",
  });
  const [unansweredQNAs, setUnansweredQNAs] = useState<null | any[]>(null); // 초기값을 null로 설정. 학과선택 별 질문들 저장하는 변수
  const [categoryQNAs, setCategoryQNAs] = useState<QnaCard[]>([]); // 학과선택 별 질문들 저장하는 변수
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
  const [pageNumber, setPageNumber] = useState(1); // 현재 페이지 번호
  const [pageSize] = useState(4); // 페이지 크기 (한 페이지에 표시할 항목 수)
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수

  // 로딩 상태에 따른 메시지
  const renderLoadingMessage = (): string => {
    if (isLoading || unansweredQNAs === null) return "로딩 중...";
    if (unansweredQNAs.length === 0) return "전부 답변했어요!";
    return "아직 답변 안 했어요!";
  };

  const handleFilterChange = (newFilterOptions: QnaFilterOptions) => {
    setFilterOptions(newFilterOptions);
  };

  // page 변화 감지하는 함수
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageNumber(newPage); // 페이지 번호 업데이트
    }
  };

  // 선택한 학과가 변경되면, api호출해 새로운 QNAs 세팅하는 함수
  const fetchSelectFaculty = async () => {
    const params = {
      questionPresetTags: filterOptions.tags,
      faculty,
      isChaetaek: filterOptions.isChaeTaek,
      sortOption: filterOptions.sortOption,
      pageNumber: pageNumber - 1,
      pageSize,
    };

    setIsLoading(true);
    try {
      const datas = await getUnansweredQNAs({ faculty });
      const datas2 = await getCategoryQNAs(params);
      setUnansweredQNAs(datas);
      setCategoryQNAs(datas2.content);
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 선택한 필터가 변경되면, api호출해 새로운 QNAs 세팅하는 함수
  const fetchSelectFiltering = async () => {
    const params = {
      questionPresetTags: filterOptions.tags,
      faculty,
      isChaetaek: filterOptions.isChaeTaek,
      sortOption: filterOptions.sortOption,
      pageNumber: pageNumber - 1,
      pageSize,
    };
    console.log("필터옵션: ", filterOptions);

    try {
      const datas = await getCategoryQNAs(params);
      setCategoryQNAs(datas.content); // 필터링 질문 업데이트
      setTotalPages(datas.totalPages); // 총 페이지 수 업데이트
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    setPageNumber(1); // 페이지 번호 초기화
    fetchSelectFaculty(); // faculty 상태가 변경될 때마다 handleSelect 호출
  }, [faculty]); // faculty가 변경될 때만 실행
  useEffect(() => {
    fetchSelectFiltering();
    window.scrollTo(0, 0);
  }, [pageNumber]); // 페이지 변경될 때만 실행
  useEffect(() => {
    setPageNumber(1); // 페이지 번호 초기화
    fetchSelectFiltering();
  }, [filterOptions]); // 필터 옵션이 변경될 때만 실행

  return (
    <div className="flex justify-center bg-gray-100">
      <ScrollToTopOnLoad />
      <div className="relative mx-auto w-full min-w-[386px] max-w-[640px] bg-white">
        <QnaPageNav />
        <QnaFilterFacultyCategory onSelect={setFaculty} />
        <div className="font-pretendard-semibold px-5 pb-3 pt-4 text-lg text-custom-blue-500">
          {renderLoadingMessage()}
        </div>
        <div className="flex items-center justify-center bg-[#EEEEEE]">
          {isLoading || unansweredQNAs === null ? (
            <LoadingSpinner />
          ) : (
            <div className="flex w-[370px] transition-all duration-300 ease-in-out sm:w-[450px]">
              <MovingCardQuestion data={unansweredQNAs} />
            </div>
          )}
        </div>
        <div className="h-[2px] w-full bg-[#EEEEEE]" />
        <FilterControlBar filterOptions={filterOptions} onFilterChange={handleFilterChange} />
        <div className="h-0.5 bg-[#EEEEEE]" />
        <div className="px-5 py-4">
          <QuestionCardList categoryQNAs={categoryQNAs} />
        </div>
        {/* 페이지네이션 컴포넌트 */}
        <Pagination pageNumber={pageNumber} totalPages={totalPages - 1} onPageChange={handlePageChange} />
      </div>
      <div className="fixed bottom-5 right-5 z-10">
        <FabButton />
      </div>
    </div>
  );
}
