"use client";

import React from "react";

export default function MovingCardSkeleton() {
  return (
    <div className="-mx-5 flex h-48 gap-3 overflow-hidden pl-5 pr-5">
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={`moving-skeleton-${index}`}
          className="relative flex h-44 w-72 flex-shrink-0 animate-pulse flex-col rounded-lg bg-white shadow-md"
        >
          {/* 상단 - 과목 태그 */}
          <div className="ml-4 mt-4 flex items-start gap-2">
            <div className="h-6 w-24 rounded bg-gray-200" />
          </div>

          {/* 제목 */}
          <div className="mx-4 mt-4 h-4 w-3/4 rounded bg-gray-200" />

          {/* 내용 (2줄) */}
          <div className="mx-4 mt-2 space-y-2">
            <div className="h-3 w-full rounded bg-gray-200" />
            <div className="h-3 w-4/5 rounded bg-gray-200" />
          </div>

          {/* 하단 통계 영역 */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            {/* 커스텀 태그 */}
            <div className="flex gap-2">
              <div className="h-7 w-16 rounded-full bg-gray-200" />
              <div className="h-7 w-16 rounded-full bg-gray-200" />
            </div>

            {/* 좋아요/답변 */}
            <div className="flex items-center gap-4">
              <div className="h-3 w-8 rounded bg-gray-200" />
              <div className="h-3 w-8 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
