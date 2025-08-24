"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { showModal } from "@/global/store/modalSlice";

function LandingWriteFAB() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const toggleMenu = () => {
    const accessToken = sessionStorage.getItem("accessToken");

    // 로그인 체크
    if (!accessToken) {
      dispatch(showModal("로그인 후 이용가능합니다."));
      return;
    }

    setIsMenuOpen(prev => !prev);
  };

  const handleDocumentClick = () => {
    const accessToken = sessionStorage.getItem("accessToken");

    // 로그인 체크
    if (!accessToken) {
      setIsMenuOpen(false);
      dispatch(showModal("로그인 후 이용가능합니다."));
      return;
    }

    setIsMenuOpen(false);
    router.push("/board/document/post");
  };

  const handleQuestionClick = () => {
    const accessToken = sessionStorage.getItem("accessToken");

    // 로그인 체크
    if (!accessToken) {
      setIsMenuOpen(false);
      dispatch(showModal("로그인 후 이용가능합니다."));
      return;
    }

    setIsMenuOpen(false);
    router.push("/board/question/post");
  };

  const handleBackdropClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* 배경 오버레이 : 헤더, 네비게이션바 블러 처리 */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm transition-all duration-500 ease-in-out animate-in fade-in"
          onClick={handleBackdropClick}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
              e.preventDefault();
              handleBackdropClick();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="메뉴 닫기"
        />
      )}

      {/* 플로팅 버튼 컨테이너 */}
      <div className="fixed bottom-[70px] right-[10px] z-[70]">
        {/* 메뉴 옵션들 */}
        {isMenuOpen && (
          <div className="absolute bottom-[84px] right-0 flex flex-col items-end space-y-1 duration-500 ease-out animate-in slide-in-from-bottom">
            {/* 질문 게시판 글작성 */}
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap rounded-md bg-black/80 px-3 py-1 text-SUIT_14 font-medium text-white">
                질문게시판 글작성
              </span>
              <button
                type="button"
                onClick={handleQuestionClick}
                className="flex h-[80px] w-[80px] items-center justify-center"
                aria-label="질문게시판 글작성"
              >
                <Image src="/icons/writeDetail.svg" alt="질문 작성" width={62} height={62} />
              </button>
            </div>

            {/* 자료 게시판 글작성 */}
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap rounded-md bg-black/80 px-3 py-1 text-SUIT_14 font-medium text-white">
                자료게시판 글작성
              </span>
              <button
                type="button"
                onClick={handleDocumentClick}
                className="flex h-[80px] w-[80px] items-center justify-center"
                aria-label="자료게시판 글작성"
              >
                <Image src="/icons/writeDetail.svg" alt="자료 작성" width={62} height={62} />
              </button>
            </div>
          </div>
        )}

        {/* 메인 플로팅 버튼 */}
        <button
          type="button"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "메뉴 닫기" : "글쓰기 메뉴 열기"}
          className="flex h-[80px] w-[80px] items-center justify-center"
        >
          <Image src="/icons/write.svg" alt="글쓰기" width={80} height={80} className="cursor-pointer" />
        </button>
      </div>
    </>
  );
}

export default LandingWriteFAB;
