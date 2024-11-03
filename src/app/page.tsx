"use client";

import React, { useEffect, useState } from "react";
import Nav from "@/components/common/Nav";
import HotDocument from "@/components/landing/HotDocument";
import FabButton from "@/components/common/FAB";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import AllDocument from "@/components/landing/AllDocument";

function Page() {
  const [scrollY, setScrollY] = useState(0);
  const [searchVisible, setSearchVisible] = useState(true);

  // 스크롤 이벤트
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setSearchVisible(currentScrollY < 1800);
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
        <div className="w-full max-w-[640px] min-w-[386px] h-[2100px]">
          <Image
            src="/landing/LandingBackgroundImage.png"
            alt="배경"
            width={640}
            height={2310}
            className="w-full max-w-[640px] h-auto"
            priority
          />
        </div>
        {/* 플라잉 북 */}
        <div className="w-full h-[905.33px] top-[68px] absolute z-30">
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
            className="absolute w-[262px] h-auto"
            style={{ top: `${400 + scrollY * 0.4}px`, left: "20px" }}
          />
          <Image
            src="/landing/book/BookB4.png"
            alt="book"
            width={365}
            height={277.62}
            className="absolute w-[365px] h-auto"
            style={{ top: `${480 + scrollY * 0.5}px`, right: "5px" }}
          />
        </div>
        <div className="w-full h-[905.33px] top-[68px] absolute z-20">
          <Image
            src="/landing/book/BookB5.png"
            alt="book"
            width={365}
            height={432}
            className="absolute w-[232px] h-auto"
            style={{ top: `${900 + scrollY * 0.2}px`, right: "28px" }}
          />
          <Image
            src="/landing/book/BookB6.png"
            alt="book"
            width={230}
            height={432}
            className="absolute w-[230px] h-auto"
            style={{ top: `${1200 + scrollY * 0.2}px`, right: "20px" }}
          />
          <Image
            src="/landing/book/BookB7.png"
            alt="book"
            width={230}
            height={432}
            className="absolute w-[320px] h-auto"
            style={{ top: `${1380 + scrollY * 0.2}px`, left: "0px" }}
          />
          <Image
            src="/landing/book/BookB8.png"
            alt="book"
            width={236}
            height={432}
            className="absolute w-[236px] h-auto"
            style={{ top: `${1580 + scrollY * 1}px`, right: "32px" }}
          />
        </div>
        <div className="w-full h-[905.33px] top-[68px] absolute z-10">
          <Image
            src="/landing/book/BookS1.png"
            alt="book"
            width={69}
            height={210.12}
            className="absolute w-[114px] h-auto"
            style={{ top: `${14 + scrollY * 0.5}px`, right: "24px" }}
          />
          <Image
            src="/landing/book/BookS2.png"
            alt="book"
            width={132}
            height={215.94}
            className="absolute w-[114px] h-auto"
            style={{ top: `${376 + scrollY * 0.4}px`, left: "16px" }}
          />
          <Image
            src="/landing/book/BookS3.png"
            alt="book"
            width={102}
            height={183.34}
            className="absolute w-[114px] h-auto"
            style={{ top: `${415 + scrollY * 0.4}px`, right: "4px" }}
          />
          <Image
            src="/landing/book/BookS4.png"
            alt="book"
            width={102}
            height={183.34}
            className="absolute w-[112px] h-auto"
            style={{ top: `${510 + scrollY * 0.3}px`, right: "36px" }}
          />
          <Image
            src="/landing/book/BookS5.png"
            alt="book"
            width={102}
            height={183.34}
            className="absolute w-[114px] h-auto"
            style={{ top: `${696 + scrollY * 0.3}px`, left: "28px" }}
          />
          <Image
            src="/landing/book/BookS6.png"
            alt="book"
            width={102}
            height={183.34}
            className="absolute w-[114px] h-auto"
            style={{ top: `${840 + scrollY * 0.2}px`, left: "2px" }}
          />
          <Image
            src="/landing/book/BookS7.png"
            alt="book"
            width={102}
            height={183.34}
            className="absolute w-[110px] h-auto"
            style={{ top: `${1110 + scrollY * 0.2}px`, left: "36px" }}
          />
          <Image
            src="/landing/book/BookS8.png"
            alt="book"
            width={102}
            height={183.34}
            className="absolute w-[110px] h-auto"
            style={{ top: `${1410 + scrollY * 1}px`, right: "50px" }}
          />
          <Image
            src="/landing/book/BookS9.png"
            alt="book"
            width={102}
            height={183.34}
            className="absolute w-[94px] h-auto"
            style={{ top: `${1746 + scrollY * 1.2}px`, left: "36px" }}
          />
          <Image
            src="/landing/book/BookS10.png"
            alt="book"
            width={102}
            height={183.34}
            className="absolute w-[108px] h-auto"
            style={{ top: `${1780 + scrollY * 1.5}px`, right: "36px" }}
          />
          <Image
            src="/landing/book/BookS11.png"
            alt="book"
            width={102}
            height={183.34}
            className="absolute w-[66px] h-auto"
            style={{ top: `${1944 + scrollY * 1.5}px`, left: "110px" }}
          />
        </div>
        {/* 검색 */}
        <div
          className={`fixed top-[318px] left-1/2 transform -translate-x-1/2 w-full max-w-[340px] z-30 transition-opacity duration-2000 ${
            searchVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-black text-xl font-pretendard-bold leading-[11px]">종이</span>
          <span className="text-black text-xl font-pretendard-bold leading-[11px]">
            님, 환영해요!
            <br />
            학습 자료를 찾고, 업로드 해보세요!
          </span>
        </div>
        <div
          className={`fixed top-[383px] left-1/2 transform -translate-x-1/2 w-full max-w-[340px] z-30 transition-opacity duration-2000 ${
            searchVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="relative w-full">
            <Image
              src="/icons/Search.svg"
              alt="Search"
              width={20}
              height={20}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 p-[2px]"
            />
            <Input
              type="text"
              id="search"
              placeholder="과목명이나 키워드를 입력하세요"
              className="w-full h-[40px] pl-8 bg-gray-50 rounded-md text-[#aaaaaa] text-[16px]] font-medium font-pretendard"
            />
          </div>
        </div>
        {/* FAB */}
        <div className="fixed bottom-5 right-5 z-50">
          <FabButton />
        </div>
      </div>
    </div>
  );
}

export default Page;
