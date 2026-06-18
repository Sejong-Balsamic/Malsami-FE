# Phase 2: 공통 에러 처리 & 인증 유틸 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 제각각 분산되어 혼재하던 에러 처리 방식을 `useApiErrorHandler` 공통 훅으로 통일하여 사용자 일관성을 높이고, `useAuthCheck` 훅으로 직접적인 `sessionStorage` 접근 의존성을 추상화한다.

**Architecture:** 공통 훅 계층을 도입하여 비즈니스 페이지 레이어(catch 블록, 권한 분기)에서 에러 검증 및 로그인 권한 분리 등의 책임을 제거한다. 이를 통해 프레임워크 에러 전파 제어를 공통화한다. 각 Task는 검증 후 독립적인 커밋을 생성한다.

**Tech Stack:** Next.js 14 (App Router), TypeScript, React, Redux Toolkit, npm

---

### Task 1: useApiErrorHandler 훅 구현 및 에러 핸들링 일원화

**Files:**
- Create: `src/global/hook/useApiErrorHandler.ts` (공통 에러 핸들러 훅 개발)
- Modify: `src/app/board/document/detail/[id]/page.tsx` (에러 catch 블록 핸들러 대체)
- Modify: `src/app/notice/[id]/page.tsx` (에러 catch 블록 핸들러 대체)

- [ ] **Step 1: `useApiErrorHandler.ts` 공통 훅 소스 코드 작성**

`src/global/hook/useApiErrorHandler.ts` 에 다음 코드를 작성하여 생성한다.

```typescript
// src/global/hook/useApiErrorHandler.ts
"use client";

import { isApiError } from "@/apis/apiUtils";
import useCommonToast from "./useCommonToast";
import { useRouter } from "next/navigation";

export default function useApiErrorHandler() {
  const { showWarningToast } = useCommonToast();
  const router = useRouter();

  const handleApiError = (
    error: unknown,
    fallbackMessage = "알 수 없는 오류가 발생했습니다.",
    shouldNavigateBack = false
  ) => {
    let message = fallbackMessage;

    if (isApiError(error)) {
      const status = error.response?.status;
      const errorCode = error.response?.data?.errorCode;

      // 401, 403 에러나 MISSING_REFRESH_TOKEN 등 인증 오류는 appClient가 로그인 모달을 띄우므로
      // 중복 토스트는 생략하고, shouldNavigateBack이 켜진 경우에 한해 리다이렉트나 백 처리만 수행
      if (status === 401 || status === 403 || errorCode === "MISSING_REFRESH_TOKEN") {
        if (shouldNavigateBack) {
          if (typeof window !== "undefined" && window.history.length > 1) {
            router.back();
          } else {
            router.replace("/");
          }
        }
        return error.response?.data?.errorMessage || "인증 세션이 유효하지 않습니다.";
      }

      message = error.response?.data?.errorMessage || fallbackMessage;
    }

    // 일반 API 에러 발생 시 노란색 경고 토스트 표준 노출
    showWarningToast(message);

    if (shouldNavigateBack) {
      if (typeof window !== "undefined" && window.history.length > 1) {
        router.back();
      } else {
        router.replace("/");
      }
    }

    return message;
  };

  return { handleApiError };
}
```

- [ ] **Step 2: `[id]/page.tsx` (자료상세) 에서 에러 처리를 공통 훅으로 교체**

`src/app/board/document/detail/[id]/page.tsx` 파일에 `useApiErrorHandler` 훅 임포트 및 훅 인스턴스를 추가하고 catch 블록을 수정한다.

```typescript
<<<<
import { isApiError } from "@/apis/apiUtils";

export default function Page() {
  const router = useRouter();
  const { showWarningToast } = useCommonToast();
====
import { isApiError } from "@/apis/apiUtils";
import useApiErrorHandler from "@/global/hook/useApiErrorHandler";

export default function Page() {
  const router = useRouter();
  const { showWarningToast } = useCommonToast();
  const { handleApiError } = useApiErrorHandler();
>>>>
```

