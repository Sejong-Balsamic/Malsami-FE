"use client";

import { useState } from "react";

import QuestionNavBar from "@/components/nav/QuestionNavBar";
import QuestionCardList from "@/components/board/tags/question/QuestionCardList";

export default function QuestionBoardPage() {
  const [faculty, setFaculty] = useState("전체");

  const handleSelect = (selection: string) => {
    setFaculty(selection);
    // 여기서 선택된 필터에 따라 API를 호출
  };
  return (
    <div className="bg-gray-200">
      <div className="bg-white">질문 게시판</div>
      <QuestionNavBar onSelect={handleSelect} />
      <br />
      <div className="p-2">
        <div className="text-2xl font-pretendard-semibold ml-2 mb-4">전체글</div>
        <QuestionCardList faculty={faculty} />
      </div>
      );
    </div>
  );
}
