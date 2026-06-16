/* eslint-disable */

//FIXME: 필터링 기능 구현 후 삭제. 샘플 테스트 페이지.
"use client";

import React, { useState } from "react";
import DocumentFilteringBottomSheet from "@/components/documentMain/DocumentFilteringBottomSheet";
import QuestionFilteringBottomSheet from "@/components/questionMain/QuestionFilteringBottomSheet";
import { useDispatch } from "react-redux";
import { setDocumentFilteringOpen, setQuestionFilteringOpen } from "@/global/store/bottomSheetSlice";
import { QuestionCommand } from "@/types/api/requests/questionCommand";
import { DocumentCommand } from "@/types/api/requests/documentCommand";
import { documentPostApi } from "@/apis/documentPostApi";
import { questionPostApi } from "@/apis/questionPostApi";

export default function BottomSheetTestPage() {
  const dispatch = useDispatch();

  // 자료게시판 테스트 섹션
  const DocumentFilteringSection = () => {
    const [loading, setLoading] = useState(false);

    // 테스트용 기본 파라미터들
    const subject = "데이터구조";
    const faculty = "컴퓨터공학과";
    const postTier = "YANGBAN" as const;
    const pageNumber = 0;
    const pageSize = 20;

    const handleConfirm = async (filtering: Partial<DocumentCommand>) => {
      setLoading(true);

      // 기본 파라미터 + 필터링 조건 합치기
      const apiParams: Partial<DocumentCommand> = {
        subject,
        faculty,
        postTier,
        pageNumber,
        pageSize,
        ...filtering,
      };

      console.log("자료게시판 API 호출:", apiParams);

      try {
        const response = await documentPostApi.filteredDocumentPost(apiParams);
        console.log("자료게시판 API 성공:", response);
      } catch (error) {
        console.error("자료게시판 API 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-6">
        <h2 className="mb-4 text-xl font-bold text-blue-800">📄 자료게시판 필터링</h2>

        {/* 현재 설정 */}
        <div className="mb-4 rounded bg-white p-4">
          <h3 className="mb-2 font-semibold">📋 테스트 설정</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              교과목: <span className="font-mono text-blue-600">{subject}</span>
            </div>
            <div>
              단과대: <span className="font-mono text-blue-600">{faculty}</span>
            </div>
            <div>
              등급: <span className="font-mono text-blue-600">{postTier}</span>
            </div>
            <div>
              페이지: <span className="font-mono text-blue-600">{pageNumber + 1}</span>
            </div>
          </div>
        </div>

        {/* 필터링 버튼 */}
        <DocumentFilteringBottomSheet
          onReset={() => console.log("자료게시판 필터 초기화")}
          onConfirm={handleConfirm}
          currentFiltering={{}}
          trigger={
            <button
              type="button"
              className="w-full rounded-lg bg-blue-500 px-4 py-3 font-semibold text-white hover:bg-blue-600 disabled:opacity-50"
              onClick={() => dispatch(setDocumentFilteringOpen(true))}
              disabled={loading}
            >
              {loading ? "⏳ API 호출 중..." : "🔍 자료게시판 필터링 테스트"}
            </button>
          }
        />
      </div>
    );
  };

  // ❓ 질문게시판 테스트 섹션
  const QuestionFilteringSection = () => {
    const [loading, setLoading] = useState(false);

    // 테스트용 기본 파라미터들
    const subject = "알고리즘";
    const faculty = "컴퓨터공학과";
    const pageNumber = 0;
    const pageSize = 20;

    const handleConfirm = async (filtering: Partial<QuestionCommand>) => {
      setLoading(true);

      // 기본 파라미터 + 필터링 조건 합치기
      const apiParams: Partial<QuestionCommand> = {
        subject,
        faculty,
        pageNumber,
        pageSize,
        ...filtering,
      };

      console.log("질문게시판 API 호출:", apiParams);

      try {
        const response = await questionPostApi.getFilteredQuestionPosts(apiParams);
        console.log("질문게시판 API 성공:", response);
      } catch (error) {
        console.error("질문게시판 API 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="rounded-lg border-2 border-green-200 bg-green-50 p-6">
        <h2 className="mb-4 text-xl font-bold text-green-800">❓ 질문게시판 필터링</h2>

        {/* 현재 설정 */}
        <div className="mb-4 rounded bg-white p-4">
          <h3 className="mb-2 font-semibold">📋 테스트 설정</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              교과목: <span className="font-mono text-green-600">{subject}</span>
            </div>
            <div>
              단과대: <span className="font-mono text-green-600">{faculty}</span>
            </div>
            <div>
              페이지: <span className="font-mono text-green-600">{pageNumber + 1}</span>
            </div>
            <div>
              크기: <span className="font-mono text-green-600">{pageSize}개</span>
            </div>
          </div>
        </div>

        {/* 필터링 버튼 */}
        <QuestionFilteringBottomSheet
          onReset={() => console.log("질문게시판 필터 초기화")}
          onConfirm={handleConfirm}
          currentFiltering={{}}
          trigger={
            <button
              type="button"
              className="w-full rounded-lg bg-green-500 px-4 py-3 font-semibold text-white hover:bg-green-600 disabled:opacity-50"
              onClick={() => dispatch(setQuestionFilteringOpen(true))}
              disabled={loading}
            >
              {loading ? "⏳ API 호출 중..." : "🔍 질문게시판 필터링 테스트"}
            </button>
          }
        />
      </div>
    );
  };

  return (
    <div className="relative mx-auto min-h-screen w-full max-w-[640px] bg-background p-6">
      {/* 헤더 */}
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">🧪 BottomSheet 필터링 테스트</h1>
        <p className="text-gray-600">필터링 후 콘솔(F12)에서 API 호출 결과를 확인하세요</p>
      </div>

      {/* 자료게시판 섹션 */}
      <div className="mb-8">
        <DocumentFilteringSection />
      </div>

      {/* 질문게시판 섹션 */}
      <div className="mb-8">
        <QuestionFilteringSection />
      </div>
    </div>
  );
}
