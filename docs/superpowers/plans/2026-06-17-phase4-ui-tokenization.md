# Phase 4: UI 토큰화 (전역 일괄) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 소스 코드 내에 산재하는 hex 색상 하드코딩 16건을 완벽하게 제거하고 전역 `tailwind.config.ts` 디자인 토큰 시스템에 수렴 결합한다.

**Architecture:** 
1. **토큰의 명시적 정의**: `tailwind.config.ts` 내에 누락된 전용 색상 토큰(마이페이지 틸, 에러 레드, 핫 오렌지 등)을 안전하게 추가 정의한다.
2. **Surgical Precision 교체**: 14개 UI 컴포넌트에서 비표준 하드코딩된 `bg-[#...]` 또는 `text-[#...]` 를 해당 테일윈드 토큰 클래스로 1:1 리팩토링 교체한다.
각 컴포넌트 교체 후 `npm run build` 정적 분석 및 컴파일 무결성을 입증한다.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, npm

---

### Task 1: tailwind.config.ts colors 토큰 확장

**Files:**
- Modify: `tailwind.config.ts` (colors 디자인 토큰 신규 추가)

- [ ] **Step 1: `tailwind.config.ts` colors 속성 보강**

`tailwind.config.ts` 내의 colors 영역에 마이페이지 틸(`mypage`), 핫오렌지(`tag.hot`), 검색태그(`tag.search-bg`/`search-text`), 그린태그(`tag.green`), 경고레드(`ui.error`) 토큰을 추가 적용한다.

```typescript
<<<<
        // 태그 색상
        tag: {
          yeopjeon: "#FFB000", // 엽전 태그 색상
          accept: "#3D8BFF", // 채택(답변) 태그 색상
          // 지정태그(프리셋태그) 색상
          "preset-question-bg": "#CAFFE5", // 질문 지정태그 배경색 (연한 초록)
          "preset-question-text": "#00E271", // 질문 지정태그 텍스트색 (진한 초록)
          "preset-document-bg": "#E3F2FD", // 자료 지정태그 배경색 (연한 파랑) - 필요시 사용
          "preset-document-text": "#00D1F2", // 자료 지정태그 텍스트색 (진한 파랑) - 필요시 사용
          // 커스텀태그 색상
          "custom-bg": "#EDEDED", // 커스텀태그 배경색 (회색)
          "custom-text": "#898989", // 커스텀태그 텍스트색 (진한 회색)
        },

        // UI 요소 색상
        ui: {
          "tag-bg": "#F5F5F5", // 태그 배경색
          "tag-text": "#616161", // 태그 텍스트 색상
          muted: "#C5C5C5", // 흐린 텍스트 색상
          body: "#616161", // 본문 텍스트 색상
          "body-soft": "#737373", // 본문 보조 회색 (옛 #737373/#727272 통합)
          divider: "#F0F0F0", // 얇은 구분선 색상
          "divider-thick": "#EDEDED", // 두꺼운 구분선 색상 (4px)
          "divider-light": "#F1F1F1", // 카드 테두리용 옅은 구분선 (옛 #F1F1F1/#EEEEEE/#E7E7E7 통합)
          border: "#E2E2E2", // 테두리 색상
          "image-bg": "#B5B5B5", // 이미지 배경색
          count: "#ACACAC", // 카운터용 회색 (좋아요·댓글·조회수 등)
          "muted-soft": "#A7A7A7", // 살짝 진한 흐린 회색 (옛 #A7A7A7/#929292/#A4A4A4 통합)
          disabled: "#C5C5C5",
        },
====
        // 태그 색상
        tag: {
          yeopjeon: "#FFB000", // 엽전 태그 색상
          accept: "#3D8BFF", // 채택(답변) 태그 색상
          // 지정태그(프리셋태그) 색상
          "preset-question-bg": "#CAFFE5", // 질문 지정태그 배경색 (연한 초록)
          "preset-question-text": "#00E271", // 질문 지정태그 텍스트색 (진한 초록)
          "preset-document-bg": "#E3F2FD", // 자료 지정태그 배경색 (연한 파랑) - 필요시 사용
          "preset-document-text": "#00D1F2", // 자료 지정태그 텍스트색 (진한 파랑) - 필요시 사용
          // 커스텀태그 색상
          "custom-bg": "#EDEDED", // 커스텀태그 배경색 (회색)
          "custom-text": "#898989", // 커스텀태그 텍스트색 (진한 회색)
          hot: "#FF6723", // 추가: 핫오렌지 태그색
          "search-bg": "#D5ECFB", // 추가: 검색 강조태그 배경색
          "search-text": "#0070F3", // 추가: 검색 강조태그 텍스트색
          green: "#5ED513", // 추가: 커스텀 그린 태그색
        },

        // UI 요소 색상
        ui: {
          "tag-bg": "#F5F5F5", // 태그 배경색
          "tag-text": "#616161", // 태그 텍스트 색상
          muted: "#C5C5C5", // 흐린 텍스트 색상
          body: "#616161", // 본문 텍스트 색상
          "body-soft": "#737373", // 본문 보조 회색 (옛 #737373/#727272 통합)
          divider: "#F0F0F0", // 얇은 구분선 색상
          "divider-thick": "#EDEDED", // 두꺼운 구분선 색상 (4px)
          "divider-light": "#F1F1F1", // 카드 테두리용 옅은 구분선 (옛 #F1F1F1/#EEEEEE/#E7E7E7 통합)
          border: "#E2E2E2", // 테두리 색상
          "image-bg": "#B5B5B5", // 이미지 배경색
          count: "#ACACAC", // 카운터용 회색 (좋아요·댓글·조회수 등)
          "muted-soft": "#A7A7A7", // 살짝 진한 흐린 회색 (옛 #A7A7A7/#929292/#A4A4A4 통합)
          disabled: "#C5C5C5",
          error: "#f56565", // 추가: 에러 붉은색
        },

        // 마이페이지 색상
        mypage: {
          teal: "#016C5D", // 추가: 마이페이지 다크틸
          "teal-light": "#74d7cb", // 추가: 마이페이지 계열 연한 틸
        },
>>>>
```

