"use client";

import { useEffect, useState } from "react";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import WeeklyPopularContent from "@/components/board/document/DocMainPageContents/WeeklyPopularContent";
import DailyPopularContent from "@/components/board/document/DocMainPageContents/DailyPopularContent";
import DocBoardContent from "@/components/board/document/DocMainPageContents/DocBoardContent";
import HotDownloadContent from "@/components/board/document/DocMainPageContents/HotDownloadContent";
import MyFacultyContent from "@/components/board/document/DocMainPageContents/MyFacultyContent";
import DocRequestContent from "@/components/board/document/DocMainPageContents/DocRequestContent";
import UploadDocumentFAB from "@/components/common/FABs/UploadDocumentFAB";
import getMyShortInfo from "@/apis/document/getMyShortInfo";
import DocMainPageNav from "@/components/nav/DocMainPageNav";

export default function DocumentBoardPage() {
  const [facultys, setFacultys] = useState<string[]>([]);
  const [isFABVisible, setIsFABVisible] = useState(true); // FAB 버튼 상태 관리

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const response = await getMyShortInfo();
        setFacultys(response.member.faculties);
        console.log(facultys);
      } catch (error) {
        console.error("내 정보 데이터를 불러오는 중 오류 발생:", error);
      }
    };
    fetchMyInfo();
  }, []);

  // 스크롤 이벤트로 FAB 버튼 관리
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.body.offsetHeight;

      // 스크롤이 맨 밑 근처로 가면 FAB 숨김
      setIsFABVisible(scrollPosition < documentHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
          <MyFacultyContent facultys={facultys} />
          <WeeklyPopularContent />
          <DailyPopularContent />
          <DocRequestContent />
        </div>
      </div>

      <UploadDocumentFAB isFABVisible={isFABVisible} />
    </div>
  );
}
