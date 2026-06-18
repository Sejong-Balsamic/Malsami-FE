# Phase 1: API 레이어 표준화 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `authApi`를 표준 `postApiRequest` 패턴으로 정렬하고, 중복 정의된 API(좋아요·답변)를 단일화하며 컴포넌트 내 `axios` 직접 import 의존성을 끊는다.

**Architecture:** API 레이어의 표준화 작업이므로, 호출 패턴과 토큰 처리 책임을 명확히 이관하여 결합도를 낮춘다. 이 프로젝트는 테스트 프레임워크가 없어 `npm run build`로 빌드 및 타입의 무결성을 검증한다. 각 Task는 독립적으로 빌드를 통과하고 커밋한다.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Axios, Redux Toolkit, npm

---

### Task 1: authApi.ts 표준화 및 토큰/FCM 책임 이관

**Files:**
- Modify: `src/apis/authApi.ts` (postApiRequest 기반 전면 표준화)
- Modify: `src/components/login/LoginForm.tsx` (로그인 성공 시 세션스토리지 저장 책임 이관)
- Modify: `src/global/hook/useLogout.ts` (로그아웃 시 세션스토리지 제거 책임 이관)
- Modify: `src/components/mypage/Facility.tsx` (로그아웃 시 세션스토리지 제거 책임 이관)
- Modify: `src/global/sendFcmToken.ts` (직접 apiClient.post 제거 후 authApi.saveFcmToken 호출로 단일화)

- [ ] **Step 1: `authApi.ts` 코드를 완전히 표준화된 내용으로 교체**

`src/apis/authApi.ts` 전체를 아래 내용으로 교체한다. (수동 `FormData` 루프와 `apiClient` 직접 사용 제거)

```typescript
// src/apis/authApi.ts
import { AuthDto } from "@/types/api/responses/authDto";
import { AuthCommand } from "@/types/api/requests/authCommand";
import { postApiRequest } from "./apiUtils";

export const authApi = {
  // 로그인 (웹용)
  signIn: async (command: Partial<AuthCommand>): Promise<AuthDto> =>
    postApiRequest<AuthCommand, AuthDto>("/api/auth/signin", command),

  // 모바일용 로그인
  signInForMobile: async (command: Partial<AuthCommand>): Promise<AuthDto> =>
    postApiRequest<AuthCommand, AuthDto>("/api/auth/mobile/signin", command),

  // 토큰 갱신
  refresh: async (): Promise<AuthDto> =>
    postApiRequest<AuthCommand, AuthDto>("/api/auth/refresh", {}),

  // 모바일용 토큰 갱신
  refreshForMobile: async (command: Partial<AuthCommand>): Promise<AuthDto> =>
    postApiRequest<AuthCommand, AuthDto>("/api/auth/mobile/refresh", command),

  // 로그아웃
  logout: async (command: Partial<AuthCommand>): Promise<void> =>
    postApiRequest<AuthCommand, void>("/api/auth/logout", command),

  // FCM 토큰 저장
  saveFcmToken: async (command: Partial<AuthCommand>): Promise<AuthDto> =>
    postApiRequest<AuthCommand, AuthDto>("/api/auth/fcm/token", command),
};

export default authApi;
```

- [ ] **Step 2: `LoginForm.tsx` 에서 로그인 성공 후 세션스토리지에 accessToken 저장 보강**

`src/components/login/LoginForm.tsx:70-80` 부근에 `sessionStorage.setItem("accessToken", ...)`을 삽입한다.

```typescript
<<<<
      const getUserInfo = await authApi.signIn(command);

      if (getUserInfo.accessToken && getUserInfo.studentName && getUserInfo.memberId) {
        // 로그인 성공 시에만 로딩 오버레이 표시
        onShowLoading?.();

        setUserName(getUserInfo.studentName || "");
====
      const getUserInfo = await authApi.signIn(command);

      if (getUserInfo.accessToken && getUserInfo.studentName && getUserInfo.memberId) {
        // 세션스토리지에 액세스 토큰 명시적 저장 (authApi 이관에 따른 조치)
        sessionStorage.setItem("accessToken", getUserInfo.accessToken);

        // 로그인 성공 시에만 로딩 오버레이 표시
        onShowLoading?.();

        setUserName(getUserInfo.studentName || "");
>>>>
```

- [ ] **Step 3: `useLogout.ts` 에서 로그아웃 성공 후 세션스토리지 accessToken 제거 보강**

`src/global/hook/useLogout.ts:10-15` 부근에 `sessionStorage.removeItem("accessToken")`을 삽입한다.

