"use client";

import React from "react";

/**
 * 댓글 목록의 로딩 상태를 표시하는 스켈레톤 컴포넌트
 */
export default function CommentListSkeleton() {
  return (
    <div className="bg-white">
      {/* 3개의 댓글 스켈레톤 아이템 고정 렌더링 */}
      {Array.from({ length: 3 }, (_, index) => (
        <div key={`comment-skeleton-${index}`}>
          <div className="animate-pulse px-5 py-4">
            {/* 헤더 */}
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center">
                {/* 사용자 정보 그룹 */}
                <div className="flex items-center gap-2">
                  {/* 작성자 태그 (랜덤으로 표시) */}
                  {index === 0 && (
                    <div className="inline-flex items-center justify-center rounded-[4px] bg-gray-200 px-[6px] py-[4px]">
                      <div className="h-[12px] w-[40px]" />
                    </div>
                  )}

                  {/* 사용자 @uuid + 작성일 */}
                  <div className="flex items-center gap-1">
                    <div className="h-[12px] w-[80px] rounded bg-gray-200" />
                    <span className="text-ui-muted">•</span>
                    <div className="h-[12px] w-[60px] rounded bg-gray-200" />
                  </div>
                </div>
              </div>

              {/* 더보기 버튼 */}
              <div className="flex items-center">
                <div className="h-[14px] w-[14px] rounded bg-gray-200" />
              </div>
            </div>

            {/* 내용 */}
            <div className="mb-3">
              <div className="space-y-2">
                <div className="h-[14px] w-full rounded bg-gray-200" />
                <div className="h-[14px] w-3/4 rounded bg-gray-200" />
              </div>
            </div>

            {/* 좋아요/싫어요 */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-[14px] w-[14px] rounded bg-gray-200" />
                <div className="h-[12px] w-[20px] rounded bg-gray-200" />
              </div>

              <div className="flex items-center gap-2">
                <div className="h-[14px] w-[14px] rounded bg-gray-200" />
                <div className="h-[12px] w-[20px] rounded bg-gray-200" />
              </div>
            </div>
          </div>
          
          {/* 마지막 아이템이 아니면 구분선 추가 */}
          {index < 2 && (
            <div className="mx-5">
              <div className="h-[1px] w-full bg-ui-divider" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
