"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import LandingHeader from "@/components/header/LandingHeader";
import Image from "next/image";
import Card from "@/components/common/Card";

function HotDocumentsSection(props: {
  onViewAll: () => void;
  onTabChange: (value: ((prevState: string) => string) | string) => void;
  activeTab: string;
}) {
  const { onViewAll, onTabChange, activeTab } = props;

  // 임시 데이터 - 실제로는 API에서 받아올 데이터
  const dummyData = [
    {
      id: 1,
      subject: "기초 3D 그래픽스",
      title: "3D 모델링 기초 튜토리얼",
      content: "블렌더로 시작하는 3D 모델링 기초 과정입니다. 초보자도 쉽게 따라할 수 있어요.",
      isCurrentlyPopular: true,
      likeCount: 42,
      customTags: ["3D", "블렌더"],
      isLiked: true,
    },
    {
      id: 2,
      subject: "자바 프로그래밍",
      title: "자바 스프링부트 실전 프로젝트",
      content: "스프링부트를 활용한 웹 애플리케이션 개발 과정을 정리했습니다.",
      isCurrentlyPopular: true,
      likeCount: 38,
      customTags: ["Java", "SpringBoot"],
      isLiked: false,
    },
    {
      id: 3,
      subject: "AI 기초",
      title: "머신러닝 입문 가이드",
      content: "파이썬으로 시작하는 머신러닝 기초 과정. 수학적 개념부터 코드 구현까지.",
      isCurrentlyPopular: true,
      likeCount: 35,
      customTags: ["Python", "ML"],
      isLiked: true,
    },
    {
      id: 4,
      subject: "웹 개발",
      title: "React와 Next.js 실전 활용법",
      content: "프론트엔드 개발을 위한 React와 Next.js 활용 노하우를 공유합니다.",
      isCurrentlyPopular: false,
      likeCount: 31,
      customTags: ["React", "Next.js"],
      isLiked: false,
    },
  ];

  return (
    <div>
      {/* 헤더 영역: 제목, 탭, 전체보기 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/icons/fire.svg" alt="인기" width={18} height={24} />
          <h2 className="ml-[10px] text-SUIT_16 font-medium">HOT 인기자료</h2>

          {/* 주간/일간 버튼 */}
          <div className="ml-[10px] flex items-center">
            {/* 주간 버튼 */}
            <button
              type="button"
              onClick={() => onTabChange("주간")}
              className="relative flex items-center justify-center"
            >
              <div
                className={`h-[27px] w-[42px] rounded-[13.5px] ${activeTab === "주간" ? "bg-[#00d241]" : "bg-[#e9eaed]"}`}
              />
              <span
                className={`absolute text-SUIT_12 font-medium ${activeTab === "주간" ? "text-white" : "text-black"}`}
              >
                주간
              </span>
            </button>

            {/* 일간 버튼 */}
            <button
              type="button"
              onClick={() => onTabChange("일간")}
              className="relative ml-[4px] flex items-center justify-center"
            >
              <div
                className={`h-[27px] w-[42px] rounded-[13.5px] ${activeTab === "일간" ? "bg-[#00d241]" : "bg-[#e9eaed]"}`}
              />
              <span
                className={`absolute text-SUIT_12 font-medium ${activeTab === "일간" ? "text-white" : "text-black"}`}
              >
                일간
              </span>
            </button>
          </div>
        </div>

        {/* 전체보기 링크 - 80px 거리 확보 */}
        <button type="button" onClick={onViewAll} className="ml-[80px] text-SUIT_14 font-medium text-[#A7A7A7]">
          전체보기
        </button>
      </div>

      {/* 카드 가로 스크롤 영역 */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {dummyData.map(item => (
          <Card
            key={item.id}
            subject={item.subject}
            title={item.title}
            content={item.content}
            isCurrentlyPopular={item.isCurrentlyPopular}
            likeCount={item.likeCount}
            customTags={item.customTags}
            isLiked={item.isLiked}
            onClick={() => console.log(`카드 ${item.id} 클릭됨`)}
          />
        ))}
      </div>
    </div>
  );
}

export default function LandingPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userName, setUserName] = useState("종이");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTab, setActiveTab] = useState("주간");
  const hotDocumentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 사용자 정보 로드 등 초기화 로직
    // ...
  }, []);

  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      <div className="relative mx-auto min-h-screen w-full max-w-[640px] bg-white">
        {/* Header */}
        <LandingHeader />

        {/* Main Content */}
        <main className="px-5">
          {/* 캐릭터와 인사말 섹션 */}
          <section aria-labelledby="welcome-heading" className="mb-6 mt-8">
            {/* WelcomeSection 컴포넌트로 분리 가능 */}
            {/* <WelcomeSection userName={userName} /> */}
            {/*
              사용자 인사말과 캐릭터를 표시하는 섹션
              - 프로필 이미지 (캐릭터)
              - 인사말 텍스트
            */}
          </section>

          {/* 검색창 섹션 */}
          <section aria-label="search" className="mb-8">
            {/* SearchBar 컴포넌트로 분리 가능 */}
            {/* <SearchBar /> */}
            {/*
              검색 기능과 인기 검색어를 표시하는 섹션
              - 검색창
              - 인기 검색어 표시
            */}
          </section>

          {/* 공지사항 섹션 */}
          <section aria-labelledby="notice-heading" className="mb-8">
            {/* NoticeSection 컴포넌트로 분리 가능 */}
            {/* <NoticeSection /> */}
            {/*
              공지사항을 표시하는 섹션
              - 공지 아이콘
              - 공지 제목
              - 공지 내용
              - 더보기 버튼
            */}
          </section>

          {/* HOT 인기자료 섹션 */}
          <section ref={hotDocumentRef} aria-labelledby="hot-documents-heading" className="mb-8">
            {/* HotDocumentsSection 컴포넌트로 분리 가능 */}
            <HotDocumentsSection
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onViewAll={() => router.push("/hot")}
            />
            {/*
              인기 자료를 표시하는 섹션
              - 섹션 제목과 아이콘
              - 탭 (주간/일간)
              - 인기 자료 카드 리스트 (가로 스크롤)
              - 전체보기 링크
            */}
          </section>

          {/* 전체 자료 게시판 섹션 */}
          <section aria-labelledby="all-documents-heading" className="mb-8">
            {/* AllDocumentsSection 컴포넌트로 분리 가능 */}
            {/* <AllDocumentsSection onViewAll={() => router.push("/documents")} /> */}
            {/*
              전체 자료를 표시하는 섹션
              - 섹션 제목과 아이콘
              - 자료 카드 리스트
              - 전체보기 링크
            */}
          </section>

          {/* 전체 질문 게시판 섹션 */}
          <section aria-labelledby="all-questions-heading" className="mb-8">
            {/* AllQuestionsSection 컴포넌트로 분리 가능 */}
            {/* <AllQuestionsSection onViewAll={() => router.push("/questions")} /> */}
            {/*
              전체 질문을 표시하는 섹션
              - 섹션 제목과 아이콘
              - 질문 카드 리스트
              - 전체보기 링크
            */}
          </section>
        </main>

        {/* 플로팅 버튼 (업로드, 스크롤 위로) */}
        {/* FloatingButtons 컴포넌트로 분리 가능 */}
        {/* <FloatingButtons onUpload={() => console.log("업로드")} /> */}
        {/*
          화면 하단에 떠 있는 버튼들
          - 업로드 버튼 (FAB)
          - 위로 스크롤 버튼
        */}
      </div>
    </div>
  );
}
