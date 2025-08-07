import React from "react";
import Image from "next/image";

interface QuestionSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export default function QuestionSearchBar({ value, onChange, onSearch }: QuestionSearchBarProps): JSX.Element {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch();
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="과목명, 키워드 등을 입력하세요."
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="font-suit-medium mb-4 w-full border-b-[2px] border-question-main bg-transparent px-4 pb-2 pr-10 text-[16px] placeholder-ui-muted focus:outline-none focus:ring-0"
      />
      <button type="button" aria-label="검색" className="absolute right-4 top-1" onClick={onSearch}>
        <Image src="/icons/SearchGreen.svg" alt="검색" width={20} height={20} className="text-question-main" />
      </button>
    </div>
  );
}
