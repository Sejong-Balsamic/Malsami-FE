"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { showModal } from "@/global/store/modalSlice";

function CommonNav() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const menuItems = [
    { href: "/", icon: "/icons/Home.svg", label: "홈", requireAuth: false },
    { href: "/board/document", icon: "/icons/Document.svg", label: "자료", requireAuth: true },
    { href: "/board/question", icon: "/icons/Question.svg", label: "질문", requireAuth: true },
    { href: "/mypage", icon: "/icons/User.svg", label: "마이", requireAuth: true },
  ];

  const handleNavClick = (item: { href: string; requireAuth: boolean }) => {
    const accessToken = sessionStorage.getItem("accessToken");

    // 로그인이 필요한 메뉴인데 토큰이 없는 경우
    if (item.requireAuth && !accessToken) {
      // 현재 페이지가 홈이 아니면 홈으로 이동 후 모달 표시
      if (pathname !== "/") {
        router.push("/");
        // 약간의 딜레이 후 모달 표시 (페이지 이동 완료 후)
        setTimeout(() => {
          dispatch(showModal("로그인 후 이용가능합니다."));
        }, 100);
      } else {
        // 홈페이지에서는 바로 모달 표시
        dispatch(showModal("로그인 후 이용가능합니다."));
      }
      return;
    }

    // 정상적으로 페이지 이동
    router.push(item.href);
  };

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 flex h-[70px] w-full max-w-[640px] -translate-x-1/2 transform items-end justify-between bg-white px-9 py-[10px] shadow-[0_-2px_6px_rgba(0,0,0,0.1)]">
      {menuItems.map(item => {
        const isActive = pathname === item.href; // 현재 페이지 여부 확인

        return (
          <button
            key={item.href}
            type="button"
            className="flex h-full w-[24px] flex-col justify-between"
            onClick={() => handleNavClick(item)}
          >
            <Image
              src={item.icon}
              alt={item.label}
              width={24}
              height={24}
              className="pb-1"
              style={{
                filter: isActive ? "invert(0)" : "invert(49%)",
                width: "auto",
                height: "auto",
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
