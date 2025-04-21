"use client";

import React from "react";
import LandingHeader from "@/components/header/LandingHeader";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import HotQuestionSection from "@/components/common/HotQuestionSection";
import HotDocumentSection from "@/components/common/HotDocumentSection";
import MajorQuestionSection from "@/components/common/MajorQuestionSection";
import BountySection from "@/components/common/BountySection";
import MajorDocumentSection from "@/components/common/MajorDocumentSection";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      <ScrollToTopOnLoad />
      <LandingHeader />
      <div className="mt-[64px] w-full max-w-[640px] bg-white">
        <HotQuestionSection />
        <HotDocumentSection />
        <BountySection />
        <MajorQuestionSection majorName="컴퓨터공학부" />
        <MajorDocumentSection majorName="컴퓨터공학부" />
      </div>
    </div>
  );
}
