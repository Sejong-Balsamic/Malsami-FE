"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SearchComponent() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState(["검색기록", "검색기록1", "검색기록2"]);
  const [suggestedResults, setSuggestedResults] = useState(["인터렉티브", "인터렉티브 디자인", "인터렉티브 미디어"]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // 검색 로직을 구현하고 결과를 표시할 수 있음
  };

  return (
    <div className="h-screen bg-white">
      {/* 헤더 */}
      <div className="flex items-center px-4 py-2 border-b">
        <button onClick={() => router.back()}>
          <Image src="/icons/BackIcon.svg" alt="Back" width={16} height={16} />
        </button>
        <h1 className="flex-grow text-center text-lg font-semibold">검색하기</h1>
      </div>

      {/* 검색 입력 */}
      <div className="flex items-center bg-gray-100 rounded-lg m-4 p-2">
        <Image src="/icons/Search.svg" alt="Search" width={20} height={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={e => handleSearch(e.target.value)}
          placeholder="검색어를 입력해 주세요."
          className="ml-2 w-full bg-transparent outline-none"
        />
      </div>

      {/* 검색어 제안 목록 */}
      {searchTerm && (
        <div className="px-4">
          {suggestedResults.map((result, index) => (
            <div key={index} className="flex items-center py-2 border-b cursor-pointer">
              <Image src="/icons/Search.svg" alt="Search" width={20} height={20} className="mr-2" />
              <span>{result}</span>
            </div>
          ))}
        </div>
      )}

      {/* 최근 검색어 */}
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
      )}
    </div>
  );
}
