import { useEffect } from "react";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import LoginDirectModal from "@/components/common/LoginDirectModal";
import initializeFirebase from "@/utils/firebaseInit";
import { getFcmToken } from "@/utils/firebaseMessaging";
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

// Firebase 초기화 실행
initializeFirebase();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // FCM 토큰 로컬 저장
  useEffect(() => {
    async function fetchToken() {
      const token = await getFcmToken();
      if (token) {
        localStorage.setItem("fcmToken", token);
        console.log("FCM 토큰 로컬 스토리지에 저장:", token);
      }
    }
    fetchToken();
  }, []);

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
          {children}
          <Toaster />
          <LoginDirectModal />
        </Providers>
      </body>
    </html>
  );
}
