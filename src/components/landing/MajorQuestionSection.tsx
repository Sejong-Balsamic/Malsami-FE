"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import MovingCardSkeleton from "@/components/common/MovingCardSkeleton";
import { questionPostApi } from "@/apis/questionPostApi";
import { QuestionPost } from "@/types/api/entities/postgres/questionPost";
import MovingCardQuestion from "@/components/common/MovingCardQuestion";

interface MajorQuestionSectionProps {
  onViewAll: () => void;
}

export default function MajorQuestionSection({ onViewAll }: MajorQuestionSectionProps) {
  const [questions, setQuestions] = useState<QuestionPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 내 전공 질문 데이터 로드
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        // 사용자의 전공에 맞는 질문들을 가져오는 API 호출
        // 실제로는 사용자의 전공 정보를 가져와서 필터링해야 함
        const response = await questionPostApi.getFilteredQuestionPosts({
          sortType: "LATEST",
          pageSize: 10, // 10개 정도 가져와서 가로 스크롤
        });

        if (response && response.questionPostsPage && response.questionPostsPage.content) {
          setQuestions(response.questionPostsPage.content);
        }
      } catch (error) {
        console.error("내 전공 질문을 불러오는데 실패했습니다:", error);
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
          <Image src="/icons/academicCap.svg" alt="학과" width={24} height={24} />
          <h2 className="ml-[10px] whitespace-nowrap text-SUIT_16 font-medium">내 전공관련 질문</h2>
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
          <span>표시할 전공 관련 질문이 없습니다.</span>
        </div>
      )}
    </div>
  );
}
