"use client";

import React from "react";
import Image from "next/image";

interface LandingSectionBaseProps {
  title: string;
  iconSrc: string;
  iconAlt: string;
  onViewAll: () => void;
  isLoading: boolean;
  children: React.ReactNode;
}

// 스켈레톤 컴포넌트
function LandingCardSkeleton() {
  return (
    <div className="w-full divide-y divide-[#EAEAEA] rounded-[22px] border border-[#F1F1F1] bg-white px-6 shadow-lg shadow-gray-200">
      {Array.from({ length: 3 }, (_, index) => (
        <div key={`skeleton-${index}`} className="animate-pulse py-5">
          {/* 상단 부분 - 과목 태그 */}
          <div className="mb-4 h-6 w-24 rounded-full bg-gray-200" />

          {/* 제목 */}
          <div className="mb-3 h-6 w-full max-w-80 rounded bg-gray-200" />

          {/* 내용 */}
          <div className="mb-6 h-6 w-full max-w-60 rounded bg-gray-200" />

          {/* 하단 부분 */}
          <div className="flex justify-between">
            {/* 커스텀 태그들 */}
            <div className="flex gap-1">
              <div className="h-6 w-16 rounded-full bg-gray-200" />
              <div className="h-6 w-16 rounded-full bg-gray-200" />
            </div>

            {/* 좋아요, 댓글 */}
            <div className="flex items-center gap-2">
              <div className="h-4 w-8 rounded bg-gray-200" />
              <div className="h-4 w-8 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LandingSectionBase({
  title,
  iconSrc,
  iconAlt,
  onViewAll,
  isLoading = false,
  children,
}: LandingSectionBaseProps) {
  return (
    <div>
      {/* 헤더 영역: 제목, 전체보기 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex flex-1 flex-wrap items-center">
          <div className="flex items-center">
            <Image src={iconSrc} alt={iconAlt} width={30} height={30} />
            <h2 className="ml-[10px] whitespace-nowrap text-SUIT_16 font-medium">{title}</h2>
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
      {isLoading ? <LandingCardSkeleton /> : children}
    </div>
  );
}
