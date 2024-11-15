"use client";

import React from "react";
import { useRouter } from "next/navigation";
import MyIcon from "../../../public/icons/My.svg";

function Nav() {
  const router = useRouter();

  const handleLandingPageClick = () => {
    router.push("/");
  };

  const handleMyPageClick = () => {
    // accessToken 확인
    const accessToken = sessionStorage.getItem("accessToken");

    if (accessToken) {
      // accessToken이 존재하는 경우 마이페이지로 이동
      router.push("/mypage");
    } else {
      // accessToken이 존재하지 않는 경우 로그인 페이지로 이동
      router.push("/login");
    }
  };

  return (
    <div className="fixed top-0 z-50 h-[68px] w-full max-w-[640px]">
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-white/100 to-white/50" />

      <div
        className="absolute bottom-[12px] left-[18px] cursor-pointer"
        onClick={handleLandingPageClick}
        onKeyDown={e => e.key === "Enter" && handleLandingPageClick()} // Enter 키로 접근
        role="button"
        tabIndex={0} // Tab 키로 접근
        aria-label="랜딩페이지"
      >
        <div className="h-[30px] w-[30px] bg-[#d9d9d9]" />
      </div>

      <div
        className="absolute bottom-[12px] right-[12px] h-[20px] w-[20px] cursor-pointer"
        onClick={handleMyPageClick}
        onKeyDown={e => e.key === "Enter" && handleMyPageClick()}
        role="button"
        tabIndex={0}
      >
        <MyIcon />
      </div>
    </div>
  );
}

export default Nav;
