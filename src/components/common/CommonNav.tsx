"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

function CommonNav() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { href: "/", icon: "/icons/Home.svg", label: "홈" },
    { href: "/board/document", icon: "/icons/Document.svg", label: "자료" },
    { href: "/board/question", icon: "/icons/Question.svg", label: "질문" },
    { href: "/mypage", icon: "/icons/User.svg", label: "마이" },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 flex h-[70px] w-full max-w-[640px] -translate-x-1/2 transform items-end justify-between bg-white px-9 py-[10px] shadow-[0_-2px_6px_rgba(0,0,0,0.1)]">
      {menuItems.map(item => {
        const isActive = pathname === item.href; // 현재 페이지 여부 확인

        return (
          <button
            key={item.href}
            type="button"
            className="flex h-full w-[24px] flex-col justify-between"
            onClick={() => router.push(item.href)}
          >
            <Image
              src={item.icon}
              alt={item.label}
              width={24}
              height={24}
              className="pb-1"
              style={{
                filter: isActive ? "invert(0)" : "invert(49%)",
              }}
            />
            <span className="text-center font-suit text-[12px]" style={{ color: isActive ? "black" : "#A2A2A2" }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export default CommonNav;
