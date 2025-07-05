"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/Header";
import CommonPagination from "@/components/common/CommonPagination";
import TwoTabFilter from "@/components/common/TwoTabFilter";
import { LEFT_ITEM } from "@/types/header";
import { documentPostApi } from "@/apis/documentPostApi";
import { DocumentPost } from "@/types/api/entities/postgres/documentPost";
import DocumentCardList from "@/components/documentMain/DocumentCardList";

// 목데이터 생성 함수
const generateMockData = (count: number = 20, prefix: string = ""): DocumentPost[] => {
  return Array.from({ length: count }, (_, i) => ({
    documentPostId: `mock-${prefix}-${i}`,
    title: `${prefix} 자료 ${i + 1}: 공유드립니다! 유용한 정보 가득합니다`,
    content: `${prefix} 자료 ${i + 1}의 내용입니다. 이 자료는 학생들에게 매우 유용한 정보를 담고 있으며, 시험 준비에 도움이 될 것입니다.`,
    subject: ["인공지능", "데이터베이스", "컴퓨터구조", "알고리즘", "소프트웨어공학", "운영체제"][i % 6],
    documentTypes: [["DOCUMENT", "PAST_EXAM", "SOLUTION"][i % 3]] as any,
    customTags: [
      // eslint-disable-next-line no-nested-ternary
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

export default function HotDocumentPage() {
  const router = useRouter();

  // 상태 관리
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [weeklyDocuments, setWeeklyDocuments] = useState<DocumentPost[]>([]);
  const [dailyDocuments, setDailyDocuments] = useState<DocumentPost[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"주간" | "일간">("주간");

  // 페이지 로드시 모든 데이터 가져오기
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        // 주간 + 일간 데이터 동시에 가져오기
        const [weeklyResponse, dailyResponse] = await Promise.all([
          documentPostApi.getWeeklyPopularDocumentPost(),
          documentPostApi.getDailyPopularDocumentPost(),
        ]);

        console.log("주간 인기자료 데이터:", weeklyResponse);
        console.log("일간 인기자료 데이터:", dailyResponse);

        // API 응답이 비어있으면 목데이터 사용
        const weeklyContent = weeklyResponse.documentPostsPage?.content || [];
        const dailyContent = dailyResponse.documentPostsPage?.content || [];

        setWeeklyDocuments(weeklyContent.length > 0 ? weeklyContent : MOCK_WEEKLY_DATA);
        setDailyDocuments(dailyContent.length > 0 ? dailyContent : MOCK_DAILY_DATA);
      } catch (error) {
        console.error("HOT 인기자료를 불러오는데 실패했습니다:", error);
        // API 호출 실패 시 목데이터 사용
        setWeeklyDocuments(MOCK_WEEKLY_DATA);
        setDailyDocuments(MOCK_DAILY_DATA);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // 현재 탭에 따른 데이터 필터링
  const currentDocuments = activeTab === "주간" ? weeklyDocuments : dailyDocuments;
  const totalPages = Math.ceil(currentDocuments.length / 10); // 페이지당 10개

  // 탭 변경 핸들러 (API 호출 없음, 필터링만)
  const handleTabChange = (newTab: "주간" | "일간") => {
    setActiveTab(newTab);
    setCurrentPage(0);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleBackClick = () => {
    router.back();
  };

  // 현재 페이지의 데이터 계산
  const startIndex = currentPage * 10;
  const endIndex = startIndex + 10;
  const currentPageDocuments = currentDocuments.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="fixed top-0 z-50 w-full max-w-[640px] bg-white">
        <Header title="HOT 인기자료" leftType={LEFT_ITEM.BACK} onLeftClick={handleBackClick} />
      </div>

      {/* 헤더 높이 스페이서 (4rem) */}
      <div className="h-16 w-full" />

      <div className="px-5">
        {/* 주간/일간 필터링 컴포넌트 */}
        <TwoTabFilter
          firstTab="주간"
          secondTab="일간"
          activeTab={activeTab}
          onTabChange={handleTabChange}
          activeColor="#00D1F2"
        />

        {/* 24px 공백 */}
        <div className="h-6" />

        {/* 메인 콘텐츠 */}
        <div className="w-full bg-white">
          {isLoading && (
            <div className="flex h-40 items-center justify-center">
              <span className="text-SUIT_14 font-medium text-[#C5C5C5]">로딩 중...</span>
            </div>
          )}
          {!isLoading && currentPageDocuments.length > 0 && <DocumentCardList data={currentPageDocuments} />}
          {!isLoading && currentPageDocuments.length === 0 && (
            <div className="flex h-40 items-center justify-center">
              <span className="text-SUIT_14 font-medium text-[#C5C5C5]">표시할 인기 자료가 없습니다.</span>
            </div>
          )}
        </div>

        {/* 24px 공백 */}
        <div className="h-6" />

        {/* 페이지네이션 */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center">
            <CommonPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        )}

        {/* 61px 하단 여백 (모바일 탭바 고려) */}
        <div className="h-[61px]" />
      </div>
    </div>
  );
}
