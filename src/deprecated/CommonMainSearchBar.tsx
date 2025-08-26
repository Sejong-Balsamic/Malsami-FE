/* DEPRECATED - 이 파일은 더 이상 사용되지 않습니다.
   대신 /components/common/SearchBar.tsx를 사용하세요. */

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Search, X } from "lucide-react";
// import subjects from "@/types/subjects";
// import AutoCompleteSuggestionList from "@/components/search/AutoCompleteSuggestionList";

// interface CommonMainSearchBarProps {
//   // eslint-disable-next-line react/require-default-props
//   contentType?: "document" | "question";
// }

// const savedSearchTerms: string[] = subjects;
// const placeholders = ["과목명, 키워드 등을 입력하세요."];

// export default function CommonMainSearchBar({ contentType = "question" }: CommonMainSearchBarProps) {
//   const [searchValue, setSearchValue] = useState("");
//   const [subject, setSubject] = useState("");
//   const [filteredTerms, setFilteredTerms] = useState<string[]>([]);
//   const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
//   const [placeholderIndex, setPlaceholderIndex] = useState(0);

//   const router = useRouter();

//   // 색상 설정
//   const borderColor = contentType === "document" ? "#00D1F2" : "#00E271";

//   // placeholder 3초마다 변경 (필요시)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPlaceholderIndex(prevIndex => (prevIndex + 1) % placeholders.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   // 검색 실행
//   const routeSearchValue = () => {
//     if (!searchValue.trim() && !subject.trim()) return;
//     const updatedQuery = `?query=${encodeURIComponent(searchValue.trim())}&subject=${encodeURIComponent(
//       subject.trim(),
//     )}`;
//     router.push(`/search/result${updatedQuery}`);
//   };

//   // 입력값 변경
//   const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = e.target;
//     setSearchValue(value);

//     // @ 기호로 과목 검색 기능
//     if (value.includes("@")) {
//       const atIndex = value.indexOf("@");
//       const searchQuery = value.slice(atIndex + 1).toLowerCase();
//       setFilteredTerms(savedSearchTerms.filter(term => term.toLowerCase().includes(searchQuery)));
//     } else {
//       setFilteredTerms([]);
//     }

//     setActiveSuggestionIndex(-1);
//   };

//   // 키보드 입력 처리
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     const { key } = e;

//     switch (key) {
//       case "ArrowDown":
//         e.preventDefault();
//         if (filteredTerms.length > 0)
//           setActiveSuggestionIndex(prev => (prev < filteredTerms.length - 1 ? prev + 1 : prev));
//         break;
//       case "ArrowUp":
//         e.preventDefault();
//         if (filteredTerms.length > 0) setActiveSuggestionIndex(prev => (prev > 0 ? prev - 1 : prev));
//         break;
//       case "Enter":
//         e.preventDefault();
//         if (filteredTerms.length > 0 && activeSuggestionIndex >= 0) {
//           const selectedTerm = filteredTerms[activeSuggestionIndex];
//           setSubject(`@${selectedTerm}`);
//           setSearchValue(searchValue.replace(/@[^ ]*/, "").trim());
//           setFilteredTerms([]);
//         } else {
//           routeSearchValue();
//         }
//         break;
//       default:
//         break;
//     }
//   };

//   const handleSuggestionClick = (term: string) => {
//     setSubject(`@${term}`);
//     setSearchValue(searchValue.replace(/@[^ ]*/, "").trim());
//     setFilteredTerms([]);
//   };

//   const handleClearSearch = () => {
//     setSearchValue("");
//     setSubject("");
//     setFilteredTerms([]);
//   };

//   return (
//     <div className="relative w-full bg-white">
//       <div className="flex h-[52px] w-full items-center rounded-lg border-2 bg-white" style={{ borderColor }}>
//         {/* 입력 필드 */}
//         <div className="flex flex-1 items-center pl-[18px]">
//           {subject && (
//             <span className="mr-2 flex-shrink-0 text-SUIT_16 font-medium" style={{ color: borderColor }}>
//               {subject}
//             </span>
//           )}
//           <input
//             type="text"
//             value={searchValue}
//             onChange={handleValueChange}
//             onKeyDown={handleKeyDown}
//             placeholder={placeholders[placeholderIndex]}
//             className="flex-1 bg-transparent text-SUIT_16 font-medium leading-[100%] text-black placeholder-ui-muted focus:outline-none"
//           />
//         </div>

//         {/* 오른쪽 버튼들 */}
//         <div className="flex items-center pr-4">
//           {/* 삭제 버튼 */}
//           {(searchValue || subject) && (
//             <button type="button" onClick={handleClearSearch} className="mr-2 rounded-full bg-gray-200 p-1">
//               <X className="h-4 w-4 text-gray-600" />
//             </button>
//           )}

//           {/* 검색 아이콘 */}
//           <button type="button" onClick={routeSearchValue} className="flex items-center justify-center">
//             <Search className="h-6 w-6" style={{ color: borderColor }} />
//           </button>
//         </div>
//       </div>

//       {/* 자동 완성 제안 */}
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