- [ ] **Step 2: 빌드로 검증**

Run:
```bash
npm run build
```
Expected: `✓ Compiled successfully` 출력 + 에러 없음.

- [ ] **Step 3: 커밋**

```bash
git add tailwind.config.ts
git commit -m "Tailwind 디자인 토큰 확장 : chore : tailwind.config.ts에 누락된 전용 색상 토큰(마이페이지 틸·에러 레드·핫 태그 등) 추가 정의 https://github.com/Sejong-Balsamic/Malsami-FE/issues/654"
```

---

### Task 2: 컴포넌트 내 hex 하드코딩 16건 전면 제거 및 토큰 치환 (Surgical Precision)

**Files:**
- Modify: `src/components/common/buttons/SmallButton.tsx` (d1d1d1 -> ui-muted)
- Modify: `src/components/common/Card.tsx` (1D1E27 -> ui-body-soft)
- Modify: `src/components/common/CommonPagination.tsx` (08E4BA -> question-main)
- Modify: `src/components/common/SearchBar.tsx` (10DCB3 -> question-main)
- Modify: `src/components/common/tags/HotTag.tsx` (FF6723 -> tag-hot)
- Modify: `src/components/documentDetail/DocDetail.tsx` (3c3c3c -> ui-body)
- Modify: `src/components/documentPost/CustomTagsInput.tsx` (5ED513 -> tag-green)
- Modify: `src/components/mypage/ExpBar.tsx` (016D5D -> mypage-teal)
- Modify: `src/components/mypage/InfoCard.tsx` (016C5D -> mypage-teal)
- Modify: `src/components/mypage/MemberSummary.tsx` (74d7cb -> mypage-teal-light)
- Modify: `src/components/questionDetail/AnswerSection.tsx` (f56565 -> ui-error)
- Modify: `src/components/search/SearchInputField.tsx` (D5ECFB/0070F3 -> tag-search-bg/tag-search-text)
- Modify: `src/components/shadcn/checkbox.tsx` (03B89E -> legacy-teal, 727272 -> ui-body-soft)
- Modify: `src/components/shadcn/tabs.tsx` (727272 -> ui-body-soft, 03B8A3 -> legacy-teal)

- [ ] **Step 1: 공통 컴포넌트 hex 색상 정리**

`src/components/common/buttons/SmallButton.tsx` 수정:
```typescript
<<<<
 * <ButtonSmall backgroundClass="bg-[#d1d1d1]" textClass="text-white" text="단색 버튼" />
====
 * <ButtonSmall backgroundClass="bg-ui-muted" textClass="text-white" text="단색 버튼" />
>>>>
```

`src/components/common/Card.tsx` 수정:
```typescript
<<<<
        {number && <span className="text-[18px] font-bold leading-[18px] text-[#1D1E27]">{number}</span>}
====
        {number && <span className="text-[18px] font-bold leading-[18px] text-black">{number}</span>}
>>>>
```

`src/components/common/CommonPagination.tsx` 수정:
```typescript
<<<<
              {isCurrentPage && <div className="mt-0.5 h-px w-[14px] rounded-[2px] bg-[#08E4BA]" />}
====
              {isCurrentPage && <div className="mt-0.5 h-px w-[14px] rounded-[2px] bg-question-main" />}
>>>>
```

`src/components/common/SearchBar.tsx` 수정: (10DCB3 -> question.main인 `#00E271`과 수렴되므로 `question-main` 사용)
```typescript
<<<<
      <div className="flex w-full items-center justify-between rounded-[12px] border-[1px] border-[#10DCB3] bg-white p-3.5">
        <div className="flex w-full items-center gap-[12px]">
          <Search className="h-6 w-6 text-[#10DCB3]" />
          <input
            ref={inputRef}
            type="text"
            className="text-SUIT_16 w-full font-medium placeholder-[#C5C5C5] focus:outline-none"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center">
          {subject && <span className="mr-2 flex-shrink-0 text-SUIT_16 font-medium text-[#10DCB3]">{subject}</span>}
====
      <div className="flex w-full items-center justify-between rounded-[12px] border-[1px] border-question-main bg-white p-3.5">
        <div className="flex w-full items-center gap-[12px]">
          <Search className="h-6 w-6 text-question-main" />
          <input
            ref={inputRef}
            type="text"
            className="text-SUIT_16 w-full font-medium placeholder-[#C5C5C5] focus:outline-none"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center">
          {subject && <span className="mr-2 flex-shrink-0 text-SUIT_16 font-medium text-question-main">{subject}</span>}
>>>>
```