catch 블록 (`page.tsx:61` 부근):
```typescript
<<<<
        } catch (innerError) {
          if (isMounted && !error) {
            if (isApiError(innerError)) {
              // 인증 관련 에러(401, 403)는 appClient에서 처리하므로 여기서는 router.back()만 실행
              if (innerError.response?.status === 401 || innerError.response?.status === 403) {
                if (typeof window !== "undefined" && window.history.length > 1) {
                  router.back();
                } else {
                  router.replace("/");
                }
              } else if (innerError.response?.data?.errorCode === "MISSING_REFRESH_TOKEN") {
                // MISSING_REFRESH_TOKEN 에러도 appClient에서 모달 처리
                if (typeof window !== "undefined" && window.history.length > 1) {
                  router.back();
                } else {
                  router.replace("/");
                }
              } else {
                // 다른 에러는 기존 로직 유지
                const message = innerError.response?.data?.errorMessage || "알 수 없는 오류가 발생했습니다.";
                showWarningToast(message);
                setError(message);
                if (typeof window !== "undefined" && window.history.length > 1) {
                  router.back();
                } else {
                  router.replace("/");
                }
              }
            } else {
              setError("알 수 없는 오류가 발생했습니다.");
              if (typeof window !== "undefined" && window.history.length > 1) {
                router.back();
              } else {
                router.replace("/");
              }
            }
          }
        } finally {
====
        } catch (innerError) {
          if (isMounted && !error) {
            // 공통 에러 핸들러 호출 (뒤로가기 이동 옵션 활성화)
            const message = handleApiError(innerError, "자료 상세 정보를 가져오는데 실패했습니다.", true);
            setError(message);
          }
        } finally {
>>>>
```

- [ ] **Step 3: `notice/[id]/page.tsx` (공지상세) 에서 에러 처리를 공통 훅으로 교체**

`src/app/notice/[id]/page.tsx` 파일에 `useApiErrorHandler` 훅 임포트 및 훅 인스턴스를 추가하고 catch 블록을 수정한다.

```typescript
<<<<
import noticePostApi from "@/apis/noticePostApi";
import { isApiError } from "@/apis/apiUtils";

export default function Page() {
  const router = useRouter();
  const { showWarningToast } = useCommonToast();
====
import noticePostApi from "@/apis/noticePostApi";
import { isApiError } from "@/apis/apiUtils";
import useApiErrorHandler from "@/global/hook/useApiErrorHandler";

export default function Page() {
  const router = useRouter();
  const { showWarningToast } = useCommonToast();
  const { handleApiError } = useApiErrorHandler();
>>>>
```

catch 블록 (`page.tsx:48` 부근):
```typescript
<<<<
        } catch (innerError) {
          if (isMounted && !error) {
            if (isApiError(innerError)) {
              const message = innerError.response?.data?.errorMessage || "알 수 없는 오류가 발생했습니다.";
              showWarningToast(message);
              setError(message);
              if (typeof window !== "undefined" && window.history.length > 1) {
                router.back();
              } else {
                router.replace("/");
              }
            } else {
              setError("알 수 없는 오류가 발생했습니다.");
              if (typeof window !== "undefined" && window.history.length > 1) {
                router.back();
              } else {
                router.replace("/");
              }
            }
          }
        } finally {
====
        } catch (innerError) {
          if (isMounted && !error) {
            // 공통 에러 핸들러 호출 (뒤로가기 이동 옵션 활성화)
            const message = handleApiError(innerError, "공지사항 상세 정보를 가져오는데 실패했습니다.", true);
            setError(message);
          }
        } finally {
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
git add src/global/hook/useApiErrorHandler.ts src/app/board/document/detail/[id]/page.tsx src/app/notice/[id]/page.tsx
git commit -m "공통 에러 핸들러 도입 : feat : useApiErrorHandler 공통 훅 구현 및 자료/공지사항 상세 catch 블록 표준화 교체 https://github.com/Sejong-Balsamic/Malsami-FE/issues/654"
```

---

### Task 2: useAuthCheck 훅 구현 및 세션 조회 간결화

**Files:**
- Create: `src/global/hook/useAuthCheck.ts` (공통 인증 판단 훅 개발)
- Modify: `src/components/common/FcmInitializer.tsx` (FCM 세션 체크 의존성 추상화)

- [ ] **Step 1: `useAuthCheck.ts` 공통 인증 훅 소스 코드 작성**

`src/global/hook/useAuthCheck.ts` 에 다음 코드를 작성하여 생성한다.

```typescript
// src/global/hook/useAuthCheck.ts
"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { showModal } from "../store/modalSlice";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  // 세션스토리지 토큰 존재 여부로 로그인 판별
  const getIsLoggedIn = (): boolean => {
    if (typeof window === "undefined") return false;
    return !!sessionStorage.getItem("accessToken");
  };

  // 로그인 상태 가드 (비로그인 시 로그인 필요 모달을 띄움)
  const requireAuth = (customMessage = "로그인 후 이용가능합니다."): boolean => {
    const isLoggedIn = getIsLoggedIn();
    if (!isLoggedIn) {
      dispatch(showModal(customMessage));
      return false;
    }
    return true;
  };

  return {
    isLoggedIn: getIsLoggedIn(),
    memberId: authState.memberId,
    requireAuth,
  };
}
```

