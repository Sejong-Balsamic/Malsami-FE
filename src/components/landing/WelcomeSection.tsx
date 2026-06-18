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
    <div className="mt-10 lg:flex lg:items-center lg:gap-8">
      <div className="lg:flex-1">
        {isLoggedIn ? (
          <div className="text-SUIT_24 font-medium leading-relaxed text-black lg:leading-snug">
            반가워요, <span className="font-bold text-document-main">{userName}</span>님!
            <br />
            궁금한 자료를 검색해볼까요 :)
          </div>
        ) : (
          <div className="text-SUIT_24 font-medium leading-relaxed text-black lg:leading-snug">
            반가워요!
            <br />
            로그인 후 이용해 주세요 :)
          </div>
        )}

        <div className="relative mt-10 lg:mt-8">
          <div className="absolute -top-28 right-0 z-0 w-32 md:w-40 lg:hidden">
            <Image
              src={isLoggedIn ? "/image/landingHoldingBookMascot.png" : "/image/landingHiMascot.png"}
              alt={isLoggedIn ? "책을 든 마스코트" : "인사하는 마스코트"}
              width={160}
              height={160}
              className="h-auto w-full"
              priority
            />
          </div>

          <div className="relative z-10 mt-32 lg:mt-0">
            <LoginOrSearchButton />
          </div>
        </div>
      </div>

      {/* PC(lg) 전용 마스코트 - 우측 배치 (모바일은 위 absolute 마스코트 사용) */}
      <div className="hidden w-40 flex-shrink-0 lg:block">
        <Image
          src={isLoggedIn ? "/image/landingHoldingBookMascot.png" : "/image/landingHiMascot.png"}
          alt={isLoggedIn ? "책을 든 마스코트" : "인사하는 마스코트"}
          width={160}
          height={160}
          className="h-auto w-full"
          priority
        />
      </div>
    </div>
  );
}
