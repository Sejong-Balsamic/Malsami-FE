"use client";

import React, { useEffect, useState } from "react";
import Nav from "@/components/common/Nav";
import FabButton from "@/components/common/FAB";
import { Input } from "@/components/ui/input";
import Image from "next/image";

function Page() {
  const [scrollY, setScrollY] = useState(0);

  // 스크롤 이벤트
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex justify-center bg-gray-100">
      <div className="w-full max-w-[640px] h-[2847px] bg-white relative mx-auto">
        {/* Nav */}
        <div className="flex justify-center">
          <Nav />
        </div>
        <div className="w-full max-w-[640px] h-[1000px]">
          <Image
            src="/landing/LandingBackgroundImage.png"
            alt="배경"
            width={640}
            height={824}
            className="w-full max-w-[640px] h-auto"
            priority
          />
        </div>
        {/* 플라잉 북 */}
        <div className="w-full h-[905.33px] top-[68px] absolute z-20">
          <Image
            src="/landing/book/BookB1.png"
            alt="book"
            width={270}
            height={210.12}
            className="absolute w-[270px] h-auto"
            style={{ top: `${12 + scrollY * 0.6}px` }}
          />
          <Image
            src="/landing/book/BookB2.png"
            alt="book"
            width={258}
            height={215.94}
            className="absolute w-[258px] h-auto"
            style={{ top: `${110 + scrollY * 0.6}px`, right: "5px" }}
          />
          <Image
            src="/landing/book/BookB3.png"
            alt="book"
            width={286}
            height={183.34}
            className="absolute w-[286px] h-auto"
            style={{ top: `${300 + scrollY * 0.6}px`, left: "20px" }}
          />
          <Image
            src="/landing/book/BookB4.png"
            alt="book"
            width={365}
            height={277.62}
            className="absolute w-[365px] h-auto"
            style={{ top: `${500 + scrollY * 0.6}px`, right: "5px" }}
          />
        </div>
        <div className="w-full h-[905.33px] top-[68px] absolute z-10">
          <Image
            src="/landing/book/BookS1.png"
            alt="book"
            width={69}
            height={210.12}
            className="absolute w-[69px] h-auto"
            style={{ top: `${14 + scrollY * 0.8}px`, right: "60px" }}
          />
          <Image
            src="/landing/book/BookS2.png"
            alt="book"
            width={132}
            height={215.94}
            className="absolute w-[132px] h-auto"
            style={{ top: `${500 + scrollY * 0.8}px`, right: "10px" }}
          />
          <Image
            src="/landing/book/BookS3.png"
            alt="book"
            width={102}
            height={183.34}
            className="absolute w-[102px] h-auto"
            style={{ top: `${600 + scrollY * 0.8}px`, left: "28px" }}
          />
        </div>
        {/* 검색 */}
        <div className="fixed top-[318px] left-1/2 transform -translate-x-1/2 w-full max-w-[340px] z-30">
          <span className="text-black text-sm font-extrabold font-pretendard leading-[11px]">종이</span>
          <span className="text-black text-sm font-semibold font-pretendard leading-[11px]">
            님, 환영해요!
            <br />
            학습 자료를 찾고, 업로드 해보세요!
          </span>
        </div>
        <div className="fixed top-[383px] left-1/2 transform -translate-x-1/2 w-full max-w-[340px] z-30">
          <div className="relative w-full">
            <Image
              src="/icons/Search.svg"
              alt="Search"
              width={13}
              height={13}
              className="absolute left-2 top-1/2 transform -translate-y-1/2"
            />
            <Input
              type="text"
              id="search"
              placeholder="과목명이나 키워드를 입력하세요"
              className="w-full h-[26px] pl-8 bg-gray-50 rounded-md text-[#aaaaaa] text-[11px] font-medium font-pretendard"
            />
          </div>
        </div>

        {/* FAB */}
        <div className="fixed bottom-5 right-5">
          <FabButton />
        </div>
      </div>
    </div>
  );
}

export default Page;
