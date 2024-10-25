"use client";

import getDateDiff from "@/utils/getDateDiff";
import QuestionCardList from "@/components/board/tags/question/QuestionCardList";

export default function QuestionBoardPage() {
  return (
    <div>
      <div>quesiton board page</div>
      <span>{getDateDiff("2024-10-25T01:59:43.934Z")}</span>
      <br />
      <br />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">질문 목록</h1>
        <QuestionCardList />
      </div>
      );
    </div>
  );
}
