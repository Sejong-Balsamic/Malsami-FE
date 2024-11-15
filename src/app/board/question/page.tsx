"use client";

import { useState, useEffect } from "react";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import QnaFilterFacultyCategory from "@/components/board/question/QnaFilterFacultyCategory";
import QuestionCardList from "@/components/board/question/QuestionCardList";
import QnaMovingCard from "@/components/board/question/QnaMovingCard";
import FilterControlBar from "@/components/board/question/FilterControlBar";
import QnaPageNav from "@/components/nav/QnaPageNav";
import { QnaFilterOptions } from "@/types/QnaFilterOptions";
import getUnansweredQNAs from "@/apis/question/getUnansweredQNAs";
import getCategoryQNAs from "@/apis/question/getCategoryQNAs";

export default function QuestionBoardPage() {
  const [faculty, setFaculty] = useState("전체");
  const [filterOptions, setFilterOptions] = useState<QnaFilterOptions>({
    isChaeTaek: "",
    tags: [],
    sortOption: "",
  });
  const [unansweredQNAs, setUnansweredQNAs] = useState([]); // 학과선택 별 질문들 저장하는 변수
  const [categoryQNAs, setCategoryQNAs] = useState([]); // 학과선택 별 질문들 저장하는 변수

  const handleFilterChange = (newFilterOptions: QnaFilterOptions) => {
    setFilterOptions(newFilterOptions);
  };

  // 선택한 학과가 변경되면, api호출해 새로운 QNAs 세팅하는 함수
  const fetchSelectFaculty = async () => {
    const params = {
      questionPresetTags: filterOptions.tags,
      faculty,
      isChaetaek: filterOptions.isChaeTaek,
      sortOption: filterOptions.sortOption,
    };

    try {
      const datas = await getUnansweredQNAs({ faculty });
      const datas2 = await getCategoryQNAs(params);
      setUnansweredQNAs(datas);
      setCategoryQNAs(datas2);
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  };
  // 선택한 필터가 변경되면, api호출해 새로운 QNAs 세팅하는 함수
  const fetchSelectFiltering = async () => {
    const params = {
      questionPresetTags: filterOptions.tags,
      faculty,
      isChaetaek: filterOptions.isChaeTaek,
      sortOption: filterOptions.sortOption,
    };
    console.log("필터옵션: ", filterOptions);

    try {
      const datas = await getCategoryQNAs(params);
      setCategoryQNAs(datas);
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchSelectFaculty(); // faculty 상태가 변경될 때마다 handleSelect 호출
  }, [faculty]); // faculty가 변경될 때만 실행

  useEffect(() => {
    fetchSelectFiltering();
  }, [filterOptions]); // 채택, 필터링옵션 변경될 대만 실행

  return (
    <div className="flex justify-center bg-gray-100">
      <ScrollToTopOnLoad />
      <div className="relative mx-auto h-[3000px] w-full min-w-[386px] max-w-[640px] bg-white">
        <QnaPageNav />
        <QnaFilterFacultyCategory onSelect={setFaculty} />
        <div className="font-pretendard-semibold px-5 pb-3 pt-4 text-lg text-custom-blue-500">아직 답변 안 했어요!</div>
        <div className="bg-[#EEEEEE]">
          <QnaMovingCard unansweredQNAs={unansweredQNAs} />
        </div>
        <FilterControlBar filterOptions={filterOptions} onFilterChange={handleFilterChange} />
        <div className="h-0.5 bg-[#EEEEEE]" />
        <div className="px-5 py-4">
          <QuestionCardList categoryQNAs={categoryQNAs} />
        </div>
      </div>
    </div>
  );
}
