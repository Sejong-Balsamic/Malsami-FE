"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showModal } from "@/global/store/modalSlice";
import { Search, X } from "lucide-react";
import subjects from "@/types/subjects";
import AutoCompleteSuggestionList from "@/components/search/AutoCompleteSuggestionList";
import queryApi from "@/apis/queryApi";

const savedSearchTerms: string[] = subjects;

export default function LandingSearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [subject, setSubject] = useState("");
  const [filteredTerms, setFilteredTerms] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [placeholders, setPlaceholders] = useState<string[]>([]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isLoadingPlaceholders, setIsLoadingPlaceholders] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  // 기본 설정값들
  const placeholder = "과목명, 키워드 등을 입력하세요.";
  const showLoginCheck = true;
  const className = "";

  // 인기검색어 API 호출
  const fetchPlaceholders = useCallback(async () => {
    if (isLoadingPlaceholders) return;

    setIsLoadingPlaceholders(true);
    try {
      const topKeywords = await queryApi.getTopKeywords({ topN: 10 });
      const searchHistoryList = topKeywords.searchHistoryList ?? [];

      const keywords = searchHistoryList
        .map(item => item.keyword)
        .filter((keyword): keyword is string => Boolean(keyword?.trim()));

      if (keywords.length > 0) {
        setPlaceholders(keywords);
      } else {
        setPlaceholders([placeholder]);
      }
    } catch (error) {
      setPlaceholders([placeholder]);
    } finally {
      setIsLoadingPlaceholders(false);
    }
  }, [placeholder]);

  // 컴포넌트 마운트 시 인기검색어 호출
  useEffect(() => {
    fetchPlaceholders();
  }, [fetchPlaceholders]);

  // placeholders 2초마다 전환
  useEffect(() => {
    if (placeholders.length === 0) return undefined;

    const interval = setInterval(() => {
      setPlaceholderIndex(prev => (prev + 1) % placeholders.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [placeholders]);

  // 로그인 체크
  const checkLogin = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    return !!accessToken;
  };

  // 검색 실행
  const handleSearch = () => {
    // 로그인 체크
    if (showLoginCheck && !checkLogin()) {
      dispatch(showModal("로그인 후 이용가능합니다."));
      return;
    }

    if (!searchValue.trim() && !subject.trim()) return;

    const updatedQuery = `?query=${encodeURIComponent(searchValue.trim())}&subject=${encodeURIComponent(
      subject.trim(),
    )}`;
    router.push(`/search/result${updatedQuery}`);
  };

  // 입력값 변경
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);

    // @ 기호로 과목 검색 기능
    if (value.includes("@")) {
      const atIndex = value.indexOf("@");
      const searchQuery = value.slice(atIndex + 1).toLowerCase();
      setFilteredTerms(savedSearchTerms.filter(term => term.toLowerCase().includes(searchQuery)));
    } else {
      setFilteredTerms([]);
    }

    setActiveSuggestionIndex(-1);
  };

  // 키보드 입력 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;

    switch (key) {
      case "ArrowDown":
        e.preventDefault();
        if (filteredTerms.length > 0)
          setActiveSuggestionIndex(prev => (prev < filteredTerms.length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (filteredTerms.length > 0) setActiveSuggestionIndex(prev => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (filteredTerms.length > 0 && activeSuggestionIndex >= 0) {
          const selectedTerm = filteredTerms[activeSuggestionIndex];
          setSubject(`@${selectedTerm}`);
          setSearchValue(searchValue.replace(/@[^ ]*/, "").trim());
          setFilteredTerms([]);
        } else {
          handleSearch();
        }
        break;
      default:
        break;
    }
  };

  const handleSuggestionClick = (term: string) => {
    setSubject(`@${term}`);
    setSearchValue(searchValue.replace(/@[^ ]*/, "").trim());
    setFilteredTerms([]);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setSubject("");
    setFilteredTerms([]);
  };

  // Gradient 스타일 (랜딩페이지 전용)
  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative mx-auto flex h-[52px] w-full items-center overflow-hidden rounded-lg bg-white">
        {/* Gradient border 효과 */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-document-main to-question-main p-0.5">
          <div className="h-full w-full rounded-md bg-white" />
        </div>

        {/* 실제 입력 필드 */}
        <div className="relative flex h-full w-full items-center">
          {subject && (
            <span className="z-10 ml-[18px] mr-2 flex-shrink-0 text-SUIT_16 font-medium text-question-main">
              {subject}
            </span>
          )}
          <input
            type="text"
            value={searchValue}
            onChange={handleValueChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholders[placeholderIndex] || placeholder}
            className={`z-10 flex-1 bg-transparent py-4 pr-12 text-SUIT_16 font-medium text-black placeholder-ui-muted outline-none ${
              subject ? "" : "pl-[18px]"
            }`}
          />

          {/* 삭제 버튼 */}
          {(searchValue || subject) && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-12 z-10 rounded-full bg-gray-200 p-1"
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>
          )}

          <button
            type="button"
            onClick={handleSearch}
            className="absolute right-4 z-10 flex items-center justify-center"
          >
            <Search className="h-5 w-5 text-question-main" />
          </button>
        </div>
      </div>

      {/* 자동 완성 제안 */}
      {filteredTerms.length > 0 && (
        <AutoCompleteSuggestionList
          filteredTerms={filteredTerms}
          activeSuggestionIndex={activeSuggestionIndex}
          onSuggestionClick={handleSuggestionClick}
        />
      )}
    </div>
  );
}
