"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showModal } from "@/global/store/modalSlice";
import { Search } from "lucide-react";
import queryApi from "@/apis/queryApi";

export default function LoginOrSearchButton() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState("");
  const [subject, setSubject] = useState("");
  const [placeholders, setPlaceholders] = useState<string[]>([]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isLoadingPlaceholders, setIsLoadingPlaceholders] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);
  }, []);

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
        setPlaceholders(["과목명, 키워드 등을 입력하세요."]);
      }
    } catch (error) {
      console.error("실시간 인기 검색어 가져오기 실패:", error);
      setPlaceholders(["과목명, 키워드 등을 입력하세요."]);
    } finally {
      setIsLoadingPlaceholders(false);
    }
  }, []);

  // 컴포넌트 마운트 시 인기검색어 호출 (로그인된 경우만)
  useEffect(() => {
    if (isLoggedIn) {
      fetchPlaceholders();
    }
  }, [fetchPlaceholders, isLoggedIn]);

  // placeholders 2초마다 전환
  useEffect(() => {
    if (placeholders.length === 0 || !isLoggedIn) return undefined;

    const interval = setInterval(() => {
      setPlaceholderIndex(prev => (prev + 1) % placeholders.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [placeholders, isLoggedIn]);

  const handleLoginClick = () => {
    router.push("/login");
  };

  // 검색 실행
  const handleSearch = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      dispatch(showModal("로그인 후 이용가능합니다."));
      return;
    }

    if (!searchValue.trim() && !subject.trim()) return;

    const updatedQuery = `?query=${encodeURIComponent(searchValue.trim())}&subject=${encodeURIComponent(
      subject.trim(),
    )}`;
    router.push(`/search/result${updatedQuery}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  if (isLoggedIn) {
    return (
      <div className="relative mx-auto w-full max-w-[640px]">
        <div className="relative mx-auto flex h-[52px] w-full items-center overflow-hidden rounded-lg bg-white">
          {/* Gradient border 효과 */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-document-main to-question-main p-0.5">
            <div className="h-full w-full rounded-md bg-white" />
          </div>

          {/* 실제 입력 필드 */}
          <div className="relative flex h-full w-full items-center">
            <input
              type="text"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholders[placeholderIndex] || "과목명, 키워드 등을 입력하세요."}
              className="z-10 flex-1 bg-transparent py-4 pl-[18px] pr-12 text-SUIT_16 font-medium text-black placeholder-ui-muted outline-none"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="absolute right-4 z-10 flex items-center justify-center"
            >
              <Search className="h-5 w-5 text-question-main" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[640px]">
      <button
        type="button"
        onClick={handleLoginClick}
        className="mx-auto flex h-[56px] w-full items-center justify-center rounded-lg bg-gradient-to-r from-document-main to-question-main"
      >
        <span className="text-[18px] font-bold leading-[100%] text-white">로그인</span>
      </button>
    </div>
  );
}
