# Malsami-FE 레거시 현대화 설계서

- 작성일: 2026-06-17
- 대상: Malsami-FE (Next.js 14 App Router + TypeScript + Redux Toolkit + Tailwind)
- 연관: Malsami-BE (Spring Boot 멀티모듈) — 일부 항목만 확인 트랙으로 병행

## 1. 배경과 목표

레거시 코드를 걷어내고 최신 UI와 표준 로직으로 재정비하는 작업을 이어서 진행한다. "한 사이클 돌린" 상태에서 추가로 발전시키되, 무작정 페이지를 고치는 대신 **공통 기반(디자인 토큰 사용·공통 컴포넌트·API 패턴·상태관리)을 먼저 통일하고 그 위에 페이지 UI를 교체**하는 방식(접근 B)을 택한다.

핵심 발견: **디자인 토큰 시스템(tailwind.config.ts)은 이미 잘 만들어져 있다.** 따라서 토큰을 새로 설계할 필요는 없고, "있는 토큰을 쓰도록 강제 + 하드코딩 제거 + Redux/로직 기반 재정비"가 진짜 과제다.

### 성공 기준

- 죽은 코드(미사용 Redux 슬라이스·미사용 API) 0건
- API 호출 패턴이 `apiUtils.postApiRequest` 표준으로 100% 통일 (authApi 포함)
- 중복 정의된 API(좋아요·답변) 단일화
- 에러 처리가 공통 훅으로 일관화
- 회원정보 조회 단일 소스(single source of truth)
- 로그아웃 로직 단일 경로
- hex 색상 하드코딩 0건(토큰 사용), 픽셀/인라인 하드코딩 단계적 제거
- 매 단계 후 `npm run build` 통과(컴파일 성공 + `.next` 생성)

### 비목표 (이번 범위 밖)

- BE 전면 리팩토링 (별도 사이클). 본 작업에선 FE를 막는 리스크만 확인/대응.
- 디자인 토큰 시스템 신규 설계 (이미 충분)
- 신규 기능 추가
- 상태관리 라이브러리 전면 교체(TanStack Query 도입)는 "검토 항목"으로 남기되, 본 spec의 필수 범위는 아니다. (아래 6.5 참조)

## 2. 현황 진단 (코드 기반, 추측 아님)

### 2.1 상태관리 (Redux) — 가장 심각

| 문제 | 근거 |
|------|------|
| 죽은 슬라이스 5개: `filterOptionsSlice`, `docHotDownFilterOptionsSlice`, `docMyFacultyFilterOptionsSlice`, `docRequestFilterOptionsSlice`, `facultySlice` — 선언만 되고 사용처 없음 | `src/global/store/*.ts`, `src/global/store/index.ts` |
| 회원정보 3중 조회: my-info / my-page / yeopjeon-info 가 각각 호출되어 source of truth 분열 | `src/global/hook/useMemberInfo.ts:42`, `src/app/mypage/page.tsx:23`, `src/global/useUserPermissions.ts:11` |
| 로그아웃 정리 로직 3곳 분산 → 상태 불일치 위험 | `src/components/mypage/Facility.tsx:24-28`, `src/global/hook/useLogout.ts`, `src/apis/authApi.ts:75-79` |
| 서버 상태(memberInfo, FCM 토큰)를 Redux에 저장 (안티패턴) | `src/global/hook/useMemberInfo.ts:46`, `src/components/common/FcmInitializer.tsx:52` |
| memberId가 Redux + sessionStorage 이중 관리, 동기화 메커니즘 불명확 | `src/global/memberUtil.ts:49`, authSlice |

### 2.2 로직 / 아키텍처

