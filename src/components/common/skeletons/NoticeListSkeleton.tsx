import React from "react";

/**
 * 공지사항 리스트 스켈레톤 컴포넌트
 */
export default function NoticeListSkeleton() {
  return (
    <div className="pt-6">
      {Array.from({ length: 6 }, (_, index) => (
        <div key={`notice-skeleton-${index}`} className="mb-4 w-full">
          <div className="animate-pulse">
            {/* 제목과 시간 */}
            <div className="mb-1 flex items-start justify-between">
              {/* 제목 스켈레톤 */}
              <div className="mr-3 h-5 flex-1 rounded bg-gray-200" />
              {/* 시간 스켈레톤 */}
              <div className="h-5 w-16 flex-shrink-0 rounded bg-gray-200" />
            </div>

            {/* 본문 내용 스켈레톤 */}
            <div className="mb-1">
              <div className="h-5 w-full rounded bg-gray-200" />
            </div>

            {/* 좋아요 스켈레톤 */}
            <div className="mb-4 flex items-center">
              <div className="flex items-center space-x-1.5">
                <div className="h-4 w-4 rounded bg-gray-200" />
                <div className="h-4 w-6 rounded bg-gray-200" />
              </div>
            </div>

            {/* 구분선 */}
            <div className="h-0.5 w-full rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
