# Phase 0: 죽은 코드 제거 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 선언만 되고 사용처가 0건인 Redux 슬라이스 5개·미사용 API 함수·전체 주석 처리된 API 파일을 삭제하여 이후 Phase 작업의 노이즈를 제거한다.

**Architecture:** 이 프로젝트는 테스트 프레임워크가 없고 검증은 `npm run build`로 한다(CLAUDE.md 기준: `✓ Compiled successfully` + `.next` 생성 = 성공, ESLint 경고는 통과). 삭제 작업이므로 TDD 대신 "삭제 → 빌드 검증 → 커밋" 사이클을 따른다. 각 Task는 독립적으로 빌드를 통과하고 커밋한다.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Redux Toolkit, npm

**커밋 컨벤션 (이 레포 필수):** `<주제> : <type> : <설명>` 형식. type은 refactor/chore 등. AI/Claude 흔적 절대 금지(Co-Authored-By 등 금지).

**사전 검증 완료 사실:**
- 죽은 슬라이스 5개(`filterOptionsSlice`, `docHotDownFilterOptionsSlice`, `docMyFacultyFilterOptionsSlice`, `docRequestFilterOptionsSlice`, `facultySlice`)는 `src/global/store/index.ts`에서만 참조되고 컴포넌트 사용처·selector 접근 0건.
- `memberApi.getAllMemberPost`(`/api/member/my-post`)는 FE 호출처 0건, BE에도 엔드포인트 없음.
- `src/apis/landingApi.ts`는 전체 주석 처리 + import 0건.

---

### Task 1: 죽은 Redux 슬라이스 5개 + store 등록 제거

**Files:**
- Modify: `src/global/store/index.ts`
- Delete: `src/global/store/filterOptionsSlice.ts`
- Delete: `src/global/store/docHotDownFilterOptionsSlice.ts`
- Delete: `src/global/store/docMyFacultyFilterOptionsSlice.ts`
- Delete: `src/global/store/docRequestFilterOptionsSlice.ts`
- Delete: `src/global/store/facultySlice.ts`

- [ ] **Step 1: 삭제 직전 재확인 (사용처 0건 보장)**

Run:
```bash
cd d:/0-suh/project/Malsami-FE
for s in filterOptionsSlice docHotDownFilterOptionsSlice docMyFacultyFilterOptionsSlice docRequestFilterOptionsSlice facultySlice; do echo "--- $s ---"; grep -rln "$s" src --include=*.ts --include=*.tsx | grep -v "src/global/store/$s.ts"; done
for k in filterOptions facultyState docHotDownFilterOptions docMyFacultyFilterOptions docRequestFilterOptions; do grep -rln "state\.$k\b" src --include=*.ts --include=*.tsx | grep -v "src/global/store/"; done
```
Expected: 각 슬라이스 아래에 `src/global/store/index.ts`만 출력되고, state 키 접근은 아무것도 출력되지 않음. (만약 index.ts 외 다른 파일이 나오면 중단하고 보고할 것)

- [ ] **Step 2: store/index.ts를 정리된 내용으로 교체**

`src/global/store/index.ts` 전체를 아래로 교체:

```typescript
// src/global/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import activeTab from "@/global/store/activeTabSlice";
import toast from "@/global/store/toastSlice";
import modal from "@/global/store/modalSlice";
import fcmReducer from "@/global/store/fcmSlice";
import bottomSheet from "@/global/store/bottomSheetSlice";
import auth from "@/global/store/authSlice";

export const store = configureStore({
  reducer: {
    activeTab,
    toast,
    modal,
    fcm: fcmReducer,
    bottomSheet,
    auth,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

- [ ] **Step 3: 슬라이스 파일 5개 삭제**

Run:
```bash
cd d:/0-suh/project/Malsami-FE
rm src/global/store/filterOptionsSlice.ts src/global/store/docHotDownFilterOptionsSlice.ts src/global/store/docMyFacultyFilterOptionsSlice.ts src/global/store/docRequestFilterOptionsSlice.ts src/global/store/facultySlice.ts
```
Expected: 에러 없이 완료. `ls src/global/store/` 시 위 5개 파일이 없어야 함.

- [ ] **Step 4: 빌드로 검증**

Run:
```bash
cd d:/0-suh/project/Malsami-FE && npx prettier --write src/global/store/index.ts && npm run build
```
Expected: `✓ Compiled successfully` 출력 + `.next` 디렉토리 생성. `Module not found` / `Type error` 없음. (ESLint 경고는 무시 가능)

- [ ] **Step 5: 커밋**

```bash
cd d:/0-suh/project/Malsami-FE
git add src/global/store/
git commit -m "죽은 Redux 슬라이스 제거 : refactor : 사용처 0건인 필터·faculty 슬라이스 5개 삭제 및 store 등록 정리"
```

---

### Task 2: 미사용 API 함수 getAllMemberPost 제거

**Files:**
- Modify: `src/apis/memberApi.ts:19-21`

- [ ] **Step 1: 사용처 0건 재확인**

Run:
```bash
cd d:/0-suh/project/Malsami-FE
grep -rn "getAllMemberPost\|my-post" src --include=*.ts --include=*.tsx | grep -v "src/apis/memberApi.ts"
```
Expected: 아무것도 출력되지 않음. (출력되면 중단하고 보고)

- [ ] **Step 2: memberApi.ts에서 해당 함수 제거**

`src/apis/memberApi.ts`에서 아래 블록(주석 포함)을 삭제:

```typescript
  // 모든 회원 게시물 조회
  getAllMemberPost: async (command: Partial<MemberCommand> = {}): Promise<MemberDto> =>
    postApiRequest<MemberCommand, MemberDto>("/api/member/my-post", command),
