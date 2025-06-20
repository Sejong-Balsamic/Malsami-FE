"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import MovingCardSkeleton from "@/components/common/MovingCardSkeleton";
import { questionPostApi } from "@/apis/questionPostApi";
import { QuestionPost } from "@/types/api/entities/postgres/questionPost";
import MovingCardQuestion from "@/components/common/MovingCardQuestion";

interface BountyQuestionSectionProps {
  onViewAll: () => void;
  activeTab: "최근순" | "높은순";
  onTabChange: (tab: "최근순" | "높은순") => void;
}

export default function BountyQuestionSection({ onViewAll, activeTab, onTabChange }: BountyQuestionSectionProps) {
  const [questions, setQuestions] = useState<QuestionPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 탭 변경에 따른 데이터 로드
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        // 새로운 정렬 타입 사용
        const response = await questionPostApi.getFilteredQuestionPosts({
          sortType: activeTab === "최근순" ? "REWARD_YEOPJEON_LATEST" : "REWARD_YEOPJEON_DESCENDING",
          pageSize: 10,
        });

        if (response && response.questionPostsPage && response.questionPostsPage.content) {
          setQuestions(response.questionPostsPage.content);
        }
      } catch (error) {
        console.error("현상금 질문을 불러오는데 실패했습니다:", error);
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
            <Image src="/icons/moneyBag.svg" alt="엽전" width={24} height={24} />
            <h2 className="ml-[10px] whitespace-nowrap text-SUIT_16 font-medium">연전현상금</h2>
          </div>

          {/* 최근순/높은순 버튼 */}
          <div className="mt-0 flex items-center">
            {/* 최근순 버튼 */}
            <button
              type="button"
              onClick={() => onTabChange("최근순")}
              className="relative flex items-center justify-center"
            >
              <div
                className={`h-[27px] w-[50px] rounded-[13.5px] ${
                  activeTab === "최근순" ? "bg-[#00d241]" : "bg-[#e9eaed]"
                }`}
              />
              <span
                className={`absolute text-SUIT_12 font-medium ${activeTab === "최근순" ? "text-white" : "text-black"}`}
              >
                최근순
              </span>
            </button>

            {/* 높은순 버튼 */}
            <button
              type="button"
              onClick={() => onTabChange("높은순")}
              className="relative ml-[4px] flex items-center justify-center"
            >
              <div
                className={`h-[27px] w-[50px] rounded-[13.5px] ${
                  activeTab === "높은순" ? "bg-[#00d241]" : "bg-[#e9eaed]"
                }`}
              />
              <span
                className={`absolute text-SUIT_12 font-medium ${activeTab === "높은순" ? "text-white" : "text-black"}`}
              >
                높은순
              </span>
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
          <span>표시할 현상금 질문이 없습니다.</span>
        </div>
      )}
    </div>
  );
}
