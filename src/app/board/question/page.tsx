"use client";

import { useRouter } from "next/navigation";
import LandingHeader from "@/components/header/LandingHeader";
import CommonMainSearchBar from "@/components/common/CommonMainSearchBar";
import HotQuestionSection from "@/components/landing/HotQuestionSection";
import MajorQuestionSection from "@/components/landing/MajorQuestionSection";
import BountyQuestionSection from "@/components/landing/BountyQuestionSection";
import QuestionListSection from "@/components/questionMain/QuestionListSection";
import UploadQuestionFAB from "@/components/common/FABs/UploadQuestionFAB";
import { useState } from "react";

export default function QuestionPage() {
  const router = useRouter();

  const [questionActiveTab, setQuestionActiveTab] = useState<string>("주간");
  const [bountyActiveTab, setBountyActiveTab] = useState<"최근순" | "높은순">("최근순");

  return (
    <>
      <LandingHeader contentType="question" />

      {/* Main Content */}
      <main className="px-5">
        {/* 안내글 섹션 - 헤더로부터 40px 아래 */}
        <section aria-label="intro" className="mt-10">
          <div className="text-SUIT_24 font-medium leading-[140%]">
            <p>
              궁금한 내용을 <span className="font-bold text-question-main">질문</span>하고,
            </p>
            <p>
              다른 사람의 질문에 <span className="font-bold text-question-main">답변</span>해 주세요!
            </p>
          </div>
        </section>

        {/* 검색바 섹션 - 안내글로부터 24px 아래 */}
        <section aria-label="search" className="mb-12 mt-6">
          <CommonMainSearchBar contentType="question" />
        </section>

        {/* HOT 인기질문 섹션 */}
        <section aria-labelledby="hot-questions-heading" className="mb-8">
          <HotQuestionSection
            activeTab={questionActiveTab}
            onTabChange={setQuestionActiveTab}
            onViewAll={() => router.push("/board/question/hot")}
          />
        </section>

        {/* 전체 질문 섹션 */}
        <section aria-labelledby="all-questions-heading" className="mb-8">
          <QuestionListSection onViewAll={() => router.push("/board/question/all")} />
        </section>

        {/* 내 전공관련 질문 섹션 */}
        <section aria-labelledby="major-questions-heading" className="mb-8">
          <MajorQuestionSection onViewAll={() => router.push("/board/question/major")} />
        </section>

        {/* 엽전현상금 섹션 */}
        <section aria-labelledby="bounty-questions-heading" className="mb-8">
          <BountyQuestionSection
            activeTab={bountyActiveTab}
            onTabChange={setBountyActiveTab}
            onViewAll={() => router.push("/board/question/bounty")}
          />
        </section>
      </main>

      {/* 플로팅 버튼 (글쓰기) */}
      <UploadQuestionFAB isFABVisible />
    </>
  );
}
