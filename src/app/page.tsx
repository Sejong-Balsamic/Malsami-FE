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
import NoticeSection from "@/components/landing/NoticeSection";
import LandingWriteFAB from "@/components/common/FABs/LandingWriteFAB";

export default function LandingPage() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userName, setUserName] = useState<string>("");

  const [documentActiveTab, setDocumentActiveTab] = useState("주간");
  const [questionActiveTab, setQuestionActiveTab] = useState("주간");

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
    <>
      {/* Header */}
      <LandingHeader />

      {/* Main Content */}
      <main className="px-5">
        {/* 캐릭터와 인사말 섹션 */}
        <section aria-labelledby="welcome-heading" className="mb-6 mt-8">
          <WelcomeSection userName={userName} />
        </section>

        {/* 검색창 섹션 */}
        <section aria-label="search" className="mb-6">
          {/* SearchBar 컴포넌트로 분리 가능 */}
          {/* <SearchBar /> */}
        </section>

        {/* 공지사항 섹션 */}
        <section aria-labelledby="notice-heading" className="mb-6">
          <NoticeSection onViewAll={() => router.push("/notice")} />
        </section>

        {/* HOT 인기자료 섹션 */}
        <section ref={hotDocumentRef} aria-labelledby="hot-documents-heading" className="mb-8">
          <HotDocumentsSection
            activeTab={documentActiveTab}
            onTabChange={setDocumentActiveTab}
            onViewAll={() => router.push("/board/document/hot")}
          />
        </section>

        {/* 자료 게시판 섹션 */}
        <section aria-labelledby="all-documents-heading" className="mb-8">
          <AllDocumentsSection onViewAll={() => router.push("/board/document")} />
        </section>

        {/* HOT 인기질문 섹션 */}
        <section ref={hotQuestionRef} aria-labelledby="hot-questions-heading" className="mb-8">
          <HotQuestionsSection
            activeTab={questionActiveTab}
            onTabChange={setQuestionActiveTab}
            onViewAll={() => router.push("/board/question")}
          />
        </section>

        {/* 질문 게시판 섹션 */}
        <section aria-labelledby="all-questions-heading" className="mb-8">
          {/* AllQuestionsSection 컴포넌트로 분리 가능 */}
          <AllQuestionsSection onViewAll={() => router.push("/board/question")} />
        </section>
      </main>

      {/* 플로팅 버튼 (글쓰기) */}
      <LandingWriteFAB />
    </>
  );
}
