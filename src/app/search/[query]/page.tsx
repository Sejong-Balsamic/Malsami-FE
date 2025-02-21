"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../global/store";
import { setActiveTab } from "@/global/store/activeTabSlice";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import getSearchResult from "@/apis/search/getSearchResult";
import SearchResultNav from "@/components/search/SearchResultNav";
import SearchBoardTab from "@/components/search/SearchBoardTab";
import SearchDocContainer from "@/components/search/SearchDocContainer";
import SearchQnaContainer from "@/components/search/SearchQnaContainer";
import { DocCardProps } from "@/types/docCard.type";
import { QnaCard } from "@/types/QnaCard";

export default function SearchResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const activeTab = useSelector((state: RootState) => state.activeTab.activeTab);

  const initialQuery = searchParams.get("query") || ""; // URL에서 검색어 추출
  const initialSubject = searchParams.get("subject") || ""; // URL에서 subject 추출
  const [searchValue, setSearchValue] = useState(initialQuery); // 검색어 상태
  const [subject, setSubject] = useState(initialSubject); // subject 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [executedSearchValue, setExecutedSearchValue] = useState(initialQuery); // 실행된 검색어
  const [executedSubject, setExecutedSubject] = useState(initialSubject); // 실행된 subject
  const [docResults, setDocResults] = useState<DocCardProps[]>([]); // 자료 결과 저장
  const [qnaResults, setQnaResults] = useState<QnaCard[]>([]); // 질문 결과 저장

  // 검색 API 호출 함수
  const fetchSearchResults = async (query: string, subjectParam: string) => {
    if (!query.trim() && !subjectParam.trim()) return;

    setIsLoading(true);
    const formattedSubject = subjectParam.startsWith("@") ? subjectParam.slice(1).trim() : subjectParam.trim(); // "@" 제거 처리
    try {
      const response = await getSearchResult({
        params: { query: query.trim(), subject: formattedSubject },
      });
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
    if (!searchValue.trim() && !subject.trim()) return;

    setExecutedSearchValue(searchValue); // 실행된 검색어 업데이트
    setExecutedSubject(subject); // 실행된 subject 업데이트

    const updatedQuery = `?query=${encodeURIComponent(searchValue.trim())}&subject=${encodeURIComponent(
      subject.trim(),
    )}`;
    router.push(`/search/result${updatedQuery}`); // URL 업데이트
    fetchSearchResults(searchValue, subject); // API 호출
  };

  // 검색어 입력 시 호출되는 함수
  const handleValueChange = (value: string) => setSearchValue(value); // 검색어 상태 업데이트

  // subject 입력 시 호출되는 함수
  const handleSubjectChange = (newSubject: string) => setSubject(newSubject); // subject 상태 업데이트

  // URL에서 검색어와 subject 변경을 감지하고 상태를 업데이트 및 API 호출
  useEffect(() => {
    const query = searchParams.get("query") || "";
    const subjectParam = searchParams.get("subject") || "";

    console.log("query: ", query);
    console.log("subject: ", subjectParam);

    setSearchValue(query); // 검색어 상태 업데이트
    setExecutedSearchValue(query); // 실행된 검색어 업데이트

    setSubject(subjectParam); // subject 상태 업데이트
    setExecutedSubject(subjectParam); // 실행된 subject 업데이트

    fetchSearchResults(query, subjectParam); // API 호출
  }, [searchParams]); // searchParams가 변경될 때마다 실행

  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      <ScrollToTopOnLoad />
      <div className="min-h-screen w-full min-w-[386px] max-w-[640px] bg-white">
        {/* 헤더 */}
        <SearchResultNav
          searchValue={searchValue}
          subject={subject}
          onSearchChange={handleValueChange}
          onSubjectChange={handleSubjectChange}
          onBack={() => router.back()}
          onSearch={handleSearch} // 돋보기 버튼 클릭 시 API 호출
        />
        {/* 탭 컴포넌트 */}
        <SearchBoardTab
          activeTab={activeTab}
          onTabChange={(tab: "자료게시판" | "질문게시판") => dispatch(setActiveTab(tab))}
        />
        {/* 검색 결과 컴포넌트 렌더링 */}
        {isLoading && <LoadingSpinner />}
        {!isLoading && activeTab === "자료게시판" && (
          <SearchDocContainer docResults={docResults} searchValue={executedSearchValue} subject={executedSubject} />
        )}
        {!isLoading && activeTab === "질문게시판" && (
          <SearchQnaContainer qnaResults={qnaResults} searchValue={executedSearchValue} subject={executedSubject} />
        )}
      </div>
    </div>
  );
}
