"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { documentPostApi } from "@/apis/documentPostApi";
import { DocumentPost } from "@/types/api/entities/postgres/documentPost";
import MovingCardDocument from "@/components/common/MovingCardDocument";
import MovingCardSkeleton from "@/components/common/MovingCardSkeleton";

interface HotDocumentsSectionProps {
  onViewAll: () => void;
  onTabChange: (value: ((prevState: string) => string) | string) => void;
  activeTab: string;
}

// 목데이터 생성 함수
const generateMockData = (count: number = 20, prefix: string = ""): DocumentPost[] => {
  return Array.from({ length: count }, (_, i) => ({
    documentPostId: `mock-${prefix}-${i}`,
    title: `${prefix} 자료 ${i + 1}: 공유드립니다! 유용한 정보 가득합니다`,
    content: `${prefix} 자료 ${i + 1}의 내용입니다. 이 자료는 학생들에게 매우 유용한 정보를 담고 있으며, 시험 준비에 도움이 될 것입니다.`,
    subject: ["인공지능", "데이터베이스", "컴퓨터구조", "알고리즘", "소프트웨어공학", "운영체제"][i % 6],
    documentTypes: [["DOCUMENT", "PAST_EXAM", "SOLUTION"][i % 3]] as any,
    customTags: [
      `${i % 3 === 0 ? "중간고사" : i % 3 === 1 ? "기말고사" : "과제"}`,
      `${i % 2 === 0 ? "꿀팁" : "요약본"}`,
    ],
    likeCount: 10 + Math.floor(Math.random() * 90),
    viewCount: 50 + Math.floor(Math.random() * 200),
    createdDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
    isLiked: false,
  }));
};

// 주간, 일간 목데이터
const MOCK_WEEKLY_DATA = generateMockData(20, "주간");
const MOCK_DAILY_DATA = generateMockData(20, "일간");

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
          if (
            response &&
            response.documentPostsPage &&
            response.documentPostsPage.content &&
            response.documentPostsPage.content.length > 0
          ) {
            setDocuments(response.documentPostsPage.content);
          } else {
            // API 응답이 비어있으면 목데이터 사용
            console.log("주간 인기자료 API 응답이 비어있어 목데이터를 사용합니다.");
            setDocuments(MOCK_WEEKLY_DATA);
          }
        } else {
          const response = await documentPostApi.getDailyPopularDocumentPost();
          if (
            response &&
            response.documentPostsPage &&
            response.documentPostsPage.content &&
            response.documentPostsPage.content.length > 0
          ) {
            setDocuments(response.documentPostsPage.content);
          } else {
            // API 응답이 비어있으면 목데이터 사용
            console.log("일간 인기자료 API 응답이 비어있어 목데이터를 사용합니다.");
            setDocuments(MOCK_DAILY_DATA);
          }
        }
      } catch (error) {
        console.error("인기 자료를 불러오는데 실패했습니다:", error);
        // API 호출 실패 시 목데이터 사용
        setDocuments(activeTab === "주간" ? MOCK_WEEKLY_DATA : MOCK_DAILY_DATA);
        console.log("API 호출 실패로 목데이터를 사용합니다.");
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
            <h2 className="font-suit-medium ml-[10px] whitespace-nowrap text-[16px]">HOT 인기자료</h2>
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
                className={`font-suit-medium absolute text-[12px] ${activeTab === "주간" ? "text-white" : "text-black"}`}
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
                className={`font-suit-medium absolute text-[12px] ${activeTab === "일간" ? "text-white" : "text-black"}`}
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
          className="font-suit-medium ml-2 flex-shrink-0 whitespace-nowrap text-[14px] text-[#A7A7A7]"
        >
          전체보기
        </button>
      </div>

      {/* 카드 스와이핑 영역 */}
      {/* 로딩 중일 때 스켈레톤 표시 */}
      {loading && <MovingCardSkeleton />}
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
