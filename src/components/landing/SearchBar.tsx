"use client";

import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchVisible: boolean;
  userName: string;
}

function SearchBar({ searchVisible, userName }: SearchBarProps) {
  return (
    <>
      {/* 검색 메인 텍스트 */}
      <div
        className={`duration-2700 fixed left-1/2 top-[318px] z-50 w-full max-w-[340px] -translate-x-1/2 transform transition-opacity ${
          searchVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <span className="font-pretendard-bold text-xl leading-[11px] text-[#03B8A3]">{userName}</span>
        <span className="font-pretendard-bold text-xl leading-[11px] text-black">
          님, 환영해요!
          <br />
          학습 자료를 찾고, 업로드 해보세요!
        </span>
      </div>

      {/* 검색 입력창 */}
      <div
        className={`duration-2000 fixed left-1/2 top-[383px] z-50 w-full max-w-[340px] -translate-x-1/2 transform transition-opacity ${
          searchVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
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
    </>
  );
}

export default SearchBar;
