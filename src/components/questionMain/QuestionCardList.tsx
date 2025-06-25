import React from "react";
import { useRouter } from "next/navigation";
import QuestionCard from "./QuestionCard";
import { QuestionPost } from "../../types/api/entities/postgres/questionPost";

interface QuestionCardListProps {
  data: QuestionPost[];
}

export default function QuestionCardList({ data }: QuestionCardListProps) {
  const router = useRouter();

  if (!data || data.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center">
        <span className="text-SUIT_14 font-medium text-[#C5C5C5]">표시할 질문이 없습니다.</span>
      </div>
    );
  }

      return (
    <div className="w-full">
      {data.map((question, index) => (
        <div key={question.questionPostId}>
          <div
            role="button"
            tabIndex={0}
            onClick={() => router.push(`/board/question/detail/${question.questionPostId}`)}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") {
                router.push(`/board/question/detail/${question.questionPostId}`);
              }
            }}
            className="cursor-pointer"
          >
            <QuestionCard question={question} />
          </div>
          
          {/* 마지막 카드가 아니면 16px 간격 + 보더 + 16px 간격 */}
          {index < data.length - 1 && (
            <>
              <div className="h-4" />
              <div className="h-px w-full bg-[#F0F0F0]" />
              <div className="h-4" />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
