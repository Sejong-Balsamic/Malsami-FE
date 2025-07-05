"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { questionPostApi } from "@/apis/questionPostApi";
import { QuestionPost } from "@/types/api/entities/postgres/questionPost";
import SubjectTag from "@/components/common/tags/SubjectTag";
import CustomTag from "@/components/common/tags/CustomTag";

interface AllQuestionListSectionProps {
  onViewAll: () => void;
}

// 스켈레톤 컴포넌트
function QuestionListSkeleton() {
  return (
    <div className="w-full space-y-4">
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={`skeleton-${index}`}
          className="animate-pulse rounded-xl border border-[#F1F1F1] bg-white p-5 shadow-md"
        >
          {/* 상단 부분 - 과목 태그 */}
          <div className="mb-2">
            <div className="h-6 w-24 rounded-md bg-gray-200" />
          </div>

          {/* 제목 */}
          <div className="mb-1 h-6 w-full max-w-80 rounded bg-gray-200" />

          {/* 내용 */}
          <div className="mb-4 h-16 w-full rounded bg-gray-200" />

          {/* 하단 부분 */}
          <div className="flex items-center justify-between">
            {/* 커스텀 태그들 */}
            <div className="flex gap-2">
              <div className="h-6 w-20 rounded-full bg-gray-200" />
              <div className="h-6 w-20 rounded-full bg-gray-200" />
            </div>

            {/* 좋아요, 댓글 */}
            <div className="flex items-center gap-3">
              <div className="h-4 w-10 rounded bg-gray-200" />
              <div className="h-4 w-10 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AllQuestionListSection({ onViewAll }: AllQuestionListSectionProps) {
  const [questions, setQuestions] = useState<QuestionPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 전체 질문 데이터 로드
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await questionPostApi.getFilteredQuestionPosts({
          sortType: "LATEST",
          pageSize: 3, // 최근 3개만 표시
        });

        if (response && response.questionPostsPage && response.questionPostsPage.content) {
          setQuestions(response.questionPostsPage.content);
        }
      } catch (error) {
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      {/* 헤더 영역: 제목, 전체보기 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/icons/yellowBook.svg" alt="질문" width={24} height={24} />
          <h2 className="ml-[10px] whitespace-nowrap text-SUIT_16 font-medium">전체 질문</h2>
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

      {/* 질문 리스트 */}
      {loading ? (
        <QuestionListSkeleton />
      ) : questions.length > 0 ? (
        <div className="w-full space-y-4">
          {questions.map(question => (
            <div key={question.questionPostId} className="rounded-xl border border-[#F1F1F1] bg-white p-5 shadow-md">
              {/* 상단 부분 */}
              <div className="mb-2">
                <SubjectTag subjectName={question.subject || "과목 없음"} type="question" />
              </div>

              {/* 게시물 제목 */}
              <h3 className="mb-1 text-SUIT_16 font-bold leading-tight">{question.title}</h3>

              {/* 게시물 내용 */}
              <p className="mb-4 line-clamp-2 text-SUIT_16 font-medium text-[#676767]">{question.content}</p>

              {/* 하단 부분 */}
              <div className="flex items-center justify-between">
                {/* 커스텀 태그 */}
                <div className="flex flex-wrap gap-2">
                  {question.customTags?.slice(0, 2).map(customTag => (
                    <CustomTag key={customTag} tagName={customTag} />
                  ))}
                </div>

                {/* 좋아요 및 댓글 */}
                <div className="flex items-center gap-3 text-SUIT_14 font-medium text-[#929292]">
                  {/* 좋아요 */}
                  <span className="flex items-center">
                    {question.isLiked ? (
                      <Image src="/icons/newLikeThumbGreen.svg" alt="좋아요 됨" width={16} height={16} />
                    ) : (
                      <Image src="/icons/newLikeThumbGray.svg" alt="좋아요 안됨" width={16} height={16} />
                    )}
                    <span className="ml-1">{question.likeCount}</span>
                  </span>

                  {/* 답변 수 */}
                  <span className="flex items-center">
                    <Image src="/icons/newChatBubbleGreen.svg" alt="답변" width={16} height={16} />
                    <span className="ml-1">{question.answerCount || 0}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-40 w-full items-center justify-center rounded-xl border border-[#F1F1F1] bg-white p-5 text-[#929292]">
          <span>표시할 질문이 없습니다.</span>
        </div>
      )}
    </div>
  );
}
