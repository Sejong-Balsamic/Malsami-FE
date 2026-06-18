// SEO 관련 모든 값의 단일 출처(Single Source of Truth)
// 도메인은 환경변수(NEXT_PUBLIC_SITE_URL)를 우선 사용하고, 없으면 프로덕션 도메인을 기본값으로 사용한다.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sejong-malsami.suhsaechan.kr";

export const SITE_CONFIG = {
  name: "세종말싸미",
  title: "세종말싸미",
  description: "세종대학생을 위한 학업증진 플랫폼, 세종말싸미입니다. 자료 공유와 질문·답변으로 함께 공부해요.",
  url: SITE_URL,
  // 소셜 공유(OpenGraph) 썸네일 이미지 — public/image/og-image.png
  ogImage: `${SITE_URL}/image/og-image.png`,
  keywords: ["세종대학교", "세종말싸미", "세종대 자료", "세종대 질문", "학업 커뮤니티", "족보", "강의자료"],
} as const;
