"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { documentPostApi } from "@/apis/documentPostApi";
import { DocumentPost } from "@/types/api/entities/postgres/documentPost";
import MovingCardDocument from "@/components/common/MovingCardDocument";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface HotDocumentsSectionProps {
  onViewAll: () => void;
  onTabChange: (value: ((prevState: string) => string) | string) => void;
  activeTab: string;
}

export default function HotDocumentsSection({ onViewAll, onTabChange, activeTab }: HotDocumentsSectionProps) {
  const [documents, setDocuments] = useState<DocumentPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 탭 변경에 따른 데이터 로드
  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        if (activeTab === "주간") {
          const response = await documentPostApi.getWeeklyPopularDocumentPost();
          if (response && response.documentPostsPage && response.documentPostsPage.content) {
            setDocuments(response.documentPostsPage.content);
          }
        } else {
          const response = await documentPostApi.getDailyPopularDocumentPost();
          if (response && response.documentPostsPage && response.documentPostsPage.content) {
            setDocuments(response.documentPostsPage.content);
          }
        }
      } catch (error) {
        console.error("인기 자료를 불러오는데 실패했습니다:", error);
        setDocuments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [activeTab]);

  return (
    <div>
      {/* 헤더 영역: 제목, 탭, 전체보기 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex flex-1 flex-wrap items-center">
          <div className="mr-2 flex items-center">
            <Image src="/icons/fire.svg" alt="인기" width={18} height={24} />
            <h2 className="ml-[10px] whitespace-nowrap text-SUIT_16 font-medium">HOT 인기자료</h2>
          </div>

          {/* 주간/일간 버튼 */}
          <div className="mt-0 flex items-center">
            {/* 주간 버튼 */}
            <button
              type="button"
              onClick={() => onTabChange("주간")}
              className="relative flex items-center justify-center"
            >
              <div
                className={`h-[27px] w-[42px] rounded-[13.5px] ${activeTab === "주간" ? "bg-[#00d241]" : "bg-[#e9eaed]"}`}
              />
              <span
                className={`absolute text-SUIT_12 font-medium ${activeTab === "주간" ? "text-white" : "text-black"}`}
              >
                주간
              </span>
            </button>

            {/* 일간 버튼 */}
            <button
              type="button"
              onClick={() => onTabChange("일간")}
              className="relative ml-[4px] flex items-center justify-center"
            >
              <div
                className={`h-[27px] w-[42px] rounded-[13.5px] ${activeTab === "일간" ? "bg-[#00d241]" : "bg-[#e9eaed]"}`}
              />
              <span
                className={`absolute text-SUIT_12 font-medium ${activeTab === "일간" ? "text-white" : "text-black"}`}
              >
                일간
              </span>
            </button>
          </div>
        </div>

        {/* 전체보기 링크 */}
        <button
          type="button"
          onClick={onViewAll}
          className="ml-2 flex-shrink-0 whitespace-nowrap text-SUIT_14 font-medium text-[#A7A7A7]"
        >
          전체보기
        </button>
      </div>

      {/* 카드 스와이핑 영역 */}
      {/* 로딩 중일 때 로딩 스피너 표시 */}
      {loading && (
        <div className="flex h-[194px] w-full items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      {/* 데이터가 있을 때 MovingCardDocument 컴포넌트 렌더링 */}
      {!loading && documents.length > 0 && <MovingCardDocument data={documents} />}
      {/* 데이터가 없을 때 표시되는 메시지 */}
      {!loading && documents.length === 0 && (
        <div className="flex h-[194px] w-full items-center justify-center">
          <span>표시할 인기 자료가 없습니다.</span>
        </div>
      )}
    </div>
  );
}
