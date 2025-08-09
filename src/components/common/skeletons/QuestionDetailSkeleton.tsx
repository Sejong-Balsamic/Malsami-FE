"use client";

import React from "react";

/**
 * 질문 상세 페이지의 로딩 상태를 표시하는 스켈레톤 컴포넌트
 */
export default function QuestionDetailSkeleton() {
  return (
    <div className="animate-pulse">
      {/* 질문 헤더 부분 */}
      <div className="mb-6">
        {/* 태그 영역 (HOT, 과목, 현상금, 채택) */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <div className="h-[26px] w-16 rounded-full bg-gray-200" />
          <div className="h-[26px] w-20 rounded-full bg-gray-200" />
          <div className="h-[26px] w-24 rounded-full bg-gray-200" />
        </div>

        {/* 제목 스켈레톤 */}
        <div className="mb-4 h-[24px] w-full rounded bg-gray-200" />
        <div className="mb-6 h-[24px] w-3/4 rounded bg-gray-200" />

        {/* 작성자 정보 */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-[40px] w-[40px] rounded-full bg-gray-200" />
            <div>
              <div className="h-[16px] w-24 rounded bg-gray-200" />
              <div className="mt-1 h-[14px] w-16 rounded bg-gray-200" />
            </div>
          </div>
          <div className="h-[16px] w-20 rounded bg-gray-200" />
        </div>
      </div>

      {/* 질문 본문 */}
      <div className="mb-6 space-y-3">
        <div className="h-[16px] w-full rounded bg-gray-200" />
        <div className="h-[16px] w-full rounded bg-gray-200" />
        <div className="h-[16px] w-3/4 rounded bg-gray-200" />
        <div className="h-[16px] w-5/6 rounded bg-gray-200" />
        <div className="h-[16px] w-2/3 rounded bg-gray-200" />
      </div>

      {/* 첨부 이미지 영역 */}
      <div className="mb-6 h-[200px] w-full rounded bg-gray-200" />

      {/* 좋아요, 댓글 카운트 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-[24px] w-[60px] rounded bg-gray-200" />
          <div className="h-[24px] w-[60px] rounded bg-gray-200" />
        </div>
        <div className="h-[24px] w-[40px] rounded bg-gray-200" />
      </div>

      {/* 구분선 */}
      <div className="-mx-5 mt-4 h-[8px] w-[calc(100%+40px)] bg-gray-100" />

      {/* 답변 섹션 헤더 */}
      <div className="mt-6 flex items-center justify-between">
        <div className="h-[24px] w-[120px] rounded bg-gray-200" />
        <div className="h-[24px] w-[80px] rounded bg-gray-200" />
      </div>

      {/* 답변 리스트 */}
      <div className="mt-6 space-y-6">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={`answer-skeleton-${index}`} className="rounded-lg border border-gray-200 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-[40px] w-[40px] rounded-full bg-gray-200" />
                <div>
                  <div className="h-[16px] w-24 rounded bg-gray-200" />
                  <div className="mt-1 h-[14px] w-16 rounded bg-gray-200" />
                </div>
              </div>
              <div className="h-[16px] w-20 rounded bg-gray-200" />
            </div>
            <div className="space-y-2">
              <div className="h-[16px] w-full rounded bg-gray-200" />
              <div className="h-[16px] w-5/6 rounded bg-gray-200" />
              <div className="h-[16px] w-3/4 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
