"use client";

import DocMainPageNav from "@/components/nav/DocMainPageNav";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import DocBoardContent from "@/components/board/document/DocMainPageContents/DailyPopularContent/DocBoardContent";
import HotDownloadContent from "@/components/board/document/DocMainPageContents/HotDowonloadContent/HotDownloadContent";
import WeeklyPopularContent from "@/components/board/document/DocMainPageContents/WeeklyPopularContent/WeeklyPopularContent";
import DailyPopularContent from "@/components/board/document/DocMainPageContents/DailyPopularContent/DailyPopularContent";
import MySubjectContent from "@/components/board/document/DocMainPageContents/MySubjectContent/MySubjectContent";
import DocRequestContent from "@/components/board/document/DocMainPageContents/DocRequestContent/DocRequestContent";

export default function DocumentBoardPage() {
  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      <ScrollToTopOnLoad />
      <div className="min-h-screen w-full min-w-[386px] max-w-[640px] bg-white">
        <DocMainPageNav />
        <div className="h-[2px] w-full bg-[#EEEEEE]" />
        <DocBoardContent />
        <div className="h-[2px] w-full bg-[#EEEEEE]" />
        <div className="p-5">
          <HotDownloadContent />
          <MySubjectContent subject="디자인이노베이션전공" />
          <WeeklyPopularContent />
          <DailyPopularContent />
          <DocRequestContent />
        </div>
      </div>
    </div>
  );
}
