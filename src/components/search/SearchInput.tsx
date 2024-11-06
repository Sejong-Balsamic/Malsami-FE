import React, { useState } from "react";
import Image from "next/image";
import subjects from "@/lib/subjects";

const savedSearchTerms: string[] = subjects;

function SearchComponent() {
  const [searchValue, setSearchValue] = useState(""); // 현재 입력된 검색어 저장 변수
  const [filteredTerms, setFilteredTerms] = useState<string[]>([]); // getSuggestions 함수를 통해 얻어진 자동완성 제안 목록을 저장하는 변수
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1); // 현재 선택된 제안 목록의 인덱스

  // searchValue 변할 때, 실행하는 함수
  const handleValueChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(value);
    setFilteredTerms(savedSearchTerms.filter(term => term.toLowerCase().includes(value.toLowerCase())));
    setActiveSuggestionIndex(-1);
  };

  // 키보드로 검색어 제안 이동 하게 하는 함수
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 아래 화살표로 이동
    if (e.key === "ArrowDown") {
      setActiveSuggestionIndex(prevIndex => (prevIndex < filteredTerms.length - 1 ? prevIndex + 1 : prevIndex));
    }
    // 위 화살표로 이동
    else if (e.key === "ArrowUp") {
      setActiveSuggestionIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    }
    // Enter 키로 선택
    else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
      setSearchValue(filteredTerms[activeSuggestionIndex]);
      setFilteredTerms([]);
    }
  };

  const handleSuggestionClick = (term: string) => {
    setSearchValue(term); // 선택된 검색어를 input에 채우기
    setFilteredTerms([]); // 선택 후 필터링된 목록을 초기화
  };

  return (
    <div className="flex flex-col items-center w-full py-2 px-4 bg-slate-400">
      {/* 검색 입력 필드 */}
      <div className="flex items-center w-full bg-gray-100 rounded-lg p-2">
        <Image src="/icons/Search.svg" alt="Search" width={16} height={16} />
        <input
          type="text"
          placeholder="검색어를 입력해 주세요."
          value={searchValue}
          onChange={handleValueChange}
          onKeyDown={handleKeyDown}
          className="w-full ml-3 text-sm font-pretendard-medium bg-transparent outline-none placeholder-gray-400 text-black"
        />
      </div>

      {/* 검색어 제안 목록 */}
      {filteredTerms.length > 0 && (
        <div className="w-full bg-white border border-gray-200 rounded-md shadow-md mt-2">
          {filteredTerms.map((term, index) => (
            <div
              key={term}
              role="presentation"
              onClick={() => handleSuggestionClick(term)}
              className={`px-4 py-2 text-sm cursor-pointer ${
                index === activeSuggestionIndex ? "bg-custom-orange-100" : ""
              }`}
            >
              {term}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