| 문제 | 근거 |
|------|------|
| `authApi`만 표준 위반 — apiClient 직접 호출 + FormData 수동 생성 5회 반복 (나머지 API는 apiUtils 준수) | `src/apis/authApi.ts:9-93` |
| API 중복 정의: 좋아요 3곳(questionPostApi·documentPostApi·likeApi), 답변 2곳(questionPostApi·answerPostApi) | `src/apis/questionPostApi.ts:28,32-39`, `src/apis/documentPostApi.ts:27`, `src/apis/likeApi.ts:13,17`, `src/apis/answerPostApi.ts` |
| 에러 처리 제각각 — 조용히 무시 / 토스트만 / console.error만 혼재 | `src/app/board/question/all/page.tsx:55-57`, `src/app/board/document/detail/[id]/page.tsx:61-95`, landing/* |
| 거대 컴포넌트 — UI+로직+API 한 덩어리 | `SearchBar.tsx`(328), `QuestionDetail.tsx`(267), `AnswerSection.tsx`(242), `DocDetail.tsx`(207) |
| `axios` 직접 import해서 isAxiosError 타입체크 | `src/app/board/document/detail/[id]/page.tsx:3`, answer/page.tsx:5 |

### 2.3 UI / 스타일

| 문제 | 근거 |
|------|------|
| 토큰은 정의돼 있으나 hex 하드코딩 16건 산재 | `shadcn/checkbox.tsx`, `shadcn/tabs.tsx`, `SearchBar.tsx`, `mypage/InfoCard.tsx` 등 |
| 픽셀 하드코딩 574건 (스켈레톤·상세·마이페이지 집중) | `QuestionDetailSkeleton.tsx`(28), `DocDetail.tsx`(27), `mypage/InfoList.tsx`(23), `mypage/InfoCard.tsx`(21) |
| 인라인 style 22건 | 16개 파일 (documentMain/*, mypage/InfoCard 등) |
| 정의됐는데 사용처와 어긋난 토큰: `legacy.teal`(#03B89E)이 정의돼 있는데 코드선 #03B89E/#03B8A3 하드코딩 | `shadcn/checkbox.tsx`, `shadcn/tabs.tsx` |

UI 수술 우선순위(심각도 순): ① QuestionDetailSkeleton ② DocDetail ③ mypage/InfoCard ④ shadcn(checkbox·tabs) ⑤ SearchBar

### 2.4 백엔드 연동

| 항목 | 결론 (검증 완료) |
|------|------|
| `/api/member/my-post` (`getAllMemberPost`) | **FE 죽은 코드.** FE 어디서도 호출 안 함 + BE에도 없음. → 삭제 대상 (BE 리스크 아님) |
| MemberController 실제 매핑 | `/my-page`, `/my-info`, `/yeopjeon-info` 3개만 존재 |
| 파일 저장소 | BE `DirectStorageService`/`S3StorageService`에 TODO 다수. 자료 다운로드 동작 여부는 **운영 확인 필요** (FE에서 고칠 수 없음) |
| 쿠키 보안 | BE AuthApplicationService FIXME 7개 (dev/prod 구분 없음) — BE 트랙 |
| memberId 타입 | FE `string` ↔ BE `UUID`. 직렬화상 문제는 없으나 문서화 |

## 3. 설계 원칙

1. **기반 → 상태 → UI 순서.** 의존성 최하단(공통 유틸·API)부터 정리해야 상위 작업에서 하드코딩이 재생산되지 않는다.
2. **매 단계 빌드 통과.** 큰 빅뱅 교체 금지. 각 단계는 독립적으로 `npm run build`를 통과해야 한다.
3. **죽은 코드는 먼저 삭제.** 분석·이동 대상에서 제외해 노이즈를 줄인다.
4. **표준은 이미 CLAUDE.md에 있다.** 새 규칙을 만들지 말고 기존 표준(apiUtils, 토큰, useCommonToast, is 접두사 등)에 수렴시킨다.
5. **컴포넌트 분리는 "작업하는 김에".** 무관한 리팩토링 금지. 해당 단계에서 건드리는 거대 컴포넌트만 책임 분리한다.

## 4. 작업 단계 (Phase)

각 Phase는 순서 의존이 있다. Phase 내부 항목은 대체로 병렬 가능.

### Phase 0 — 죽은 코드 제거 (가장 먼저, 위험 최저)

- 죽은 Redux 슬라이스 5개 삭제 + `store/index.ts` 정리
- 미사용 API `getAllMemberPost`(`/api/member/my-post`) 삭제
- 미사용 `landingApi.ts`(전체 주석) 정리
- 검증: 빌드 통과, 삭제로 인한 import 에러 0

### Phase 1 — API 레이어 표준화

- `authApi`를 `postApiRequest` + `createFormData` 표준으로 전환. 토큰 저장 로직은 API 함수에서 분리(인터셉터/별도 유틸로).
- 중복 API 단일화: 좋아요는 `likeApi`로, 답변은 `answerPostApi`로 통합. questionPostApi/documentPostApi에서 중복 제거 후 호출부 교체.
- `axios.isAxiosError` 직접 사용 제거 → 공통 에러 유틸로 흡수.
- 검증: 빌드 통과, 좋아요·답변·로그인 흐름 수동 확인.

### Phase 2 — 공통 에러 처리 & 인증 유틸

- `useApiErrorHandler`(가칭) 공통 훅: 401/403 → 로그인 모달, 그 외 → `useCommonToast` warning. 메시지 표준화.
- `useAuthCheck`(가칭) 공통 훅: sessionStorage 직접 접근 산재 제거.
- 기존 제각각 에러 처리(무시/콘솔/토스트)를 공통 훅으로 교체.
- 검증: 빌드 통과, 의도적 에러 상황에서 일관된 피드백 확인.

### Phase 3 — 상태관리 재설계

- 회원정보 단일화: `useMemberInfo` 하나를 source of truth로. mypage/useUserPermissions의 중복 호출 정리. 캐시 상수 중복 제거.
- 로그아웃 단일 경로: `useLogout` 하나로 통일. Redux logout + sessionStorage 정리 + FCM 처리를 한곳에서. 다른 로그아웃 호출부 교체.
- 서버 상태 분리: memberInfo/FCM 토큰을 Redux에서 적절한 위치로(로컬 상태 또는 storage). authSlice는 인증 식별 정보만.
- 검증: 빌드 통과, 로그인→새로고침→로그아웃 전체 흐름 확인.

### Phase 4 — UI 토큰화 (전역 일괄)

- hex 하드코딩 16건 → 토큰 매핑. 토큰에 없는 색은 tailwind.config에 토큰 추가(예: mypage 다크틸 #016C5D, HOT 오렌지 #FF6723) 후 사용.
- shadcn(checkbox·tabs)의 legacy 색 → `legacy.teal` 토큰으로.
- 인라인 style 22건 → Tailwind 클래스 또는 정당한 동적값만 유지.
- 검증: 빌드 통과, 색상 시각 회귀 확인(주요 페이지 육안).

### Phase 5 — 페이지별 UI 수술 (심각도 순, 하나씩)

심각도 순으로 페이지/컴포넌트 단위 진행. 각 항목은 독립 PR/커밋 단위로 빌드 통과:

1. `QuestionDetailSkeleton.tsx` (px 28건)
2. `documentDetail/DocDetail.tsx` (px 27건 + 거대 컴포넌트 분리)
3. `mypage/InfoCard.tsx`, `mypage/InfoList.tsx`, `mypage/MemberSummary.tsx`
4. `questionDetail/QuestionDetail.tsx` (px 19건 + 컴포넌트 분리)
5. `common/SearchBar.tsx` (variant 분리 + px/hex)
6. 이후 나머지 픽셀 하드코딩 파일들을 잔여 목록으로 소진

각 수술 시: 픽셀→Tailwind 표준, 색→토큰, 인라인 제거, 필요한 만큼만 책임 분리, 스켈레톤 동반 점검.

### Phase 6 — BE 확인 트랙 (병행)

- 파일 다운로드(`/api/document/file/download`) 실제 동작 운영 확인 → 깨졌으면 BE 이슈로 분리.
- memberId 타입(string↔UUID) 문서화.
- 쿠키 보안 FIXME는 BE 백로그로 기록만.

## 5. 검증 전략

- 각 Phase 종료 시: `npx prettier --write .` → `npm run build` (컴파일 성공 + `.next` 생성 확인, ESLint 경고는 통과로 간주).
- 흐름 수동 검증: 로그인/로그아웃, 좋아요, 답변/채택, 자료 다운로드, 마이페이지 로딩.
- 죽은 코드 제거·중복 통합은 grep으로 사용처 0 재확인 후 삭제.

## 6. 리스크 & 미해결 결정

1. **거대 컴포넌트 분리 깊이** — 어디까지 쪼갤지는 Phase 5에서 컴포넌트별로 판단. 과분리 경계.
2. **토큰에 없는 색 추가 vs legacy 매핑** — Phase 4에서 디자인 의도 확인 필요한 색이 있으면 그때 질의.
3. **파일 저장소(BE)** — FE에서 고칠 수 없음. 운영 확인 결과에 따라 범위 밖 이슈로.
4. **순서 변경 가능성** — UI가 급하면 Phase 5 일부를 앞당길 수 있으나, Phase 0~1은 반드시 선행(하드코딩 재생산 방지).
5. **TanStack Query 도입** — 서버상태/로컬상태 분리를 근본적으로 해결하나 학습·마이그레이션 비용이 큼. 본 spec 필수 범위 아님. Phase 3에서 Redux 정리로 충분한지 보고, 부족하면 별도 사이클로 결정.

## 7. 산출물

- 단계별 커밋/PR (Phase 단위, 각각 빌드 통과)
- 죽은 코드 제거 목록
- 공통 훅(`useApiErrorHandler`, `useAuthCheck`)·통합 API 레이어
- 토큰화된 스타일
- BE 확인 결과 메모
