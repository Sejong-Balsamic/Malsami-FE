"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import MovingCardSkeleton from "@/components/common/MovingCardSkeleton";
import { questionPostApi } from "@/apis/questionPostApi";
import { QuestionPost } from "@/types/api/entities/postgres/questionPost";
import MovingCardQuestion from "@/components/common/MovingCardQuestion";

interface HotQuestionsSectionProps {
  onViewAll: () => void;
  onTabChange: (value: ((prevState: string) => string) | string) => void;
  activeTab: string;
}

export default function HotQuestionsSection({ onViewAll, onTabChange, activeTab }: HotQuestionsSectionProps) {
  const [questions, setQuestions] = useState<QuestionPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 탭 변경에 따른 데이터 로드
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        if (activeTab === "주간") {
          const response = await questionPostApi.getWeeklyPopularQuestionPost();
          if (response && response.questionPostsPage && response.questionPostsPage.content) {
            setQuestions(response.questionPostsPage.content);
          }
        } else {
          const response = await questionPostApi.getDailyPopularQuestionPost();
          if (response && response.questionPostsPage && response.questionPostsPage.content) {
            setQuestions(response.questionPostsPage.content);
          }
        }
      } catch (error) {
        console.error("인기 질문을 불러오는데 실패했습니다:", error);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [activeTab]);

  return (
    <div>
      {/* 헤더 영역: 제목, 탭, 전체보기 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex flex-1 flex-wrap items-center">
          <div className="mr-2 flex items-center">
            <Image src="/icons/fire.svg" alt="인기" width={18} height={24} />
            <h2 className="ml-[10px] whitespace-nowrap text-SUIT_18 font-medium">HOT 인기 질문</h2>
          </div>

          {/* 주간/일간 버튼 */}
          <div className="mt-0 flex items-center">
            {/* 주간 버튼  */}
            <button
              type="button"
              onClick={() => onTabChange("주간")}
              className="relative flex items-center justify-center"
            >
              <div
                className={`flex h-[20px] w-[37px] items-center justify-center rounded-[34px] px-[8px] py-[4px] ${
                  activeTab === "주간" ? "bg-[#CAFFE5]" : "bg-[#EDEDED]"
                }`}
              >
                <span className={`text-[12px] ${activeTab === "주간" ? "text-[#00E271]" : "text-[#898989]"}`}>
                  주간
                </span>
              </div>
            </button>

            {/* 일간 버튼 */}
            <button
              type="button"
              onClick={() => onTabChange("일간")}
              className="relative ml-[4px] flex items-center justify-center"
            >
              <div
                className={`flex h-[20px] w-[37px] items-center justify-center rounded-[34px] px-[8px] py-[4px] ${
                  activeTab === "일간" ? "bg-[#CAFFE5]" : "bg-[#EDEDED]"
                }`}
              >
                <span className={`text-[12px] ${activeTab === "일간" ? "text-[#00E271]" : "text-[#898989]"}`}>
                  일간
                </span>
              </div>
            </button>
          </div>
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

      {/* 카드 스와이핑 영역 */}
      {/* 로딩 중일 때 스켈레톤 표시 */}
      {loading && <MovingCardSkeleton />}
      {/* 데이터가 있을 때 MovingCardQuestion 컴포넌트 렌더링 */}
      {!loading && questions.length > 0 && <MovingCardQuestion data={questions} />}
      {/* 데이터가 없을 때 표시되는 메시지 */}
      {!loading && questions.length === 0 && (
        <div className="flex h-[194px] w-full items-center justify-center">
          <span>표시할 인기 질문이 없습니다.</span>
        </div>
      )}
    </div>
  );
}
