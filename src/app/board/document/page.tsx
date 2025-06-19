"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import UploadDocumentFAB from "@/components/common/FABs/UploadDocumentFAB";
import { memberApi } from "@/apis/memberApi";
import MyFacultySection from "@/components/documentMain/MyFacultySection";
import DocumentRequestSection from "@/components/documentMain/DocumentRequestSection";
import DocumentBoardNavigateSection from "@/components/documentMain/DocumentBoardNavigateSection";
import HotDocumentsSection from "@/components/landing/HotDocumentSection";
import AllDocumentsSection from "@/components/landing/AllDocumentsSection";
import CommonHeader from "@/components/header/CommonHeader";
import CommonSearchBar from "@/components/search/CommonSearchBar";
import { RIGHT_ITEM } from "@/types/header";

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
    <div className="flex min-h-screen justify-center bg-gray-100">
      <ScrollToTopOnLoad />
      <div className="min-h-screen w-full min-w-[386px] max-w-[640px] bg-white">
        <CommonHeader title="자료 게시판" rightType={RIGHT_ITEM.NONE} />

        {/* Main Content */}
        <main className="px-5">
          {/* 검색바 섹션 */}
          <section aria-label="search" className="mb-6 mt-4">
            <CommonSearchBar />
          </section>

          {/* 등급 네비게이션 섹션 */}
          <section aria-labelledby="DocBoardNavigationSection" className="mb-4">
            <h1 className="font-suit-bold text-[16px] text-[#0CD4AE]">엽전을 모아</h1>
            <h1 className="font-suit-bold text-[16px] text-black">다양한 게시판들을 이용할 수 있어요.</h1>
            <DocumentBoardNavigateSection />
          </section>

          {/* 📚 전체 자료 게시판 섹션 */}
          <section aria-labelledby="all-documents" className="mb-8">
            <AllDocumentsSection onViewAll={() => router.push("/board/document")} />
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

          {/* 🙋‍♂️ 자료요청 섹션 */}
          <section aria-labelledby="document-requests" className="mb-8">
            <DocumentRequestSection />
          </section>
        </main>
      </div>
      <UploadDocumentFAB isFABVisible={isFABVisible} />
    </div>
  );
}
