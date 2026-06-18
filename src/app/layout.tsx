import type { Metadata, Viewport } from "next";
import CommonToast from "@/components/common/CommonToast";
import FcmInitializer from "@/components/common/FcmInitializer"; // FCM 초기화 컴포넌트
import { initializeFirebase } from "@/global/firebaseUtil";
import Providers from "@/app/providers"; // Redux Provider 컴포넌트
import { SITE_CONFIG } from "@/constants/seo";
import "./globals.css";
import ClientLayout from "./ClientLayout"; // 클라이언트용 레이아웃 추가

// Firebase 초기화 실행
initializeFirebase();

// 파비콘/앱 아이콘은 App Router 컨벤션(src/app/icon.png, src/app/apple-icon.png)으로 자동 처리되므로
// metadata.icons를 별도로 지정하지 않는다.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [...SITE_CONFIG.keywords],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    locale: "ko_KR",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 1200,
        alt: `${SITE_CONFIG.name} 로고`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <FcmInitializer />
          {/* 클라이언트 사이드 레이아웃 (Nav 표시 조건 포함) */}
          <ClientLayout>{children}</ClientLayout>
          <CommonToast />
        </Providers>
      </body>
    </html>
  );
}
