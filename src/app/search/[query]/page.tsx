"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setActiveTab } from "@/store/activeTabSlice"; // Redux action
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import getSearchResult from "@/apis/search/getSearchResult";
import SearchResultNav from "@/components/search/result/SearchResultNav";
import SearchBoardTab from "@/components/search/result/SearchBoardTab";
import SearchDocContainer from "@/components/search/result/doc/SearchDocContainer";
import SearchQnaContainer from "@/components/search/result/qna/SearchQnaContainer";
import { DocCardProps } from "@/types/docCard.type";
import { QnaCard } from "@/types/QnaCard";

export default function SearchResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || ""; // URL에서 검색어 추출
  const dispatch = useDispatch();
  const activeTab = useSelector((state: RootState) => state.activeTab.activeTab); // Get activeTab from Redux
  const [searchValue, setSearchValue] = useState(initialQuery || ""); // 현재 검색어 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [docResults, setDocResults] = useState<DocCardProps[]>([]); // 자료 결과 저장
  const [qnaResults, setQnaResults] = useState<QnaCard[]>([]); // 질문 결과 저장

  // 검색 API 호출 함수
  const fetchSearchResults = async (value: string) => {
    if (!value.trim()) return;
    setIsLoading(true);
    try {
      const response = await getSearchResult({ params: value.trim() });
      setDocResults(response.documentPostsPage.content);
      setQnaResults(response.questionPostsPage.content);
    } catch (error) {
      console.error("API 호출 에러:", error);
      alert("검색 결과를 가져오는 데 문제가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 검색 실행 함수
  const handleSearch = () => {
    if (!searchValue.trim()) return;

    const updatedQuery = `?query=${encodeURIComponent(searchValue.trim())}`;
    router.push(`/search/result${updatedQuery}`); // URL 업데이트
    fetchSearchResults(searchValue); // API 호출
  };

  // 검색어 입력 시 호출되는 함수
  const handleValueChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(value); // 입력값 업데이트
  };

  // 검색어 초기화 함수
  const handleClearValue = () => {
    setSearchValue("");
  };

  // URL에서 검색어 변경을 감지하고 상태를 업데이트 및 API 호출
  useEffect(() => {
    const query = searchParams.get("query") || "";
    setSearchValue(query); // 검색어 상태 업데이트
    fetchSearchResults(query); // API 호출
  }, [searchParams]); // searchParams가 변경될 때마다 실행

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
        {/* 탭 컴포넌트 */}
        <SearchBoardTab
          activeTab={activeTab}
          onTabChange={(tab: "자료게시판" | "질문게시판") => dispatch(setActiveTab(tab))}
        />
        {/* 검색 결과 컴포넌트 렌더링 */}
        <div className="p-4">
          {isLoading && <LoadingSpinner />}
          {!isLoading && activeTab === "자료게시판" && <SearchDocContainer docResults={docResults} />}
          {!isLoading && activeTab === "질문게시판" && <SearchQnaContainer qnaResults={qnaResults} />}
        </div>
      </div>
    </div>
  );
}
