/* eslint-disable react/require-default-props */
import React from "react";
import Image from "next/image";

interface BoardSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  theme?: "question" | "document";
  placeholder?: string;
}

// 질문/자료 게시판 공용 검색바 — theme로 테마 색상만 분기한다.
export default function BoardSearchBar({
  value,
  onChange,
  onSearch,
  theme = "question",
  placeholder = "과목명, 키워드 등을 입력하세요.",
}: BoardSearchBarProps): JSX.Element {
  const borderColor = theme === "document" ? "border-document-main" : "border-question-main";

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
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className={`mb-4 w-full border-b-[2px] ${borderColor} bg-transparent px-4 pb-2 pr-10 text-SUIT_16 font-medium placeholder-ui-muted focus:outline-none focus:ring-0`}
      />
      <button type="button" aria-label="검색" className="absolute right-4 top-1" onClick={onSearch}>
        <Image src="/icons/SearchIcon.svg" alt="검색" width={20} height={20} />
      </button>
    </div>
  );
}
