"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
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

      <div className="mt-10 relative">
        <div className="absolute -top-28 right-0 z-0 w-32 md:w-40">
          <Image
            src={isLoggedIn ? "/image/landingHoldingBookMascot.png" : "/image/landingHiMascot.png"}
            alt={isLoggedIn ? "책을 든 마스코트" : "인사하는 마스코트"}
            width={160}
            height={160}
            className="h-auto w-full"
            priority
          />
        </div>
        
        <div className="relative z-10">
          <LoginOrSearchButton />
        </div>
      </div>
    </div>
  );
}
