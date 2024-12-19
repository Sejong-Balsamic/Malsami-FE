"use client";

import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
import Image from "next/image";
import SearchPageInput from "./SearchPageInput";

export default function SearchComponent() {
  const router = useRouter();
  // const [searchTerm, setSearchTerm] = useState("");
  // const [recentSearches, setRecentSearches] = useState(["검색기록", "검색기록1", "검색기록2"]);

  // useEffect(() => {
  //   setRecentSearches(prev => [...prev]); // 상태를 복사하여 업데이트
  // }, []);

  // const handleSearch = (term: string) => {
  //   setSearchTerm(term);
  // };

  return (
    <div className="h-screen bg-[#EEEEEE]">
      {/* 헤더 */}
      <div className="flex h-[64px] items-center border-b-[2px] bg-white p-5">
        <button type="button" onClick={() => router.back()} className="ml-0">
          <Image src="/icons/BackIcon.svg" alt="Back" width={10} height={20} />
        </button>
        <h1 className="font-pretendard-bold text absolute left-1/2 -translate-x-1/2 transform text-xl">검색하기</h1>
      </div>

      {/* 검색 입력 */}
      <SearchPageInput />

      {/* 최근 검색어 */}
      {/* {!searchTerm && (
        <div className="px-4 py-4">
          <h2 className="mb-2 text-base font-semibold">최근 검색어</h2>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map(term => (
              <span
                key={term}
                role="button"
                tabIndex={0}
                onClick={() => handleSearch(term)}
                onKeyDown={e => e.key === "Enter" && handleSearch(term)}
                className="cursor-pointer rounded-full bg-orange-200 px-3 py-1 text-sm"
              >
                {term}
              </span>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}
