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

      {/* 플로팅 버튼 컨테이너 - 네비게이션 바 고려 */}
      <div className="fixed bottom-[70px] right-[10px] z-50">
        {/* 메뉴 옵션들 - write.svg 정확히 위에 위치 */}
        {isMenuOpen && (
          <div className="absolute bottom-[90px] right-0 flex flex-col items-end space-y-2">
            {/* 질문 게시판 글작성 */}
            <div className="flex items-center gap-2">
              <span className="font-pretendard-medium whitespace-nowrap rounded-md bg-black/80 px-3 py-1 text-sm text-white">
                질문게시판 글작성
              </span>
              <Image 
                src="/icons/writeDetail.svg" 
                alt="질문 작성" 
                width={80} 
                height={80}
                onClick={handleQuestionClick}
                className="cursor-pointer"
              />
            </div>

            {/* 자료 게시판 글작성 */}
            <div className="flex items-center gap-2">
              <span className="font-pretendard-medium whitespace-nowrap rounded-md bg-black/80 px-3 py-1 text-sm text-white">
                자료게시판 글작성
              </span>
              <Image 
                src="/icons/writeDetail.svg" 
                alt="자료 작성" 
                width={80} 
                height={80}
                onClick={handleDocumentClick}
                className="cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* 메인 플로팅 버튼 - 모든 스타일 제거 */}
        <Image
          src="/icons/write.svg"
          alt="글쓰기"
          width={80}
          height={80}
          onClick={toggleMenu}
          className="cursor-pointer"
        />
      </div>
    </>
  );
}

export default LandingWriteFAB;
