"use client";

import React, { useEffect, useState, useRef } from "react";
import Nav from "@/components/nav/LandingNav";
import FlyingBooks from "@/components/landing/FlyingBooks";
import HotDocument from "@/components/landing/HotDocument";
import HotQuestion from "@/components/landing/HotQuestion";
import AllDocument from "@/components/landing/AllDocument";
import AllQuestion from "@/components/landing/AllQuestion";
import getAllDocuments from "@/apis/landing/getAllDocument";
import getAllQuestions from "@/apis/landing/getAllQuestion";
import UploadFAB from "@/components/common/UploadFAB";
import ScrollFAB from "@/components/common/ScrollFAB";
import SearchBar from "@/components/landing/SearchBar";
import Image from "next/image";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import refreshAccessToken from "@/apis/auth/refresh";

function Page() {
  const [scrollY, setScrollY] = useState(0);
  const [searchVisible, setSearchVisible] = useState(true);
  const [showScrollFAB, setShowScrollFAB] = useState(true);
  const [userName, setUserName] = useState<string>("");
  const hotDocumentRef = useRef<HTMLDivElement>(null);
  const [documents, setDocuments] = useState<{ subject: string; content: string }[]>([]);
  const [questions, setQuestions] = useState<{ subject: string; content: string }[]>([]);

  // 스크롤 이벤트
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      let threshold = 1800;

      if (window.innerWidth >= 640) {
        threshold = 3000;
      } else if (window.innerWidth <= 375) {
        threshold = 1400;
      }

      setScrollY(Math.min(currentScrollY, 3000));
      setSearchVisible(currentScrollY < threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollForFAB = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 맨 아래에서 100px 여유를 둔 위치까지 스크롤하면 ScrollFAB 숨김
      setShowScrollFAB(currentScrollY + windowHeight < documentHeight - 100);
    };

    window.addEventListener("scroll", handleScrollForFAB);
    return () => window.removeEventListener("scroll", handleScrollForFAB);
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

  // 자료 출력
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

  // 질문 출력
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getAllQuestions();
        const latestQuestions = data.questionPostsPage?.content.slice(0, 5) || []; // 최신 5개 추출
        const transformedQuestions = latestQuestions.map(qna => ({
          subject: qna.subject,
          content: qna.content,
        }));
        setQuestions(transformedQuestions);
      } catch (error) {
        console.error("질문 가져오기 실패:", error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="mx-auto w-full max-w-[640px]" style={{ height: "943px" }}>
      <ScrollToTopOnLoad />
      <Nav />
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
        <div className="relative z-40 flex flex-col items-center justify-center px-[20px]">
          <div ref={hotDocumentRef} className="w-full">
            <HotDocument />
          </div>
          <AllDocument documents={documents} />
          <HotQuestion />
          <AllQuestion questions={questions} />
          {searchVisible && <SearchBar userName={userName} />}
        </div>
        {/* FAB */}
        <div className="fixed bottom-[30px] right-[20px] z-50">
          <div className="flex flex-col items-center space-y-4">
            <UploadFAB />
            {showScrollFAB && <ScrollFAB targetRef={hotDocumentRef} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
