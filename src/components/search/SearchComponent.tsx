"use client";

// import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SearchInput from "./SearchInput";

export default function SearchComponent() {
  const router = useRouter();
  // const [searchTerm, setSearchTerm] = useState("");
  // const [recentSearches, setRecentSearches] = useState(["검색기록", "검색기록1", "검색기록2"]);

  // useEffect(() => {
  //   setRecentSearches(prev => [...prev]); // 상태를 복사하여 업데이트
  // }, []);

  // const handleSearch = (term: string) => {
  //   setSearchTerm(term);
  //   // 검색 로직을 구현하고 결과를 표시할 수 있음
  // };

  return (
    <div className="h-screen bg-white">
      {/* 헤더 */}
      <div className="flex items-center px-4 py-2 border-b">
        <button type="button" onClick={() => router.back()}>
          <Image src="/icons/BackIcon.svg" alt="Back" width={16} height={16} />
        </button>
        <h1 className="flex-grow text-center text-lg font-semibold">검색하기</h1>
      </div>

      {/* 검색 입력 */}
      <SearchInput />

      {/* 최근 검색어
      {!searchTerm && (
        <div className="px-4 py-4">
          <h2 className="text-base font-semibold mb-2">최근 검색어</h2>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((term, index) => (
              <span
                key={index}
                onClick={() => handleSearch(term)}
                className="bg-orange-200 px-3 py-1 rounded-full text-sm cursor-pointer"
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
