# PC 반응형 컨테이너 960px 전체 정렬 — 설계 (이어서 작업)

날짜: 2026-06-17
관련 이슈/커밋: #655 `f63b565` (PC 반응형 컨테이너 확장: ClientLayout lg 960px)

## 배경

직전 커밋 `f63b565`에서 본문 컨테이너(`src/app/ClientLayout.tsx`)를
`max-w-[640px] lg:max-w-[960px]`로 확장했다. 그러나 컨테이너 안에서
동작하는 거의 모든 고정/본문 요소가 여전히 `max-w-[640px]`에 묶여 있어,
PC(lg 이상)에서 본문은 960px인데 헤더·네비·토스트·바텀시트·하단 입력바·
페이지 내부 컨테이너가 640px로 좁아져 좌우가 어긋난다.

게시판 11개 페이지의 fixed 헤더 래퍼에 `lg:max-w-[960px]`를 추가하는
작업이 진행 중이었으나(현재 uncommitted), 같은 페이지의 본문 컨테이너와
하단 요소는 미처리 상태로 끊겼다.

## 목표

컨테이너(960px) 안에서 `max-w-[640px]`로 폭이 제한된 **모든** 요소를
`lg:max-w-[960px]`로 정렬한다. 모바일(기본)은 640px 그대로 유지한다.

## 원칙

- 기존 `max-w-[640px]` 클래스에 **`lg:max-w-[960px]`만 추가**한다.
  새로운 픽셀/색상 하드코딩을 도입하지 않는다 (CLAUDE.md 스타일 규칙 준수).
- 모바일 폭(640px)·레이아웃은 변경하지 않는다. PC에서만 확장된다.
- 공용 컴포넌트(`Header`/`CommonHeader`/`LandingHeader`)를 우선 수정하여
  이를 사용하는 모든 페이지가 자동 정렬되도록 한다.

## 작업 분류

### 그룹 A — 공용 헤더 컴포넌트 (최대 파급)

| 파일 | 위치 |
|---|---|
| `src/components/header/Header.tsx` | `isFixed` 분기 className |
| `src/components/header/CommonHeader.tsx` | fixed 헤더 / 스페이서 / children 래퍼 (3곳) |
| `src/components/header/LandingHeader.tsx` | fixed 헤더 / 스페이서 / children 래퍼 (3곳) |

### 그룹 B — fixed 전역 오버레이

| 파일 | 위치 |
|---|---|
| `src/components/common/CommonNav.tsx` | 하단 네비 nav |
| `src/components/common/CommonToast.tsx` | 토스트 컨테이너 |

### 그룹 C — 게시판 11개 페이지 (헤더 래퍼는 완료, 본문/하단 보완)

- `board/question/{all,hot,major,bounty}/page.tsx`
- `board/question/detail/[id]/{answer,comment}/page.tsx`
- `board/document/{hot}/page.tsx`
- `board/document/sub/{request,my-faculty,hot-download}/page.tsx`
- `board/document/tier/[postTier]/page.tsx`

각 페이지에서 헤더 래퍼 외에 남은 `max-w-[640px]` 본문/하단 입력바도 확장.
특히:
- `answer/page.tsx`: 하단 완료 버튼 바
- `comment/page.tsx`: 본문 래퍼 + 하단 댓글 입력바

### 그룹 D — 공용 컴포넌트로 안 감싼 직접 컨테이너 페이지

| 파일 | 위치 |
|---|---|
| `board/question/detail/[id]/page.tsx` | 헤더 래퍼 ×2 + 본문 컨테이너 ×2 (로딩/메인) |
| `search/page.tsx` | 본문 컨테이너 |
| `search/[query]/page.tsx` | 본문 컨테이너 |

### 그룹 E — CommonHeader 기반 페이지의 내부 본문 컨테이너

`CommonHeader`/`LandingHeader`를 고치면 헤더·외곽은 정렬되지만, 페이지가
children 안에 자체 `max-w-[640px]` 본문 컨테이너를 또 두는 경우 그 안쪽도
확장 필요.

