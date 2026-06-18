"use client";

import { useState } from "react";
import LoginForm from "@/components/login/LoginForm";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import CommonHeader from "@/components/header/CommonHeader";
import { RIGHT_ITEM } from "@/types/header";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Image from "next/image";

export default function LoginPage() {
  const [overlayState, setOverlayState] = useState<"none" | "loading" | "success">("none");

  const triggerLoadingOverlay = () => {
    setOverlayState("loading");
  };

  const hideOverlay = () => {
    setOverlayState("none");
  };

  const triggerSuccessOverlay = async () => {
    // 로딩 오버레이를 최소 2초 유지
    await new Promise<void>(resolve => {
      setTimeout(() => resolve(), 2000);
    });

    // 로딩에서 성공으로 전환
    setOverlayState("success");

    // 1.5초 후 메인 페이지로 이동
    await new Promise<void>(resolve => {
      setTimeout(() => resolve(), 1500);
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-white lg:items-center lg:justify-center lg:bg-gray-100">
      <ScrollToTopOnLoad />
      {/*
        모바일: 풀폭·풀높이 흰 화면.
        PC(lg+): 회색 배경 중앙에 떠 있는 흰 카드(둥근 모서리·그림자·적당한 폭).
      */}
      <div className="relative flex min-h-screen w-full flex-col bg-white lg:min-h-0 lg:w-full lg:max-w-content-narrow lg:rounded-2xl lg:py-10 lg:shadow-xl">
        {/* 로딩/성공 오버레이 - 하나의 컨테이너로 통합 */}
        {overlayState !== "none" && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white lg:rounded-2xl">
            {overlayState === "loading" ? (
              <>
                <LoadingSpinner />
                <h2 className="mt-10 text-SUIT_24 font-bold text-black">로그인 중이에요!</h2>
                <p className="mt-3 text-SUIT_14 font-medium text-ui-muted">잠시만 기다려주세요 :)</p>
              </>
            ) : (
              <>
                <div className="animate-popIn">
                  <Image src="/icons/loginSuccess.svg" alt="성공" width={80} height={80} />
                </div>
                <h2 className="mt-10 animate-slideInUp text-SUIT_24 font-bold text-black">로그인 완료!</h2>
                <p className="animation-delay-200 mt-3 animate-slideInUp text-SUIT_14 font-medium text-ui-muted">
                  메인 페이지로 이동합니다...
                </p>
              </>
            )}
          </div>
        )}
        {/* 뒤로가기 헤더는 모바일 전용 — PC 카드에서는 숨긴다 */}
        <div className="lg:hidden">
          <CommonHeader title="로그인" rightType={RIGHT_ITEM.NONE} />
        </div>
        <div className="mt-5 h-full px-5 lg:mt-0 lg:h-auto lg:px-10">
          <div className="flex h-full flex-col lg:h-auto">
            {/* 타이틀 */}
            <h1 className="mb-4 text-SUIT_24 font-medium text-black">
              환영합니다!{" "}
              <span className="bg-gradient-to-r from-document-main to-question-main bg-clip-text text-transparent">
                세종말싸미
              </span>
              입니다.
            </h1>

            {/* 설명 문구 */}
            <p className="mb-10 text-SUIT_14 font-medium leading-4 text-ui-muted">
              <span className="font-bold text-ui-muted">세종대학교 포털</span>의 학번과 비밀번호로 로그인해주세요.
              <br />
              비밀번호는 서버에 저장되지 않아요!
            </p>
            <LoginForm
              onShowLoading={triggerLoadingOverlay}
              onShowSuccess={triggerSuccessOverlay}
              onHideOverlay={hideOverlay}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
