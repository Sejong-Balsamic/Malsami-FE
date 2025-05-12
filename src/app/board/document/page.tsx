"use client";

import { useEffect, useState } from "react";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import UploadDocumentFAB from "@/components/common/FABs/UploadDocumentFAB";
import getMyShortInfo from "@/apis/document/getMyShortInfo";
import HotDownloadContent from "@/components/documentMain/HotDownloadContent";
import MyFacultyContent from "@/components/documentMain/MyFacultyContent";
import WeeklyPopularContent from "@/components/documentMain/WeeklyPopularContent";
import DailyPopularContent from "@/components/documentMain/DailyPopularContent";
import DocRequestContent from "@/components/documentMain/DocRequestContent";
import DocBoardContent from "@/components/documentMain/DocBoardContent";
import CommonHeader from "@/components/header/CommonHeader";
import { RIGHT_ITEM } from "@/types/header";

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
        <CommonHeader title="자료 게시판" rightType={RIGHT_ITEM.NONE} />
        <div>
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
      </div>
      <UploadDocumentFAB isFABVisible={isFABVisible} />
    </div>
  );
}
