"use client";

import React from "react";

export default function NoticeCardSkeleton() {
  return (
    <div className="h-33 flex w-72 animate-pulse flex-col rounded-lg bg-white shadow-card-custom">
      {/* 상단: 제목 스켈레톤 */}
      <div className="mx-4 mt-4">
        <div className="h-4 w-48 rounded bg-gray-200" />
      </div>

      {/* 중간: 본문 내용 스켈레톤 (2줄) */}
      <div className="mx-4 mt-2 flex-1 space-y-2">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-3/4 rounded bg-gray-200" />
      </div>

      {/* 하단: 좋아요, 조회수 정보 스켈레톤 */}
      <div className="mx-4 mb-4 flex items-center justify-end gap-4">
        {/* 좋아요 스켈레톤 */}
        <div className="flex items-center gap-1">
          <div className="h-3.5 w-3.5 rounded bg-gray-200" />
          <div className="h-3 w-4 rounded bg-gray-200" />
        </div>

        {/* 조회수 스켈레톤 */}
        <div className="flex items-center gap-1">
          <div className="h-3.5 w-3.5 rounded bg-gray-200" />
          <div className="h-3 w-6 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
