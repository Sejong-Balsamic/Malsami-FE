# 📚 Malsami-FE 프로젝트 완전 분석 및 개발 가이드

## 📋 목차

- [프로젝트 개요](#-프로젝트-개요)
- [기술 스택](#-기술-스택)
- [프로젝트 구조 분석](#-프로젝트-구조-분석)
- [API 통신 구조](#-api-통신-구조)
- [컴포넌트 구조](#-컴포넌트-구조)
- [상태 관리](#-상태-관리)
- [타입 시스템](#-타입-시스템)
- [스타일링 시스템](#-스타일링-시스템)
- [개발 가이드라인](#-개발-가이드라인)
- [리팩토링 주의사항](#-리팩토링-주의사항)

---

## 🎯 프로젝트 개요

### 세종말싸미 (Sejong Malsami)

세종대학교 학생들을 위한 학업증진 플랫폼으로, 자료 공유 및 질문-답변 커뮤니티를 제공하는 웹 서비스입니다.

### 주요 기능

- **자료 공유**: 4단계 등급 시스템 (천민/중인/양반/왕)
- **질문 & 답변**: 엽전 기반 보상 시스템
- **엽전 시스템**: 포인트 기반 경제 시스템
- **실시간 알림**: WebSocket 기반 푸시 알림
- **경험치 & 뱃지**: 18단계 조선시대 관리직 등급 시스템

---

## 🛠 기술 스택

### 핵심 기술

- **Frontend**: React 18 + Next.js 14.2.13 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.14 + Tailwind Animate
- **State Management**: Redux Toolkit 2.4.0 + React-Redux 9.1.2
- **HTTP Client**: Axios 1.7.7
- **UI Components**: Radix UI + Shadcn/UI
- **Animation**: Framer Motion 12.18.1

### 개발 도구

- **Linting**: ESLint (Airbnb Config) + Prettier
- **Build**: Next.js 빌드 시스템
- **Package Manager**: npm

### 주요 라이브러리

- **UI**: Lucide React (아이콘), Swiper (슬라이더), Vaul (바텀시트)
- **Utils**: clsx, tailwind-merge, class-variance-authority
- **Firebase**: 푸시 알림 및 실시간 기능

---

## 📁 프로젝트 구조 분석

### 전체 구조

```
src/
├── app/                    # Next.js App Router 페이지
├── components/            # 재사용 가능한 UI 컴포넌트
├── apis/                  # API 통신 로직
├── types/                 # TypeScript 타입 정의
├── global/                # 전역 상태 및 유틸리티
├── hooks/                 # 커스텀 훅
└── deprecated/            # 레거시 코드 (사용 금지)
```

### 컴포넌트 구조 세부사항

#### ✅ 현재 사용 중인 컴포넌트

```
components/
├── common/                # 공통 컴포넌트
│   ├── skeletons/         # 로딩 스켈레톤 UI
│   ├── tags/              # 태그 컴포넌트들
│   ├── buttons/           # 버튼 컴포넌트들
│   ├── modal/             # 모달 컴포넌트들
│   └── FABs/              # Floating Action Buttons
├── documentMain/          # 자료게시판 메인
├── documentDetail/        # 자료 상세 페이지
├── documentPost/          # 자료 작성 페이지
├── questionMain/          # 질문게시판 메인
├── questionDetail/        # 질문 상세 페이지
├── questionPost/          # 질문 작성 페이지
├── questionAnswer/        # 답변 작성
├── questionComment/       # 댓글 기능
├── header/                # 헤더 컴포넌트들
├── landing/               # 랜딩 페이지
├── login/                 # 로그인 페이지
├── mypage/                # 마이페이지
├── notice/                # 공지사항
├── search/                # 검색 기능
├── shadcn/                # Shadcn UI 컴포넌트
└── util/                  # 유틸리티 컴포넌트
```

#### ❌ 사용 금지 (Deprecated)

```
components/deprecated/     # 절대 사용하지 말 것!
```

---

## 🌐 API 통신 구조

### API 구조 분석

#### ✅ 현재 사용해야 할 API 파일

```
apis/
├── apiUtils.ts            # API 공통 유틸리티 (가장 중요!)
├── appClient.ts           # Axios 인스턴스
├── authApi.ts             # 인증 관련
├── memberApi.ts           # 회원 관리
├── documentPostApi.ts     # 문서 게시물
├── questionPostApi.ts     # 질문 게시물
├── answerPostApi.ts       # 답변 게시물
├── commentApi.ts          # 댓글
├── likeApi.ts             # 좋아요
├── notificationApi.ts     # 알림
└── reportApi.ts           # 신고
```

#### ❌ 사용 금지 (Deprecated)

```
apis/document/            # 절대 사용하지 말 것!
apis/question/            # 절대 사용하지 말 것!
apis/search/              # 절대 사용하지 말 것!
apis/deprecated/          # 절대 사용하지 말 것!
```

### API 통신 패턴

#### 1. FormData 기반 통신 (프로젝트 표준)

```typescript
// ✅ 올바른 방법 - apiUtils 사용
import { postApiRequest } from "@/apis/apiUtils";

export const createDocument = async (command: Partial<DocumentCommand>) => {
  return await postApiRequest<DocumentCommand, DocumentDto>("/api/documents", command);
};
```

#### 2. 인증 토큰 시스템

- **AccessToken**: sessionStorage 저장, 모든 API 요청에 Bearer 토큰으로 전송
- **RefreshToken**: 쿠키 저장, 토큰 갱신 시에만 사용

#### 3. Command/Dto 패턴

- **요청**: ~Command 인터페이스 사용
- **응답**: ~Dto 인터페이스 사용
- **모든 API**: POST + FormData 형식으로 통신

---

## 🧩 컴포넌트 구조

### 컴포넌트 작성 규칙

#### 기본 구조

```typescript
"use client"; // 클라이언트 컴포넌트인 경우만

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

interface ComponentProps {
  title: string;
  isVisible?: boolean;
  onClose?: () => void;
}

export default function ComponentName({ title, isVisible = true, onClose }: ComponentProps) {
  // 1. 훅 선언
  const dispatch = useDispatch();

  // 2. 상태 선언
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 3. 이벤트 핸들러
  const handleClick = () => {};

  // 4. useEffect
  useEffect(() => {}, []);

  // 5. 조건부 렌더링
  if (isLoading) return <ComponentSkeleton />;

  // 6. 메인 렌더링
  return <div className="component-wrapper">{/* 내용 */}</div>;
}
```

### Skeleton UI 규칙 (매우 중요!)

```
components/common/skeletons/
├── MovingCardSkeleton.tsx        # MovingCard 전용
├── QuestionCardSkeleton.tsx      # QuestionCard 전용
├── DocumentCardSkeleton.tsx      # DocumentCard 전용
└── index.ts                      # 모든 스켈레톤 export
```

**스켈레톤 특징:**

- Props 절대 사용 금지 (완전히 하드코딩)
- 원본 컴포넌트명 + Skeleton 명명 규칙
- animate-pulse 클래스 사용
- 고정된 개수와 구조로 렌더링

---

## 🗃 상태 관리

### Redux Store 구조

```
global/store/
├── index.ts                      # 스토어 설정
├── authSlice.ts                  # 인증 상태
├── bottomSheetSlice.ts           # 바텀시트 상태
├── modalSlice.ts                 # 모달 상태
├── toastSlice.ts                 # 토스트 알림
├── facultySlice.ts               # 학과 정보
├── filterOptionsSlice.ts         # 필터 옵션들
└── ...기타 슬라이스들
```

### Redux 슬라이스 패턴

```typescript
interface FeatureState {
  isOpen: boolean;
  content: string | null;
}

const featureSlice = createSlice({
  name: "feature", // camelCase
  initialState,
  reducers: {
    setIsOpen: (state, action) => {
      // 동사 형태
      state.isOpen = action.payload;
    },
    showFeature: (state, action) => {
      // 구체적인 액션명
      state.isOpen = true;
      state.content = action.payload;
    },
  },
});
```

### 커스텀 훅

```
global/hook/
├── useLogout.ts                  # 로그아웃 로직
├── useMemberInfo.ts              # 회원 정보 관리
├── useToast.ts                   # 토스트 알림 관리
└── useOptimalPageSizeForBoard.ts # 페이지네이션 관리
```

---

## 📊 타입 시스템

### 타입 정의 구조

```
types/
├── api/                          # API 관련 타입 (백엔드 동기화)
│   ├── constants/                # API 상수들
│   ├── entities/                 # 데이터베이스 엔티티
│   ├── requests/                 # API 요청 타입 (Command)
│   └── responses/                # API 응답 타입 (Dto)
├── components/                   # 컴포넌트 props 타입
└── global/                       # 전역 타입 정의
```

### 타입 명명 규칙

```typescript
// ✅ 올바른 타입 정의
interface DocumentCommand { ... }    // 요청 타입
interface DocumentDto { ... }        // 응답 타입
interface ComponentProps { ... }     // 컴포넌트 Props

// ✅ const assertion 활용
export const ContentType = {
  DOCUMENT: "DOCUMENT",
  QUESTION: "QUESTION",
} as const;

export type ContentType = keyof typeof ContentType;
```

---

## 🎨 스타일링 시스템

### Tailwind CSS 설정

- **Primary Color**: Blue 계열 (document-main: #00D1F2)
- **Secondary Color**: Green 계열 (question-main: #00E8BB)
- **Font**: SUIT 폰트 (text-SUIT_16, text-SUIT_14 등)
- **간격**: Tailwind 표준 (gap-3 = 12px, p-4 = 16px)

### 색상 시스템

```css
/* 게시판 테마 색상 */
document-main: #00D1F2     /* 자료게시판 */
question-main: #00E8BB     /* 질문게시판 */

/* 태그 색상 */
tag-yeopjeon: #FFB000      /* 엽전 태그 */
tag-accept: #0062D2        /* 채택 태그 */

/* UI 요소 */
ui-tag-bg: #F5F5F5         /* 태그 배경 */
ui-muted: #C5C5C5          /* 흐린 텍스트 */
ui-divider: #F0F0F0        /* 구분선 */
```

### 반응형 디자인 원칙

```typescript
// ❌ 절대 금지 - 하드코딩
className = "w-[393px] h-[60px]";

// ✅ 올바른 방법 - 동적 계산
className = "w-full h-15";
className = "w-1/2"; // 부모 기준 50%
className = "flex-1"; // 나머지 모든 공간
```

### 🚨 스타일링 엄격 규칙 (절대 준수!)

#### 🎨 **Figma 디자인 → 프로젝트 표준 변환 원칙 (매우 중요!)**

**⚠️ 모든 Figma 디자인 사양은 반드시 프로젝트 표준으로 변환해야 합니다! ⚠️**

- ❌ **절대 금지**: Figma에서 제공하는 픽셀 값이나 색상 코드를 그대로 사용
- ✅ **필수**: 모든 값을 Tailwind CSS 유틸리티 클래스로 변환
- ✅ **필수**: 프로젝트 색상 시스템 사용 (document-main, question-main, ui-muted 등)

#### Figma → Tailwind 변환 가이드

```typescript
// ❌ Figma 값 그대로 사용 (절대 금지!)
className="w-[292px] h-[194px]"           // Figma 픽셀 값
className="bg-[#00D1F2]"                  // Figma 색상 코드
style={{ color: "#A7A7A7" }}             // 인라인 Figma 색상
className="text-[12px]"                   // Figma 폰트 크기

// ✅ 프로젝트 표준으로 변환 (필수!)
className="w-72 h-48"                     // Tailwind 표준 클래스
className="bg-document-main"              // 프로젝트 색상 시스템
className="text-ui-muted"                 // 프로젝트 색상 토큰
className="text-SUIT_12"                  // 프로젝트 폰트 시스템
```

#### 기준 화면 크기

- **iPhone 15 Pro**: 393 \* 852px (개발 기준)
- **최대 컨테이너 너비**: 640px (`max-w-[640px]`)

#### 절대 금지사항

```typescript
// ❌ 인라인 스타일 절대 금지
style={{ width: "calc(100% - 40px)", maxWidth: "600px" }}
style={{ background: "rgba(0, 0, 0, 0.40)" }}

// ❌ 픽셀값 하드코딩 금지 (Figma 값 포함!)
className="fixed bottom-[100px]"
className="w-[393px] h-[852px]"
className="w-[292px] h-[194px]"         // Figma에서 온 값이어도 금지!

// ❌ 색상 코드 하드코딩 금지 (Figma 색상 포함!)
className="bg-[#00D1F2]"                // Figma 색상이어도 금지!
className="text-[#A7A7A7]"              // Figma 색상이어도 금지!

// ❌ z-index 하드코딩 금지
className="z-[200]"
```

#### 올바른 Tailwind 사용법

```typescript
// ✅ 컨테이너 및 위치 지정
className = "fixed bottom-5 left-1/2 w-full max-w-[640px] -translate-x-1/2 px-5";

// ✅ 배경 및 투명도
className = "bg-black/40 backdrop-blur-sm";

// ✅ z-index 시스템
className = "z-50"; // 표준 z-index
className = "z-10"; // 낮은 우선순위
className = "z-20"; // 중간 우선순위

// ✅ 너비 시스템
className = "w-full"; // 부모 기준 100%
className = "w-screen"; // 뷰포트 기준 100%
className = "max-w-[640px]"; // 최대 너비 제한
```

#### 반응형 간격 시스템

```typescript
// ✅ 표준 간격 사용
className = "p-5"; // 20px 패딩 (iPhone 15 Pro 기준)
className = "mx-5"; // 좌우 20px 마진
className = "gap-4"; // 16px 간격
className = "space-y-3"; // 수직 12px 간격
```

---

## 📝 개발 가이드라인

### 명명 규칙

#### 파일명

- **컴포넌트**: PascalCase (DocumentUploadCard.tsx)
- **유틸리티**: camelCase (documentValidator.ts)
- **타입 파일**: camelCase (documentCommand.ts)

#### 변수명 (매우 중요!)

```typescript
// ✅ Boolean 변수 - 반드시 is 접두사
const [isLoading, setIsLoading] = useState<boolean>(false);
const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

// ❌ 절대 금지
const [loading, setLoading] = useState<boolean>(false); // is 없음
const [hasPermission, setHasPermission] = useState<boolean>(false); // has 사용 금지
```

#### 함수명

```typescript
// ✅ 동작 중심 명명
function validateUserCredentials() {}
function transformDocumentData() {}

// ✅ 이벤트 핸들러
const handleDocumentUpload = () => {};
const handleQuestionSubmission = () => {};
```

### 컴포넌트 규칙

#### Props 인터페이스

```typescript
// ✅ 컴포넌트명 + Props
interface DocBoardCardProps {
  tier: PostTiersKey;
  link: string;
  accessible: boolean;
}

// ❌ 절대 금지
interface Props { ... }                    // 너무 일반적
interface IDocBoardCardProps { ... }       // I 접두사 금지
```

---

## ⚠️ 리팩토링 주의사항

### 🚨 절대 사용하지 말 것

#### Deprecated 폴더들

```
❌ src/deprecated/           # 모든 파일 사용 금지
❌ src/apis/document/        # 옛날 API, 사용 금지
❌ src/apis/question/        # 옛날 API, 사용 금지
❌ src/apis/search/          # 옛날 API, 사용 금지
❌ src/components/deprecated/ # 옛날 컴포넌트, 사용 금지
```

#### 오래된 패턴들

```typescript
// ❌ 오래된 API 호출 방식
import { apiClient } from "@/apis/appClient";
const response = await apiClient.post("/api/...", formData);

// ✅ 새로운 방식 - apiUtils 사용
import { postApiRequest } from "@/apis/apiUtils";
const response = await postApiRequest<Command, Dto>("/api/...", command);
```

### 🔄 리팩토링 가이드

#### 1. API 리팩토링

```typescript
// 기존 코드를 발견하면
❌ src/apis/document/getDocumentDetails.ts
❌ src/apis/question/getQuestionDetails.ts

// 이렇게 변경
✅ documentPostApi.getDocumentPost()
✅ questionPostApi.getQuestionPost()
```

#### 2. 컴포넌트 리팩토링

```typescript
// 기존 deprecated 컴포넌트 발견 시
❌ src/components/deprecated/MovingCardDocument.tsx
❌ src/deprecated/AllDocument.tsx

// 새로운 컴포넌트 사용
✅ src/components/common/MovingCardDocument.tsx
✅ src/components/landing/AllDocumentsSection.tsx
```

#### 3. 타입 리팩토링

```typescript
// 기존 분산된 타입들
❌ src/types/DocumentDetailData.ts
❌ src/types/QnaCard.ts

// 새로운 통합 타입 시스템
✅ src/types/api/responses/documentDto.ts
✅ src/types/api/responses/questionDto.ts
```

---

## 🛠 개발 명령어

** 매우 중요한 CLI 명령어 사용법**:

```bash
source ~/.zshrc &&
```

를 붙여서 모든 명령어를 실행해야지 작동함

**코드 변경 후 마지막에 꼭 실행**:

```bash
source ~/.zshrc && npm run build
```

### 환경 설정

- **Node.js**: 18+ 권장
- **브라우저 지원**: 모던 브라우저 (ES6+ 지원)
- **모바일 우선**: iPhone 16 기준 (375px) 반응형 디자인

---

## 🔔 토스트 알림 시스템

### 새로운 토스트 시스템 (권장)

```typescript
import useCommonToast from "@/global/hook/useCommonToast";

const MyComponent = () => {
  const { showToast, showConfirmToast, showWarningToast, showYeopjeonToast } = useCommonToast();

  // 기본 사용법
  showToast("메시지", "confirm"); // confirm, warning, yeopjeon 타입 지원

  // 편의 메서드
  showConfirmToast("성공 메시지"); // 초록색 확인 아이콘
  showWarningToast("경고 메시지"); // 노란색 경고 아이콘
  showYeopjeonToast("엽전 메시지"); // 엽전 아이콘
};
```

### ❌ 사용 금지 (Deprecated)

```typescript
// 절대 사용하지 말 것!
import { showToast } from "@/global/toastUtils"; // deprecated
import { ToastIcon, ToastAction } from "@/components/shadcn/toast"; // deprecated
import { useToast } from "@/global/hook/useToast"; // deprecated
```

### 토스트 아이콘 종류

- **confirm**: `/icons/confirmToast.svg` (초록색 체크)
- **warning**: `/icons/warningToast.svg` (노란색 경고)
- **yeopjeon**: `/icons/yeopjeonToast.svg` (엽전 아이콘)

---

## 📌 중요 체크리스트

### 새 컴포넌트 작성 시

- [ ] Props 인터페이스 정의 (ComponentName + Props)
- [ ] Boolean 변수에 is 접두사 사용
- [ ] 스켈레톤 UI 함께 작성
- [ ] Tailwind CSS 클래스 사용 (인라인 스타일 금지)
- [ ] 반응형 디자인 적용
- [ ] **새로운 토스트 시스템 사용** (`useCommonToast`)

### API 개발 시

- [ ] apiUtils.ts의 postApiRequest 사용
- [ ] Command/Dto 타입 정의
- [ ] FormData 기반 통신
- [ ] 적절한 에러 처리
- [ ] **에러 메시지에 토스트 알림 적용**

### 리팩토링 시

- [ ] deprecated 폴더 확인 및 제거
- [ ] 새로운 API 패턴으로 변경
- [ ] 타입 시스템 통합
- [ ] 명명 규칙 준수
- [ ] **기존 토스트를 새 시스템으로 변경**

### 모든 답변 답변 에 대해서 확인해야할점

- [ ] **🎨 Figma → 프로젝트 표준 변환 검수 (가장 중요!)**
  - [ ] Figma 픽셀값(w-[292px] 등) 사용 금지 확인
  - [ ] Figma 색상코드(#00D1F2 등) 사용 금지 확인
  - [ ] Tailwind 표준 클래스 변환 완료 확인
  - [ ] 프로젝트 색상 시스템 사용 확인
- [ ] **스타일 가이드라인 검수**
  - [ ] Tailwind CSS 클래스 사용 (text-SUIT_14, text-SUIT_16 등)
  - [ ] 색상 시스템 준수 (ui-muted, ui-divider 등)
  - [ ] 하드코딩된 픽셀값 제거
  - [ ] 인라인 스타일 제거 확인
  - [ ] 반응형 디자인 적용
- [ ] **명명 규칙 검수**
  - [ ] Boolean 변수 is 접두사 확인
  - [ ] 컴포넌트 Props 인터페이스 명명
  - [ ] 이벤트 핸들러 handle 접두사
- [ ] **토스트 시스템 검수**
  - [ ] useCommonToast 사용 확인
  - [ ] deprecated 토스트 시스템 사용 금지
  - [ ] 적절한 토스트 타입 선택 (confirm/warning/yeopjeon)
- [ ] **빌드 테스트 실행**
  ```bash
  source ~/.zshrc && npm run build
  ```
  - [ ] ESLint 오류 해결
  - [ ] TypeScript 타입 오류 해결
  - [ ] Prettier 포맷팅 오류 해결

---
