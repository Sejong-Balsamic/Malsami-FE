"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import subjects from "@/types/subjects";
import queryApi from "@/apis/queryApi";
import SearchInputField from "./SearchInputField";
import AutoCompleteSuggestionList from "./AutoCompleteSuggestionList";
import SearchClearBtn from "./SearchClearBtn";
import SearchBtn from "./SearchBtn";

const savedSearchTerms: string[] = subjects;

// 컴포넌트명 바꿔야 함.
function NewLandingSearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [subject, setSubject] = useState("");
  const [filteredTerms, setFilteredTerms] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [placeholders, setPlaceholders] = useState<string[]>([]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const router = useRouter();

  // 인기검색어(실시간 변동) api 호출
  useEffect(() => {
    async function fetchPlaceholders() {
      try {
        const topKeywords = await queryApi.getTopKeywords({
          topN: 10,
        });
        const searchHistoryList = topKeywords.searchHistoryList ?? [];

        console.log(searchHistoryList);
        console.log(topKeywords);

        setPlaceholders(searchHistoryList.keyword);
      } catch (error) {
        console.error("실시간 인기 검색어 가져오기 실패:", error);
      }
    }

    fetchPlaceholders();
  }, []);

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

export default NewLandingSearchBar;
