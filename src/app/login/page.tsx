"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/login/LoginForm";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import CommonHeader from "@/components/header/CommonHeader";
import { RIGHT_ITEM } from "@/types/header";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // 로그인 상태 확인 (sessionStorage에서 AccessToken 확인)
    const accessToken = typeof window !== "undefined" ? sessionStorage.getItem("AccessToken") : null;

    if (accessToken) {
      // 이미 로그인된 상태면 홈으로 리다이렉션
      router.replace("/");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <ScrollToTopOnLoad />
      <div className="flex h-screen w-full min-w-[386px] max-w-[640px] flex-col bg-white">
        <CommonHeader title="로그인" rightType={RIGHT_ITEM.NONE} />
        {/* 헤더 아래 여백 추가 */}
        <div className="mt-5 h-full px-5">
          <div className="flex h-full flex-col">
            <div className="mb-4 text-SUIT_20 font-medium">
              환영합니다! <span className="font-bold">세종말싸미</span> 입니다.
            </div>
            <div className="mb-[50px] text-SUIT_14 font-medium text-[#A3A3A3]">
              <span className="font-bold text-[#08E4BA]">세종대학교 포털</span>의 학번과 비밀번호로 로그인해주세요.
              <div>비밀번호는 서버에 저장되지 않아요!</div>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
