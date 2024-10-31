"use client";

import { useState, useEffect } from "react";

import QuestionNavBar from "@/components/nav/QuestionNavBar";
import QuestionCardList from "@/components/board/question/QuestionCardList";
import CategoryCardList from "@/components/common/CategoryCardList";
import categoryCardDatas from "@/lib/categoryCardDats";

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
      <CategoryCardList categoryCardDatas={categoryCardDatass} />

      <div className="bg-white">질문 게시판</div>
      <QuestionNavBar onSelect={handleSelect} />
      <br />
      <div className="p-2">
        <div className="text-2xl font-pretendard-semibold ml-2 mb-4">전체글</div>
        <QuestionCardList faculty={faculty} />
      </div>
    </div>
  );
}