```

삭제 후 `memberApi.ts` 전체는 다음과 같아야 한다:

```typescript
// src/apis/memberApi.ts
import { MemberCommand } from "@/types/api/requests/memberCommand";
import { MemberDto } from "@/types/api/responses/memberDto";
import { postApiRequest } from "./apiUtils";

export const memberApi = {
  // 내 정보 조회
  getMyInfo: async (command: Partial<MemberCommand> = {}): Promise<MemberDto> =>
    postApiRequest<MemberCommand, MemberDto>("/api/member/my-info", command),

  // 마이페이지 조회
  getMyPage: async (command: Partial<MemberCommand> = {}): Promise<MemberDto> =>
    postApiRequest<MemberCommand, MemberDto>("/api/member/my-page", command),

  // 접근 정보 조회
  getAccessInfo: async (command: Partial<MemberCommand> = {}): Promise<MemberDto> =>
    postApiRequest<MemberCommand, MemberDto>("/api/member/yeopjeon-info", command),
};

export default memberApi;
```

- [ ] **Step 3: 빌드로 검증**

Run:
```bash
cd d:/0-suh/project/Malsami-FE && npx prettier --write src/apis/memberApi.ts && npm run build
```
Expected: `✓ Compiled successfully` + `.next` 생성. 에러 없음.

- [ ] **Step 4: 커밋**

```bash
cd d:/0-suh/project/Malsami-FE
git add src/apis/memberApi.ts
git commit -m "미사용 API 제거 : refactor : 호출처·BE 엔드포인트 모두 없는 getAllMemberPost(my-post) 삭제"
```

---

### Task 3: 전체 주석 처리된 landingApi.ts 삭제

**Files:**
- Delete: `src/apis/landingApi.ts`

- [ ] **Step 1: import 0건 재확인 및 내용 확인**

Run:
```bash
cd d:/0-suh/project/Malsami-FE
grep -rln "landingApi" src --include=*.ts --include=*.tsx | grep -v "src/apis/landingApi.ts"
cat src/apis/landingApi.ts
```
Expected: 첫 명령은 아무것도 출력 안 함(import 0건). 두 번째는 전체가 주석/빈 내용임을 확인. (활성 export가 보이면 중단하고 보고)

- [ ] **Step 2: 파일 삭제**

Run:
```bash
cd d:/0-suh/project/Malsami-FE && rm src/apis/landingApi.ts
```
Expected: 에러 없이 완료.

- [ ] **Step 3: 빌드로 검증**

Run:
```bash
cd d:/0-suh/project/Malsami-FE && npm run build
```
Expected: `✓ Compiled successfully` + `.next` 생성. `Module not found` 없음.

- [ ] **Step 4: 커밋**

```bash
cd d:/0-suh/project/Malsami-FE
git add src/apis/landingApi.ts
git commit -m "미사용 API 파일 제거 : refactor : 전체 주석 처리되고 import 0건인 landingApi.ts 삭제"
```

---

## 완료 기준

- [ ] 죽은 슬라이스 5개 파일 삭제 + store/index.ts 정리됨
- [ ] `getAllMemberPost` 제거됨
- [ ] `landingApi.ts` 삭제됨
- [ ] 모든 Task에서 `npm run build` 통과
- [ ] 3개 커밋 생성 (각 Task별)
- [ ] 다음 단계: Phase 1 (API 레이어 표준화) plan 작성
