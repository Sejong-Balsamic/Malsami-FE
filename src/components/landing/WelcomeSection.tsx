"use client";

import React, { useEffect, useState } from "react";
import LoginOrSearchButton from "@/components/landing/LoginOrSearchButton";

interface WelcomeSectionProps {
  userName: string;
}

export default function WelcomeSection({ userName }: WelcomeSectionProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);
  }, []);

  return (
    <div className="mt-10">
      {isLoggedIn ? (
        <div className="text-SUIT_24 font-medium leading-relaxed text-black">
          반가워요, <span className="font-bold text-document-main">{userName}</span>님!
          <br />
          궁금한 자료를 검색해볼까요 :)
        </div>
      ) : (
        <div className="text-SUIT_24 font-medium leading-relaxed text-black">
          반가워요!
          <br />
          로그인 후 이용해 주세요 :)
        </div>
      )}

      <div className="mt-[154px]">
        <LoginOrSearchButton />
      </div>
    </div>
  );
}
