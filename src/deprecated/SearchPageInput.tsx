// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import subjects from "@/types/subjects";
// import AutoCompleteSuggestionList from "./AutoCompleteSuggestionList";
// import SearchInputField from "./SearchInputField";
// import SearchClearBtn from "./SearchClearBtn";
// import SearchBtn from "./SearchBtn";

// const savedSearchTerms: string[] = subjects;

// function SearchPageInput() {
//   const [searchValue, setSearchValue] = useState(""); // 검색창 전체 입력값
//   const [subject, setSubject] = useState(""); // 선택된 교과목명
//   const [filteredTerms, setFilteredTerms] = useState<string[]>([]); // 추천 목록
//   const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1); // 활성화된 추천 항목
//   const placeholders = ["@과목으로 시작하여 검색하기", "@공간과인간 기말과제"];
//   const [placeholderIndex, setPlaceholderIndex] = useState(0);
//   const router = useRouter();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPlaceholderIndex(prevIndex => (prevIndex + 1) % placeholders.length); // 다음 placeholder
//     }, 3000); // 3초마다 전환

//     return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
//   }, []);

//   const routeSearchValue = () => {
//     if (!searchValue.trim() && !subject.trim()) return;
//     const updatedQuery = `?query=${encodeURIComponent(searchValue.trim())}&subject=${encodeURIComponent(
//       subject.trim(),
//     )}`;
//     router.push(`/search/result${updatedQuery}`);
//   };

//   const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = e.target; // 구조 분해 할당으로 value를 가져옴
//     setSearchValue(value);

//     if (value.includes("@")) {
//       const atIndex = value.indexOf("@");
//       const searchQuery = value.slice(atIndex + 1).toLowerCase(); // "@" 다음 텍스트
//       setFilteredTerms(savedSearchTerms.filter(term => term.toLowerCase().includes(searchQuery)));
//     } else {
//       setFilteredTerms([]);
//     }

//     setActiveSuggestionIndex(-1);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (filteredTerms.length > 0) {
//       if (e.key === "ArrowDown") {
//         setActiveSuggestionIndex(prev => (prev < filteredTerms.length - 1 ? prev + 1 : prev));
//       } else if (e.key === "ArrowUp") {
//         setActiveSuggestionIndex(prev => (prev > 0 ? prev - 1 : prev));
//       } else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
//         const selectedTerm = filteredTerms[activeSuggestionIndex];
//         setSubject(`@${selectedTerm}`); // subject에 저장
//         setSearchValue(searchValue.replace(/@[^ ]*/, "").trim()); // subject 부분은 검색어에서 제거
//         setFilteredTerms([]);
//       } else if (e.key === "Enter") {
//         routeSearchValue();
//       }
//     } else if (e.key === "Enter") {
//       routeSearchValue();
//     }
//   };

//   const handleSuggestionClick = (term: string) => {
//     setSubject(`@${term}`); // 선택된 교과목명 저장
//     setSearchValue(searchValue.replace(/@[^ ]*/, "").trim()); // 검색창에서 교과목명 제거
//     setFilteredTerms([]);
//   };

//   const handleClearSearch = () => {
//     setSearchValue("");
//     setSubject("");
//     setFilteredTerms([]);
//   };

//   return (
//     <div className="relative w-full bg-white py-2">
//       {/* 검색 입력 필드 */}
//       <div className="px-4">
//         <div className="flex h-10 w-full items-center justify-between rounded-lg bg-[#EEEEEE] p-2">
//           {/* 검색 아이콘 */}
//           <SearchBtn onClick={routeSearchValue} />

//           {/* 입력 필드 */}
//           <SearchInputField
//             subject={subject}
//             searchValue={searchValue}
//             placeholder={placeholders[placeholderIndex]}
//             onValueChange={handleValueChange}
//             onKeyDown={handleKeyDown}
//           />

//           {/* 삭제 버튼 */}
//           {(searchValue || subject) && <SearchClearBtn onClick={handleClearSearch} />}
//         </div>
//       </div>

//       {/* 자동 완성 제안 목록 */}
//       {filteredTerms.length > 0 && (
//         <AutoCompleteSuggestionList
//           filteredTerms={filteredTerms}
//           activeSuggestionIndex={activeSuggestionIndex}
//           onSuggestionClick={handleSuggestionClick}
//         />
//       )}
//     </div>
//   );
// }

// export default SearchPageInput;
