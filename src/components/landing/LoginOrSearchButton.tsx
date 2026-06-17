"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LandingSearchBar from "@/components/common/LandingSearchBar";
import { PageContainer } from "@/components/layout/AppContainer";

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
      <div className="mx-auto max-w-container lg:max-w-container-lg">
        <LandingSearchBar />
      </div>
    );
  }

  return (
    <PageContainer>
      <button
        type="button"
        onClick={handleLoginClick}
        className="mx-auto flex h-[56px] w-full items-center justify-center rounded-lg bg-gradient-to-r from-document-main to-question-main"
      >
        <span className="text-[18px] font-bold leading-[100%] text-white">로그인</span>
      </button>
    </PageContainer>
  );
}
