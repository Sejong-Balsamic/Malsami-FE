import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import AuthChecker from "@/utils/authChecker";
import Providers from "./providers"; // Redux Provider 컴포넌트
import "./globals.css";

export const metadata: Metadata = {
  title: "세종말싸미",
  description: "세종대학생을 위한 세종말싸미입니다.",
  icons: {
    icon: "https://i.ibb.co/JQRFwTD/logoicon.png", // 일반 아이콘
    apple: "https://i.ibb.co/JQRFwTD/logoicon.png", // 애플 터치 아이콘 (iOS)
  },
  openGraph: {
    title: "세종말싸미",
    description: "세종대학생을 위한 세종말싸미입니다.",
    url: "https://test.sejong-malsami.co.kr/",
    images: [
      {
        url: "https://i.ibb.co/JQRFwTD/logoicon.png",
        width: 1200,
        height: 1200,
        alt: "세종말싸미 로고",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* 기본 Meta 태그 */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />

        {/* Open Graph 메타 태그 */}
        <meta property="og:title" content="세종말싸미" />
        <meta property="og:description" content="세종대학생을 위한 세종말싸미입니다." />
        <meta property="og:image" content="https://i.ibb.co/JQRFwTD/logoicon.png" />
        <meta property="og:url" content="https://test.sejong-malsami.co.kr/" />
        <meta property="og:type" content="website" />
      </head>
      <body>
        <Providers>
          <AuthChecker>{children}</AuthChecker> {/* AuthChecker로 인증 확인 */}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
