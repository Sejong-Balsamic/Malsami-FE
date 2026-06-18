"use client";

import { usePathname } from "next/navigation";
import CommonNav from "@/components/common/CommonNav";
import GlobalTopNav from "@/components/layout/GlobalTopNav";
import GlobalLoginModal from "@/components/common/GlobalLoginModal";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 모바일 하단 탭바를 표시할 경로 리스트 (메인 4개 페이지)
  const showNavPaths = ["/", "/board/question", "/board/document", "/mypage"];
  const shouldShowNav = showNavPaths.includes(pathname);

  // 상단 글로벌 네비(PC)를 숨길 경로 — 로그인 등 인증 전·집중 화면.
  // 그 외 모든 일반 페이지에서는 PC 상단 네비를 항상 노출해 어디서든 이동 가능하게 한다.
  const hideTopNavPaths = ["/login"];
  const shouldShowTopNav = !hideTopNavPaths.includes(pathname);

  return (
    <>
      {/* 통(중앙 고정 폭 컨테이너) 제거 — 폭 제한은 각 페이지가 콘텐츠 성격에 맞게 결정한다. */}
      <div className="min-h-screen bg-white">
        {/* PC(lg+) 전용 상단 글로벌 네비 — 모바일에서는 숨김, 인증 전 화면(로그인)에서는 미표시 */}
        {shouldShowTopNav && <GlobalTopNav />}

        {/*
          콘텐츠 영역.
          - 모바일: 하단 탭바가 보이는 경로면 탭바 높이(70px)만큼 하단 여백.
          - PC: 상단 글로벌 네비가 있는 경로에서만 네비 높이(h-16=64px)만큼 상단 여백.
        */}
        <div className={`${shouldShowNav ? "pb-[70px] lg:pb-0" : ""} ${shouldShowTopNav ? "lg:pt-16" : ""}`}>
          {children}
        </div>

        {/* 하단 네비게이션바 - 모바일 전용 (PC는 GlobalTopNav 가 대체) */}
        {shouldShowNav && <CommonNav className="lg:hidden" />}
      </div>

      {/* 전역 로그인 모달 */}
      <GlobalLoginModal />
    </>
  );
}
