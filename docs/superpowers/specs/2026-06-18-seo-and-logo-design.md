# SEO 개선 + 로고 전면 교체 설계

> 작성일: 2026-06-18
> 대상: Malsami-FE (Next.js 14.2.13, App Router)

## 1. 배경 / 목적

현재 프로젝트의 SEO 설정은 루트 `layout.tsx` 한 곳에만 최소한으로 존재하며, 다음이 누락되어 있다.

- `metadataBase` 없음 → OG/canonical 상대경로가 절대경로로 변환되지 않음
- sitemap / robots / manifest 전무
- OG·favicon 이미지가 외부 무료 호스팅(`i.ibb.co`) URL에 의존 → 호스팅 장애 시 깨짐
- OG URL이 구 테스트 도메인(`test.sejong-malsami.co.kr`)으로 하드코딩
- 동적 상세 페이지가 전부 `"use client"`라 페이지별 메타데이터 없음

동시에, 프로젝트 전반에 흩어진 **구 로고 자산을 신규 로고로 전면 교체**한다.

확정된 전제:

- 프로덕션 도메인: `https://sejong-malsami.suhsaechan.kr`
- 도메인 관리 방식: 환경변수 우선 + 코드 기본값 fallback
- 동적 페이지 SEO: 이번에는 **골격(패턴 + TODO)만**. 공개 API 확정 전까지 기본 메타데이터로 동작.
- 신규 로고 원본 2종:
  - `로고_배경제거.png` (투명 배경) — UI 내부에 얹는 헤더 로고용
  - `로고_검은배경.png` (검은 배경, 정사각) — 파비콘 / 앱 아이콘 / OG 이미지용

## 2. 파트 A — 로고 전면 교체

### 2.1 신규 로고 자산 배치

| 신규 경로 | 원본 | 용도 |
| --- | --- | --- |
| `public/image/logo.png` | 로고_배경제거.png | 헤더 로고 (투명 배경, UI 내부) |
| `public/image/og-image.png` | 로고_검은배경.png | 소셜 공유 썸네일(OG) |
| `src/app/icon.png` | 로고_검은배경.png | 파비콘 (App Router 자동 인식) |
| `src/app/apple-icon.png` | 로고_검은배경.png | iOS 홈화면 아이콘 (App Router 자동 인식) |

> Next.js App Router는 `app/icon.png` / `app/apple-icon.png`를 두면 favicon / apple-touch-icon 메타 태그를 자동 생성한다. 따라서 metadata에서 `icons`를 수동 지정할 필요가 없어지고, 외부 URL 의존이 사라진다.

### 2.2 삭제 대상 (기존 로고 전부 제거)

- `public/image/logo.webp`
- `public/image/old-logo.webp`
- `public/deprecated/Logo.svg`
- `layout.tsx` 내 `i.ibb.co` URL 4곳

### 2.3 코드 수정

- `src/components/icons/LogoIcon.tsx`
  - `src="/image/logo.webp"` → `src="/image/logo.png"` (투명 신규 로고)

## 3. 파트 B — SEO 개선

### 3.1 신규: `src/lib/seo.ts` (SEO 단일 소스)

모든 SEO 값(도메인, 기본 title/description, OG 이미지)의 단일 출처.

```ts
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sejong-malsami.suhsaechan.kr";

export const SITE_CONFIG = {
  name: "세종말싸미",
  title: "세종말싸미",
  description:
    "세종대학생을 위한 학업증진 플랫폼, 세종말싸미입니다. 자료 공유와 질문·답변으로 함께 공부해요.",
  url: SITE_URL,
  ogImage: `${SITE_URL}/image/og-image.png`,
} as const;
```

### 3.2 수정: `src/app/layout.tsx`

- `metadataBase: new URL(SITE_CONFIG.url)` 추가
- title을 `{ default, template: "%s | 세종말싸미" }` 패턴으로 변경
- `i.ibb.co` URL 전부 제거 (icons는 App Router 자동 처리에 위임)
- `<head>` 내 수동 `<meta property="og:...">` 태그 제거 → metadata API로 일원화
- `openGraph`, `keywords`, `robots`(index/follow), `alternates.canonical` 보강
- 데이터 출처는 `SITE_CONFIG` 참조

### 3.3 신규: `src/app/sitemap.ts`

정적 라우트(랜딩 `/`, 자료게시판, 질문게시판, 로그인, 공지 등) 사이트맵 자동 생성. `SITE_URL` 기준 절대경로.

### 3.4 신규: `src/app/robots.ts`

- 전체 크롤링 허용(`allow: "/"`)
- 인증·내부 경로(`/mypage`, `/login` 등 노출 불필요 경로)는 `disallow`
- `sitemap` 위치 명시

### 3.5 신규: `src/app/manifest.ts` (PWA)

앱 이름, short_name, 아이콘(신규 로고), `theme_color`, `background_color`, `display: standalone`.

### 3.6 동적 페이지 — 골격만

상세 페이지(`[id]/page.tsx`)는 현재 `"use client"`. 전면 서버 전환은 리스크가 커 이번 범위에서 제외.

- 자료 상세 라우트에 **패턴 예시**로 정적 `metadata` 또는 주석 처리된 `generateMetadata` 골격 + `// TODO: 공개 API 확정 시 게시글 제목/내용으로 동적 메타데이터 채우기` 명시.
- 공개 API 확정 시 서버/클라이언트 컴포넌트 분리하여 `generateMetadata` 적용 (별도 작업).

## 4. 영향 범위

| 구분 | 파일 |
| --- | --- |
| 신규 | `src/lib/seo.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/manifest.ts`, `src/app/icon.png`, `src/app/apple-icon.png`, `public/image/og-image.png` |
| 수정 | `src/app/layout.tsx`, `src/components/icons/LogoIcon.tsx`, `public/image/logo.png`(덮어쓰기) |
| 삭제 | `public/image/logo.webp`, `public/image/old-logo.webp`, `public/deprecated/Logo.svg` |

## 5. 검증

- `npx prettier --write .`
- `npm run build` → `✓ Compiled successfully` + `.next/` 생성 확인
- 로컬에서 헤더 로고/파비콘 표시 확인
- `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` 접근 확인

## 6. 범위 밖 (이번 작업 제외)

- 동적 상세 페이지의 서버 컴포넌트 전환 및 실제 `generateMetadata` 데이터 연동
- JSON-LD 구조화 데이터 (후속 권장)
- 검색엔진 소유권 인증 메타태그(google/naver site-verification) — 값 확보 후 추가