```typescript
<<<<
  const handleLogout = async () => {
    try {
      await authApi.logout({}); // 기존 로그아웃 함수 호출
      showConfirmToast("로그아웃 되었습니다.");
      setTimeout(() => {
====
  const handleLogout = async () => {
    try {
      await authApi.logout({}); // 기존 로그아웃 함수 호출
      sessionStorage.removeItem("accessToken"); // 명시적 토큰 정리
      showConfirmToast("로그아웃 되었습니다.");
      setTimeout(() => {
>>>>
```

- [ ] **Step 4: `Facility.tsx` 에서 로그아웃 성공 후 세션스토리지 accessToken 제거 보강**

`src/components/mypage/Facility.tsx:24-30` 부근에 `sessionStorage.removeItem("accessToken")`을 삽입한다.

```typescript
<<<<
  const handleLogout = async () => {
    try {
      await authApi.logout({ fcmToken: fcmToken || "" });
      sessionStorage.removeItem("memberId");
      dispatch(logoutAction());
====
  const handleLogout = async () => {
    try {
      await authApi.logout({ fcmToken: fcmToken || "" });
      sessionStorage.removeItem("memberId");
      sessionStorage.removeItem("accessToken"); // 명시적 토큰 정리
      dispatch(logoutAction());
>>>>
```

- [ ] **Step 5: `sendFcmToken.ts`를 `authApi.saveFcmToken` 호출 방식으로 변경**

`src/global/sendFcmToken.ts` 의 파일 전체를 아래 코드로 교체한다. (직접적인 `apiClient.post` 호출 제거)

```typescript
import { authApi } from "@/apis/authApi";

interface FcmResponse {
  fcmToken: string;
}

async function sendFcmTokenToServer(fcmToken: string): Promise<FcmResponse | null> {
  try {
    console.log("전달받은 FCM 토큰:", fcmToken); // 전달된 FCM 토큰 확인

    // 표준 API 호출로 전환
    const response = await authApi.saveFcmToken({ fcmToken });

    console.log("FCM 토큰 서버로 전송 성공:", response);
    return response as unknown as FcmResponse; // 타입 얼라인
  } catch (error) {
    console.error("FCM 토큰 서버 전송 실패:", error);
    return null; // 실패 시 null 반환
  }
}

export default sendFcmTokenToServer;
```

- [ ] **Step 6: 빌드로 검증**

Run:
```bash
npm run build
```
Expected: `✓ Compiled successfully` 출력 + 에러 없음.

- [ ] **Step 7: 커밋**

```bash
git add src/apis/authApi.ts src/components/login/LoginForm.tsx src/global/hook/useLogout.ts src/components/mypage/Facility.tsx src/global/sendFcmToken.ts
git commit -m "authApi 표준화 및 세션 위임 : refactor : authApi를 postApiRequest 기반으로 전환하고 세션스토리지 관리 책임을 컴포넌트 및 로그아웃 유틸로 이관 https://github.com/Sejong-Balsamic/Malsami-FE/issues/654"
```

---

### Task 2: API 중복 정의 단일화 및 question/documentPostApi 리팩토링

**Files:**
- Modify: `src/apis/questionPostApi.ts` (중복 함수 4개 삭제)
- Modify: `src/apis/documentPostApi.ts` (중복 함수 1개 삭제)
- Modify: `src/components/documentDetail/DocDetail.tsx` (좋아요 API 호출처 교체)

- [ ] **Step 1: `questionPostApi.ts` 에서 중복 정의된 4개 함수 삭제**

`src/apis/questionPostApi.ts` 에서 `questionBoardLike`, `saveAnswerPost`, `getAnswersByQuestion`, `chaetaekAnswerPost` 함수 전체를 제거한다. 
수정 후 최종 코드는 다음과 같아야 한다:

```typescript
/* eslint-disable import/prefer-default-export */
import { QuestionCommand } from "@/types/api/requests/questionCommand";
import { QuestionDto } from "@/types/api/responses/questionDto";
import { postApiRequest } from "./apiUtils";

export const questionPostApi = {
  /* ────────────── 글 쓰기/조회 ────────────── */
  saveQuestionPost: (c: Partial<QuestionCommand>) =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/question/post", c),

  getQuestionPost: (c: Partial<QuestionCommand>) =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/question/get", c),

  /* ────────────── 목록 / 필터 ────────────── */
  getAllQuestionPostsNotAnswered: (c: Partial<QuestionCommand>) =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/question/unanswered", c),

  /** _모든 "전공별·검색·정렬" 리스트 → filter 하나로 통합_ */
  getFilteredQuestionPosts: (c: Partial<QuestionCommand>) =>
    postApiRequest<QuestionCommand, QuestionDto>("/api/question/filter", c),

  /* ────────────── HOT 인기 질문 ────────────── */
  getDailyPopularQuestionPost: () => postApiRequest<QuestionCommand, QuestionDto>("/api/question/popular/daily", {}),

  getWeeklyPopularQuestionPost: () => postApiRequest<QuestionCommand, QuestionDto>("/api/question/popular/weekly", {}),
};
```

