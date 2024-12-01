import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import Providers from "./providers"; // Redux Provider 컴포넌트
import "./globals.css";

export const metadata: Metadata = {
  title: "세종말싸미",
  description: "세종대학생을 위한 세종말싸미입니다.",
  icons: {
    icon: "/images/logo.png", // 일반 아이콘
    apple: "/images/logo.png", // 애플 터치 아이콘 (iOS)
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* Meta 태그 추가 */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </head>
      <body>
        <Providers>
          {children} <Toaster />
        </Providers>
      </body>
    </html>
  );
}
