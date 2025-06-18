"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import subjects from "@/types/subjects";
import queryApi from "@/apis/queryApi";
import SearchInputField from "./SearchInputField";
import AutoCompleteSuggestionList from "./AutoCompleteSuggestionList";
import SearchClearBtn from "./SearchClearBtn";
import SearchBtn from "./SearchBtn";

const savedSearchTerms: string[] = subjects;

function LandingSearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [subject, setSubject] = useState("");
  const [filteredTerms, setFilteredTerms] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [placeholders, setPlaceholders] = useState<string[]>([]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isLoadingPlaceholders, setIsLoadingPlaceholders] = useState(false);
  const router = useRouter();

  // 인기검색어 API 호출
  const fetchPlaceholders = useCallback(async () => {
    if (isLoadingPlaceholders) return;

    setIsLoadingPlaceholders(true);
    try {
      const topKeywords = await queryApi.getTopKeywords({ topN: 10 });
      const searchHistoryList = topKeywords.searchHistoryList ?? [];

      // 각 SearchHistory 객체에서 keyword 추출하고 null/undefined 제거
      const keywords = searchHistoryList
        .map(item => item.keyword)
        .filter((keyword): keyword is string => Boolean(keyword?.trim()));

      if (keywords.length > 0) {
        setPlaceholders(keywords);
      } else {
        setPlaceholders(["검색어를 입력하세요", "최신 자료를 찾아보세요"]);
      }
    } catch (error) {
      console.error("실시간 인기 검색어 가져오기 실패:", error);
      setPlaceholders(["검색어를 입력하세요", "최신 자료를 찾아보세요"]);
    } finally {
      setIsLoadingPlaceholders(false);
    }
  }, []);

  // 컴포넌트 마운트 시 인기검색어 호출
  useEffect(() => {
    fetchPlaceholders();
  }, [fetchPlaceholders]);

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

    // @ 기호로 과목 검색 기능
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
    const { key } = e;

    switch (key) {
      case "ArrowDown":
        e.preventDefault(); // 커서 이동 방지
        if (filteredTerms.length > 0)
          setActiveSuggestionIndex(prev => (prev < filteredTerms.length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (filteredTerms.length > 0) setActiveSuggestionIndex(prev => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault(); // 폼 제출 방지
        if (filteredTerms.length > 0 && activeSuggestionIndex >= 0) {
          const selectedTerm = filteredTerms[activeSuggestionIndex];
          setSubject(`@${selectedTerm}`);
          setSearchValue(searchValue.replace(/@[^ ]*/, "").trim());
          setFilteredTerms([]);
        } else {
          routeSearchValue();
        }
        break;
      default:
        break;
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

export default LandingSearchBar;
