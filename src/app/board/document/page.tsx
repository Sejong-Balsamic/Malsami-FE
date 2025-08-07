"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UploadDocumentFAB from "@/components/common/FABs/UploadDocumentFAB";
import { memberApi } from "@/apis/memberApi";
import MyFacultySection from "@/components/documentMain/MyFacultySection";
import DocumentRequestBoardSection from "@/components/documentMain/DocumentRequestBoardSection";
import TierBoardNavigateSection from "@/components/documentMain/TierBoardNavigateSection";
import HotDocumentsSection from "@/components/landing/HotDocumentSection";
import LandingHeader from "@/components/header/LandingHeader";
import CommonSearchBar from "@/components/search/CommonSearchBar";

export default function DocumentBoardPage() {
  const router = useRouter();
  const [myFacultys, setMyFacultys] = useState<string[]>([]);
  const [isFABVisible, setIsFABVisible] = useState(true); // FAB 버튼 상태 관리
  const [HotDocumentActiveTab, setHotDocumentActiveTab] = useState("주간");

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
    <>
      {/* Header */}
      <LandingHeader contentType="document" />

      {/* Main Content */}
      <main className="px-5">
        {/* 안내글 */}
        <div className="mb-6 font-suit text-[24px] font-medium" style={{ lineHeight: "140%" }}>
          <p>
            필요한 자료를 <span className="text-document-main">구매</span>하고,
          </p>
          <p>
            여러 자료를 <span className="text-document-main">직접 올려보세요</span>!
          </p>
        </div>
        {/* 검색바 섹션 */}
        <section aria-label="search" className="mb-6 mt-4">
          <CommonSearchBar />
        </section>

        {/* 티어 네비게이션 섹션 */}
        <section aria-labelledby="DocBoardNavigationSection" className="mb-6">
          <h1 className="text-SUIT_18 font-bold text-[#0CD4AE]">엽전을 모아</h1>
          <h1 className="mb-3 text-SUIT_18 font-bold text-black">다양한 게시판들을 이용할 수 있어요.</h1>
          <TierBoardNavigateSection />
        </section>

        {/* 🔥 HOT 인기 자료 섹션 */}
        <section aria-labelledby="hot-documents" className="mb-8">
          <HotDocumentsSection
            activeTab={HotDocumentActiveTab}
            onTabChange={setHotDocumentActiveTab}
            onViewAll={() => router.push("/board/document/hot")}
          />
        </section>

        {/* 🎓 내 전공 관련 자료 섹션 */}
        <section aria-labelledby="my-faculty" className="mb-8">
          <MyFacultySection facultys={myFacultys} />
        </section>

        {/* 📄 자료 요청 게시판 섹션 (카드 리스트 형태) */}
        <section aria-labelledby="document-request-board" className="mb-8">
          <DocumentRequestBoardSection />
        </section>
      </main>

      {/* 플로팅 버튼 (자료 업로드) */}
      <UploadDocumentFAB isFABVisible={isFABVisible} />
    </>
  );
}
