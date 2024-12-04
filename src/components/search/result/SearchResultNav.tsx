import React from "react";
import Image from "next/image";

interface SearchHeaderProps {
  searchValue: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBack: () => void;
  onClear: () => void;
  onSearch: () => void; // API 호출 함수
}

function SearchResultNav({ searchValue, onSearchChange, onBack, onClear, onSearch }: SearchHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b-[2px] border-b-[#EAEAEA] bg-white px-5 py-3">
      {/* 뒤로가기 버튼 */}
      <button type="button" onClick={onBack} className="cursor-pointer">
        <Image src="/icons/BackIcon.svg" alt="뒤로가기" width={10} height={20} />
      </button>

      {/* 검색 입력 필드 */}
      <div className="font-pretendard-medium mx-[10px] flex flex-1 flex-row rounded-[8px] bg-[#EEEEEE] p-2.5 text-base">
        <Image
          src="/icons/SearchIcon.svg"
          alt="검색"
          width={20}
          height={20}
          onClick={onSearch} // 돋보기 버튼 클릭 시 API 호출
          className="cursor-pointer"
        />
        <input
          type="text"
          placeholder="검색어를 입력해 주세요."
          value={searchValue}
          onChange={onSearchChange}
          className="font-pretendard-medium ml-3 w-full bg-transparent text-sm text-black placeholder-gray-400 outline-none"
          onKeyDown={e => e.key === "Enter" && onSearch()} // 엔터키 입력 시 API 호출
        />
      </div>

      {/* 검색어 초기화 버튼 */}
      {searchValue && (
        <button type="button" onClick={onClear}>
          <Image src="/icons/CloseIcon.svg" alt="검색어 삭제" width={18} height={18} />
        </button>
      )}
    </div>
  );
}

export default SearchResultNav;