- [ ] **Step 2: `documentPostApi.ts` 에서 중복 정의된 좋아요 함수 삭제**

`src/apis/documentPostApi.ts` 에서 `documentBoardLike` 함수를 제거한다.
수정 후 최종 코드는 다음과 같아야 한다:

```typescript
import { DocumentCommand } from "@/types/api/requests/documentCommand";
import { DocumentDto } from "@/types/api/responses/documentDto";
import { postApiRequest } from "./apiUtils";

export const documentPostApi = {
  /* 글 쓰기/조회 */
  saveDocumentPost: (c: Partial<DocumentCommand>) =>
    postApiRequest<DocumentCommand, DocumentDto>("/api/document/post", c),

  getDocumentPost: (c: Partial<DocumentCommand>) =>
    postApiRequest<DocumentCommand, DocumentDto>("/api/document/get", c),

  /* 필터 리스트  */
  filteredDocumentPost: (c: Partial<DocumentCommand>) =>
    postApiRequest<DocumentCommand, DocumentDto>("/api/document/filter", c),

  /* HOT 인기 자료 */
  getDailyPopularDocumentPost: () => postApiRequest<DocumentCommand, DocumentDto>("/api/document/popular/daily", {}),

  getWeeklyPopularDocumentPost: () => postApiRequest<DocumentCommand, DocumentDto>("/api/document/popular/weekly", {}),

  /* HOT 다운로드 */
  getHotDownload: (c: Partial<DocumentCommand>) =>
    postApiRequest<DocumentCommand, DocumentDto>("/api/document/hot-download", c),

  /* 파일 다운로드 */
  downloadDocumentFile: (c: Partial<DocumentCommand>) =>
    postApiRequest<DocumentCommand, any>("/api/document/file/download", c),
};

export default documentPostApi;
```

- [ ] **Step 3: `DocDetail.tsx` 의 좋아요 API 호출부를 `likeApi` 로 교체**

`src/components/documentDetail/DocDetail.tsx:6` 부근에서 `documentPostApi` 임포트를 `likeApi` 임포트로 변경하고, 좋아요 호출처 두 곳을 변경한다.

```typescript
<<<<
import { documentPostApi } from "@/apis/documentPostApi"; // API 호출로 변경
====
import { likeApi } from "@/apis/likeApi"; // 통합 좋아요 API 호출로 교체
>>>>
```

`DocDetail.tsx:45` 부근:
```typescript
<<<<
      // API 호출
      await documentPostApi.documentBoardLike(command); // API 호출
    } catch (error) {
====
      // API 호출
      await likeApi.documentBoardLike(command); // 통합 좋아요 API 호출로 교체
    } catch (error) {
>>>>
```

`DocDetail.tsx:65` 부근:
```typescript
<<<<
      // API 호출
      await documentPostApi.documentBoardLike(command); // API 호출
    } catch (error) {
====
      // API 호출
      await likeApi.documentBoardLike(command); // 통합 좋아요 API 호출로 교체
    } catch (error) {
>>>>
```

- [ ] **Step 4: 빌드로 검증**

Run:
```bash
npm run build
```
Expected: `✓ Compiled successfully` 출력 + 에러 없음.

- [ ] **Step 5: 커밋**

```bash
git add src/apis/questionPostApi.ts src/apis/documentPostApi.ts src/components/documentDetail/DocDetail.tsx
git commit -m "API 중복 정의 단일화 : refactor : 좋아요 및 답변 API 통합 관리를 위해 중복 정의 제거 및 DocDetail 호출처 교체 https://github.com/Sejong-Balsamic/Malsami-FE/issues/654"
```

---

### Task 3: axios 직접 import 의존성 제거 및 에러 유틸 도입

**Files:**
- Modify: `src/apis/apiUtils.ts` (isApiError 헬퍼 export 추가)
- Modify: `src/app/board/document/detail/[id]/page.tsx` (isApiError 적용)
- Modify: `src/app/board/question/detail/[id]/answer/page.tsx` (isApiError 적용)
- Modify: `src/app/notice/[id]/page.tsx` (isApiError 적용)

- [ ] **Step 1: `apiUtils.ts` 에 `isApiError` 헬퍼 함수 추가**

`src/apis/apiUtils.ts` 하단에 `axios.isAxiosError` 래퍼 함수를 추가하고 export 한다.

