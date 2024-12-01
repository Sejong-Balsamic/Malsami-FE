"use client";

import { useEffect, useState } from "react";
import DocMainPageNav from "@/components/nav/DocMainPageNav";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import WeeklyPopularContent from "@/components/board/document/DocMainPageContents/WeeklyPopularContent";
import DailyPopularContent from "@/components/board/document/DocMainPageContents/DailyPopularContent";
import DocBoardContent from "@/components/board/document/DocMainPageContents/DocBoardContent";
import HotDownloadContent from "@/components/board/document/DocMainPageContents/HotDownloadContent";
import MyFacultyContent from "@/components/board/document/DocMainPageContents/MyFacultyContent";
import DocRequestContent from "@/components/board/document/DocMainPageContents/DocRequestContent";
import UploadDocFAB from "@/components/common/UploadDocFAB";
import getMyShortInfo from "@/apis/document/getMyShortInfo";

export default function DocumentBoardPage() {
  const [faculty, setFaculty] = useState("");
  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const response = await getMyShortInfo();
        setFaculty(response.member.faculty);
      } catch (error) {
        console.error("내 정보 데이터를 불러오는 중 오류 발생:", error);
      }
    };
    fetchMyInfo();
  }, []);

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
          <MyFacultyContent faculty={faculty} />
          <WeeklyPopularContent />
          <DailyPopularContent />
          <DocRequestContent />
        </div>
      </div>

      <div className="fixed bottom-5 right-5 z-10">
        <UploadDocFAB />
      </div>
    </div>
  );
}