- [ ] **Step 2: `FcmInitializer.tsx` 에서 sessionStorage 직접 검사 부분을 `useAuthCheck` 로 리액터**

`src/components/common/FcmInitializer.tsx` 에 `useAuthCheck` 를 적용한다.

```typescript
<<<<
import { setFcmToken, setIsFcmTokenSentToServer } from "@/global/store/fcmSlice"; // Redux 액션
import { RootState } from "@/global/store"; // 루트 상태

export default function FcmInitializer() {
  const dispatch = useDispatch();

  // Redux Store에서 fcmToken과 전송 여부 상태를 가져옴
  const { fcmToken, isFcmTokenSentToServer } = useSelector((state: RootState) => state.fcm);

  // 컴포넌트 마운트 시 FCM 초기화 및 토큰 획득 실행
  useEffect(() => {
    let isMounted = true;

    const initializeFcmAndSendToken = async () => {
      // 1. 세션스토리지에 accessToken이 없으면 동작 정지
      const accessToken = sessionStorage.getItem("accessToken");
      if (!accessToken) {
        console.log("액세스 토큰이 세션스토리지에 없습니다. FCM 초기화를 건너뜁니다.");
        return;
      }
====
import { setFcmToken, setIsFcmTokenSentToServer } from "@/global/store/fcmSlice"; // Redux 액션
import { RootState } from "@/global/store"; // 루트 상태
import useAuthCheck from "@/global/hook/useAuthCheck";

export default function FcmInitializer() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useAuthCheck();

  // Redux Store에서 fcmToken과 전송 여부 상태를 가져옴
  const { fcmToken, isFcmTokenSentToServer } = useSelector((state: RootState) => state.fcm);

  // 컴포넌트 마운트 시 FCM 초기화 및 토큰 획득 실행
  useEffect(() => {
    let isMounted = true;

    const initializeFcmAndSendToken = async () => {
      // 1. useAuthCheck 로그인 체크로 추상화
      if (!isLoggedIn) {
        console.log("로그인되지 않은 유저입니다. FCM 초기화를 건너뜁니다.");
        return;
      }
>>>>
```

- [ ] **Step 3: 빌드로 검증**

Run:
```bash
npm run build
```
Expected: `✓ Compiled successfully` 출력 + 에러 없음.

- [ ] **Step 4: 커밋**

```bash
git add src/global/hook/useAuthCheck.ts src/components/common/FcmInitializer.tsx
git commit -m "공통 인증 훅 도입 : feat : useAuthCheck 공통 훅 구현 및 FcmInitializer 직접 세션 검사 의존성 제거 https://github.com/Sejong-Balsamic/Malsami-FE/issues/654"
```

---

### Task 3: 기존 에러 처리 누락 보완 및 버그 고침

**Files:**
- Modify: `src/app/board/question/detail/[id]/page.tsx` (기존 setError 버그 및 catch 블록 수정)
- Modify: `src/app/board/question/detail/[id]/comment/page.tsx` (catch 블록 표준화)
- Modify: `src/app/board/question/detail/[id]/answer/page.tsx` (catch 블록 표준화)

- [ ] **Step 1: `question/detail/[id]/page.tsx` 에 공통 에러 훅 적용 및 기존 버그 수정**

`src/app/board/question/detail/[id]/page.tsx` 에서 잘못된 `setError(error)` 호출 버그를 공통 에러 핸들러로 수정 및 일원화한다.

```typescript
<<<<
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { questionPostApi } from "@/apis/questionPostApi";
====
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { questionPostApi } from "@/apis/questionPostApi";
import useApiErrorHandler from "@/global/hook/useApiErrorHandler";

export default function Page() {
  const router = useRouter();
  const { handleApiError } = useApiErrorHandler();
>>>>
```

catch 블록 (`page.tsx:64` 부근):
```typescript
<<<<
        } catch (innerError) {
          console.error("문서 상세 정보 가져오기 실패:", innerError);
          if (isMounted && !error) {
            // 에러가 이미 설정되지 않은 경우만 처리
            setError(error); // 오류 설정
          }
        } finally {
====
        } catch (innerError) {
          console.error("문서 상세 정보 가져오기 실패:", innerError);
          if (isMounted && !error) {
            // 공통 에러 핸들러 적용 (뒤로가기 이동 옵션 활성화)
            const message = handleApiError(innerError, "질문 상세 정보를 가져오는데 실패했습니다.", true);
            setError(message); // 오류 설정
          }
        } finally {
>>>>
```

