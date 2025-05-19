"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import LandingHeader from "@/components/header/LandingHeader";
import HotDocumentsSection from "@/components/common/HotDocumentSection";

export default function LandingPage() {
  const router = useRouter();
  // FIXME: userName은 실제 사용자 이름으로 대체해야 함.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userName, setUserName] = useState("종이");
  const [activeTab, setActiveTab] = useState("주간");
  const hotDocumentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 사용자 정보 로드 등 초기화 로직
    // ...
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
            {/* WelcomeSection 컴포넌트로 분리 가능 */}
            {/* <WelcomeSection userName={userName} /> */}
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
            {/* AllDocumentsSection 컴포넌트로 분리 가능 */}
            {/* <AllDocumentsSection onViewAll={() => router.push("/documents")} /> */}
          </section>

          {/* 전체 질문 게시판 섹션 */}
          <section aria-labelledby="all-questions-heading" className="mb-8">
            {/* AllQuestionsSection 컴포넌트로 분리 가능 */}
            {/* <AllQuestionsSection onViewAll={() => router.push("/questions")} /> */}
          </section>
        </main>

        {/* 플로팅 버튼 (업로드, 스크롤 위로) */}
        {/* FloatingButtons 컴포넌트로 분리 가능 */}
        {/* <FloatingButtons onUpload={() => console.log("업로드")} /> */}
      </div>
    </div>
  );
}
