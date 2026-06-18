import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/seo";

// 검색엔진에 색인 가치가 있는 공개 정적 경로만 포함한다.
// 개인 페이지(/mypage), 로그인, 작성 폼(/post), 테스트 경로는 제외한다.
const STATIC_PATHS = [
  "/",
  "/board/document",
  "/board/document/hot",
  "/board/question",
  "/board/question/all",
  "/board/question/bounty",
  "/board/question/hot",
  "/board/question/major",
  "/notice",
  "/search",
  "/help",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return STATIC_PATHS.map(path => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "daily",
    priority: path === "/" ? 1 : 0.7,
  }));
}
