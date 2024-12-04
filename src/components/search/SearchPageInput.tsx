import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import subjects from "@/lib/subjects";

const savedSearchTerms: string[] = subjects;

// 검색 입력 컴포넌트
function SearchPageInput() {
  const [searchValue, setSearchValue] = useState(""); // 현재 검색어 상태
  const [filteredTerms, setFilteredTerms] = useState<string[]>([]); // 자동 완성 제안 목록
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1); // 선택된 제안 목록의 인덱스
  const router = useRouter();

  const routeSearchValue = (term: string) => {
    if (term.trim()) {
      router.push(`/search/result?query=${encodeURIComponent(term)}`); // 검색어를 URL에 추가
    }
  };

  // 검색어 입력 시 호출되는 함수
  const handleValueChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(value); // 입력값 업데이트
    setFilteredTerms(savedSearchTerms.filter(term => term.toLowerCase().includes(value.toLowerCase()))); // 검색어 포함 여부 확인
    setActiveSuggestionIndex(-1); // 초기화
  };

  // 검색어 삭제 함수 (CloseIcon 클릭 시 호출)
  const handleClearSearch = () => {
    setSearchValue(""); // 검색어 초기화
    setFilteredTerms([]); // 제안 목록 초기화
  };

  // 키보드 입력으로 제안 목록을 이동 및 검색 실행
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      // 아래 화살표로 이동
      setActiveSuggestionIndex(prevIndex => (prevIndex < filteredTerms.length - 1 ? prevIndex + 1 : prevIndex));
    } else if (e.key === "ArrowUp") {
      // 위 화살표로 이동
      setActiveSuggestionIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    } else if (e.key === "Enter") {
      // Enter 키로 검색 실행
      if (activeSuggestionIndex >= 0) {
        // 제안된 검색어가 선택된 경우 해당 검색어로 설정
        setSearchValue(filteredTerms[activeSuggestionIndex]);
        routeSearchValue(filteredTerms[activeSuggestionIndex]); // 선택된 검색어로 검색 실행
      } else {
        // 제안된 검색어가 선택되지 않은 경우 기존 searchValue로 검색 실행
        routeSearchValue(searchValue);
      }
      setFilteredTerms([]); // 목록 초기화
    }
  };

  // 검색어 제안 클릭 시 호출
  const handleSuggestionClick = (term: string) => {
    setSearchValue(term); // 선택한 검색어로 업데이트
    setFilteredTerms([]); // 목록 초기화
    routeSearchValue(term); // 검색 실행
  };

  return (
    <div className="relative w-full bg-white py-2">
      {/* 검색 입력 필드 */}
      <div className="px-4">
        <div className="flex w-full items-center justify-between rounded-lg bg-[#EEEEEE] p-2">
          <div className="flex">
            <Image
              src="/icons/SearchIcon.svg"
              alt="검색"
              width={20}
              height={20}
              onClick={() => routeSearchValue(searchValue)}
              className="cursor-pointer"
            />
            <input
              type="text"
              placeholder="검색어를 입력해 주세요."
              value={searchValue}
              onChange={handleValueChange}
              onKeyDown={handleKeyDown}
              className="font-pretendard-medium ml-3 w-full bg-transparent text-sm text-black placeholder-gray-400 outline-none"
            />
          </div>
          {searchValue && (
            <button type="button" onClick={handleClearSearch}>
              <Image src="/icons/CloseIcon.svg" alt="삭제" width={18} height={18} />
            </button>
          )}
        </div>
      </div>
      {/* 자동 완성 제안 목록 */}
      {filteredTerms.length > 0 && (
        <div className="absolute top-full z-10 mt-0.5 w-full rounded-b-[20px] bg-white px-1 pb-3 pt-3">
          <h5 className="mb-5 px-6 text-xs">교과목명 추천검색어</h5>
          {filteredTerms.map((term, index) => (
            <div
              key={term}
              role="presentation"
              onClick={() => handleSuggestionClick(term)}
              className={`font-pretendard-medium flex cursor-pointer justify-between px-6 py-2 text-base ${
                index === activeSuggestionIndex ? "rounded-2xl bg-gray-100" : ""
              }`}
            >
              <span> {term}</span>

              <Image src="/icons/AutoCompleteIcon.svg" alt="자동완성" width={14} height={14} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPageInput;
