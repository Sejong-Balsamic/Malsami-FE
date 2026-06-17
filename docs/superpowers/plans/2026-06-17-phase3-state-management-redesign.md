# Phase 3: 상태관리 재설계 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 다중 분열 조회가 이루어지던 엽전 및 권한 등급 정보를 Redux 전역 상태 및 유효시간 캐싱 레이어로 일원화하여 성능과 정합성을 높이고, 흩어진 로그아웃 처리를 `useLogout` 훅 하나로 완전 단일화한다.

**Architecture:** 
1. **회원 정보/권한 단일화**: `authSlice`에 `accessInfo` 상태를 도입하고 `useUserPermissions` 훅을 고도화하여 캐시 수명(30분) 내에서는 추가 API 요청 없이 전역 상태를 재사용하게 한다.
2. **로그아웃 단일 경로**: `useLogout` 훅이 FCM 상태 리셋, 세션스토리지 정리, authSlice 리셋, FCM 토큰 제거를 단일 책임으로 완벽 수행하게 변경하고 타 호출부를 교체한다.
각 Task는 개별 커밋으로 안전하게 빌드를 검증한다.

**Tech Stack:** Next.js 14 (App Router), TypeScript, React, Redux Toolkit, npm

---

### Task 1: 전역 authSlice 고도화 및 useUserPermissions 캐시 레이어 융합

**Files:**
- Modify: `src/global/store/authSlice.ts` (accessInfo 상태 및 setAccessInfo 액션 추가)
- Modify: `src/global/useUserPermissions.ts` (API 직접 호출 대신 Redux 캐시 활용으로 단일화)

- [ ] **Step 1: `authSlice.ts` 상태 확장 및 액션 보강**

`src/global/store/authSlice.ts` 에 `accessInfo` 및 캐시 관리용 `lastAccessFetchTime` 필드를 정의하고, 이를 세팅할 `setAccessInfo` 액션을 탑재한다.

```typescript
<<<<
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Member } from "@/types/api/entities/postgres/member";

interface AuthState {
  memberId: string | null;
  isLoggedIn: boolean;
  memberInfo: Member | null;
  lastFetchTime: number | null; // 마지막 회원정보 가져온 시간 (중복 요청 방지)
}

const initialState: AuthState = {
  memberId: null,
  isLoggedIn: false,
  memberInfo: null,
  lastFetchTime: null,
};
====
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Member } from "@/types/api/entities/postgres/member";
import { MemberDto } from "@/types/api/responses/memberDto";

interface AuthState {
  memberId: string | null;
  isLoggedIn: boolean;
  memberInfo: Member | null;
  lastFetchTime: number | null; // 마지막 회원정보 가져온 시간 (중복 요청 방지)
  accessInfo: MemberDto | null; // 추가: 엽전 및 권한 등급 전역 캐시 상태
  lastAccessFetchTime: number | null; // 추가: 마지막 권한 가져온 시간
}

const initialState: AuthState = {
  memberId: null,
  isLoggedIn: false,
  memberInfo: null,
  lastFetchTime: null,
  accessInfo: null,
  lastAccessFetchTime: null,
};
>>>>
```

`authSlice.ts` 의 reducers 블록 하단에 `setAccessInfo` 액션 구현 및 export 선언을 추가한다.

```typescript
<<<<
    logout: state => {
      return {
        ...state,
        memberId: null,
        isLoggedIn: false,
        memberInfo: null,
        lastFetchTime: null,
      };
    },
    updateLastFetchTime: state => {
      return {
        ...state,
        lastFetchTime: Date.now(),
      };
    },
  },
});

export const { setMemberId, setMemberInfo, logout, updateLastFetchTime } = authSlice.actions;
export default authSlice.reducer;
====
    setAccessInfo: (state, action: PayloadAction<MemberDto | null>) => {
      return {
        ...state,
        accessInfo: action.payload,
        lastAccessFetchTime: action.payload ? Date.now() : null,
      };
    },
    logout: state => {
      return {
        ...state,
        memberId: null,
        isLoggedIn: false,
        memberInfo: null,
        lastFetchTime: null,
        accessInfo: null,
        lastAccessFetchTime: null,
      };
    },
    updateLastFetchTime: state => {
      return {
        ...state,
        lastFetchTime: Date.now(),
      };
    },
  },
});

export const { setMemberId, setMemberInfo, setAccessInfo, logout, updateLastFetchTime } = authSlice.actions;
export default authSlice.reducer;
>>>>
```

