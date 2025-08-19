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
  name: "feature",        // camelCase
  initialState,
  reducers: {
    setIsOpen: (state, action) => {    // 동사 형태
      state.isOpen = action.payload;
    },
    showFeature: (state, action) => {  // 구체적인 액션명
      state.isOpen = true;
      state.content = action.payload;
    }
  }
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
className="w-[393px] h-[60px]"

// ✅ 올바른 방법 - 동적 계산
className="w-full h-15"
className="w-1/2"          // 부모 기준 50%
className="flex-1"         // 나머지 모든 공간
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
const [loading, setLoading] = useState<boolean>(false);  // is 없음
const [hasPermission, setHasPermission] = useState<boolean>(false);  // has 사용 금지
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

### 자주 사용하는 명령어
```bash
npm run dev          # 개발 서버 실행
npm run build        # 프로덕션 빌드
npm run lint         # 린트 검사
npm run lint:fix     # 린트 자동 수정
npm run prettier     # 코드 포맷팅
```

### 환경 설정
- **Node.js**: 18+ 권장
- **브라우저 지원**: 모던 브라우저 (ES6+ 지원)
- **모바일 우선**: iPhone 16 기준 (375px) 반응형 디자인

---

## 📌 중요 체크리스트

### 새 컴포넌트 작성 시
- [ ] Props 인터페이스 정의 (ComponentName + Props)
- [ ] Boolean 변수에 is 접두사 사용
- [ ] 스켈레톤 UI 함께 작성
- [ ] Tailwind CSS 클래스 사용 (인라인 스타일 금지)
- [ ] 반응형 디자인 적용

### API 개발 시  
- [ ] apiUtils.ts의 postApiRequest 사용
- [ ] Command/Dto 타입 정의
- [ ] FormData 기반 통신
- [ ] 적절한 에러 처리

### 리팩토링 시
- [ ] deprecated 폴더 확인 및 제거
- [ ] 새로운 API 패턴으로 변경
- [ ] 타입 시스템 통합
- [ ] 명명 규칙 준수

---

이 문서는 Malsami-FE 프로젝트의 완전한 개발 가이드입니다. 새로운 기능 개발이나 리팩토링 시 이 가이드를 참조하여 일관된 코드 품질을 유지해 주세요.