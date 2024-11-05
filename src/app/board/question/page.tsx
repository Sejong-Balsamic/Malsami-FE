"use client";

import { useState, useEffect } from "react";

import QnaFilterFacultyCategory from "@/components/board/question/QnaFilterFacultyCategory";
import QuestionCardList from "@/components/board/question/QuestionCardList";
import QnaMovingCard from "@/components/board/question/QnaMovingCard";
import FilterControlBar from "@/components/board/question/FilterControlBar";
import QnaPageNav from "@/components/nav/QnaPageNav";
import getFacultyQNAs from "@/apis/question/getFacultyQNAs";

export default function QuestionBoardPage() {
  const [faculty, setFaculty] = useState("전체");
  const [facultyQNAs, setFacultyQNAs] = useState([]); // 학과선택 별 질문들 저장하는 변수
  // const [categoryQNAs, setCategoryQNAs] = useState([]); // 학과선택 별 질문들 저장하는 변수

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

  return (
    <div className="bg-gray-white">
      <QnaPageNav />
      <QnaFilterFacultyCategory onSelect={setFaculty} />
      <div className="text-custom-blue-500 px-5 pt-4 pb-3 text-lg font-pretendard-semibold">아직 답변 안 했어요!</div>
      <div className="bg-[#EEEEEE]">
        <QnaMovingCard facultyQNAs={facultyQNAs} />
      </div>
      <FilterControlBar />
      <div className="h-0.5 bg-[#EEEEEE]" />
      <div className="px-5 py-4">
        <QuestionCardList />
      </div>
    </div>
  );
}