- [ ] **Step 2: `useUserPermissions.ts` 의 실시간 조회 방식을 Redux 캐싱 방식으로 업그레이드**

`src/global/useUserPermissions.ts` 파일 전체를 아래 코드로 교체한다. (유효수명 30분 캐시 및 상태구독 패턴 적용)

```typescript
// src/global/useUserPermissions.ts
"use client";

import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/global/store";
import { setAccessInfo } from "@/global/store/authSlice";
import { MemberDto } from "@/types/api/responses/memberDto";
import memberApi from "@/apis/memberApi";

const CACHE_EXPIRY_TIME = 30 * 60 * 1000; // 30분 캐시 만료 시간

export default function useUserPermissions() {
  const dispatch = useDispatch();
  const { accessInfo, lastAccessFetchTime, isLoggedIn } = useSelector((state: RootState) => state.auth);

  // 캐시 유효성 판별
  const isCacheValid = useCallback(() => {
    if (!accessInfo || !lastAccessFetchTime) return false;
    const now = Date.now();
    return now - lastAccessFetchTime < CACHE_EXPIRY_TIME;
  }, [accessInfo, lastAccessFetchTime]);

  // 권한 정보 가져오기 API 호출 및 캐시
  const fetchPermissions = useCallback(async () => {
    try {
      // 1. 이미 유효한 캐시가 있으면 호출을 건너뜀 (중복 조회 전면 제거)
      if (isCacheValid()) {
        return;
      }

      // 2. 비로그인 상태면 조회 건너뜀
      const token = typeof window !== "undefined" ? sessionStorage.getItem("accessToken") : null;
      if (!isLoggedIn && !token) {
        return;
      }

      const data = await memberApi.getAccessInfo(); // 엽전 정보 API 호출
      dispatch(setAccessInfo(data || null));
    } catch (error) {
      console.error("Failed to fetch user permissions:", error);
    }
  }, [dispatch, isLoggedIn, isCacheValid]);

  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);

  return accessInfo;
}
```

- [ ] **Step 3: 빌드로 검증**

Run:
```bash
npm run build
```
Expected: `✓ Compiled successfully` 출력 + 에러 없음.

- [ ] **Step 4: 커밋**

```bash
git add src/global/store/authSlice.ts src/global/useUserPermissions.ts
git commit -m "권한 등급 조회 캐시 단일화 : refactor : useUserPermissions 호출부를 Redux 캐시 레이어와 결합하여 중복 API 실시간 조회 제거 및 최적화 https://github.com/Sejong-Balsamic/Malsami-FE/issues/654"
```

---

### Task 2: useLogout 훅 고도화 및 비즈니스 통합

**Files:**
- Modify: `src/global/hook/useLogout.ts` (전체 세션 정리, fcm 삭감 및 리다이렉션 책임을 단일 훅으로 통합)
- Modify: `src/components/mypage/Facility.tsx` (기존 수동 로그아웃 제거 및 useLogout 적용)

- [ ] **Step 1: `useLogout.ts` 로그아웃 훅 소스 코드 고도화**

`src/global/hook/useLogout.ts` 파일 전체를 아래 고도화 코드로 교체하여 일원화한다.

