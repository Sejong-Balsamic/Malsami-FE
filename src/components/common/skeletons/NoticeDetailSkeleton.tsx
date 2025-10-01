"use client";

import React from "react";

/**
 * 공지사항 상세 페이지의 로딩 상태를 표시하는 스켈레톤 컴포넌트
 */
export default function NoticeDetailSkeleton() {
  return (
    <div className="animate-pulse">
      {/* 헤더 아래 16px */}
      <div className="px-5 pt-4">
        {/* 제목 스켈레톤 - 18px 높이 */}
        <div className="mb-2 h-6 w-full rounded bg-gray-200" />
        <div className="mb-2 h-6 w-3/4 rounded bg-gray-200" />

        {/* 제목 아래 8px - 운영자 · 조회수 */}
        <div className="flex items-center gap-2 pt-2">
          <div className="h-3 w-12 rounded bg-gray-200" />
          <div className="h-3 w-2 rounded bg-gray-200" />
          <div className="h-3 w-16 rounded bg-gray-200" />
        </div>

        {/* 본문 스켈레톤 (메타정보 아래 16px) */}
        <div className="space-y-2 pt-4">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-5/6 rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-3/4 rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-4/5 rounded bg-gray-200" />
        </div>

        {/* 얇은 구분선 (본문 아래 20px) */}
        <hr className="mt-5 h-px w-full rounded-sm bg-gray-200" />

        {/* 좋아요 버튼 스켈레톤 */}
        <div className="mb-3 mt-3 flex justify-center">
          <div className="h-6 w-16 rounded bg-gray-200" />
        </div>
      </div>

      {/* 두꺼운 구분선 (전체 너비, 패딩 바깥쪽) */}
      <div className="border-t-8 border-gray-100" />

      {/* 댓글 작성 불가 메시지 스켈레톤 - 남은 공간의 정중앙에 배치 */}
      <div className="flex min-h-[300px] w-full flex-1 items-center justify-center">
        <div className="h-3 w-40 rounded bg-gray-200" />
      </div>
    </div>
  );
}
