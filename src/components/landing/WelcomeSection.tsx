"use client";

import React from "react";
import Image from "next/image";
import NewLandingSearchBar from "@/components/search/NewLandingSearchBar";

interface WelcomeSectionProps {
  userName: string;
}

export default function WelcomeSection({ userName }: WelcomeSectionProps) {
  return (
    <div className="flex flex-col">
      <div className="flex w-full flex-row items-center">
        <Image src="/image/Mascot.png" alt="웰컴 캐릭터" width={100} height={100} className="mr-3 object-contain" />
        <div className="flex w-full">
          <div className="text-SUIT_18 font-medium">
            반가워요, <span className="font-semibold">{userName}</span>님!
            <div>궁금한 자료를 검색해보세요!</div>
          </div>
        </div>
      </div>

      {/* 검색바 */}
      <NewLandingSearchBar />
    </div>
  );
}
