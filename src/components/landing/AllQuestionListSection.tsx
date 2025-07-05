"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { questionPostApi } from "@/apis/questionPostApi";
import { QuestionPost } from "@/types/api/entities/postgres/questionPost";
import SubjectTag from "@/components/common/tags/SubjectTag";
import CustomTag from "@/components/common/tags/CustomTag";
import { useRouter } from "next/navigation";
import AllQuestionsSectionSkeleton from "@/components/common/skeletons/AllQuestionsSectionSkeleton";

interface AllQuestionListSectionProps {
  onViewAll: () => void;
}

export default function AllQuestionListSection({ onViewAll }: AllQuestionListSectionProps) {
  const [questions, setQuestions] = useState<QuestionPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // 전체 질문 데이터 로드
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const response = await questionPostApi.getFilteredQuestionPosts({
          sortType: "LATEST",
          pageSize: 3, // 최근 3개만 표시
        });

        if (response && response.questionPostsPage && response.questionPostsPage.content) {
          setQuestions(response.questionPostsPage.content);
        } else {
          setQuestions([]);
        }
      } catch (error) {
        console.error("전체 질문 데이터 로드 실패:", error);
        setQuestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // 질문 상세 페이지로 이동
  const handleCardClick = (questionId: number) => {
    router.push(`/board/question/detail/${questionId}`);
  };

  // 데이터가 없는 경우 빈 상태 처리
  const renderEmptyState = () => (
    <div className="flex h-40 w-full items-center justify-center rounded-lg border border-[#F1F1F1] bg-white p-5 text-[#929292] shadow-[2px_2px_10px_0px_rgba(0,0,0,0.10)]">
      표시할 질문이 없습니다.
    </div>
  );

  return (
    <div>
      {/* 헤더 영역: 제목, 전체보기 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/icons/thoughtBalloon.svg" alt="질문" width={18} height={18} />
          <h2 className="ml-[10px] whitespace-nowrap text-SUIT_18 font-medium">전체 질문</h2>
        </div>

        {/* 전체보기 링크 */}
        <button
          type="button"
          onClick={onViewAll}
          className="ml-2 flex-shrink-0 whitespace-nowrap text-SUIT_14 font-medium text-[#A7A7A7]"
        >
          전체보기
        </button>
      </div>

      {/* 카드 리스트 영역 */}
      {(() => {
        if (isLoading) {
          return <AllQuestionsSectionSkeleton />;
        }
        if (questions.length > 0) {
          return (
            <div className="w-full rounded-lg bg-white shadow-[2px_2px_10px_0px_rgba(0,0,0,0.10)]">
              {questions.map((question, index) => (
                <button
                  type="button"
                  key={question.questionPostId}
                  className={`w-full cursor-pointer px-5 py-6 text-left ${index < questions.length - 1 ? "border-b border-[#EDEDED]" : ""}`}
                  onClick={() => handleCardClick(Number(question.questionPostId))}
                >
                  {/* 상단 부분 - 과목 태그 */}
                  <div className="mb-3">
                    <SubjectTag subjectName={question.subject || "과목 없음"} type="question" />
                  </div>

                  {/* 게시물 제목 */}
                  <h3 className="mb-2 line-clamp-1 text-SUIT_16 font-bold leading-[18px] text-black">
                    {question.title}
                  </h3>

                  {/* 게시물 내용 */}
                  <p className="mb-4 line-clamp-2 text-SUIT_14 font-medium leading-[22.4px] text-[#616161]">
                    {question.content}
                  </p>

                  {/* 하단 부분 */}
                  <div className="flex items-center justify-between">
                    {/* 커스텀 태그 */}
                    {/* eslint-disable-next-line react/no-array-index-key */}
                    <div className="flex gap-2 overflow-hidden whitespace-nowrap">
                      {question.customTags?.map((customTag, tagIndex) => (
                        <CustomTag key={`${question.questionPostId}-tag-${tagIndex}`} tagName={customTag} />
                      ))}
                    </div>

                    {/* 좋아요 및 댓글 */}
                    <div className="flex items-center gap-[4px]">
                      {/* 좋아요 */}
                      <span className="flex items-center gap-[4px]">
                        <Image src="/icons/newLikeThumbGray.svg" alt="좋아요" width={14} height={14} />
                        <span className="text-[12px] font-medium leading-[12px] text-[#C5C5C5]">
                          {question.likeCount || 0}
                        </span>
                      </span>

                      {/* 댓글 */}
                      <span className="ml-[8px] flex items-center gap-[4px]">
                        <Image src="/icons/newChatBubbleGray.svg" alt="답변" width={14} height={14} />
                        <span className="text-[12px] font-medium leading-[12px] text-[#C5C5C5]">
                          {question.answerCount || 0}
                        </span>
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          );
        }
        return renderEmptyState();
      })()}
    </div>
  );
}
