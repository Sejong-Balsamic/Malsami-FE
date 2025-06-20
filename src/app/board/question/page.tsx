"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/header/Header";
import CommonSearchBar from "@/components/search/CommonSearchBar";
import HotQuestionSection from "@/components/landing/HotQuestionSection";
import MajorQuestionSection from "@/components/landing/MajorQuestionSection";
import BountyQuestionSection from "@/components/landing/BountyQuestionSection";
import AllQuestionListSection from "@/components/landing/AllQuestionListSection";
import UploadQuestionFAB from "@/components/common/FABs/UploadQuestionFAB";
import { useState } from "react";
import { LEFT_ITEM } from "@/types/header";

export default function QuestionPage() {
  const router = useRouter();

  const [questionActiveTab, setQuestionActiveTab] = useState<string>("주간");
  const [bountyActiveTab, setBountyActiveTab] = useState<"최근순" | "높은순">("최근순");

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      <div className="relative mx-auto min-h-screen w-full max-w-[640px] bg-white">
        {/* Header */}
        <Header title="질문게시판" leftType={LEFT_ITEM.BACK} onLeftClick={handleBackClick} />

        {/* 헤더 아래 여백 추가 */}
        <div className="mt-[40px]">
          {/* Main Content */}
          <main className="px-5">
            {/* 검색바 */}
            <section aria-label="search" className="mb-5">
              <CommonSearchBar />
            </section>

            {/* HOT 인기질문 섹션 */}
            <section aria-labelledby="hot-questions-heading" className="mb-8">
              <HotQuestionSection
                activeTab={questionActiveTab}
                onTabChange={setQuestionActiveTab}
                onViewAll={() => router.push("/board/question")}
              />
            </section>

            {/* 내 전공관련 질문 섹션 */}
            <section aria-labelledby="major-questions-heading" className="mb-8">
              <MajorQuestionSection onViewAll={() => router.push("/board/question")} />
            </section>

            {/* 전체 질문 섹션 */}
            <section aria-labelledby="all-questions-heading" className="mb-8">
              <AllQuestionListSection onViewAll={() => router.push("/board/question")} />
            </section>

            {/* 연전현상금 섹션 */}
            <section aria-labelledby="bounty-questions-heading" className="mb-8">
              <BountyQuestionSection
                activeTab={bountyActiveTab}
                onTabChange={setBountyActiveTab}
                onViewAll={() => router.push("/board/question")}
              />
            </section>
          </main>
        </div>

        {/* 플로팅 버튼 (글쓰기) */}
        <UploadQuestionFAB isFABVisible />
      </div>
    </div>
  );
}