```typescript
// src/global/hook/useLogout.ts
"use client";

import authApi from "@/apis/authApi";
import useCommonToast from "@/global/hook/useCommonToast";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "@/global/store/authSlice";
import { resetFcmState } from "@/global/store/fcmSlice";
import { RootState } from "@/global/store";
import { useRouter } from "next/navigation";

export default function useLogout() {
  const { showConfirmToast, showWarningToast } = useCommonToast();
  const dispatch = useDispatch();
  const router = useRouter();
  
  // 전역 FCM 토큰 상태 자동 획득
  const fcmToken = useSelector((state: RootState) => state.fcm.fcmToken);

  const handleLogout = async () => {
    try {
      // 1. 로그아웃 API 호출 시 FCM 토큰이 존재할 경우 포함하여 안전 해제 요청
      await authApi.logout({ fcmToken: fcmToken || "" });
      
      // 2. 세션스토리지 자산 원스톱 삭제
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("memberId");

      // 3. Redux Store 상태 클렌징 단일 경로 처리
      dispatch(logoutAction());
      dispatch(resetFcmState()); // FCM 상태도 공통 정리

      showConfirmToast("로그아웃 되었습니다.");
      
      // 4. 안전한 메인화면 이동 리디렉트
      router.push("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      showWarningToast("로그아웃을 실패했습니다. 다시 시도해주세요.");
    }
  };

  return handleLogout;
}
```

- [ ] **Step 2: `Facility.tsx` 의 비표준 수동 로그아웃을 `useLogout` 훅 호출로 전면 단순화**

`src/components/mypage/Facility.tsx` 의 원래 로그아웃 로직을 `useLogout`으로 깔끔하게 교체한다.

```typescript
<<<<
import { logout as logoutAction } from "@/global/store/authSlice";
import useCommonToast from "@/global/hook/useCommonToast";

function Facility() {
  const router = useRouter();
  const dispatch = useDispatch();
  const fcmToken = useSelector((state: RootState) => state.fcm.fcmToken);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { showConfirmToast } = useCommonToast();

  const handleLogout = async () => {
    try {
      await authApi.logout({ fcmToken: fcmToken || "" });
      sessionStorage.removeItem("memberId");
      sessionStorage.removeItem("accessToken"); // 명시적 토큰 정리
      dispatch(logoutAction());
      showConfirmToast("로그아웃 되었습니다.");
      setIsModalOpen(false);
      router.push("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      showConfirmToast("로그아웃 실패. 다시 시도해주세요.");
    }
  };

  const handleLeave = () => {
====
import useLogout from "@/global/hook/useLogout";

function Facility() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleLogout = useLogout();

  const handleLogoutClick = async () => {
    setIsModalOpen(false);
    await handleLogout();
  };

  const handleLeave = () => {
>>>>
```

`Facility.tsx` 하단 버튼의 `onClick` 트리거도 이에 맞춰 변경한다:
```typescript
<<<<
                  <Button
                    variant="outline"
                    className="border-ui-muted text-SUIT_14 h-[44px] w-full rounded-[10px] text-[#A7A7A7]"
                    onClick={handleLogout}
                  >
                    확인
                  </Button>
====
                  <Button
                    variant="outline"
                    className="border-ui-muted text-SUIT_14 h-[44px] w-full rounded-[10px] text-[#A7A7A7]"
                    onClick={handleLogoutClick}
                  >
                    확인
                  </Button>
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
git add src/global/hook/useLogout.ts src/components/mypage/Facility.tsx
git commit -m "로그아웃 단일화 및 고도화 : refactor : 로그아웃 세션/Redux 정리 절차를 useLogout 훅 하나로 위임하고 마이페이지 수동 코드 전면 소거 https://github.com/Sejong-Balsamic/Malsami-FE/issues/654"
```

---

## 완료 기준

- [ ] authSlice 내 엽전/권한 캐시 상태 탑재 완료
- [ ] `useUserPermissions` 가 API를 마운트할 때마다 무조건 쏘던 비효율을 Redux 캐시 기법으로 전면 단일화
- [ ] `useLogout` 훅이 FCM, sessionStorage, authSlice 정리를 원스톱 전담하도록 고도화 완료
- [ ] 마이페이지(`Facility.tsx`)의 수십 라인 로그아웃 한 땀 수동 처리를 `useLogout` 한 줄 호출로 경량 통일 완료
- [ ] 모든 Task가 `npm run build`를 완벽하게 통과
- [ ] 2개 커밋 생성 및 원격 선형적 동기화(`rebase push`) 완료