`src/components/common/tags/HotTag.tsx` 수정:
```typescript
<<<<
    <div className="inline-flex items-center justify-center rounded bg-[#FF6723] px-1.5 py-1">
====
    <div className="inline-flex items-center justify-center rounded bg-tag-hot px-1.5 py-1">
>>>>
```

- [ ] **Step 2: 비즈니스/상세 컴포넌트 hex 색상 정리**

`src/components/documentDetail/DocDetail.tsx` 수정:
```typescript
<<<<
                  <DrawerTitle className="font-pretendard-bold flex text-[14px] text-[#3c3c3c]">
====
                  <DrawerTitle className="font-pretendard-bold flex text-[14px] text-ui-body">
>>>>
```

`src/components/documentPost/CustomTagsInput.tsx` 수정:
```typescript
<<<<
            className="font-pretendard-bold flex items-center rounded-full bg-[#5ED513] px-3 text-xs text-white"
====
            className="font-pretendard-bold flex items-center rounded-full bg-tag-green px-3 text-xs text-white"
>>>>
```

`src/components/questionDetail/AnswerSection.tsx` 수정:
```typescript
<<<<
    return <p className="text-center text-SUIT_14 font-medium text-[#f56565]">{loadError}</p>;
====
    return <p className="text-center text-SUIT_14 font-medium text-ui-error">{loadError}</p>;
>>>>
```

`src/components/search/SearchInputField.tsx` 수정:
```typescript
<<<<
        <div className="mr-2 max-w-[50%] flex-shrink-0 overflow-hidden text-ellipsis whitespace-nowrap rounded bg-[#D5ECFB] px-2 py-[2px] text-sm text-[#0070F3]">
====
        <div className="mr-2 max-w-[50%] flex-shrink-0 overflow-hidden text-ellipsis whitespace-nowrap rounded bg-tag-search-bg px-2 py-[2px] text-sm text-tag-search-text">
>>>>
```

- [ ] **Step 3: 마이페이지 컴포넌트 hex 색상 정리**

`src/components/mypage/ExpBar.tsx` 수정:
```typescript
<<<<
  return <Progress value={progress} className="w-full border-2 border-[#016D5D] bg-transparent" />;
====
  return <Progress value={progress} className="w-full border-2 border-mypage-teal bg-transparent" />;
>>>>
```

`src/components/mypage/InfoCard.tsx` 수정:
```typescript
<<<<
                  <span className="font-pretendard-medium text-[14px] text-[#016C5D]">{nextRank}</span>
====
                  <span className="font-pretendard-medium text-[14px] text-mypage-teal">{nextRank}</span>
>>>>
```

`src/components/mypage/MemberSummary.tsx` 수정:
```typescript
<<<<
            className="flex h-[29px] items-center justify-between gap-[8px] rounded-[28px] border-2 border-[#74d7cb] bg-white px-[12px]"
====
            className="flex h-[29px] items-center justify-between gap-[8px] rounded-[28px] border-2 border-mypage-teal-light bg-white px-[12px]"
>>>>
```

- [ ] **Step 4: Shadcn UI 컴포넌트 hex 및 legacy 색상 정리**

`src/components/shadcn/checkbox.tsx` 수정:
```typescript
<<<<
      `peer h-4 w-4 shrink-0 rounded-lg border border-[#727272] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#03B89E] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-[#03B89E] data-[state=checked]:bg-[#03B89E]`,
====
      `peer h-4 w-4 shrink-0 rounded-lg border border-ui-body-soft ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-legacy-teal focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-legacy-teal data-[state=checked]:bg-legacy-teal`,
>>>>
```

`src/components/shadcn/tabs.tsx` 수정:
```typescript
<<<<
      "text-[#727272] data-[state=active]:bg-[#03B8A3] data-[state=active]:text-white",
====
      "text-ui-body-soft data-[state=active]:bg-legacy-teal data-[state=active]:text-white",
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
git add src/components/
git commit -m "UI 디자인 토큰 전면 수렴 : refactor : 개별 컴포넌트 및 shadcn UI 하드코딩 hex 색상 16건을 공통 테일윈드 토큰으로 1:1 완벽 교체 https://github.com/Sejong-Balsamic/Malsami-FE/issues/654"
```

---

## 완료 기준

- [ ] `tailwind.config.ts` 디자인 토큰 정상 확장 및 빌드 통과
- [ ] 14개 UI 컴포넌트 내의 hex 색상 하드코딩 16건 완벽 교정
- [ ] `npm run build` 가 에러나 타입 누락 없이 원샷 컴파일 통과
- [ ] 2개 커밋(토큰 확장, 컴포넌트 교체) 생성 및 원격 선형적 동기화 완료
