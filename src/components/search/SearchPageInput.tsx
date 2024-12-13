// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import subjects from "@/lib/subjects";

// const savedSearchTerms: string[] = subjects;

// function SearchPageInput() {
//   const [searchValue, setSearchValue] = useState(""); // 현재 입력값
//   const [filteredTerms, setFilteredTerms] = useState<string[]>([]); // 추천 목록
//   const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1); // 활성화된 추천 항목
//   const router = useRouter();

//   const isFacultyMode = searchValue.startsWith("@"); // @로 시작하는지 확인

//   const routeSearchValue = (term: string) => {
//     if (term.trim()) {
//       router.push(`/search/result?query=${encodeURIComponent(term)}`);
//     }
//   };

//   const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchValue(value);

//     if (value.startsWith("@")) {
//       const searchQuery = value.slice(1).toLowerCase();
//       setFilteredTerms(savedSearchTerms.filter(term => term.toLowerCase().includes(searchQuery)));
//     } else {
//       setFilteredTerms([]);
//     }
//     setActiveSuggestionIndex(-1);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (isFacultyMode && filteredTerms.length > 0) {
//       if (e.key === "ArrowDown") {
//         setActiveSuggestionIndex(prev => (prev < filteredTerms.length - 1 ? prev + 1 : prev));
//       } else if (e.key === "ArrowUp") {
//         setActiveSuggestionIndex(prev => (prev > 0 ? prev - 1 : prev));
//       } else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
//         const selectedTerm = filteredTerms[activeSuggestionIndex];
//         setSearchValue(`@${selectedTerm}`);
//         setFilteredTerms([]);
//       } else if (e.key === "Enter") {
//         routeSearchValue(searchValue);
//       }
//     } else if (e.key === "Enter") {
//       routeSearchValue(searchValue);
//     }
//   };

//   const handleSuggestionClick = (term: string) => {
//     setSearchValue(`@${term}`);
//     setFilteredTerms([]);
//   };

//   const handleClearSearch = () => {
//     setSearchValue("");
//     setFilteredTerms([]);
//   };

//   return (
//     <div className="relative w-full bg-white py-2">
//       {/* 검색 입력 필드 */}
//       <div className="px-4">
//         <div className="flex w-full items-center justify-between rounded-lg bg-[#EEEEEE] p-2">
//           <div className="flex flex-grow items-center">
//             <Image
//               src="/icons/SearchIcon.svg"
//               alt="검색"
//               width={20}
//               height={20}
//               onClick={() => routeSearchValue(searchValue)}
//               className="cursor-pointer"
//             />
//             <input
//               type="text"
//               placeholder={isFacultyMode ? "@과목명 입력" : "검색어를 입력해 주세요."}
//               value={searchValue}
//               onChange={handleValueChange}
//               onKeyDown={handleKeyDown}
//               className="font-pretendard-medium ml-3 flex-grow bg-transparent text-sm text-black placeholder-gray-400 outline-none"
//             />
//           </div>
//           {searchValue && (
//             <button type="button" onClick={handleClearSearch} className="w-5">
//               <Image src="/icons/CloseIcon.svg" alt="삭제" width={18} height={18} />
//             </button>
//           )}
//         </div>
//       </div>

//       {/* 자동 완성 제안 목록 */}
//       {isFacultyMode && filteredTerms.length > 0 && (
//         <div className="absolute top-full z-10 mt-0.5 w-full rounded-b-[20px] bg-white px-1 pb-3 pt-3">
//           <h5 className="mb-5 px-6 text-xs">교과목명 추천검색어</h5>
//           {filteredTerms.map((term, index) => (
//             <div
//               key={term}
//               role="presentation"
//               onClick={() => handleSuggestionClick(term)}
//               className={`font-pretendard-medium flex cursor-pointer justify-between px-6 py-2 text-base ${
//                 index === activeSuggestionIndex ? "rounded-2xl bg-gray-100" : ""
//               }`}
//             >
//               <span>{term}</span>
//               <Image src="/icons/AutoCompleteIcon.svg" alt="자동완성" width={14} height={14} />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default SearchPageInput;

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import subjects from "@/lib/subjects";

