"use client";

import { usePathname } from "next/navigation";
import CommonNav from "@/components/nav/CommonNav";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 네비게이션 표시할 경로 리스트
  const showNavPaths = ["/", "/board/question", "/board/document", "/mypage"];
  const shouldShowNav = showNavPaths.includes(pathname);

  return (
    <div className="relative min-h-screen">
      {children}
      {shouldShowNav && <CommonNav />}
    </div>
  );
}
