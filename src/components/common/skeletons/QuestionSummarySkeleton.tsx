"use client";

import React from "react";

/**
 * 질문 요약 부분의 로딩 상태를 표시하는 스켈레톤 컴포넌트 (축소된 상태)
 */
export default function QuestionSummarySkeleton() {
  return (
    <div className="bg-white">
      <div className="animate-pulse px-5 py-4">
        {/* 태그 영역 (HOT, 과목, 현상금, 채택) */}
        <div className="mb-3 flex flex-wrap items-center gap-[4px]">
          {/* 태그들 스켈레톤 */}
          <div className="h-[26px] w-16 rounded-full bg-gray-200" />
          <div className="h-[26px] w-20 rounded-full bg-gray-200" />
        </div>

        {/* 제목 스켈레톤 */}
        {/* eslint-disable-next-line prettier/prettier */}
        <h2 className="mb-2 h-[18px] w-3/4 rounded bg-gray-200" aria-label="질문 제목 로딩">&nbsp;</h2>

        {/* 축소된 상태이므로 펼친 컨텐츠는 제외 */}

        {/* 확장/축소 버튼 */}
        <div className="mt-4 flex w-full items-center justify-center py-2">
          <div className="h-[20px] w-[20px] rounded-full bg-gray-200" />
        </div>

        {/* 구분선 */}
        <div className="-mx-5 mt-2 h-[4px] w-[calc(100%+40px)] bg-ui-divider-thick" />
      </div>
    </div>
  );
}
