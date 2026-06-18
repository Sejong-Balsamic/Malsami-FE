import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/seo";

interface DocumentDetailLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

// 자료 상세 페이지(page.tsx)는 클라이언트 컴포넌트라 metadata를 직접 export할 수 없으므로
// 서버 컴포넌트인 이 layout에서 generateMetadata로 페이지별 메타데이터를 주입한다.
//
// TODO: 백엔드에 인증 없이 호출 가능한 공개 자료 조회 API가 확정되면,
//       아래에서 params.id로 게시글을 조회해 제목·내용 요약을 동적 메타데이터로 채운다.
//       (현재는 토큰이 필요한 사적 API뿐이라 SSR에서 데이터 접근이 불가해 기본값으로 동작한다.)
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const title = "자료 상세보기";
  const canonical = `/board/document/detail/${params.id}`;

  return {
    title,
    description: SITE_CONFIG.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${title} | ${SITE_CONFIG.name}`,
      description: SITE_CONFIG.description,
      url: `${SITE_CONFIG.url}${canonical}`,
      images: [{ url: SITE_CONFIG.ogImage, width: 1200, height: 1200, alt: `${SITE_CONFIG.name} 로고` }],
    },
  };
}

export default function DocumentDetailLayout({ children }: DocumentDetailLayoutProps) {
  return children;
}
