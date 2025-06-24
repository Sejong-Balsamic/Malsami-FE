"use client";

import React from "react";
import Image from "next/image";

interface CommonPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

/**
 * 공통 페이지네이션 컴포넌트
 * 공지사항, 질문게시판, 문서게시판 등에서 공통 사용
 *
 * @param currentPage - 현재 페이지 번호 (0-based)
 * @param totalPages - 전체 페이지 수
 * @param onPageChange - 페이지 변경 콜백
 */
export default function CommonPagination({ currentPage, totalPages, onPageChange }: CommonPaginationProps) {
  // 1. 페이지 번호 배열 생성 함수 (개선된 로직)
  const generateVisiblePageNumbers = (): (number | string)[] => {
    const visiblePageNumbersArray: (number | string)[] = [];

    // 페이지가 0개인 경우 빈 배열 반환
    if (totalPages === 0) {
      return visiblePageNumbersArray;
    }

    // 페이지가 7개 이하면 모든 페이지 표시
    if (totalPages <= 7) {
      for (let pageIndex = 0; pageIndex < totalPages; pageIndex += 1) {
        visiblePageNumbersArray.push(pageIndex);
      }
      return visiblePageNumbersArray;
    }

    // 항상 첫 페이지 표시
    visiblePageNumbersArray.push(0);

    // 현재 페이지 기준으로 표시할 범위 결정
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages - 2, currentPage + 2);

    // 시작 부분 조정
    if (currentPage <= 3) {
      startPage = 1;
      endPage = Math.min(5, totalPages - 2);
    }

    // 끝 부분 조정
    if (currentPage >= totalPages - 4) {
      startPage = Math.max(1, totalPages - 6);
      endPage = totalPages - 2;
    }

    // 첫 페이지와 시작 페이지 사이에 gap이 있으면 ... 추가
    if (startPage > 1) {
      visiblePageNumbersArray.push("...");
    }

    // 중간 페이지들 추가
    for (let i = startPage; i <= endPage; i += 1) {
      if (i > 0 && i < totalPages - 1) {
        visiblePageNumbersArray.push(i);
      }
    }

    // 끝 페이지와 마지막 페이지 사이에 gap이 있으면 ... 추가
    if (endPage < totalPages - 2) {
      visiblePageNumbersArray.push("...");
    }

    // 항상 마지막 페이지 표시 (총 페이지가 1개보다 많을 때)
    if (totalPages > 1) {
      visiblePageNumbersArray.push(totalPages - 1);
    }

    return visiblePageNumbersArray;
  };

  // 2. 페이지 클릭 요청 핸들러
  const handlePageClickRequest = (requestedPageNumber: number) => {
    const isPageAlreadyActive = requestedPageNumber === currentPage;

    if (!isPageAlreadyActive && requestedPageNumber >= 0 && requestedPageNumber < totalPages) {
      onPageChange(requestedPageNumber);
    }
  };

  // 3. 이전/다음 페이지 핸들러
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  // 4. "..." 클릭 핸들러 (페이지 그룹 이동)
  const handleEllipsisClick = (direction: "forward" | "backward") => {
    if (direction === "forward") {
      // 다음 페이지 그룹으로 이동 (현재 페이지 + 5)
      const nextPage = Math.min(currentPage + 5, totalPages - 1);
      onPageChange(nextPage);
    } else {
      // 이전 페이지 그룹으로 이동 (현재 페이지 - 5)
      const prevPage = Math.max(currentPage - 5, 0);
      onPageChange(prevPage);
    }
  };

  // 5. 현재 화면에 표시할 페이지 번호 배열
  const visiblePageNumbers = generateVisiblePageNumbers();

  // 페이지가 1개 이하면 페이지네이션을 표시하지 않음
  if (totalPages <= 1) {
    return null;
  }

  // 6. 렌더링
  return (
    <div className="flex items-center justify-center gap-2">
      {/* 이전 페이지 버튼 */}
      <button
        type="button"
        onClick={handlePreviousPage}
        disabled={currentPage === 0}
        className={`flex h-8 w-8 items-center justify-center rounded transition-colors ${
          currentPage === 0 ? "cursor-not-allowed text-gray-300" : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <Image
          src="/icons/pagination/BackAble.svg"
          alt="이전"
          width={16}
          height={16}
          className={currentPage === 0 ? "opacity-30" : ""}
        />
      </button>

      {/* 페이지 번호들 */}
      <div className="flex items-center gap-[18px]">
        {visiblePageNumbers.map((currentPageElement, index) => {
          const isEllipsisElement = currentPageElement === "...";

          if (isEllipsisElement) {
            // ... 클릭 가능하게 만들기
            const isForwardEllipsis = index > visiblePageNumbers.length / 2;
            return (
              <button
                key={`ellipsis-${isForwardEllipsis ? "forward" : "backward"}-${currentPage}`}
                type="button"
                onClick={() => handleEllipsisClick(isForwardEllipsis ? "forward" : "backward")}
                className="cursor-pointer font-suit text-sm font-medium leading-normal text-[#737373] transition-colors hover:text-custom-blue-500"
                title={isForwardEllipsis ? "다음 페이지 그룹" : "이전 페이지 그룹"}
              >
                ...
              </button>
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
                className="font-suit text-sm font-medium leading-normal text-[#737373] transition-colors hover:text-custom-blue-500"
              >
                {displayPageNumber}
              </button>

              {/* 현재 페이지 표시용 밑줄 */}
              {isCurrentlyActivePage && <div className="mt-0.5 h-px w-[14px] rounded-[2px] bg-[#08E4BA]" />}
            </div>
          );
        })}
      </div>

      {/* 다음 페이지 버튼 */}
      <button
        type="button"
        onClick={handleNextPage}
        disabled={currentPage === totalPages - 1}
        className={`flex h-8 w-8 items-center justify-center rounded transition-colors ${
          currentPage === totalPages - 1 ? "cursor-not-allowed text-gray-300" : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <Image
          src="/icons/pagination/NextAble.svg"
          alt="다음"
          width={16}
          height={16}
          className={currentPage === totalPages - 1 ? "opacity-30" : ""}
        />
      </button>
    </div>
  );
}