```typescript
<<<<
    const response = await apiClient.post<R>(url, formData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error; // console.error 제거
  }
}
====
    const response = await apiClient.post<R>(url, formData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error; // console.error 제거
  }
}

// axios.isAxiosError를 직접 쓰지 않도록 래핑하여 export
import axios from "axios";
export const isApiError = axios.isAxiosError;
>>>>
```

- [ ] **Step 2: `[id]/page.tsx` (자료상세) 에서 axios 제거 및 `isApiError` 로 교체**

`src/app/board/document/detail/[id]/page.tsx:3` 의 `import axios from "axios"` 를 제거하고, `apiUtils` 로부터 `isApiError` 를 import 하여 교체한다.

```typescript
<<<<
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import documentPostApi from "@/apis/documentPostApi";
====
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import documentPostApi from "@/apis/documentPostApi";
import { isApiError } from "@/apis/apiUtils";
>>>>
```

`page.tsx:61` 부근:
```typescript
<<<<
        } catch (innerError) {
          if (isMounted && !error) {
            if (axios.isAxiosError(innerError)) {
              // 인증 관련 에러(401, 403)는 appClient에서 처리하므로 여기서는 router.back()만 실행
====
        } catch (innerError) {
          if (isMounted && !error) {
            if (isApiError(innerError)) {
              // 인증 관련 에러(401, 403)는 appClient에서 처리하므로 여기서는 router.back()만 실행
>>>>
```

- [ ] **Step 3: `answer/page.tsx` (답변작성) 에서 axios 제거 및 `isApiError` 로 교체**

`src/app/board/question/detail/[id]/answer/page.tsx:5` 의 `import axios from "axios"` 를 제거하고, `apiUtils` 로부터 `isApiError` 를 import 하여 교체한다.

```typescript
<<<<
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
====
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isApiError } from "@/apis/apiUtils";
>>>>
```

`answer/page.tsx:158` 부근:
```typescript
<<<<
      } catch (error) {
        console.error("답변 등록 중 에러 발생:", error);
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.errorMessage || "답변 등록 중 오류가 발생했습니다.";
====
      } catch (error) {
        console.error("답변 등록 중 에러 발생:", error);
        if (isApiError(error)) {
          const message = error.response?.data?.errorMessage || "답변 등록 중 오류가 발생했습니다.";
>>>>
```

- [ ] **Step 4: `notice/[id]/page.tsx` (공지상세) 에서 axios 제거 및 `isApiError` 로 교체**

`src/app/notice/[id]/page.tsx:3` 의 `import axios from "axios"` 를 제거하고, `apiUtils` 로부터 `isApiError` 를 import 하여 교체한다.

```typescript
<<<<
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { noticePostApi } from "@/apis/noticePostApi";
====
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { noticePostApi } from "@/apis/noticePostApi";
import { isApiError } from "@/apis/apiUtils";
>>>>
```

`page.tsx:48` 부근:
```typescript
<<<<
        } catch (innerError) {
          if (isMounted && !error) {
            if (axios.isAxiosError(innerError)) {
              const message = innerError.response?.data?.errorMessage || "알 수 없는 오류가 발생했습니다.";
====
        } catch (innerError) {
          if (isMounted && !error) {
            if (isApiError(innerError)) {
              const message = innerError.response?.data?.errorMessage || "알 수 없는 오류가 발생했습니다.";
>>>>
```

- [ ] **Step 5: 빌드로 검증**

Run:
```bash
npm run build
```
Expected: `✓ Compiled successfully` 출력 + 에러 없음.

- [ ] **Step 6: 커밋**

```bash
git add src/apis/apiUtils.ts src/app/board/document/detail/[id]/page.tsx src/app/board/question/detail/[id]/answer/page.tsx src/app/notice/[id]/page.tsx
git commit -m "axios 직접 의존성 차단 : refactor : axios 직접 임포트 대신 표준 apiUtils.isApiError 공통 헬퍼로 변경하여 결합도 감소 https://github.com/Sejong-Balsamic/Malsami-FE/issues/654"
```

---

## 완료 기준

- [ ] `authApi` 포팅 및 세션 관리 위임 완료
- [ ] `questionPostApi` 및 `documentPostApi` 중복 함수 완전히 삭제
- [ ] `DocDetail.tsx` 좋아요 호출처 `likeApi` 로 완벽 교체
- [ ] 컴포넌트 레벨 `axios` 임포트 전면 제거 및 `isApiError` 로 일원화
- [ ] 모든 Task가 `npm run build`를 깨끗하게 통과
- [ ] 3개 커밋 생성 (각 Task별) 및 원격 푸시 완료
