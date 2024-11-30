"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import SearchResultNav from "@/components/search/SearchResultNav";
import getSearchResult from "@/apis/search/getSearchResult";

export default function SearchResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || ""; // URL에서 검색어 추출
  const [searchValue, setSearchValue] = useState(initialQuery || ""); // 현재 검색어 상태
  // const [searchResults, setSearchResults] = useState<any[]>([]); // 검색 결과 저장
  // const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  // 검색어 입력 시 호출되는 함수
  const handleValueChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(value); // 입력값 업데이트
  };

  // 검색어 초기화 함수
  const handleClearValue = () => {
    setSearchValue("");
  };

  // 검색 API 호출 함수
  const fetchSearchResults = async (value: string) => {
    if (!value.trim()) {
      return;
    }
    // setIsLoading(true);
    try {
      // API 호출
      const response = await getSearchResult({ params: value.trim() });
      console.log("result: ", response);
    } catch (error) {
      console.error("API 호출 에러:", error);
      alert("검색 결과를 가져오는 데 문제가 발생했습니다.");
    } finally {
      // setIsLoading(false);
    }
  };
  // 검색 실행 함수
  const handleSearch = () => {
    if (!searchValue.trim()) {
      return;
    }

    const updatedQuery = `?query=${encodeURIComponent(searchValue.trim())}`;
    router.push(`/search/result${updatedQuery}`); // URL 업데이트
    fetchSearchResults(searchValue); // API 호출
  };

  // 초기 검색어가 있을 경우 API 호출
  useEffect(() => {
    if (initialQuery) {
      fetchSearchResults(initialQuery);
    }
  }, [initialQuery]);

  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      <ScrollToTopOnLoad />
      <div className="min-h-screen w-full min-w-[386px] max-w-[640px] bg-white">
        {/* 헤더 */}
        <SearchResultNav
          searchValue={searchValue}
          onSearchChange={handleValueChange}
          onBack={() => router.back()}
          onClear={handleClearValue}
          onSearch={handleSearch} // 돋보기 버튼 클릭 시 API 호출
        />
      </div>
    </div>
  );
}
