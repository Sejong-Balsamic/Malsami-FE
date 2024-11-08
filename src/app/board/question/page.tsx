"use client";

import { useState, useEffect } from "react";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import QnaFilterFacultyCategory from "@/components/board/question/QnaFilterFacultyCategory";
import QuestionCardList from "@/components/board/question/QuestionCardList";
import QnaMovingCard from "@/components/board/question/QnaMovingCard";
import FilterControlBar from "@/components/board/question/FilterControlBar";
import QnaPageNav from "@/components/nav/QnaPageNav";
import { QnaFilterOptions } from "@/types/QnaFilterOptions";
import getFacultyQNAs from "@/apis/question/getFacultyQNAs";

export default function QuestionBoardPage() {
  const [faculty, setFaculty] = useState("전체");
  const [filterOptions, setFilterOptions] = useState<QnaFilterOptions>({
    rewardYeopjeon: 0,
    tags: [], // string[]으로 올바르게 추론됩니다.
    sortOption: "",
  });
  const [isChaeTak, setIsChaeTak] = useState(false); // 채택됨 여부
  const [facultyQNAs, setFacultyQNAs] = useState([]); // 학과선택 별 질문들 저장하는 변수

  const handleFilterChange = (newFilterOptions: QnaFilterOptions) => {
    setFilterOptions(newFilterOptions);
  };
  const handleChaeTakChange = (newIsChaeTak: boolean) => {
    setIsChaeTak(newIsChaeTak);
  };

  // 선택한 학과가 변경되면, api호출해 새로운 QNAs 세팅하는 함수
  const handleSelect = async () => {
    console.log(`선택된 학과: ${faculty}`);
    try {
      const datas = await getFacultyQNAs(); // faculty 값에 따라 데이터 가져옴
      console.log(datas);
      setFacultyQNAs(datas);
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    handleSelect(); // faculty 상태가 변경될 때마다 handleSelect 호출
  }, [faculty]); // faculty가 변경될 때만 실행
  useEffect(() => {
    console.log(filterOptions); // filterOptions 상태가 변경될 때마다 handleSelect 호출
  }, [filterOptions]);
  useEffect(() => {
    console.log(isChaeTak);
  }, [isChaeTak]);

  return (
    <div className="bg-gray-white">
      <ScrollToTopOnLoad />
      <QnaPageNav />
      <QnaFilterFacultyCategory onSelect={setFaculty} />
      <div className="font-pretendard-semibold px-5 pb-3 pt-4 text-lg text-custom-blue-500">아직 답변 안 했어요!</div>
      <div className="bg-[#EEEEEE]">
        <QnaMovingCard facultyQNAs={facultyQNAs} />
      </div>
      <FilterControlBar
        filterOptions={filterOptions}
        isChaeTak={isChaeTak}
        onFilterChange={handleFilterChange}
        onChaeTakChange={handleChaeTakChange}
      />
      <div className="h-0.5 bg-[#EEEEEE]" />
      <div className="px-5 py-4">
        <QuestionCardList />
      </div>
    </div>
  );
}
