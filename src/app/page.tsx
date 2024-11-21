"use client";

import React, { useEffect, useState } from "react";
import Nav from "@/components/nav/LandingPageNav";
import FlyingBooks from "@/components/landing/FlyingBooks";
import HotDocument from "@/components/landing/HotDocument";
import HotQuestion from "@/components/landing/HotQuestion";
import FabButton from "@/components/common/FAB";
import SearchBar from "@/components/landing/SearchBar";
import Image from "next/image";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";

function Page() {
  const [scrollY, setScrollY] = useState(0);
  const [searchVisible, setSearchVisible] = useState(true);
  const [userName, setUserName] = useState<string>("");

  // 스크롤 이벤트
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(Math.min(currentScrollY, 3000));
      setSearchVisible(currentScrollY < 1800);
    };

    const storedUserName = sessionStorage.getItem("userName");
    setUserName(storedUserName || "종이");

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex justify-center bg-gray-100">
      <ScrollToTopOnLoad />
      <div className="relative mx-auto min-h-screen w-full max-w-[640px] bg-white">
        {/* Nav */}
        <div className="flex justify-center">
          <Nav />
        </div>

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
        <div className="z-40 flex justify-center">
          <HotDocument />
        </div>

        {/* 인기질문 */}
        <div className="z-40 flex justify-center">
          <HotQuestion />
        </div>

        {/* 검색 */}
        <SearchBar searchVisible={searchVisible} userName={userName} />

        {/* FAB */}
        <div className="fixed bottom-5 right-5 z-50">
          <FabButton />
        </div>
      </div>
    </div>
  );
}

export default Page;
