/* eslint-disable */

//FIXME: 필터링 기능 구현 후 삭제. 샘플 테스트 페이지.
"use client";

import React, { useState } from "react";
import DocumentFilteringBottomSheet from "@/components/common/DocumentFilteringBottomSheet";
import QuestionFilteringBottomSheet from "@/components/common/QuestionFilteringBottomSheet";
import { useDispatch } from "react-redux";
import { setDocumentFilteringOpen, setQuestionFilteringOpen } from "@/global/store/bottomSheetSlice";
import { QuestionCommand } from "@/types/api/requests/questionCommand";
import { DocumentCommand } from "@/types/api/requests/documentCommand";
import { documentPostApi } from "@/apis/documentPostApi";
import { questionPostApi } from "@/apis/questionPostApi";

export default function BottomSheetTestPage() {
  const dispatch = useDispatch();

  // 페이지별 기본 파라미터들 (실제 페이지에서는 URL params, props 등으로 받아옴)
  const [documentPageParams] = useState({
    subject: "데이터구조", // 교과목명
    faculty: "컴퓨터공학과", // 단과대
    postTier: "YANGBAN", // 자료 등급
    pageNumber: 0,
    pageSize: 20,
  });

  const [questionPageParams] = useState({
    subject: "알고리즘", // 교과목명  
    faculty: "컴퓨터공학과", // 단과대
    pageNumber: 0,
    pageSize: 20,
  });

  // 자료게시판 필터링 확인 - 실제 API 호출
  const handleDocumentConfirm = async (filtering: Partial<DocumentCommand>) => {
    // BottomSheet에서 받은 필터링 조건 + 페이지 고유 파라미터들을 합쳐서 API 호출
    const fullApiParams: Partial<DocumentCommand> = {
      // 페이지 고유 파라미터들
      subject: documentPageParams.subject,
      faculty: documentPageParams.faculty,
      postTier: documentPageParams.postTier as any,
      pageNumber: documentPageParams.pageNumber,
      pageSize: documentPageParams.pageSize,
      
      // BottomSheet에서 선택한 필터링 조건들
      ...filtering,
    };

    console.log("🔵 자료게시판 API 호출 시작");
    console.log("📋 요청 파라미터:", fullApiParams);
    
    try {
      // 실제 API 호출: 필터링된 자료게시판 목록 조회
      const response = await documentPostApi.filteredDocumentPost(fullApiParams);
      
      console.log("✅ 자료게시판 API 응답 성공:");
      console.log("📄 응답 데이터:", response);
      
      // 성공 알림
      alert(`✅ 자료게시판 API 호출 성공!\n응답 데이터를 콘솔에서 확인하세요.`);
      
    } catch (error) {
      console.error("❌ 자료게시판 API 호출 실패:", error);
      alert(`❌ 자료게시판 API 호출 실패!\n에러: ${error}`);
    }
  };

  // 질문게시판 필터링 확인 - 실제 API 호출
  const handleQuestionConfirm = async (filtering: Partial<QuestionCommand>) => {
    // BottomSheet에서 받은 필터링 조건 + 페이지 고유 파라미터들을 합쳐서 API 호출
    const fullApiParams: Partial<QuestionCommand> = {
      // 페이지 고유 파라미터들
      subject: questionPageParams.subject,
      faculty: questionPageParams.faculty,
      pageNumber: questionPageParams.pageNumber,
      pageSize: questionPageParams.pageSize,
      
      // BottomSheet에서 선택한 필터링 조건들
      ...filtering,
    };

    console.log("🟢 질문게시판 API 호출 시작");
    console.log("📋 요청 파라미터:", fullApiParams);
    
    try {
      // 실제 API 호출: 필터링된 질문게시판 목록 조회
      const response = await questionPostApi.getFilteredQuestionPosts(fullApiParams);
      
      console.log("✅ 질문게시판 API 응답 성공:");
      console.log("📄 응답 데이터:", response);
      
      // 성공 알림
      alert(`✅ 질문게시판 API 호출 성공!\n응답 데이터를 콘솔에서 확인하세요.`);
      
    } catch (error) {
      console.error("❌ 질문게시판 API 호출 실패:", error);
      alert(`❌ 질문게시판 API 호출 실패!\n에러: ${error}`);
    }
  };

  const handleReset = () => {
    console.log("🔄 필터 초기화");
  };

  return (
    <div className="relative mx-auto min-h-screen w-full max-w-[640px] bg-background p-6">
      <h1 className="mb-8 text-3xl font-bold">BottomSheet 필터링 테스트</h1>

      {/* 현재 페이지 파라미터 표시 */}
      <div className="mb-6 space-y-4">
        <div className="rounded-lg bg-blue-50 p-4">
          <h3 className="mb-2 font-semibold text-blue-800">자료게시판 페이지 파라미터</h3>
          <pre className="text-sm text-blue-600">{JSON.stringify(documentPageParams, null, 2)}</pre>
        </div>
        
        <div className="rounded-lg bg-green-50 p-4">
          <h3 className="mb-2 font-semibold text-green-800">질문게시판 페이지 파라미터</h3>
          <pre className="text-sm text-green-600">{JSON.stringify(questionPageParams, null, 2)}</pre>
        </div>
      </div>

      {/* API 사용 안내 */}
      <div className="mb-6 rounded-lg bg-yellow-50 p-4">
        <h3 className="mb-2 font-semibold text-yellow-800">🚀 실제 API 호출</h3>
        <div className="text-sm text-yellow-700">
          <p>• <strong>자료게시판</strong>: <code>documentPostApi.filteredDocumentPost()</code></p>
          <p>• <strong>질문게시판</strong>: <code>questionPostApi.getFilteredQuestionPosts()</code></p>
          <p>• <strong>결과</strong>: 브라우저 콘솔(F12)에서 API 응답을 확인하세요!</p>
        </div>
      </div>

      {/* 필터링 테스트 */}
      <div className="mb-8 space-y-4">
        <h2 className="text-xl font-semibold">필터링 BottomSheet</h2>

        <div className="flex flex-wrap gap-4">
          {/* 자료게시판 필터링 */}
          <DocumentFilteringBottomSheet
            onReset={handleReset}
            onConfirm={handleDocumentConfirm}
            currentFiltering={{}}
            trigger={
              <button
                type="button"
                className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={() => dispatch(setDocumentFilteringOpen(true))}
              >
                📄 자료게시판 필터링
              </button>
            }
          />

          {/* 질문게시판 필터링 */}
          <QuestionFilteringBottomSheet
            onReset={handleReset}
            onConfirm={handleQuestionConfirm}
            currentFiltering={{}}
            trigger={
              <button
                type="button"
                className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                onClick={() => dispatch(setQuestionFilteringOpen(true))}
              >
                ❓ 질문게시판 필터링
              </button>
            }
          />
        </div>
      </div>

      {/* 설명 */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="mb-4 text-lg font-semibold">BottomSheet 구현 및 사용법</h3>
        
        <div className="space-y-4 text-sm text-gray-600">
          <div>
            <h4 className="mb-2 font-semibold text-gray-800">1. Redux 상태 관리</h4>
            <ul className="space-y-1 ml-4">
              <li>• <code>bottomSheetSlice.ts</code>에서 각 BottomSheet별 독립적인 상태 관리</li>
              <li>• <code>documentFilteringOpen</code>, <code>questionFilteringOpen</code>으로 분리</li>
              <li>• <code>useSelector</code>로 각각의 상태를 구독하여 충돌 방지</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-2 font-semibold text-gray-800">2. Props 정의 및 전달</h4>
            <ul className="space-y-1 ml-4">
              <li>• <code>onReset</code>: 필터 초기화 함수 (부모 컴포넌트에서 정의)</li>
              <li>• <code>onConfirm</code>: 필터 적용 시 API 호출 함수 (부모 컴포넌트에서 정의)</li>
              <li>• <code>currentFiltering</code>: 현재 적용된 필터 상태</li>
              <li>• <code>trigger</code>: BottomSheet를 여는 트리거 버튼</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-2 font-semibold text-gray-800">3. API 호출 흐름</h4>
            <ul className="space-y-1 ml-4">
              <li>• 사용자가 필터 선택 후 "확인" 버튼 클릭</li>
              <li>• <code>handleConfirm</code>에서 필터링 조건을 <code>onConfirm</code>으로 전달</li>
              <li>• 부모 컴포넌트의 <code>handleDocumentConfirm</code>/<code>handleQuestionConfirm</code>에서 실제 API 호출</li>
              <li>• API 응답을 콘솔에 출력하고 성공/실패 알림 표시</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-2 font-semibold text-gray-800">4. 컴포넌트 구조</h4>
            <ul className="space-y-1 ml-4">
              <li>• <code>DocumentFilteringBottomSheet</code>: 자료게시판 전용 필터 (정렬, 자료유형)</li>
              <li>• <code>QuestionFilteringBottomSheet</code>: 질문게시판 전용 필터 (정렬, 채택상태, 태그)</li>
              <li>• 각각 독립적인 로컬 상태로 필터 선택 관리</li>
              <li>• <code>FilteringTag</code>, <code>FilteringButton</code> 공통 컴포넌트 재사용</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
