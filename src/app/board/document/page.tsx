"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showModal } from "@/global/store/modalSlice";
import UploadDocumentFAB from "@/components/common/FABs/UploadDocumentFAB";
import { memberApi } from "@/apis/memberApi";
import MyFacultySection from "@/components/documentMain/MyFacultySection";
import DocumentRequestBoardSection from "@/components/documentMain/DocumentRequestBoardSection";
import TierBoardNavigateSection from "@/components/documentMain/TierBoardNavigateSection";
import HotDocumentsSection from "@/components/landing/HotDocumentSection";
import LandingHeader from "@/components/header/LandingHeader";
import SearchBar from "@/components/common/SearchBar";
import Image from "next/image";

export default function DocumentBoardPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [myFacultys, setMyFacultys] = useState<string[]>([]);
  const [isFABVisible, setIsFABVisible] = useState(true); // FAB 버튼 상태 관리
  const [HotDocumentActiveTab, setHotDocumentActiveTab] = useState("주간");

  // 로그인 체크
  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      dispatch(showModal("로그인 후 이용가능합니다."));
      router.push("/");
    }
  }, [dispatch, router]);

  // 내 정보 불러오기 (학과 조회)
  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const memberInfo = await memberApi.getMyInfo();
        const faculties = memberInfo?.member?.faculties || [];
        setMyFacultys(faculties);
      } catch (error) {
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
        {/* 안내글 섹션 - 헤더로부터 40px 아래 */}
        <section aria-label="intro" className="mt-10">
          <div className="font-suit text-[24px] font-medium leading-[140%]">
            <p>
              필요한 자료를 <span className="text-document-main">구매</span>하고,
            </p>
            <p>
              여러 자료를 <span className="text-document-main">직접 올려보세요</span>!
            </p>
          </div>
        </section>

        {/* 검색바 섹션 - 안내글로부터 20px 아래 */}
        <section aria-label="search" className="mt-5">
          <SearchBar
            variant="colored"
            borderColor="rgb(0, 209, 242)"
            placeholder="자료를 검색해보세요"
            showLoginCheck
            onSearch={query => {
              if (query.trim()) {
                router.push(`/search/${encodeURIComponent(query)}`);
              }
            }}
            className="w-full"
          />
        </section>

        {/* 계급게시판 섹션 - 검색창으로부터 60px 아래 */}
        <section aria-labelledby="tier-board-navigation" className="mb-6 mt-[60px]">
          <div className="mb-2">
            <div className="flex items-center gap-2">
              <Image src="/icons/yeopjeon.svg" alt="엽전 아이콘" width={24} height={24} />
              <h2 className="text-SUIT_16 font-bold text-black">계급게시판</h2>
            </div>
            <p className="ml-8 mt-2 text-SUIT_12 font-medium leading-tight text-ui-muted">
              엽전을 모아 더 높은 계급의 게시판을 사용하세요!
            </p>
          </div>
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
        <section aria-labelledby="my-faculty" className="mb-5">
          <MyFacultySection facultys={myFacultys} />
        </section>

        {/* 📄 자료 요청 게시판 섹션 (카드 리스트 형태) */}
        <section aria-labelledby="document-request-board" className="mb-5">
          <DocumentRequestBoardSection />
        </section>
      </main>

      {/* 플로팅 버튼 (자료 업로드) */}
      <UploadDocumentFAB isFABVisible={isFABVisible} />
    </>
  );
}
