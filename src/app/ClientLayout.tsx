"use client";

import { usePathname } from "next/navigation";
import CommonNav from "@/components/common/CommonNav";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 네비게이션 표시할 경로 리스트
  const showNavPaths = ["/", "/board/question", "/board/document", "/mypage"];
  const shouldShowNav = showNavPaths.includes(pathname);

  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      {/* 메인 컨테이너 - PC에서 max-width 적용 */}
      <div
        className={`relative mx-auto w-full max-w-[640px] bg-white ${shouldShowNav ? "min-h-screen pb-[70px]" : "min-h-screen"}`}
      >
        {children}
      </div>

      {/* 하단 네비게이션바 - fixed로 전역 렌더링 */}
      {shouldShowNav && <CommonNav />}
    </div>
  );
}
