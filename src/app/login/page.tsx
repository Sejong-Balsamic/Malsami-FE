"use client";

import { useState } from "react";
import LoginForm from "@/components/login/LoginForm";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import CommonHeader from "@/components/header/CommonHeader";
import { RIGHT_ITEM } from "@/types/header";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Image from "next/image";

export default function LoginPage() {
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const triggerLoadingOverlay = () => {
    setIsLoginLoading(true);
    setTimeout(() => setIsLoginLoading(false), 2500);
  };

  const triggerSuccessOverlay = async () => {
    setShowSuccess(true);
    await new Promise<void>(resolve => {
      setTimeout(() => resolve(), 1000);
    });
    setShowSuccess(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <ScrollToTopOnLoad />
      <div className="relative flex h-screen w-full max-w-[640px] flex-col bg-white">
        {isLoginLoading && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white">
            <LoadingSpinner />
            <h2 className="mt-10 text-SUIT_24 font-bold text-black">로그인 중이에요!</h2>
            <p className="mt-3 text-SUIT_14 font-medium text-ui-muted">잠시만 기다려주세요 :)</p>
          </div>
        )}
        <CommonHeader title="로그인" rightType={RIGHT_ITEM.NONE} />
        <div className="mt-5 h-full px-5">
          <div className="flex h-full flex-col">
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
              <span className="font-bold text-[#898989]">세종대학교 포털</span>의 학번과 비밀번호로 로그인해주세요.
              <br />
              비밀번호는 서버에 저장되지 않아요!
            </p>
            <LoginForm onShowLoading={triggerLoadingOverlay} onShowSuccess={triggerSuccessOverlay} />
          </div>
        </div>
        {showSuccess && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white">
            <Image src="/icons/loginSuccess.svg" alt="성공" width={80} height={80} />
            <h2 className="mt-10 text-SUIT_24 font-bold text-black">로그인 완료!</h2>
          </div>
        )}
      </div>
    </div>
  );
}
