"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LandingSearchBar from "@/components/common/LandingSearchBar";

export default function LoginOrSearchButton() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);
  }, []);

  const handleLoginClick = () => {
    router.push("/login");
  };

  if (isLoggedIn) {
    return (
      <div className="mx-auto max-w-[640px]">
        <LandingSearchBar />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[640px]">
      <button
        type="button"
        onClick={handleLoginClick}
        className="mx-auto flex h-[56px] w-full items-center justify-center rounded-lg bg-gradient-to-r from-document-main to-question-main"
      >
        <span className="text-[18px] font-bold leading-[100%] text-white">로그인</span>
      </button>
    </div>
  );
}
