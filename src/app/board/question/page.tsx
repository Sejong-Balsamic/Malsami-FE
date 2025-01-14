"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setFilterOptions } from "@/store/filterOptionsSlice";
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

export default function QuestionBoardPage() {
  const dispatch = useDispatch();
  const faculty = useSelector((state: RootState) => state.faculty.faculty);
  const filterOptions = useSelector((state: RootState) => state.filterOptions);

  const [unansweredQNAs, setUnansweredQNAs] = useState<null | any[]>(null); // 초기값을 null로 설정
  const [categoryQNAs, setCategoryQNAs] = useState<QnaCard[]>([]); // 학과 선택 별 질문들 저장
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
  const [isUnansweredLoading, setIsUnansweredLoading] = useState(false); // 로딩 상태 관리
  const [isFABVisible, setIsFABVisible] = useState(true); // FAB 버튼 상태 관리

  // 페이지네이션 관리
  const [pageNumber, setPageNumber] = useState(1); // 현재 페이지 번호
  const [pageSize] = useState(15); // 페이지 크기 (한 페이지에 표시할 항목 수)
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수

  // 로딩 상태에 따른 메시지
  const renderLoadingMessage = (): string => {
    if (isUnansweredLoading || unansweredQNAs === null) return "로딩 중...";
    if (unansweredQNAs.length === 0) return "전부 답변했어요!";
    return "아직 답변 안 했어요!";
  };

  // 페이지 변경
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageNumber(newPage);
    }
  };

  // 학과 변경 시 데이터 가져오기
  const getUnansweredDatas = async () => {
    setIsUnansweredLoading(true);
    try {
      const unansweredData = await getUnansweredQNAs({ faculty });
      setUnansweredQNAs(unansweredData); // 상태에 반영
    } catch (error) {
      console.error("미답변 QNA 데이터 가져오기 실패:", error);
    } finally {
      setIsUnansweredLoading(false);
    }
  };

  // 필터 변경 시 데이터 가져오기
  const getCategoryDatas = async () => {
    const params = {
      qnaPresetTags: filterOptions.qnaPresetTags,
      faculty,
      chaetakStatus: filterOptions.chaetakStatus,
      sortType: filterOptions.sortType,
      pageNumber: pageNumber - 1,
      pageSize,
    };
    setIsLoading(true);
    try {
      const categoryData = await getCategoryQNAs(params);
      setCategoryQNAs(categoryData.content); // 상태에 반영
      setTotalPages(categoryData.totalPages); // 총 페이지 수 업데이트
    } catch (error) {
      console.error("카테고리 QNA 데이터 가져오기 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 학과 변경 시 데이터 로드
  useEffect(() => {
    setPageNumber(1); // 페이지 번호 초기화
    getUnansweredDatas();
    getCategoryDatas();
  }, [faculty]); // faculty가 변경될 때 실행

  // 페이지 번호 변경 시 데이터 로드
  useEffect(() => {
    getCategoryDatas();
    window.scrollTo(0, 0);
  }, [pageNumber]); // 페이지 번호가 변경될 때 실행

  // 필터 변경 시 데이터 로드
  useEffect(() => {
    setPageNumber(1); // 페이지 번호 초기화
    getCategoryDatas();
  }, [filterOptions]); // filterOptions가 변경될 때 실행

  // 스크롤 이벤트로 FAB 버튼 관리
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.body.offsetHeight;
      // 스크롤이 맨 밑 근처로 가면 FAB 숨김
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
        <QnaFilterFacultyCategory />
        <div className="font-pretendard-semibold px-5 pb-3 pt-4 text-lg text-custom-blue-500">
          {renderLoadingMessage()}
        </div>
        <div className="flex items-center justify-center bg-[#EEEEEE]">
          {isUnansweredLoading || unansweredQNAs === null ? (
            <LoadingSpinner />
          ) : (
            <div className="flex w-full min-w-[370px] transition-all duration-300 ease-in-out sm:px-10">
              <MovingCardQuestion data={unansweredQNAs} />
            </div>
          )}
        </div>
        <div className="h-[2px] w-full bg-[#EEEEEE]" />
        <QnaFilterControlBar
          filterOptions={filterOptions}
          onFilterChange={newFilterOptions => {
            dispatch(setFilterOptions(newFilterOptions)); // Redux 상태 업데이트
          }}
        />
        <div className="h-0.5 bg-[#EEEEEE]" />
        <div className="px-5 py-4">
          {isLoading || categoryQNAs === null ? <LoadingSpinner /> : <QuestionCardList categoryQNAs={categoryQNAs} />}
        </div>
        {/* 페이지네이션 컴포넌트 */}
        <Pagination pageNumber={pageNumber} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>

      <UploadQFAB isFABVisible={isFABVisible} />
    </div>
  );
}
