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
    router.push("/mypage");
  };

  return (
    <div className="w-full max-w-[640px] h-[68px] fixed top-0 z-50">
      <div className="w-full h-full bg-gradient-to-b from-white/100 to-white/50 absolute top-0 left-0" />

      <div
        className="absolute top-[37px] left-[18px] cursor-pointer"
        onClick={handleLandingPageClick}
        onKeyDown={e => e.key === "Enter" && handleLandingPageClick()} // Enter 키로 접근
        role="button"
        tabIndex={0} // Tab 키로 접근
        aria-label="랜딩페이지"
      >
        <div className="w-[30px] h-7 bg-[#d9d9d9]" />
      </div>

      <div
        className="absolute right-[18px] top-[48px] w-[13px] h-[13px] cursor-pointer"
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
