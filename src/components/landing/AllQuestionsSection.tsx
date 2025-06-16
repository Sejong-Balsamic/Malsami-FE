"use client";

import React from "react";
import Image from "next/image";
import CardList from "@/components/common/CardList";

interface AllQuestionsSectionProps {
  onViewAll: () => void;
}

export default function AllQuestionsSection({ onViewAll }: AllQuestionsSectionProps) {
  return (
    <div>
      {/* 헤더 영역: 제목, 전체보기 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex flex-1 flex-wrap items-center">
          <div className="flex items-center">
            <Image src="/icons/academicCap.svg" alt="자료" width={30} height={30} />
            <h2 className="ml-[10px] whitespace-nowrap text-SUIT_16 font-medium">전체 질문 게시판</h2>
          </div>
        </div>

        {/* 전체보기 링크 - flex-shrink-0으로 줄어들지 않게 함 */}
        <button
          type="button"
          onClick={onViewAll}
          className="ml-2 flex-shrink-0 whitespace-nowrap text-SUIT_14 font-medium text-[#A7A7A7]"
        >
          전체보기
        </button>
      </div>

      {/* 카드 리스트 영역 */}
      <CardList />
    </div>
  );
}
