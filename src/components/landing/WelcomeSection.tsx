"use client";

import React from "react";
import Image from "next/image";
import LandingSearchBar from "@/components/search/LandingSearchBar";

interface WelcomeSectionProps {
  userName: string;
}

export default function WelcomeSection({ userName }: WelcomeSectionProps) {
  return (
    <div className="flex flex-col">
      <div className="z-10 flex w-full flex-row items-center">
        <Image src="/image/Mascot.png" alt="웰컴 캐릭터" width={100} height={100} className="mr-3 object-contain" />
        <div className="flex w-full">
          <div className="text-SUIT_18 font-medium">
            반가워요, <span className="font-semibold">{userName}</span>님!
            <div>궁금한 자료를 검색해보세요!</div>
          </div>
        </div>
      </div>

      {/* 검색바 - 위로 10px 겹치게 */}
      <div className="z-0 -mt-[10px]">
        <LandingSearchBar />
      </div>
    </div>
  );
}
