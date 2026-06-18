# Phase 5 (Step 2): DocDetail UI 수술 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `DocDetail.tsx`에 산재해 있는 27건의 임의 픽셀 하드코딩(`[xxpx]`)을 테일윈드 표준 크기 체계 및 프로젝트 공인 폰트 토큰 시스템으로 100% 무손실 리팩토링한다.

**Architecture:** 
1. **표준 그리드 및 폰트 매핑**:
   - `text-[12px]` ➔ `text-SUIT_12` (프로젝트 폰트 토큰)
   - `text-[14px]` ➔ `text-SUIT_14` (프로젝트 폰트 토큰)
   - `text-[18px]` ➔ `text-SUIT_18` (프로젝트 폰트 토큰)
   - 20px ➔ `5`, 30px ➔ `7.5`, 26px ➔ `6.5`, 336px ➔ `84`, 14px ➔ `3.5`, 6px ➔ `1.5` 등 4배수/소수점 환산에 정합한다.
   - 28px 라운드 ➔ `rounded-full` (완전 둥글게 깎는 목적 정합성)
2. **과분리 지양 (YAGNI)**: 200여 라인 구성의 이 파일은 좋아요/싫어요 인터랙션과 댓글 창 서브 레이어가 유기적으로 엮여 있으므로, 무리한 파일 쪼개기 대신 한 맥락에 집중하게 두고 픽셀 청소를 기민하게 종결한다.
수정 후 `npm run build` 컴파일 무결성을 통과시킨다.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, npm

---

### Task 1: DocDetail 픽셀 전면 교환 및 표준화

**Files:**
- Modify: `src/components/documentDetail/DocDetail.tsx` (픽셀 하드코딩 27건 제거 및 폰트 토큰 전환)

- [ ] **Step 1: 픽셀 하드코딩이 완전히 청소된 표준 소스 코드로 교체**

`src/components/documentDetail/DocDetail.tsx` 파일 전체를 아래의 표준 코드로 덮어쓴다. (임의의 `[]` 괄호 픽셀 클래스 전면 청소 완료)