const savedSearchTerms: string[] = subjects;

function SearchPageInput() {
  const [searchValue, setSearchValue] = useState(""); // 검색창 전체 입력값
  const [filteredTerms, setFilteredTerms] = useState<string[]>([]); // 추천 목록
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1); // 활성화된 추천 항목
  const router = useRouter();

  // @로 시작하는 교과목명과 일반 검색어를 분리
  const parseSearchValue = (value: string) => {
    const atIndex = value.indexOf("@");
    if (atIndex === -1) {
      return { faculty: "", others: value }; // @가 없으면 일반 검색어만
    }
    const faculty = value.slice(atIndex + 1).split(" ")[0]; // @ 이후 첫 공백까지
    const others = value.slice(0, atIndex) + value.slice(atIndex + faculty.length + 2); // 나머지 텍스트
    return { faculty: `@${faculty}`, others: others.trim() };
  };

  const { faculty, others } = parseSearchValue(searchValue);

  const routeSearchValue = () => {
    const query = `${faculty} ${others}`.trim();
    if (query) {
      router.push(`/search/result?query=${encodeURIComponent(query)}`);
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);

    // 구조 분해 할당에서 변수 이름 변경
    const { faculty: parsedFaculty, others: parsedOthers } = parseSearchValue(e.target.value);

    console.log("faculty: ", parsedFaculty);
    console.log("others: ", parsedOthers);

    if (parsedFaculty) {
      const searchQuery = parsedFaculty.slice(1).toLowerCase(); // @ 제거한 텍스트
      setFilteredTerms(savedSearchTerms.filter(term => term.toLowerCase().includes(searchQuery)));
    } else {
      setFilteredTerms([]);
    }

    setActiveSuggestionIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (faculty && filteredTerms.length > 0) {
      if (e.key === "ArrowDown") {
        setActiveSuggestionIndex(prev => (prev < filteredTerms.length - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowUp") {
        setActiveSuggestionIndex(prev => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
        const selectedTerm = filteredTerms[activeSuggestionIndex];
        setSearchValue(`${others} @${selectedTerm}`);
        setFilteredTerms([]);
      } else if (e.key === "Enter") {
        routeSearchValue();
      }
    } else if (e.key === "Enter") {
      routeSearchValue();
    }
  };

  const handleSuggestionClick = (term: string) => {
    setSearchValue(`${others} @${term}`);
    setFilteredTerms([]);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setFilteredTerms([]);
  };

  return (
    <div className="relative w-full bg-white py-2">
      {/* 검색 입력 필드 */}
      <div className="px-4">
        <div className="flex w-full items-center justify-between rounded-lg bg-[#EEEEEE] p-2">
          <div className="flex items-center">
            <Image
              src="/icons/SearchIcon.svg"
              alt="검색"
              width={20}
              height={20}
              onClick={routeSearchValue}
              className="mr-[10px] cursor-pointer"
            />
            <div className="flex items-center">
              {faculty && <span className="mr-2 rounded bg-blue-100 px-2 py-1 text-sm text-blue-500">{faculty}</span>}
              <input
                type="text"
                placeholder="검색어를 입력해 주세요."
                value={searchValue}
                onChange={handleValueChange}
                onKeyDown={handleKeyDown}
                className="font-pretendard-medium bg-transparent text-sm text-black placeholder-gray-400 outline-none"
              />
            </div>
          </div>
          {searchValue && (
            <button type="button" onClick={handleClearSearch} className="ml-1">
              <Image src="/icons/CloseIcon.svg" alt="삭제" width={18} height={18} />
            </button>
          )}
        </div>
      </div>

      {/* 자동 완성 제안 목록 */}
      {faculty && filteredTerms.length > 0 && (
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
              <span>{term}</span>
              <Image src="/icons/AutoCompleteIcon.svg" alt="자동완성" width={14} height={14} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPageInput;