- [ ] **Step 2: `[id]/comment/page.tsx` (댓글화면) 에 공통 에러 훅 적용**

`src/app/board/question/detail/[id]/comment/page.tsx` 에 `useApiErrorHandler` 훅을 적용한다.

```typescript
<<<<
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { questionPostApi } from "@/apis/questionPostApi";
====
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { questionPostApi } from "@/apis/questionPostApi";
import useApiErrorHandler from "@/global/hook/useApiErrorHandler";

export default function Page() {
  const router = useRouter();
  const { handleApiError } = useApiErrorHandler();
>>>>
```

catch 블록 (`comment/page.tsx:44` 부근):
```typescript
<<<<
        } catch (innerError) {
          console.error("질문 상세 정보 가져오기 실패:", innerError);
          if (isMounted) {
            setError("데이터를 불러오는데 실패했습니다.");
            showWarningToast("질문 정보를 불러오는데 실패했습니다.");
          }
        } finally {
====
        } catch (innerError) {
          console.error("질문 상세 정보 가져오기 실패:", innerError);
          if (isMounted) {
            // 공통 에러 핸들러 적용
            const message = handleApiError(innerError, "질문 상세 정보를 가져오는데 실패했습니다.");
            setError(message);
          }
        } finally {
>>>>
```

- [ ] **Step 3: `[id]/answer/page.tsx` (답변작성) 에 공통 에러 훅 적용**

`src/app/board/question/detail/[id]/answer/page.tsx` 에 `useApiErrorHandler` 훅을 적용한다.

```typescript
<<<<
import { isApiError } from "@/apis/apiUtils";

interface AnswerPostFormData {
====
import { isApiError } from "@/apis/apiUtils";
import useApiErrorHandler from "@/global/hook/useApiErrorHandler";

interface AnswerPostFormData {
>>>>
```

`answer/page.tsx` 내 `const { showConfirmToast, showWarningToast } = useCommonToast();` 부근에 훅 추가:
```typescript
<<<<
  const router = useRouter();
  const { showConfirmToast, showWarningToast } = useCommonToast();
  const dispatch = useDispatch();
====
  const router = useRouter();
  const { showConfirmToast, showWarningToast } = useCommonToast();
  const { handleApiError } = useApiErrorHandler();
  const dispatch = useDispatch();
>>>>
```

catch 블록 (`answer/page.tsx:157` 부근):
```typescript
<<<<
      } catch (error) {
        console.error("답변 등록 중 에러 발생:", error);
        if (isApiError(error)) {
          const message = error.response?.data?.errorMessage || "답변 등록 중 오류가 발생했습니다.";
          showWarningToast(message);
        } else {
          // 예상치 못한 오류 처리
          showWarningToast("답변 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
      } finally {
====
      } catch (error) {
        console.error("답변 등록 중 에러 발생:", error);
        handleApiError(error, "답변 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      } finally {
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
git add src/app/board/question/detail/[id]/page.tsx src/app/board/question/detail/[id]/comment/page.tsx src/app/board/question/detail/[id]/answer/page.tsx
git commit -m "기존 에러 처리 누락 보완 : refactor : 질문 상세, 댓글, 답변 작성 화면에 useApiErrorHandler 공통 훅을 완벽히 적용하고 기존 버그 교정 https://github.com/Sejong-Balsamic/Malsami-FE/issues/654"
```

---

## 완료 기준

- [ ] `useApiErrorHandler` 공통 에러 훅 제작 및 자료/공지사항 상세 화면 catch 블록 전면 보정
- [ ] `useAuthCheck` 공통 인증 훅 제작 및 FCM 세션 조회 부분 추상화 고도화
- [ ] 질문 상세 화면 내 잘못 지정된 `setError(error)` 버그 영구 교정 및 공통 에러 훅으로 대체
- [ ] 댓글 및 답변 등록 화면 내 복잡한 catch 예외 분기문 전원 `handleApiError`로 심플 포팅 완수
- [ ] 모든 Task가 독립적으로 `npm run build` 컴파일 무결성 완수
- [ ] 3개 커밋 생성 (각 Task별) 및 원격 푸시 완료
