"use client";

import { usePathname } from "next/navigation";
import CommonNav from "@/components/common/CommonNav";
import GlobalTopNav from "@/components/layout/GlobalTopNav";
import GlobalLoginModal from "@/components/common/GlobalLoginModal";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 네비게이션 표시할 경로 리스트
  const showNavPaths = ["/", "/board/question", "/board/document", "/mypage"];
  const shouldShowNav = showNavPaths.includes(pathname);

  return (
    <>
      {/* 통(중앙 고정 폭 컨테이너) 제거 — 폭 제한은 각 페이지가 콘텐츠 성격에 맞게 결정한다. */}
      <div className="min-h-screen bg-white">
        {/* PC(lg+) 전용 상단 글로벌 네비 — 모바일에서는 숨김 */}
        <GlobalTopNav />

        {/*
          콘텐츠 영역.
          - 모바일: 하단 탭바가 보이는 경로면 탭바 높이(70px)만큼 하단 여백.
          - PC: 상단 글로벌 네비 높이(h-16=64px)만큼 상단 여백, 하단 여백 없음.
        */}
        <div className={`${shouldShowNav ? "pb-[70px] lg:pb-0" : ""} lg:pt-16`}>{children}</div>

        {/* 하단 네비게이션바 - 모바일 전용 (PC는 GlobalTopNav 가 대체) */}
        {shouldShowNav && <CommonNav className="lg:hidden" />}
      </div>

      {/* 전역 로그인 모달 */}
      <GlobalLoginModal />
    </>
  );
}
