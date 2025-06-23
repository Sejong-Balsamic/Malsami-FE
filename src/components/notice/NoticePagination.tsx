"use client";

import React from "react";

interface NoticePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

/**
 * 공지사항 페이지네이션 컴포넌트
 *
 * @param currentPage - 현재 페이지 번호 (0-based)
 * @param totalPages - 전체 페이지 수
 * @param onPageChange - 페이지 변경 콜백
 */
export default function NoticePagination({ currentPage, totalPages, onPageChange }: NoticePaginationProps) {
  // 1. 페이지 번호 배열 생성 함수
  const generateVisiblePageNumbers = (): (number | string)[] => {
    const visiblePageNumbersArray: (number | string)[] = [];

    // 페이지가 0개인 경우 빈 배열 반환
    if (totalPages === 0) {
      return visiblePageNumbersArray;
    }

    // 페이지가 1개라도 표시
    if (totalPages <= 7) {
      // 총 페이지가 7개 이하면 모든 페이지 표시
      for (let pageIndex = 0; pageIndex < totalPages; pageIndex += 1) {
        visiblePageNumbersArray.push(pageIndex);
      }
    } else {
      // 복잡한 페이지네이션 로직
      const isCurrentPageNearStart = currentPage <= 2;
      const isCurrentPageNearEnd = currentPage >= totalPages - 3;

      if (isCurrentPageNearStart) {
        // 현재 페이지가 앞쪽에 있을 때: 1 2 3 ... 15
        visiblePageNumbersArray.push(0, 1, 2, "...", totalPages - 1);
      } else if (isCurrentPageNearEnd) {
        // 현재 페이지가 뒤쪽에 있을 때: 1 ... 13 14 15
        visiblePageNumbersArray.push(0, "...", totalPages - 3, totalPages - 2, totalPages - 1);
      } else {
        // 현재 페이지가 중간에 있을 때: 1 ... 5 6 7 ... 15
        visiblePageNumbersArray.push(0, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages - 1);
      }
    }

    return visiblePageNumbersArray;
  };

  // 2. 페이지 클릭 요청 핸들러
  const handlePageClickRequest = (requestedPageNumber: number) => {
    const isPageAlreadyActive = requestedPageNumber === currentPage;

    if (!isPageAlreadyActive) {
      onPageChange(requestedPageNumber);
    }
  };

  // 3. 현재 화면에 표시할 페이지 번호 배열
  const visiblePageNumbers = generateVisiblePageNumbers();

  // 4. 렌더링
  return (
    <div className="flex items-center justify-center gap-[18px]">
      {visiblePageNumbers.map(currentPageElement => {
        const isEllipsisElement = currentPageElement === "...";

        if (isEllipsisElement) {
          return (
            <span
              key={`ellipsis-${Math.random()}`}
              className="font-suit text-sm font-medium leading-normal text-[#737373]"
            >
              ...
            </span>
          );
        }

        const actualPageNumber = currentPageElement as number;
        const isCurrentlyActivePage = actualPageNumber === currentPage;
        const displayPageNumber = actualPageNumber + 1; // 사용자에게는 1-based로 표시

        return (
          <div key={actualPageNumber} className="flex flex-col items-center">
            {/* 페이지 번호 버튼 */}
            <button
              type="button"
              onClick={() => handlePageClickRequest(actualPageNumber)}
              className="font-suit text-sm font-medium leading-normal text-[#737373] transition-opacity hover:opacity-70"
            >
              {displayPageNumber}
            </button>

            {/* 현재 페이지 표시용 밑줄 */}
            {isCurrentlyActivePage && <div className="mt-0.5 h-px w-[14px] rounded-[2px] bg-[#08E4BA]" />}
          </div>
        );
      })}
    </div>
  );
}
