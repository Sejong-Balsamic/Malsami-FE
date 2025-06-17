"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import subjects from "@/types/subjects";
import SearchInputField from "./SearchInputField";
import AutoCompleteSuggestionList from "./AutoCompleteSuggestionList";
import SearchClearBtn from "./SearchClearBtn";
import SearchBtn from "./SearchBtn";

const savedSearchTerms: string[] = subjects;

function NewCommonSearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [subject, setSubject] = useState("");
  const [filteredTerms, setFilteredTerms] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const placeholders = ["@과목으로 시작하여 검색하기", "@공간과인간 기말과제"];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const router = useRouter();

  // placeholders 2초마다 전환
  useEffect(() => {
    if (placeholders.length === 0) return undefined;
    const interval = setInterval(() => {
      setPlaceholderIndex(prev => (prev + 1) % placeholders.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [placeholders]);

  // 검색 실행
  const routeSearchValue = () => {
    if (!searchValue.trim() && !subject.trim()) return;
    const updatedQuery = `?query=${encodeURIComponent(searchValue.trim())}&subject=${encodeURIComponent(
      subject.trim(),
    )}`;
    router.push(`/search/result${updatedQuery}`);
  };

  // 입력값 변경
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);

    if (value.includes("@")) {
      const atIndex = value.indexOf("@");
      const searchQuery = value.slice(atIndex + 1).toLowerCase();
      setFilteredTerms(savedSearchTerms.filter(term => term.toLowerCase().includes(searchQuery)));
    } else {
      setFilteredTerms([]);
    }

    setActiveSuggestionIndex(-1);
  };

  // 키보드 입력 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredTerms.length > 0) {
      if (e.key === "ArrowDown") {
        setActiveSuggestionIndex(prev => (prev < filteredTerms.length - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowUp") {
        setActiveSuggestionIndex(prev => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
        const selectedTerm = filteredTerms[activeSuggestionIndex];
        setSubject(`@${selectedTerm}`);
        setSearchValue(searchValue.replace(/@[^ ]*/, "").trim());
        setFilteredTerms([]);
      } else if (e.key === "Enter") {
        routeSearchValue();
      }
    } else if (e.key === "Enter") {
      routeSearchValue();
    }
  };

  const handleSuggestionClick = (term: string) => {
    setSubject(`@${term}`);
    setSearchValue(searchValue.replace(/@[^ ]*/, "").trim());
    setFilteredTerms([]);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setSubject("");
    setFilteredTerms([]);
  };

  return (
    <div className="relative w-full bg-white">
      <div className="flex w-full items-center justify-between rounded-[12px] border-[1px] border-[#10DCB3] bg-white p-3.5">
        <SearchBtn onClick={routeSearchValue} />

        {/* 입력 필드 */}
        <SearchInputField
          subject={subject}
          searchValue={searchValue}
          placeholder={placeholders[placeholderIndex] || "검색어를 입력하세요."}
          onValueChange={handleValueChange}
          onKeyDown={handleKeyDown}
        />

        {/* 삭제 버튼 */}
        {(searchValue || subject) && <SearchClearBtn onClick={handleClearSearch} />}
      </div>

      {/* 자동 완성 제안 */}
      {filteredTerms.length > 0 && (
        <AutoCompleteSuggestionList
          filteredTerms={filteredTerms}
          activeSuggestionIndex={activeSuggestionIndex}
          onSuggestionClick={handleSuggestionClick}
        />
      )}
    </div>
  );
}

export default NewCommonSearchBar;
