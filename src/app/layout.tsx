import type { Metadata } from "next";
import CommonToast from "@/components/common/CommonToast";
import LoginDirectModal from "@/components/common/LoginDirectModal";
import FcmInitializer from "@/components/common/FcmInitializer"; // FCM 초기화 컴포넌트
import { initializeFirebase } from "@/global/firebaseUtil";
import Providers from "@/app/providers"; // Redux Provider 컴포넌트
import "./globals.css";
import ClientLayout from "./ClientLayout"; // 클라이언트용 레이아웃 추가

// Firebase 초기화 실행
initializeFirebase();

export const metadata: Metadata = {
  title: "세종말싸미",
  description: "세종대학생을 위한 세종말싸미입니다.",
  icons: {
    icon: "https://i.ibb.co/JQRFwTD/logoicon.png",
    apple: "https://i.ibb.co/JQRFwTD/logoicon.png",
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta property="og:title" content="세종말싸미" />
        <meta property="og:description" content="세종대학생을 위한 세종말싸미입니다." />
        <meta property="og:image" content="https://i.ibb.co/JQRFwTD/logoicon.png" />
        <meta property="og:url" content="https://test.sejong-malsami.co.kr/" />
        <meta property="og:type" content="website" />
      </head>
      <body>
        <Providers>
          <FcmInitializer />
          {/* 클라이언트 사이드 레이아웃 (Nav 표시 조건 포함) */}
          <ClientLayout>{children}</ClientLayout>
          <CommonToast />
          <LoginDirectModal />
        </Providers>
      </body>
    </html>
  );
}
