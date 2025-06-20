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
        console.error("전체 질문을 불러오는데 실패했습니다:", error);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return (
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image src="/icons/yellowBook.svg" alt="질문 " width={24} height={24} />
            <h2 className="ml-[10px] whitespace-nowrap text-SUIT_16 font-medium">전체 질문</h2>
          </div>
          <button
            type="button"
            onClick={onViewAll}
            className="ml-2 flex-shrink-0 whitespace-nowrap text-SUIT_14 font-medium text-[#A7A7A7]"
          >
            전체보기
          </button>
        </div>
        <div className="w-full divide-y divide-[#EAEAEA] rounded-[22px] border border-[#F1F1F1] bg-white px-6 shadow-lg shadow-gray-200">
          <div className="flex h-40 items-center justify-center">
            <span>로딩 중...</span>
          </div>
        </div>
      </div>
    );
  }

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
      <div className="w-full divide-y divide-[#EAEAEA] rounded-[22px] border border-[#F1F1F1] bg-white px-6 shadow-lg shadow-gray-200">
        {questions.length > 0 ? (
          questions.map(question => (
            <div key={question.questionPostId} className="py-5">
              {/* 상단 부분 */}
              <SubjectTag subjectName={question.subject || "과목 없음"} />
              {/* 게시물 제목, 내용 - 한 줄로 줄임 처리, 줄간격 설정 */}
              <p className="mb-3 mt-4 line-clamp-1 text-SUIT_16 font-bold leading-6">{question.title}</p>
              <p className="mb-6 line-clamp-1 text-SUIT_16 font-medium text-[#676767]">{question.content}</p>

              {/* 하단 부분 */}
              <div className="flex justify-between">
                {/* 커스텀 태그 */}
                <div className="flex gap-1">
                  {question.customTags?.slice(0, 2).map(customTag => <CustomTag key={customTag} tagName={customTag} />)}
                </div>
                {/* 좋아요, 답변 수 */}
                <div className="flex items-center text-SUIT_14 font-medium text-[#929292]">
                  <span className="flex">
                    {question.isLiked ? (
                      <Image src="/icons/actions/hand-thumbs-up-fill.svg" alt="좋아요 됨" width={16} height={16} />
                    ) : (
                      <Image src="/icons/actions/hand-thumbs-up.svg" alt="좋아요 안됨" width={16} height={16} />
                    )}
                    <span className="ml-1">{question.likeCount}</span>
                  </span>
                  {/* 답변 수 */}
                  <span className="ml-2 flex items-center">
                    <Image src="/icons/actions/comment.svg" alt="답변" width={16} height={16} />
                    <span className="ml-1">{question.answerCount || 0}</span>
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex h-40 items-center justify-center">
            <span>표시할 질문이 없습니다.</span>
          </div>
        )}
      </div>
    </div>
  );
}
