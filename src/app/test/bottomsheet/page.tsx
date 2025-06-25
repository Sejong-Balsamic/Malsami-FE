/* eslint-disable */

"use client";

import React from "react";
import BottomSheet from "@/components/common/BottomSheet";
import DocumentFilterContent from "@/components/common/filtering/DocumentFilterContent";
import QuestionFilterContent from "@/components/common/filtering/QuestionFilterContent";
import useDocumentFilter from "@/hooks/useDocumentFilter";
import useQuestionFilter from "@/hooks/useQuestionFilter";
import { useDispatch } from "react-redux";
import { setIsOpen } from "@/global/store/bottomSheetSlice";

export default function BottomSheetTestPage() {
  const dispatch = useDispatch();
  
  // 필터링 훅들
  const documentFilter = useDocumentFilter();
  const questionFilter = useQuestionFilter();

  return (
    <div className="relative mx-auto min-h-screen w-full max-w-[640px] bg-background">
        <h1 className="mb-8 text-3xl font-bold">BottomSheet 테스트 페이지</h1>

        {/* 필터링 상태 표시 */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">필터링 상태</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">자료게시판 필터:</h3>
              <p>정렬: {documentFilter.filters.sortType || "없음"}</p>
              <p>태그: {documentFilter.filters.customTags?.join(", ") || "없음"}</p>
            </div>
            <div>
              <h3 className="font-semibold">질문게시판 필터:</h3>
              <p>정렬: {questionFilter.filters.sortType || "없음"}</p>
              <p>태그: {questionFilter.filters.questionPresetTags?.join(", ") || "없음"}</p>
            </div>
          </div>
        </div>

        {/* 필터링 테스트 */}
        <div className="mb-8 space-y-4">
          <h2 className="text-xl font-semibold">필터링 테스트</h2>

          <div className="flex flex-wrap gap-4">
            {/* 자료게시판 필터링 */}
            <BottomSheet
              onReset={documentFilter.handleReset}
              onConfirm={documentFilter.handleConfirm}
              trigger={
                <button
                  type="button"
                  className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  onClick={() => dispatch(setIsOpen(true))}
                >
                  자료게시판 필터링
                </button>
              }
            >
              <DocumentFilterContent
                currentFilters={documentFilter.filters}
                onFilterChange={documentFilter.handleFilterChange}
              />
            </BottomSheet>

            {/* 질문게시판 필터링 */}
            <BottomSheet
              onReset={questionFilter.handleReset}
              onConfirm={questionFilter.handleConfirm}
              trigger={
                <button
                  type="button"
                  className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                  onClick={() => dispatch(setIsOpen(true))}
                >
                  질문게시판 필터링
                </button>
              }
            >
              <QuestionFilterContent
                currentFilters={questionFilter.filters}
                onFilterChange={questionFilter.handleFilterChange}
              />
            </BottomSheet>
          </div>
        </div>

        
    </div>
  );
}
