"use client";

import React from "react";

/**
 * 자료 요청 게시판 섹션의 로딩 상태를 표시하는 스켈레톤 컴포넌트
 */
export default function DocumentRequestSectionSkeleton() {
  return (
    <div className="w-full rounded-lg bg-white shadow-[2px_2px_10px_0px_rgba(0,0,0,0.10)]">
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={`skeleton-${index}`}
          className={`animate-pulse px-5 py-6 ${index < 2 ? "border-b border-[#EDEDED]" : ""}`}
        >
          {/* 상단 부분 - 과목 태그 */}
          <div className="mb-3">
            <div className="h-7 w-24 rounded-md bg-gray-200" />
          </div>

          {/* 제목 */}
          <div className="mb-2 h-[16px] w-full max-w-80 rounded bg-gray-200" />

          {/* 내용 */}
          <div className="mb-4 h-[40px] w-full rounded bg-gray-200" />

          {/* 하단 부분 */}
          <div className="flex items-center justify-between">
            {/* 커스텀 태그들 */}
            <div className="flex gap-2">
              <div className="h-7 w-20 rounded-full bg-gray-200" />
              <div className="h-7 w-20 rounded-full bg-gray-200" />
            </div>

            {/* 좋아요, 댓글 */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="h-4 w-4 rounded bg-gray-200" />
                <div className="h-3 w-6 rounded bg-gray-200" />
              </div>
              <div className="flex items-center gap-1">
                <div className="h-4 w-4 rounded bg-gray-200" />
                <div className="h-3 w-6 rounded bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
