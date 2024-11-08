"use client";

import React, { useEffect, useState } from "react";
import Nav from "@/components/common/Nav";
import HotDocument from "@/components/landing/HotDocument";
import HotQuestion from "@/components/landing/HotQuestion";
import FabButton from "@/components/common/FAB";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import AllDocument from "@/components/landing/AllDocument";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";

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
      <ScrollToTopOnLoad />
      <div className="relative mx-auto h-[3000px] w-full max-w-[640px] bg-white">
        {/* Nav */}
        <div className="flex justify-center">
          <Nav />
        </div>
        <div className="h-[2400px] w-full min-w-[386px] max-w-[640px]">
          <Image
            src="/landing/LandingBackgroundImage.png"
            alt="배경"
            width={640}
            height={2310}
            className="h-auto w-full max-w-[640px]"
            priority
          />
        </div>
        {/* 플라잉 북 */}
        <div className="absolute top-[68px] z-30 h-[905.33px] w-full">
          <Image
            src="/landing/book/BookB1.png"
            alt="book"
            width={270}
            height={210.12}
            className="absolute h-auto w-[270px]"
            style={{ top: `${12 + scrollY * 0.6}px` }}
          />
          <Image
            src="/landing/book/BookB2.png"
            alt="book"
            width={258}
            height={215.94}
            className="absolute h-auto w-[258px]"
            style={{ top: `${110 + scrollY * 0.6}px`, right: "5px" }}
          />
          <Image
            src="/landing/book/BookB3.png"
            alt="book"
            width={286}
            height={183.34}
            className="absolute h-auto w-[262px]"
            style={{ top: `${400 + scrollY * 0.4}px`, left: "20px" }}
          />
          <Image
            src="/landing/book/BookB4.png"
            alt="book"
            width={365}
            height={277.62}
            className="absolute h-auto w-[365px]"
            style={{ top: `${480 + scrollY * 0.5}px`, right: "5px" }}
          />
        </div>
        <div className="absolute top-[68px] z-20 h-[905.33px] w-full">
          <Image
            src="/landing/book/BookB5.png"
            alt="book"
            width={365}
            height={432}
            className="absolute h-auto w-[232px]"
            style={{ top: `${900 + scrollY * 0.2}px`, right: "28px" }}
          />
          <Image
            src="/landing/book/BookB6.png"
            alt="book"
            width={230}
            height={432}
            className="absolute h-auto w-[230px]"
            style={{ top: `${1200 + scrollY * 0.2}px`, right: "20px" }}
          />
          <Image
            src="/landing/book/BookB7.png"
            alt="book"
            width={230}
            height={432}
            className="absolute h-auto w-[320px]"
            style={{ top: `${1380 + scrollY * 0.2}px`, left: "0px" }}
          />
          <Image
            src="/landing/book/BookB8.png"
            alt="book"
            width={236}
            height={432}
            className="absolute h-auto w-[236px]"
            style={{ top: `${1580 + scrollY * 1}px`, right: "32px" }}
          />
        </div>
        <div className="absolute top-[68px] z-10 h-[905.33px] w-full">
          <Image
            src="/landing/book/BookS1.png"
            alt="book"
            width={69}
            height={210.12}
            className="absolute h-auto w-[114px]"
            style={{ top: `${14 + scrollY * 0.5}px`, right: "24px" }}
          />
          <Image
            src="/landing/book/BookS2.png"
            alt="book"
            width={132}
            height={215.94}
            className="absolute h-auto w-[114px]"
            style={{ top: `${376 + scrollY * 0.4}px`, left: "16px" }}
          />
          <Image
            src="/landing/book/BookS3.png"
            alt="book"
            width={102}
            height={183.34}
            className="absolute h-auto w-[114px]"
            style={{ top: `${415 + scrollY * 0.4}px`, right: "4px" }}
          />
          <Image
            src="/landing/book/BookS4.png"
            alt="book"
            width={102}
            height={183.34}
            className="absolute h-auto w-[112px]"
            style={{ top: `${510 + scrollY * 0.3}px`, right: "36px" }}
          />
          <Image
            src="/landing/book/BookS5.png"
            alt="book"
            width={102}
            height={183.34}
            className="absolute h-auto w-[114px]"
            style={{ top: `${696 + scrollY * 0.3}px`, left: "28px" }}
          />
          <Image
            src="/landing/book/BookS6.png"
            alt="book"
            width={102}
            height={183.34}
            className="absolute h-auto w-[114px]"
            style={{ top: `${840 + scrollY * 0.2}px`, left: "2px" }}
          />
          <Image
            src="/landing/book/BookS7.png"
            alt="book"
            width={102}
            height={183.34}
            className="absolute h-auto w-[110px]"
            style={{ top: `${1110 + scrollY * 0.2}px`, left: "36px" }}
          />
          <Image
            src="/landing/book/BookS8.png"
            alt="book"
            width={102}
            height={183.34}
            className="absolute h-auto w-[110px]"
            style={{ top: `${1410 + scrollY * 1}px`, right: "50px" }}
          />
          <Image
            src="/landing/book/BookS9.png"
            alt="book"
            width={102}
            height={183.34}
            className="absolute h-auto w-[94px]"
            style={{ top: `${1746 + scrollY * 1.2}px`, left: "36px" }}
          />
          <Image
            src="/landing/book/BookS10.png"
            alt="book"
            width={102}
            height={183.34}
            className="absolute h-auto w-[108px]"
            style={{ top: `${1780 + scrollY * 1.5}px`, right: "36px" }}
          />
          <Image
            src="/landing/book/BookS11.png"
            alt="book"
            width={102}
            height={183.34}
            className="absolute h-auto w-[66px]"
            style={{ top: `${1944 + scrollY * 1.5}px`, left: "110px" }}
          />
        </div>
        {/* 검색 */}
        <div
          className={`duration-2000 fixed left-1/2 top-[318px] z-30 w-full max-w-[340px] -translate-x-1/2 transform transition-opacity ${
            searchVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <span className="font-pretendard-bold text-xl leading-[11px] text-black">종이</span>
          <span className="font-pretendard-bold text-xl leading-[11px] text-black">
            님, 환영해요!
            <br />
            학습 자료를 찾고, 업로드 해보세요!
          </span>
        </div>
        <div
          className={`duration-2000 fixed left-1/2 top-[383px] z-30 w-full max-w-[340px] -translate-x-1/2 transform transition-opacity ${
            searchVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="relative w-full">
            <Image
              src="/icons/Search.svg"
              alt="Search"
              width={20}
              height={20}
              className="absolute left-2 top-1/2 -translate-y-1/2 transform p-[2px]"
            />
            <Input
              type="text"
              id="search"
              placeholder="과목명이나 키워드를 입력하세요"
              className="text-[16px]] h-[40px] w-full rounded-md bg-gray-50 pl-8 font-pretendard font-medium text-[#aaaaaa]"
            />
          </div>
        </div>
        {/* 인기자료 */}
        <div className="flex justify-center">
          <HotDocument />
        </div>
        {/* 전체자료 */}
        <div>
          <AllDocument />
        </div>
        {/* 인기질문 */}
        <div className="flex justify-center">
          <HotQuestion />
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
