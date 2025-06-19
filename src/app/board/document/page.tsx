"use client";

import { useEffect, useState } from "react";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import UploadDocumentFAB from "@/components/common/FABs/UploadDocumentFAB";
import { memberApi } from "@/apis/memberApi";
import HotDownloadSection from "@/components/documentMain/HotDownloadSection";
import MyFacultySection from "@/components/documentMain/MyFacultyMyFacultySection";
import DocRequestSection from "@/components/documentMain/DocRequestSection";
import DocBoardNavigateSection from "@/components/documentMain/DocBoardNavigateSection";
import CommonHeader from "@/components/header/CommonHeader";
import CommonSearchBar from "@/components/search/CommonSearchBar";
import { RIGHT_ITEM } from "@/types/header";

export default function DocumentBoardPage() {
  const [myFacultys, setMyFacultys] = useState<string[]>([]);
  const [isFABVisible, setIsFABVisible] = useState(true); // FAB 버튼 상태 관리

  // 내 정보 불러오기 (학과 조회)
  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const memberInfo = await memberApi.getMyInfo();
        const faculties = memberInfo?.member?.faculties || [];
        setMyFacultys(faculties);
      } catch (error) {
        console.error("내 정보 데이터를 불러오는 중 오류 발생:", error);
        setMyFacultys([]);
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
        {/* Main Content */}
        <main className="px-5">
          {/* 검색바 */}
          <section aria-labelledby="searchBar" className="mb-6 mt-4">
            <CommonSearchBar />
          </section>

          {/* 등급 네비게이션 섹션 */}
          <section aria-labelledby="DocBoardNavigationSection" className="mb-4">
            <h1 className="font-suit-bold text-[16px] text-[#0CD4AE]">엽전을 모아</h1>
            <h1 className="font-suit-bold text-[16px] text-black">다양한 게시판들을 이용할 수 있어요.</h1>
            <DocBoardNavigateSection />
          </section>
          {/* 🔥 HOT 인기 자료 섹션 */}
          <section aria-labelledby="HotDownloadSection" className="mb-4">
            <HotDownloadSection />
          </section>

          {/* 🎓 내 전공 관련 자료 섹션 */}
          <section aria-labelledby="MyFacultySection" className="mb-4">
            <MyFacultySection facultys={myFacultys} />
          </section>

          {/* 🙋‍♂️ 자료요청 섹션 */}
          <section aria-labelledby="DocRequestSection" className="mb-4">
            <DocRequestSection />
          </section>

          {/* 📚 전체 자료 섹션 */}
          <section aria-labelledby="AllDocSection" className="mb-1">
            <CommonSearchBar />
          </section>
        </main>
      </div>
      <UploadDocumentFAB isFABVisible={isFABVisible} />
    </div>
  );
}
