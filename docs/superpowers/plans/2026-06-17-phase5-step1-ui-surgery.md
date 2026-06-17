# Phase 5 (Step 1): QuestionDetailSkeleton UI 수술 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `QuestionDetailSkeleton.tsx`에 무질서하게 포함되어 있던 28건의 픽셀 임의 지정 하드코딩(`h-[xxpx]`, `w-[xxpx]`)을 테일윈드 표준 크기 단위(4의 배수 배정 체계)로 100% 무손실 전환한다.

**Architecture:** 
1. **표준 그리드 매핑**: 40px ➔ `h-10`, 80px ➔ `w-20`, 120px ➔ `w-30`, 200px ➔ `h-50`, 8px ➔ `h-2` 등 테일윈드의 `1단위 = 4px` 공식에 정합 정렬한다.
2. **Surgical Precision 교환**: 뼈대 컴포넌트 내부에서 하드코딩되어 빌드 무결성을 해치던 픽셀들을 완벽히 토큰 표준으로 대치한다.
수정 후 `npm run build` 컴파일 무결성을 통과시킨다.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, npm

---

### Task 1: QuestionDetailSkeleton 픽셀 전면 교환 및 표준화

**Files:**
- Modify: `src/components/common/skeletons/QuestionDetailSkeleton.tsx` (픽셀 하드코딩 28건 제거)

- [ ] **Step 1: 픽셀 하드코딩이 정갈하게 정리된 표준 소스 코드로 교체**

`src/components/common/skeletons/QuestionDetailSkeleton.tsx` 파일 전체를 아래의 표준 코드로 덮어쓴다. (임의의 `[]` 괄호 픽셀 클래스 전면 청소 완료)

```typescript
// src/components/common/skeletons/QuestionDetailSkeleton.tsx
"use client";

import React from "react";

/**
 * 질문 상세 페이지의 로딩 상태를 표시하는 스켈레톤 컴포넌트
 */
export default function QuestionDetailSkeleton() {
  return (
    <div className="animate-pulse">
      {/* 질문 헤더 부분 */}
      <div className="mb-6">
        {/* 태그 영역 (HOT, 과목, 현상금, 채택) */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <div className="h-6 w-16 rounded-full bg-gray-200" />
          <div className="h-6 w-20 rounded-full bg-gray-200" />
          <div className="h-6 w-24 rounded-full bg-gray-200" />
        </div>

        {/* 제목 스켈레톤 */}
        <div className="mb-4 h-6 w-full rounded bg-gray-200" />
        <div className="mb-6 h-6 w-3/4 rounded bg-gray-200" />

        {/* 작성자 정보 */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gray-200" />
            <div>
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="mt-1 h-3.5 w-16 rounded bg-gray-200" />
            </div>
          </div>
          <div className="h-4 w-20 rounded bg-gray-200" />
        </div>
      </div>

      {/* 질문 본문 */}
      <div className="mb-6 space-y-3">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-3/4 rounded bg-gray-200" />
        <div className="h-4 w-5/6 rounded bg-gray-200" />
        <div className="h-4 w-2/3 rounded bg-gray-200" />
      </div>

      {/* 첨부 이미지 영역 */}
      <div className="mb-6 h-50 w-full rounded bg-gray-200" />

      {/* 좋아요, 댓글 카운트 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-6 w-15 rounded bg-gray-200" />
          <div className="h-6 w-15 rounded bg-gray-200" />
        </div>
        <div className="h-6 w-10 rounded bg-gray-200" />
      </div>

      {/* 구분선 - calc는 부모 패딩 영역(-mx-5) 보정을 위한 정당한 동적 계산용 유지 */}
      <div className="-mx-5 mt-4 h-2 w-[calc(100%+40px)] bg-gray-100" />

      {/* 답변 섹션 헤더 */}
      <div className="mt-6 flex items-center justify-between">
        <div className="h-6 w-30 rounded bg-gray-200" />
        <div className="h-6 w-20 rounded bg-gray-200" />
      </div>

      {/* 답변 리스트 */}
      <div className="mt-6 space-y-6">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={`answer-skeleton-${index}`} className="rounded-lg border border-gray-200 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-gray-200" />
                <div>
                  <div className="h-4 w-24 rounded bg-gray-200" />
                  <div className="mt-1 h-3.5 w-16 rounded bg-gray-200" />
                </div>
              </div>
              <div className="h-4 w-20 rounded bg-gray-200" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-5/6 rounded bg-gray-200" />
              <div className="h-4 w-3/4 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 빌드로 검증**

Run:
```bash
npm run build
```
Expected: `✓ Compiled successfully` 출력 + 에러 없음.

- [ ] **Step 3: 커밋**

```bash
git add src/components/common/skeletons/QuestionDetailSkeleton.tsx
git commit -m "스킬레톤 UI 표준화 : refactor : QuestionDetailSkeleton의 비표준 px 하드코딩 28건을 테일윈드 공식 그리드로 전면 교환 https://github.com/Sejong-Balsamic/Malsami-FE/issues/654"
```

---

## 완료 기준

- [ ] `QuestionDetailSkeleton.tsx` 의 무질서한 픽셀 임의 지정 전면 청소 완료
- [ ] `npm run build` 가 에러나 타입 누락 없이 통과
- [ ] 정식 커밋 생성 및 원격 선형적 동기화 완료
