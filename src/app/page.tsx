"use client";

import React, { useEffect, useState, useRef } from "react";
import Nav from "@/components/nav/LandingNav";
import FlyingBooks from "@/components/landing/FlyingBooks";
import HotDocument from "@/components/landing/HotDocument";
import HotQuestion from "@/components/landing/HotQuestion";
import AllDocument from "@/components/landing/AllDocument";
import getAllDocuments from "@/apis/landing/getAllDocument";
import UploadFAB from "@/components/common/UploadFAB";
import ScrollFAB from "@/components/common/ScrollFAB";
import SearchBar from "@/components/landing/SearchBar";
import Image from "next/image";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import refreshAccessToken from "@/apis/auth/refresh";

function Page() {
  const [scrollY, setScrollY] = useState(0);
  const [searchVisible, setSearchVisible] = useState(true);
  const [userName, setUserName] = useState<string>("");
  const hotDocumentRef = useRef<HTMLDivElement>(null);
  const [documents, setDocuments] = useState<{ subject: string; content: string }[]>([]);

  // 스크롤 이벤트
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(Math.min(currentScrollY, 3000));
      setSearchVisible(currentScrollY < 1800);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // refreshToken 호출
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        await refreshAccessToken(); // accessToken 갱신
        const storedUserName = sessionStorage.getItem("userName"); // userName 갱신
        setUserName(storedUserName || "종이");
      } catch (error) {
        setUserName("종이");
        console.error("Access token refresh failed:", error);
      }
    };
    fetchAccessToken();
  }, []);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await getAllDocuments();
        const latestDocuments = data.documentPostsPage?.content.slice(0, 5) || []; // 최신 5개 추출
        const transformedDocuments = latestDocuments.map(doc => ({
          subject: doc.subject,
          content: doc.content,
        }));
        setDocuments(transformedDocuments);
      } catch (error) {
        console.error("자료 가져오기 실패:", error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="mx-auto w-full max-w-[640px]" style={{ height: "943px" }}>
      <ScrollToTopOnLoad />
      <div>
        <Nav />
      </div>
      <div className="relative mx-auto min-h-screen w-full max-w-[640px] bg-white">
        {/* 배경 이미지 */}
        <div className="relative z-0 w-full">
          <Image
            src="/landing/LandingBackgroundImage.png"
            alt="배경"
            width={640}
            height={2310}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
        {/* 플라잉 북 */}
        <div className="z-10">
          <FlyingBooks scrollY={scrollY} />
        </div>
        {/* 인기자료 */}
        <div ref={hotDocumentRef} className="z-40 flex justify-center">
          <HotDocument />
        </div>
        <div className="z-40 flex items-center px-[20px]">
          <AllDocument documents={documents} />
        </div>
        {/* 인기질문 */}
        <div className="z-40 flex justify-center">
          <HotQuestion />
        </div>
        {/* 검색 */}
        <SearchBar searchVisible={searchVisible} userName={userName} />
        {/* FAB */}
        <div className="fixed bottom-[30px] right-[20px] z-50">
          <div className="flex flex-col items-center space-y-4">
            <UploadFAB />
            <ScrollFAB targetRef={hotDocumentRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
