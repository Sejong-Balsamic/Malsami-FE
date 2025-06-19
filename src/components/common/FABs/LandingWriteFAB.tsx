"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function LandingWriteFAB() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const checkAccessTokenAndNavigate = (path: string) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/login");
    } else {
      router.push(path);
    }
  };

  const handleDocumentClick = () => {
    setIsMenuOpen(false);
    checkAccessTokenAndNavigate("/board/document/post");
  };

  const handleQuestionClick = () => {
    setIsMenuOpen(false);
    checkAccessTokenAndNavigate("/board/question/post");
  };

  const handleBackdropClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* 배경 오버레이 */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={handleBackdropClick}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
              handleBackdropClick();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="메뉴 닫기"
        />
      )}

      {/* 플로팅 버튼 컨테이너 */}
      <div className="fixed bottom-[32px] right-[16px] z-50">
        {/* 메뉴 옵션들 */}
        {isMenuOpen && (
          <div className="absolute bottom-[70px] right-0 flex flex-col items-end space-y-2 duration-300 animate-in slide-in-from-bottom-2">
            {/* 질문 게시판 글작성 */}
            <div className="flex items-center gap-2">
              <span className="font-pretendard-medium whitespace-nowrap rounded-md bg-black/80 px-3 py-1 text-sm text-white">
                질문게시판 글작성
              </span>
              <button
                type="button"
                className="flex h-[62px] w-[62px] items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-105"
                onClick={handleQuestionClick}
              >
                <Image src="/icons/writeDetail.svg" alt="질문 작성" width={17} height={17} />
              </button>
            </div>

            {/* 자료 게시판 글작성 */}
            <div className="flex items-center gap-2">
              <span className="font-pretendard-medium whitespace-nowrap rounded-md bg-black/80 px-3 py-1 text-sm text-white">
                자료게시판 글작성
              </span>
              <button
                type="button"
                className="flex h-[62px] w-[62px] items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-105"
                onClick={handleDocumentClick}
              >
                <Image src="/icons/writeDetail.svg" alt="자료 작성" width={17} height={17} />
              </button>
            </div>
          </div>
        )}

        {/* 메인 플로팅 버튼 */}
        <button
          type="button"
          className="flex h-[62px] w-[62px] flex-shrink-0 items-center justify-center rounded-[31px] bg-gradient-to-r from-[#0EE6B9] to-[#48F57E] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.05)] transition-transform hover:scale-105 active:scale-95"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "메뉴 닫기" : "글쓰기 메뉴 열기"}
        >
          <Image
            src="/icons/write.svg"
            alt="글쓰기"
            width={17}
            height={17}
            className={`transition-transform duration-200 ${isMenuOpen ? "rotate-45" : ""}`}
          />
        </button>
      </div>
    </>
  );
}

export default LandingWriteFAB;
