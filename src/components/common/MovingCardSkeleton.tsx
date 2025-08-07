"use client";

import React from "react";

export default function MovingCardSkeleton() {
  return (
    <div className="flex h-[194px] w-full gap-4 overflow-hidden px-1">
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={`moving-skeleton-${index}`}
          className="min-w-[280px] animate-pulse rounded-[20px] border border-[#F1F1F1] bg-white p-6 shadow-lg"
        >
          {/* 상단 - 과목 태그 */}
          <div className="mb-4 h-6 w-24 rounded-full bg-gray-200" />

          {/* 제목 */}
          <div className="mb-3 h-6 w-full rounded bg-gray-200" />

          {/* 내용 (2줄) */}
          <div className="mb-2 h-4 w-full rounded bg-gray-200" />
          <div className="mb-6 h-4 w-3/4 rounded bg-gray-200" />

          {/* 하단 통계 영역 */}
          <div className="flex items-center justify-between">
            {/* 좋아요, 댓글, 조회수 */}
            <div className="flex items-center gap-4">
              <div className="h-4 w-8 rounded bg-gray-200" />
              <div className="h-4 w-8 rounded bg-gray-200" />
              <div className="h-4 w-8 rounded bg-gray-200" />
            </div>

            {/* 엽전 또는 채택 상태 */}
            <div className="h-6 w-12 rounded-full bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
