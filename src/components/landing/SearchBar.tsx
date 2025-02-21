"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/shadcn/input";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  userName: string;
}

function SearchBar({ userName }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const router = useRouter();

  // 검색 실행 함수
  const routeSearchValue = (term: string) => {
    if (term.trim()) {
      router.push(`/search/result?query=${encodeURIComponent(term)}`); // 검색어를 URL에 추가
    }
  };
  // 검색어 변경 상태 업데이트
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  // Enter 키 입력 시
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      routeSearchValue(searchTerm);
    }
  };
  // SearchIcon 클릭 처리
  const handleSearchClick = () => {
    routeSearchValue(searchTerm);
  };

  return (
    <div className="fixed top-[318px] flex w-full max-w-[600px] flex-col items-center gap-7 px-[20px]">
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
            src="/icons/SearchIcon.svg"
            alt="Search"
            width={20}
            height={20}
            onClick={handleSearchClick}
            className="absolute left-2 top-1/2 -translate-y-1/2 transform cursor-pointer p-[2px]"
          />
          <Input
            type="text"
            id="search"
            placeholder="과목명이나 키워드를 입력하세요"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="h-[40px] w-full rounded-md bg-gray-50 pl-8 font-pretendard text-[16px] font-medium text-[#F46B01]"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
