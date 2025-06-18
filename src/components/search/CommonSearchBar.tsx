"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import subjects from "@/types/subjects";
import SearchInputField from "./SearchInputField";
import AutoCompleteSuggestionList from "./AutoCompleteSuggestionList";
import SearchClearBtn from "./SearchClearBtn";
import SearchBtn from "./SearchBtn";

const savedSearchTerms: string[] = subjects;
const placeholders = ["@과목으로 시작하여 검색하기", "@공간과인간 기말과제"];

// 컴포넌트명 바꿔야 함.
function CommonSearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [subject, setSubject] = useState("");
  const [filteredTerms, setFilteredTerms] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const router = useRouter();

  // placeholder 3초마다 변경
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex(prevIndex => (prevIndex + 1) % placeholders.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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

export default CommonSearchBar;
