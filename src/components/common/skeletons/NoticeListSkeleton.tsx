import React from "react";

/**
 * 공지사항 리스트 스켈레톤 컴포넌트
 */
export default function NoticeListSkeleton() {
  return (
    <div className="pt-6">
      {Array.from({ length: 6 }, (_, index) => (
        <div key={`notice-skeleton-${index}`} className="w-full mb-4">
          <div className="animate-pulse">
            {/* 제목과 시간 */}
            <div className="flex items-start justify-between mb-1">
              {/* 제목 스켈레톤 */}
              <div className="h-5 bg-gray-200 rounded flex-1 mr-3" style={{ width: '272px' }} />
              {/* 시간 스켈레톤 */}
              <div className="h-5 w-16 bg-gray-200 rounded flex-shrink-0" />
            </div>

            {/* 본문 내용 스켈레톤 */}
            <div className="mb-1">
              <div className="h-5 bg-gray-200 rounded" style={{ width: '353px' }} />
            </div>

            {/* 좋아요 스켈레톤 */}
            <div className="flex items-center mb-4">
              <div className="flex items-center space-x-1.5">
                <div className="h-4 w-4 bg-gray-200 rounded" />
                <div className="h-4 w-6 bg-gray-200 rounded" />
              </div>
            </div>

            {/* 구분선 */}
            <div 
              className="bg-gray-200 rounded"
              style={{
                width: '361px',
                height: '2px'
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
} 