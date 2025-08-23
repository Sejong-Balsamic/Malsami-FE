import React from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { QuestionPost } from "@/types/api/entities/postgres/questionPost";
import { RootState } from "@/global/store";
import { showModal } from "@/global/store/modalSlice";
import QuestionCard from "./QuestionCard";

interface QuestionCardListProps {
  data: QuestionPost[];
}

export default function QuestionCardList({ data }: QuestionCardListProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  if (!data || data.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center">
        <span className="text-SUIT_14 font-medium text-[#C5C5C5]">표시할 질문이 없습니다.</span>
      </div>
    );
  }

  const handleQuestionClick = (questionId: string) => {
    if (!isLoggedIn) {
      dispatch(showModal("로그인이 필요합니다"));
      return;
    }
    router.push(`/board/question/detail/${questionId}`);
  };

  return (
    <div className="w-full">
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
