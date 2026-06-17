import React from "react";
import { useRouter } from "next/navigation";
import { QuestionPost } from "@/types/api/entities/postgres/questionPost";
import QuestionCard from "./QuestionCard";

interface QuestionCardListProps {
  data: QuestionPost[];
}

export default function QuestionCardList({ data }: QuestionCardListProps) {
  const router = useRouter();

  if (!data || data.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center">
        <span className="text-SUIT_14 font-medium text-ui-muted">표시할 질문이 없습니다.</span>
      </div>
    );
  }

  const handleQuestionClick = (questionId: string) => {
    if (!questionId) return;
    router.push(`/board/question/detail/${questionId}`);
  };

  return (
    // 모바일: 1열(카드 사이 divider), PC(lg): 2열 그리드(gap)
    <div className="w-full lg:grid lg:grid-cols-2 lg:gap-x-6 lg:gap-y-4">
      {data.map((question, index) => (
        <div key={question.questionPostId}>
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleQuestionClick(question.questionPostId || "")}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") {
                handleQuestionClick(question.questionPostId || "");
              }
            }}
            className="cursor-pointer"
          >
            <QuestionCard question={question} />
          </div>

          {/* 마지막 카드가 아니면 구분선 (PC 그리드에서는 숨김) */}
          {index < data.length - 1 && (
            <div className="lg:hidden">
              <div className="h-4" />
              <div className="h-px w-full bg-ui-divider" />
              <div className="h-4" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
