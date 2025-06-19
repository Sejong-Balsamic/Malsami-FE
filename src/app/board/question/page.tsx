"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CommonHeader from "@/components/header/CommonHeader";
import { RIGHT_ITEM } from "@/types/header";
import CommonSearchBar from "@/components/search/CommonSearchBar";
import HotQuestionsSection from "@/components/landing/HotQuestionSection";
import BountyQuestionSection from "@/components/landing/BountyQuestionSection";
import MajorQuestionSection from "@/components/landing/MajorQuestionSection";
import AllQuestionListSection from "@/components/landing/AllQuestionListSection";
import UploadQuestionFAB from "@/components/common/FABs/UploadQuestionFAB";

export default function QuestionBoardPage() {
  const router = useRouter();
  
  // 각 섹션별로 독립적인 state 관리
  const [hotQuestionActiveTab, setHotQuestionActiveTab] = useState("주간");
  const [bountyActiveTab, setBountyActiveTab] = useState<"최근순" | "높은순">("최근순");

  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      <div className="relative mx-auto min-h-screen w-full min-w-[386px] max-w-[640px] bg-white">
        <CommonHeader title="질문 게시판" rightType={RIGHT_ITEM.NONE} />
        
        {/* 헤더 아래 20px 간격 */}
        <div className="mt-[84px]">
          {/* Main Content */}
          <main className="px-5">
            {/* 검색창 */}
            <div className="mb-6">
              <CommonSearchBar />
            </div>

            {/* HOT 인기질문 섹션 */}
            <section aria-labelledby="hot-questions-heading" className="mb-8">
              <HotQuestionsSection
                activeTab={hotQuestionActiveTab}
                onTabChange={setHotQuestionActiveTab}
                onViewAll={() => router.push("/board/question")}
              />
            </section>

            {/* 내 전공관련 질문 섹션 (32px 간격) */}
            <section aria-labelledby="major-questions-heading" className="mb-8">
              <MajorQuestionSection
                onViewAll={() => router.push("/board/question")}
              />
            </section>

            {/* 연전현상금 섹션 (32px 간격) */}
            <section aria-labelledby="bounty-questions-heading" className="mb-8">
              <BountyQuestionSection
                activeTab={bountyActiveTab}
                onTabChange={setBountyActiveTab}
                onViewAll={() => router.push("/board/question")}
              />
            </section>

            {/* 전체 질문 섹션 (32px 간격) */}
            <section aria-labelledby="all-questions-heading" className="mb-8">
              <AllQuestionListSection
                onViewAll={() => router.push("/board/question")}
              />
            </section>
          </main>
        </div>
      </div>

      {/* 플로팅 버튼 (질문 작성) */}
      <UploadQuestionFAB isFABVisible={true} />
    </div>
  );
}
