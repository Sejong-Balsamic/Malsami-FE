"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { showToast } from "@/utils/toastUtils";

import LandingHeader from "@/components/nav/LandingHeader";
import FlyingBooks from "@/components/landing/FlyingBooks";
import HotDocument from "@/components/landing/HotDocument";
import HotQuestion from "@/components/landing/HotQuestion";
import AllDocument from "@/components/landing/AllDocument";
import AllQuestion from "@/components/landing/AllQuestion";
import getAllDocuments from "@/apis/landing/getAllDocument";
import getAllQuestions from "@/apis/landing/getAllQuestion";
import { QuestionPost } from "@/types/question";
import { DocumentPost } from "@/types/document";
import getMyInfo from "@/apis/member/getMyInfo";
import UploadFAB from "@/components/common/UploadLandingFAB";
import ScrollFAB from "@/components/common/ScrollFAB";
import SearchBar from "@/components/landing/SearchBar";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";

function Page() {
  const [scrollY, setScrollY] = useState(0);
  const [searchVisible, setSearchVisible] = useState(true);
  const [showScrollFAB, setShowScrollFAB] = useState(true);
  const [userName, setUserName] = useState<string>("");
  const hotDocumentRef = useRef<HTMLDivElement>(null);
  const [documents, setDocuments] = useState<DocumentPost[]>([]);
  const [questions, setQuestions] = useState<QuestionPost[]>([]);
  const dispatch = useDispatch();

  // 스크롤 이벤트
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 스크린 크기에 따른 검색바 노출 임계값 계산
      let threshold = 1800;
      if (window.innerWidth >= 640) {
        threshold = 3000;
      } else if (window.innerWidth <= 375) {
        threshold = 1400;
      }
      setScrollY(Math.min(currentScrollY, 3000));
      setSearchVisible(currentScrollY < threshold);

      // FAB(스크롤 위로) 표시 여부 계산
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      setShowScrollFAB(currentScrollY + windowHeight < documentHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 사용자 이름 가져오기
  const storeUserName = useCallback(async (): Promise<void> => {
    try {
      const memberInfo = await getMyInfo();
      const studentName = memberInfo?.member?.studentName || "종이";
      setUserName(studentName);
    } catch (error) {
      const message = "사용자 정보를 불러오지 못했습니다.";
      showToast(dispatch, message, "orange");
      setUserName("종이");
    }
  }, [dispatch]);

  // useEffect 의존성 배열 정리
  useEffect(() => {
    const initializeUserName = async () => {
      const accessToken = sessionStorage.getItem("accessToken");
      if (accessToken) {
        await storeUserName();
      } else {
        setUserName("종이");
      }
    };
    initializeUserName();
  }, [storeUserName]);

  // 자료 출력
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await getAllDocuments();
        const allDocuments = data.documentPostsPage?.content || [];
        setDocuments(allDocuments);
      } catch (error) {
        const message = "자료를 불러오지 못했습니다.";
        showToast(dispatch, message, "orange");
      }
    };
    fetchDocuments();
  }, [dispatch]);

  // 질문 출력
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getAllQuestions();
        const allQuestions = data.questionPostsPage?.content || [];
        setQuestions(allQuestions);
      } catch (error) {
        const message = "질문을 불러오지 못했습니다.";
        showToast(dispatch, message, "orange");
      }
    };
    fetchQuestions();
  }, [dispatch]);

  return (
    <main className="relative">
      {/* 헤더: LandingHeader에서 알림 아이콘은 하드코딩으로 true (TODO: 알림 기능 구현) */}
      <LandingHeader />

      <div className="mx-auto w-full max-w-[640px]">
        <ScrollToTopOnLoad />
        {/* 상단 패딩은 헤더 높이(56px)만큼 추가 */}
        <div className="relative min-h-screen w-full bg-white pt-[56px]">
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
            <FlyingBooks scrollY={scrollY} studentName={userName} />
          </div>
          {/* 콘텐츠 영역 */}
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
    </main>
  );
}

export default Page;
