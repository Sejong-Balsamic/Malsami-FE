"use client";

import { useState, useEffect } from "react";

import QnaFilterFacultyCategory from "@/components/board/question/QnaFilterFacultyCategory";
import QuestionCardList from "@/components/board/question/QuestionCardList";
import CategoryCardList from "@/components/common/CategoryCardList";
import categoryCardDatas from "@/lib/categoryCardDats";
import FilterControlBar from "@/components/board/question/FilterControlBar";
import QnaPageNav from "@/components/nav/QnaPageNav";

export default function QuestionBoardPage() {
  const [faculty, setFaculty] = useState("전체");
  const [categoryCardDatass, setCategoryCardDatas] = useState(categoryCardDatas);

  useEffect(() => {
    setCategoryCardDatas(categoryCardDatas);
  }, []); // eslint에러 때문에 이유없이 사용

  const handleSelect = (selection: string) => {
    setFaculty(selection);
    // 여기서 선택된 필터에 따라 API를 호출
  };
  return (
    <div className="bg-gray-white">
      <QnaPageNav />
      <QnaFilterFacultyCategory onSelect={handleSelect} />
      <div className="text-custom-blue-500 px-5 pt-4 pb-3 text-lg font-pretendard-semibold">아직 답변 안 했어요!</div>
      <div className="bg-[#EEEEEE]">
        <CategoryCardList categoryCardDatas={categoryCardDatass} />
      </div>
      <FilterControlBar />
      <div className="h-0.5 bg-[#EEEEEE]" />
      <div className="px-5 py-4">
        <QuestionCardList faculty={faculty} />
      </div>
    </div>
  );
}
