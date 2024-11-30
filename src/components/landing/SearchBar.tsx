"use client";

import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  userName: string;
}

function SearchBar({ userName }: SearchBarProps) {
  return (
    <div className="fixed top-[318px] px-[20px] flex w-full flex-col items-center gap-7">
      {/* 검색 메인 텍스트 */}
      <div className="duration-2700 z-50 w-full transform leading-8 opacity-100 transition-opacity">
        <span className="font-pretendard-bold text-xl text-[#03B8A3]">{userName}</span>
        <span className="font-pretendard-bold text-xl">
          님, 환영해요!
          <br />
          학습 자료를 찾고, 업로드 해보세요!
        </span>
      </div>
      {/* 검색 입력창 */}
      <div className="duration-2000 z-50 w-full transform opacity-100 transition-opacity">
        <div className="relative w-full">
          <Image
            src="/icons/Search.svg"
            alt="Search"
            width={20}
            height={20}
            className="absolute left-2 top-1/2 -translate-y-1/2 transform p-[2px]"
          />
          <Input
            type="text"
            id="search"
            placeholder="과목명이나 키워드를 입력하세요"
            className="h-[40px] w-full rounded-md bg-gray-50 pl-8 font-pretendard text-[16px] font-medium text-[#F46B01]"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