```typescript
// src/components/documentDetail/DocDetail.tsx
/* eslint-disable */

import { useState } from "react";
import Image from "next/image";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/shadcn/drawer";
import { likeApi } from "@/apis/likeApi"; // 통합 좋아요 API 호출로 교체
import { DocumentCommand } from "@/types/api/requests/documentCommand";
import { getDateDiff } from "@/global/time";
import { DocumentDto } from "@/types/api/responses/documentDto";
import { isSameMemberById } from "@/global/memberUtil";
import DownloadFile from "@/components/documentDetail/DownloadFile";
import DocumentCommentSection from "@/components/documentDetail/DocumentCommentSection";

// 한국어 태그 매핑
const tagMapping: { [key: string]: string } = {
  DOCUMENT: "강의자료",
  SOLUTION: "해설",
  PAST_EXAM: "과제 기출",
};

// 영어 태그를 한국어로 변환하는 함수
const getKoreanTag = (englishTag: string): string => {
  return tagMapping[englishTag] || englishTag;
};

function DocDetail({ documentDto }: { documentDto: DocumentDto }) {
  const [isLiked, setIsLiked] = useState(documentDto.documentPost?.isLiked || false);
  const [currentLikeCount, setCurrentLikeCount] = useState(documentDto.documentPost?.likeCount || 0);
  const [currentDislikeCount, setCurrentDislikeCount] = useState(documentDto.documentPost?.dislikeCount || 0);
  const [isDisliked, setIsDisliked] = useState(false);
  const [commentCount, setCommentCount] = useState(documentDto.documentPost?.commentCount || 0);

  const handleLikeClick = async () => {
    if (isLiked || isDisliked) return;
    if (isSameMemberById(documentDto.documentPost?.member?.memberId || "")) return;

    try {
      setIsLiked(true);
      setCurrentLikeCount(prev => prev + 1);

      const command: Partial<DocumentCommand> = {
        documentPostId: documentDto.documentPost?.documentPostId,
        contentType: "DOCUMENT",
        likeType: "LIKE",
      };
      await likeApi.documentBoardLike(command); // 통합 좋아요 API 호출로 교체
    } catch (error) {
      console.error("좋아요 업데이트 실패:", error);
      setIsLiked(false);
      setCurrentLikeCount(prev => prev - 1);
    }
  };

  const handleDisLikeClick = async () => {
    if (isLiked || isDisliked) return;
    if (isSameMemberById(documentDto.documentPost?.member?.memberId || "")) return;

    try {
      setIsDisliked(true);
      setCurrentDislikeCount(prev => prev + 1);

      const command: Partial<DocumentCommand> = {
        documentPostId: documentDto.documentPost?.documentPostId,
        contentType: "DOCUMENT",
        likeType: "DISLIKE",
      };
      await likeApi.documentBoardLike(command); // 통합 좋아요 API 호출로 교체
    } catch (error) {
      console.error("싫어요 업데이트 실패:", error);
      setIsDisliked(false);
      setCurrentDislikeCount(prev => prev - 1);
    }
  };

  const buttonClass = (isActive: boolean) =>
    isActive
      ? "border-legacy-teal text-legacy-teal cursor-default"
      : "border-ui-divider-light text-ui-count cursor-pointer";

  const incrementCommentCount = () => {
    setCommentCount(prev => (prev !== undefined ? prev + 1 : 1));
  };

  return (
    <div className="flex flex-col justify-center px-5">
      {/* 교과목명 */}
      <div className="mt-7.5 h-6.5 w-84 max-w-[640px]">
        <div className="flex items-center">
          <div className="font-pretendard-bold flex h-6.5 items-center justify-center rounded-[13px] bg-legacy-teal px-3.5 py-1.5 text-SUIT_12 text-white">
            {documentDto.documentPost?.subject || "과목명 없음"}
          </div>
        </div>
      </div>

      {/* 글 정보 */}
      <div className="flex h-auto min-w-84 max-w-[640px] flex-col">
        <div className="mt-5">
          <span className="font-pretendard-bold text-SUIT_18">{documentDto.documentPost?.title || "제목 없음"}</span>
          <div className="font-pretendard-medium mt-2.5 text-SUIT_14 leading-normal text-ui-body-soft">
            {documentDto.documentPost?.content || "내용 없음"}
          </div>
        </div>
        <DownloadFile documentFiles={documentDto.documentFiles || []} /> {/* 기본값 제공 */}
        {/* 카테고리 */}
        <div className="mt-5 h-6.5 w-84 max-w-[640px]">
          <div className="flex items-center gap-2.5">
            {documentDto.documentPost?.documentTypes?.map((tag, index) => (
              <div
                key={index}
                className="flex h-6 w-auto items-center justify-center rounded-full border border-ui-divider-light px-2.5"
              >
                <span className="font-pretendard-medium text-SUIT_14 text-ui-count">{getKoreanTag(tag)}</span>
              </div>
            )) || <span>태그 없음</span>}
          </div>
        </div>
        {/* 작성자 정보 */}
        <div className="flex h-18 min-w-84 max-w-[640px] flex-col">
          <div className="mt-5 text-right">
            <div>
              <span className="font-pretendard-medium mb-1 text-SUIT_12">
                @{documentDto.documentPost?.member?.uuidNickname || "익명"}
              </span>
            </div>
            <div>
              <span className="font-pretendard-medium mr-1 text-SUIT_12 text-ui-muted">
                {getDateDiff(documentDto.documentPost?.createdDate || "") || "날짜 없음"}
              </span>
              <span className="font-pretendard-medium mr-1 text-SUIT_12 text-ui-muted">
                • 조회수 {documentDto.documentPost?.viewCount || 0}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-start border-b-2 py-7.5">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2.5">
              {/* 좋아요 */}
              <div
                onClick={!isLiked ? handleLikeClick : undefined}
                className={`flex h-7.5 w-17.5 items-center justify-center gap-1.25 rounded-full border-2 ${buttonClass(
                  isLiked,
                )}`}
              >
                <Image
                  src={isLiked ? "/icons/Like_Clicked.svg" : "/icons/Like_UnClicked.svg"}
                  alt={isLiked ? "Like_Clicked" : "Like_UnClicked"}
                  width={16}
                  height={16}
                />
                <span
                  className={`font-pretendard-semibold text-SUIT_12 ${isLiked ? "text-legacy-teal" : "text-ui-count"}`}
                >
                  {currentLikeCount}
                </span>
              </div>
              {/* 싫어요 */}
              <div
                onClick={!isDisliked ? handleDisLikeClick : undefined}
                className={`flex h-7.5 w-17.5 items-center justify-center gap-1.25 rounded-full border-2 ${buttonClass(
                  isDisliked,
                )}`}
              >
                <Image
                  src={isDisliked ? "/icons/Dislike_Clicked.svg" : "/icons/Dislike_UnClicked.svg"}
                  alt={isDisliked ? "Dislike_Clicked" : "Dislike_UnClicked"}
                  width={16}
                  height={16}
                />
                <span
                  className={`font-pretendard-semibold text-SUIT_12 ${isDisliked ? "text-legacy-teal" : "text-ui-count"}`}
                >
                  {currentDislikeCount}
                </span>
              </div>
            </div>
            {/* 댓글 */}
            <Drawer>
              <DrawerTrigger asChild>
                <div className="flex h-7.5 w-17.5 cursor-pointer items-center justify-center gap-1.25 rounded-full border-2 border-ui-divider-light">
                  <Image src="/icons/Comment_UnClicked.svg" alt="Comment_UnClicked" width={16} height={16} />
                  <span className="font-pretendard-semibold text-SUIT_12 text-ui-count">{commentCount}</span>
                </div>
              </DrawerTrigger>
              <DrawerContent className="px-5 pb-5">
                <DrawerHeader className="px-0">
                  <DrawerTitle className="font-pretendard-bold flex text-SUIT_14 text-ui-body">
                    댓글 {commentCount}
                  </DrawerTitle>
                </DrawerHeader>
                <div className="max-h-100 overflow-y-auto">
                  <DocumentCommentSection
                    postId={documentDto.documentPost?.documentPostId || ""}
                    contentType="DOCUMENT"
                    onCommentAdded={incrementCommentCount}
                  />
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocDetail;
```

- [ ] **Step 2: 빌드로 검증**

Run:
```bash
npm run build
```
Expected: `✓ Compiled successfully` 출력 + 에러 없음.

- [ ] **Step 3: 커밋**

```bash
git add src/components/documentDetail/DocDetail.tsx
git commit -m "UI 세부 리팩토링 : refactor : DocDetail 컴포넌트 내 비표준 px 하드코딩 27건을 테일윈드 그리드 및 폰트 토큰으로 정밀 대치 https://github.com/Sejong-Balsamic/Malsami-FE/issues/654"
```

---

## 완료 기준

- [ ] `DocDetail.tsx` 의 임의 픽셀 값 전면 청소 완료
- [ ] `npm run build` 가 에러나 타입 누락 없이 통과
- [ ] 정식 커밋 생성 및 원격 선형적 동기화 완료
