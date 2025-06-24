"use client";

import React from "react";

interface CommonPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

/**
 * 공통 페이지네이션 컴포넌트
 * 5개씩 그룹으로 표시하는 방식
 *
 * @param currentPage - 현재 페이지 번호 (0-based)
 * @param totalPages - 전체 페이지 수
 * @param onPageChange - 페이지 변경 콜백
 */
export default function CommonPagination({ currentPage, totalPages, onPageChange }: CommonPaginationProps) {
  // 페이지가 1개 이하면 페이지네이션을 표시하지 않음
  if (totalPages <= 1) {
    return null;
  }

  // 현재 페이지 그룹 계산 (0-based)
  const currentGroup = Math.floor(currentPage / 5);
  const totalGroups = Math.ceil(totalPages / 5);

  // 현재 그룹의 시작/끝 페이지
  const groupStartPage = currentGroup * 5;
  const groupEndPage = Math.min(groupStartPage + 4, totalPages - 1);

  // 현재 그룹에 표시할 페이지 번호들
  const visiblePages: number[] = [];
  for (let i = groupStartPage; i <= groupEndPage; i += 1) {
    visiblePages.push(i);
  }

  // 핸들러 함수들
  const handlePageClick = (pageNumber: number) => {
    if (pageNumber !== currentPage && pageNumber >= 0 && pageNumber < totalPages) {
      onPageChange(pageNumber);
    }
  };

  const handleFirstPage = () => {
    if (currentPage !== 0) {
      onPageChange(0);
    }
  };

  const handleLastPage = () => {
    if (currentPage !== totalPages - 1) {
      onPageChange(totalPages - 1);
    }
  };

  const handlePreviousGroup = () => {
    if (currentGroup > 0) {
      const prevGroupLastPage = currentGroup * 5 - 1;
      onPageChange(prevGroupLastPage);
    }
  };

  const handleNextGroup = () => {
    if (currentGroup < totalGroups - 1) {
      const nextGroupFirstPage = (currentGroup + 1) * 5;
      onPageChange(Math.min(nextGroupFirstPage, totalPages - 1));
    }
  };

  return (
    <div className="flex items-center justify-center gap-1">
      {/* 맨 처음으로 버튼 */}
      <button
        type="button"
        onClick={handleFirstPage}
        disabled={currentPage === 0}
        className={`flex h-6 w-6 items-center justify-center rounded text-xs transition-colors ${
          currentPage === 0 ? "cursor-not-allowed text-gray-300" : "text-gray-600 hover:bg-gray-100"
        }`}
        title="첫 페이지"
      >
        &lt;&lt;
      </button>

      {/* 이전 그룹 버튼 */}
      <button
        type="button"
        onClick={handlePreviousGroup}
        disabled={currentGroup === 0}
        className={`flex h-6 w-6 items-center justify-center rounded text-xs transition-colors ${
          currentGroup === 0 ? "cursor-not-allowed text-gray-300" : "text-gray-600 hover:bg-gray-100"
        }`}
        title="이전 그룹"
      >
        &lt;
      </button>

      {/* 페이지 번호들 */}
      <div className="flex items-center gap-3 px-2">
        {visiblePages.map(pageNumber => {
          const isCurrentPage = pageNumber === currentPage;
          const displayPageNumber = pageNumber + 1; // 사용자에게는 1-based로 표시

          return (
            <div key={pageNumber} className="flex flex-col items-center">
              {/* 페이지 번호 버튼 */}
              <button
                type="button"
                onClick={() => handlePageClick(pageNumber)}
                className="font-suit text-sm font-medium leading-normal text-[#737373] transition-colors hover:text-custom-blue-500"
              >
                {displayPageNumber}
              </button>

              {/* 현재 페이지 표시용 밑줄 */}
              {isCurrentPage && <div className="mt-0.5 h-px w-[14px] rounded-[2px] bg-[#08E4BA]" />}
            </div>
          );
        })}
      </div>

      {/* 다음 그룹 버튼 */}
      <button
        type="button"
        onClick={handleNextGroup}
        disabled={currentGroup === totalGroups - 1}
        className={`flex h-6 w-6 items-center justify-center rounded text-xs transition-colors ${
          currentGroup === totalGroups - 1 ? "cursor-not-allowed text-gray-300" : "text-gray-600 hover:bg-gray-100"
        }`}
        title="다음 그룹"
      >
        &gt;
      </button>

      {/* 맨 끝으로 버튼 */}
      <button
        type="button"
        onClick={handleLastPage}
        disabled={currentPage === totalPages - 1}
        className={`flex h-6 w-6 items-center justify-center rounded text-xs transition-colors ${
          currentPage === totalPages - 1 ? "cursor-not-allowed text-gray-300" : "text-gray-600 hover:bg-gray-100"
        }`}
        title="마지막 페이지"
      >
        &gt;&gt;
      </button>
    </div>
  );
}
