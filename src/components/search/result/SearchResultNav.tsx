import { useState, useEffect } from "react";
import Image from "next/image";
import subjects from "@/lib/subjects";
import AutoCompleteSuggestionList from "../inputElement/AutoCompleteSuggestionList";
import SearchInputField from "../inputElement/SearchInputField";
import SearchClearBtn from "../inputElement/SearchClearBtn";
import SearchBtn from "../inputElement/SearchBtn";

interface SearchHeaderProps {
  searchValue: string;
  subject: string;
  onSearchChange: (newSearchValue: string) => void;
  onSubjectChange: (newSubject: string) => void;
  onBack: () => void;
  onSearch: () => void; // API 호출 함수
}

const savedSearchTerms: string[] = subjects;

function SearchResultNav({
  searchValue,
  subject,
  onSearchChange,
  onSubjectChange,
  onBack,
  onSearch,
}: SearchHeaderProps) {
  const [filteredTerms, setFilteredTerms] = useState<string[]>([]); // 추천 목록
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1); // 활성화된 추천 항목
  const placeholders = ["@과목으로 시작하여 검색하기", "@공간과인간 기말과제"];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex(prevIndex => (prevIndex + 1) % placeholders.length); // 다음 placeholder
    }, 3000); // 3초마다 전환

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, []);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target; // 구조 분해 할당으로 value를 가져옴
    onSearchChange(value);

    if (value.includes("@")) {
      const atIndex = value.indexOf("@");
      const searchQuery = value.slice(atIndex + 1).toLowerCase(); // "@" 다음 텍스트
      setFilteredTerms(savedSearchTerms.filter(term => term.toLowerCase().includes(searchQuery)));
    } else {
      setFilteredTerms([]);
    }

    setActiveSuggestionIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredTerms.length > 0) {
      if (e.key === "ArrowDown") {
        setActiveSuggestionIndex(prev => (prev < filteredTerms.length - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowUp") {
        setActiveSuggestionIndex(prev => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
        const selectedTerm = filteredTerms[activeSuggestionIndex];
        onSubjectChange(`@${selectedTerm}`); // subject에 저장
        onSearchChange(searchValue.replace(/@[^ ]*/, "").trim()); // subject 부분은 검색어에서 제거
        setFilteredTerms([]);
      } else if (e.key === "Enter") {
        onSearch();
      }
    } else if (e.key === "Enter") {
      onSearch();
    }
  };

  const handleSuggestionClick = (term: string) => {
    onSubjectChange(`@${term}`); // 선택된 교과목명 저장
    onSearchChange(searchValue.replace(/@[^ ]*/, "").trim()); // 검색창에서 교과목명 제거
    setFilteredTerms([]);
  };

  const handleClearSearch = () => {
    onSearchChange("");
    onSubjectChange("");
    setFilteredTerms([]);
  };

  return (
    <div className="relative w-full border-b-[2px] border-b-[#EAEAEA] bg-white">
      <div className="flex items-center px-5 py-3">
        {/* 뒤로가기 버튼 */}
        <button type="button" onClick={onBack} className="mr-2.5 cursor-pointer">
          <Image src="/icons/BackIcon.svg" alt="뒤로가기" width={12} height={20} />
        </button>

        {/* 검색 입력 필드 */}
        <div className="flex h-10 w-full items-center justify-between rounded-lg bg-[#EEEEEE] p-2">
          {/* 검색 아이콘 */}
          <SearchBtn onClick={onSearch} />

          {/* 입력 필드 */}
          <SearchInputField
            subject={subject}
            searchValue={searchValue}
            placeholder={placeholders[placeholderIndex]}
            onValueChange={handleValueChange}
            onKeyDown={handleKeyDown}
          />

          {/* 삭제 버튼 */}
          {(searchValue || subject) && <SearchClearBtn onClick={handleClearSearch} />}
        </div>
      </div>

      {/* 자동 완성 제안 목록 */}
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

export default SearchResultNav;
