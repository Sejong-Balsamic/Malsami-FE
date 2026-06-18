"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { showModal } from "@/global/store/modalSlice";

// PC(lg+) 전용 상단 글로벌 네비게이션.
// 모바일에서는 숨기고(CommonNav 하단 탭바가 담당), lg 이상에서만 표시한다.
// 메뉴 구성·인증 체크 로직은 CommonNav 와 동일한 규칙을 따른다.

const MENU_ITEMS = [
  { href: "/", label: "홈", requireAuth: false },
  { href: "/board/document", label: "자료", requireAuth: true },
  { href: "/board/question", label: "질문", requireAuth: true },
  { href: "/mypage", label: "마이", requireAuth: true },
];

export default function GlobalTopNav() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const handleNavClick = (item: { href: string; requireAuth: boolean }) => {
    const accessToken = sessionStorage.getItem("accessToken");

    // 로그인이 필요한 메뉴인데 토큰이 없는 경우
    if (item.requireAuth && !accessToken) {
      if (pathname !== "/") {
        router.push("/");
        setTimeout(() => {
          dispatch(showModal("로그인 후 이용가능합니다."));
        }, 100);
      } else {
        dispatch(showModal("로그인 후 이용가능합니다."));
      }
      return;
    }

    router.push(item.href);
  };

  return (
    <header className="fixed top-0 z-50 hidden w-full border-b border-ui-divider bg-white lg:block">
      <nav className="mx-auto flex h-16 w-full max-w-content-wide items-center justify-between px-8">
        {/* 로고 */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex items-center rounded-lg p-1 hover:bg-gray-100"
        >
          <Image src="/icons/Home.svg" alt="세종말싸미" width={24} height={24} />
          <span className="font-tuesday-younah ml-2 text-2xl text-gray-800">세종말싸미</span>
        </button>

        {/* 메뉴 */}
        <div className="flex items-center gap-2">
          {MENU_ITEMS.map(item => {
            const isActive = pathname === item.href;
            return (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNavClick(item)}
                className={`rounded-lg px-4 py-2 text-SUIT_16 transition-colors hover:bg-gray-100 ${
                  isActive ? "font-semibold text-black" : "font-medium text-ui-muted-soft"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