- `mypage/page.tsx` (children 내부 컨테이너)
- `mypage/{rule,policy,myrecommend,mypurchase,mycomment}/page.tsx`
- `mypage/mypost/{,doc,qna,doc/hot}/page.tsx`
- `notice/page.tsx` (로딩/에러/빈/메인 4곳) · `notice/[id]/page.tsx`
- `board/document/detail/[id]/page.tsx`
- `help/page.tsx`
- `components/mypage/Facility.tsx`
- `components/documentDetail/DocDetail.tsx` (콘텐츠 블록 ×4)
- `components/landing/LoginOrSearchButton.tsx` (×2)

### 그룹 F — 바텀시트 / 필터 모달 (사용자 결정: 960px로 확장)

| 파일 |
|---|
| `components/documentMain/DocFilterOptionsModal.tsx` |
| `components/documentMain/DocRequestFilterOptionsModal.tsx` |
| `components/documentMain/DocumentFilteringBottomSheet.tsx` |
| `components/questionMain/QuestionFilteringBottomSheet.tsx` |

### 제외

- `src/app/ClientLayout.tsx` — 이미 완료(커밋됨)
- `src/app/test/bottomsheet/page.tsx` — 테스트 전용 페이지

## 검증

1. `npx prettier --write .`
2. `npm run build` → `✓ Compiled successfully` + `.next/` 생성 확인
3. `max-w-[640px]`가 남은 곳 중 `lg:max-w-[960px]` 짝이 없는 항목이
   제외 대상(ClientLayout/test)뿐인지 grep 재확인

## 리스크

- 낮음. 순수 가산적(`lg:` 변형 추가) 변경으로 모바일 동작 불변,
  PC에서만 폭이 넓어진다. 로직·상태·API 변경 없음.

## 후속 개선 (사용자 요청으로 확장 — 토큰 + 공용 컴포넌트화)

단순 하드코딩 정렬에서 그치지 않고, 폭 값을 한 곳에서 관리하도록 리팩터했다.

### 1. 디자인 토큰 도입
`tailwind.config.ts` `maxWidth` 에 폭 토큰 정의:
- `container` = 640px (모바일/기본)
- `container-lg` = 960px (PC, lg 이상)

전체 코드의 `max-w-[640px]` / `lg:max-w-[960px]` 하드코딩을
`max-w-container` / `lg:max-w-container-lg` 토큰으로 치환했다.
→ 앞으로 폭을 바꿀 때 `tailwind.config` 한 곳만 수정하면 된다.

### 2. 공용 레이아웃 컴포넌트 도입
`src/components/layout/AppContainer.tsx` 신설:
- `PageContainer` — 본문 컨테이너 (mypage/notice/help/search/detail 본문 등)
- `TopBarContainer` — 상단 고정 헤더 래퍼 (컨테이너 폭 중앙 정렬)
- `BottomBarContainer` — 하단 고정 바 래퍼 (댓글 입력/완료 버튼 등)

`CommonHeader`/`LandingHeader` 및 게시판·상세 페이지의 인라인 폭 div 를
이 컴포넌트들로 교체했다.

### 3. 토큰 직접 사용 유지 (컴포넌트화 제외)
다음은 고유 레이아웃·시맨틱 때문에 컴포넌트로 빼지 않고 토큰만 사용:
`ClientLayout`(최상위), `Header`(isFixed flex), `DocDetail`(콘텐츠 블록),
바텀시트/필터 모달(DrawerContent), `CommonNav`(nav 시맨틱),
`CommonToast`(고유 위치), `LoginOrSearchButton` 일부.

### 검증
- `npm run build` 성공 (31개 정적 페이지 생성, 컴파일 에러 없음).
- `max-w-[640px]`/`max-w-[960px]` 하드코딩 잔존: `test/bottomsheet`(의도 제외)뿐.
- PowerShell 일괄 치환 시 발생한 UTF-8 BOM 41개 파일 제거 완료.
- `tailwind.config.ts` CRLF 줄바꿈 보존(실질 변경 5줄).
