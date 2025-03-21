"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import BottomSheet, { BottomSheetTrigger } from "@/components/common/BottomSheet";
import LandingHeader from "@/components/header/LandingHeader";
import HotDocument from "@/components/landing/HotDocument";
import HotQuestion from "@/components/landing/HotQuestion";
import AllDocument from "@/components/landing/AllDocument";
import AllQuestion from "@/components/landing/AllQuestion";
import getAllDocuments from "@/apis/landing/getAllDocument";
import getAllQuestions from "@/apis/landing/getAllQuestion";
import UploadFAB from "@/components/common/FABs/UploadLandingFAB";
import ScrollFAB from "@/components/common/FABs/ScrollFAB";
import SearchBar from "@/components/landing/SearchBar";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import { useDispatch } from "react-redux";
import { showToast } from "@/global/toastUtils";
import CardList from "@/components/common/CardList";
import Card from "@/components/common/Card";
import memberApi from "@/apis/memberApi";
import { DocumentPost } from "@/types/api/entities/postgres/documentPost";
import { QuestionPost } from "@/types/api/entities/postgres/questionPost";

function Page() {
  const [scrollY, setScrollY] = useState(0);
  const [searchVisible, setSearchVisible] = useState(true);
  const [showScrollFAB, setShowScrollFAB] = useState(true);
  const [userName, setUserName] = useState<string>("");
  const hotDocumentRef = useRef<HTMLDivElement>(null);
  const [documents, setDocuments] = useState<DocumentPost[]>([]);
  const [questions, setQuestions] = useState<QuestionPost[]>([]);
  const dispatch = useDispatch();

  const handleBottomSheetReset = () => {
    console.log("필터 초기화");
  };

  const handleBottomSheetConfirm = () => {
    console.log("필터 확인");
  };

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
      console.log(scrollY); // TODO: 지워야함. eslint임시
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

      setShowScrollFAB(currentScrollY + windowHeight < documentHeight - 100);
    };

    window.addEventListener("scroll", handleScrollForFAB);
    return () => window.removeEventListener("scroll", handleScrollForFAB);
  }, []);

  const storeUserName = useCallback(async (): Promise<void> => {
    try {
      const memberInfo = await memberApi.getMyInfo();
      const studentName = memberInfo?.member?.studentName || "종이";
      setUserName(studentName);
    } catch (error) {
      const message = "사용자 정보를 불러오지 못했습니다.";
      showToast(dispatch, message, "orange");
      setUserName("종이");
    }
  }, [dispatch]);

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

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await getAllDocuments(); // API 호출
        const allDocuments = data.documentPostsPage?.content || []; // 전체 질문 리스트 추출
        setDocuments(allDocuments); // 상태에 저장
      } catch (error) {
        const message = "자료를 불러오지 못했습니다.";
        showToast(dispatch, message, "orange");
      }
    };

    fetchDocuments();
  }, [dispatch]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getAllQuestions(); // API 호출
        const allQuestions = data.questionPostsPage?.content || []; // 전체 질문 리스트 추출
        setQuestions(allQuestions); // 상태에 저장
      } catch (error) {
        const message = "질문을 불러오지 못했습니다.";
        showToast(dispatch, message, "orange"); // Toast로 에러 메시지 표시
      }
    };

    fetchQuestions();
  }, [dispatch]);

  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      <ScrollToTopOnLoad />
      <LandingHeader />
      <div className="relative mx-auto min-h-screen w-full max-w-[640px] bg-white">
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

        <div className="relative z-40 flex flex-col items-center justify-center px-[20px]">
          <div ref={hotDocumentRef} className="w-full">
            <HotDocument />
          </div>
          <AllDocument documents={documents} />

          {/* FIX: CardList, BottomSheet 테스트. 삭제 필요 */}
          <BottomSheet
            onReset={handleBottomSheetReset}
            onConfirm={handleBottomSheetConfirm}
            trigger={BottomSheetTrigger}
          >
            <div>asdf</div>
            <div>asdf</div>
            <div>asdf</div>
            <div>asdf</div> <div>asdf</div>
            <div>asdf</div> <div>asdf</div>
            <div>asdf</div> <div>asdf</div>
            <div>asdf</div> <div>asdf</div>
            <div>asdf</div> <div>asdf</div>
            <div>asdf</div> <div>asdf</div>
            <div>asdf</div> <div>asdf</div>
            <div>asdf</div> <div>asdf</div>
            <div>asdf</div> <div>asdf</div>
            <div>asdf</div> <div>asdf</div>
            <div>asdf</div> <div>asdf</div>
            <div>asdf</div> <div>asdf</div>
            <div>asdf</div>
          </BottomSheet>

          <CardList />
          <Card
            number={1}
            subject="기초 3D 그래픽스"
            title="기초 3D 그래픽스제목인데 길게 함 해봐야겠다"
            content="A+비법 전수해준다. CAD옥테인 블랜더고인, 이렇게 설치 해요. 본문인데"
            isCurrentlyPopular
            likeCount={35}
            customTags={["커스텀태그", "커스텀태그2"]}
            isLiked
            onClick={() => console.log("카드 클릭됨")}
          />

          <HotQuestion />
          <AllQuestion questions={questions} />
          {searchVisible && <SearchBar userName={userName} />}
        </div>
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
