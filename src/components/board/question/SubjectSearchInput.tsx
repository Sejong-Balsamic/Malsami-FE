import { useState } from "react";
import subjects from "@/lib/subjects";

interface SubjectSearchInputProps {
  value: string;
  onChange: (value: string, isValid: boolean) => void;
}

const savedSearchTerms: string[] = subjects;

function SubjectSearchInput({ value, onChange }: SubjectSearchInputProps) {
  const [filteredTerms, setFilteredTerms] = useState<string[]>([]); // 자동완성 제안 목록
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1); // 선택된 제안 인덱스

  // searchValue 변경 시 호출
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const newFilteredTerms = savedSearchTerms.filter(term => term.toLowerCase().includes(newValue.toLowerCase()));

    onChange(newValue, newFilteredTerms.includes(newValue)); // 유효성 업데이트, 부모 컴포넌트에 전달
    setFilteredTerms(newFilteredTerms);
    setActiveSuggestionIndex(-1);
  };

  // 키보드 입력 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setActiveSuggestionIndex(prevIndex => (prevIndex < filteredTerms.length - 1 ? prevIndex + 1 : prevIndex));
    } else if (e.key === "ArrowUp") {
      setActiveSuggestionIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    } else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
      const selectedTerm = filteredTerms[activeSuggestionIndex];
      onChange(selectedTerm, true); // 선택된 값과 유효성을 전달
      setFilteredTerms([]);
    }
  };

  const handleSuggestionClick = (term: string) => {
    onChange(term, true); // 선택된 값과 유효성을 전달
    setFilteredTerms([]); // 선택 후 목록 초기화
  };

  return (
    <>
      <div className="flex w-full items-center rounded-[8px] border-2 border-[#BDBDBD] px-0 py-2">
        <input
          type="text"
          placeholder="교과목명을 입력하세요."
          value={value}
          onChange={handleValueChange}
          onKeyDown={handleKeyDown}
          className="font-pretendard-medium ml-3 w-full bg-transparent text-sm text-black placeholder-gray-400 outline-none"
        />
      </div>

      {filteredTerms.length > 0 && (
        <div className="mt-2 w-full rounded-md border border-gray-200 bg-white shadow-md">
          {filteredTerms.map((term, index) => (
            <div
              key={term}
              role="presentation"
              onClick={() => handleSuggestionClick(term)}
              className={`cursor-pointer px-4 py-2 text-sm ${index === activeSuggestionIndex ? "bg-gray-100" : ""}`}
            >
              {term}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SubjectSearchInput;
