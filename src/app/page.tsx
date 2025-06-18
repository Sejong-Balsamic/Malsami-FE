"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import LandingHeader from "@/components/header/LandingHeader";
import AllDocumentsSection from "@/components/landing/AllDocumentsSection";
import HotDocumentsSection from "@/components/landing/HotDocumentSection";
import AllQuestionsSection from "@/components/landing/AllQuestionsSection";
import HotQuestionsSection from "@/components/landing/HotQuestionSection";
import WelcomeSection from "@/components/landing/WelcomeSection";
import { memberApi } from "@/apis/memberApi";

export default function LandingPage() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userName, setUserName] = useState<string>("");
  const [activeTab, setActiveTab] = useState("주간");
  const hotDocumentRef = useRef<HTMLDivElement>(null);
  const hotQuestionRef = useRef<HTMLDivElement>(null);

  // userName 갱신
  const storeUserName = async (): Promise<void> => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      setUserName("종이");
      return;
    }

    try {
      const memberInfo = await memberApi.getMyInfo();
      const studentName = memberInfo?.member?.studentName || "종이";
      setUserName(studentName);
    } catch (error) {
      console.error("사용자 정보 불러오기 실패:", error);
      setUserName("종이");
    }
  };
  useEffect(() => {
    storeUserName();
  }, []);

  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      <div className="relative mx-auto min-h-screen w-full max-w-[640px] bg-white">
        {/* Header */}
        <LandingHeader />

        {/* Main Content */}
        <main className="px-5">
          {/* 캐릭터와 인사말 섹션 */}
          <section aria-labelledby="welcome-heading" className="mb-6 mt-8">
            <WelcomeSection userName={userName} />
          </section>

          {/* 검색창 섹션 */}
          <section aria-label="search" className="mb-8">
            {/* SearchBar 컴포넌트로 분리 가능 */}
            {/* <SearchBar /> */}
          </section>

          {/* 공지사항 섹션 */}
          <section aria-labelledby="notice-heading" className="mb-8">
            {/* NoticeSection 컴포넌트로 분리 가능 */}
            {/* <NoticeSection /> */}
          </section>

          {/* HOT 인기자료 섹션 */}
          <section ref={hotDocumentRef} aria-labelledby="hot-documents-heading" className="mb-8">
            <HotDocumentsSection
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onViewAll={() => router.push("/board/document/hot")}
            />
          </section>

          {/* 전체 자료 게시판 섹션 */}
          <section aria-labelledby="all-documents-heading" className="mb-8">
            <AllDocumentsSection onViewAll={() => router.push("/board/document")} />
          </section>

          {/* HOT 인기질문 섹션 */}
          <section ref={hotQuestionRef} aria-labelledby="hot-documents-heading" className="mb-8">
            <HotQuestionsSection
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onViewAll={() => router.push("/board/question/hot")}
            />
          </section>

          {/* 전체 질문 게시판 섹션 */}
          <section aria-labelledby="all-questions-heading" className="mb-8">
            {/* AllQuestionsSection 컴포넌트로 분리 가능 */}
            <AllQuestionsSection onViewAll={() => router.push("/board/questions")} />
          </section>
        </main>

        {/* 플로팅 버튼 (업로드, 스크롤 위로) */}
        {/* FloatingButtons 컴포넌트로 분리 가능 */}
        {/* <FloatingButtons onUpload={() => console.log("업로드")} /> */}
      </div>
    </div>
  );
}
