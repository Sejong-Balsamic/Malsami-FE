"use client";

import LoginForm from "@/components/login/LoginForm";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <ScrollToTopOnLoad />
      <div className="flex h-screen w-full min-w-[386px] max-w-[640px] flex-col bg-white px-5 pb-[60px]">
        <div>공용컴포넌트 header 자리</div>
        <span className="mb-4 text-SUIT_20 font-medium">
          환영합니다! <span className="font-bold">세종말싸미</span> 입니다.
        </span>
        <span className="mb-[50px] text-SUIT_14 font-medium text-[#A3A3A3]">
          <span className="font-bold text-[#08E4BA]">세종대학교 포털</span>의 학번과 비밀번호로 로그인해주세요.
          <div>비밀번호는 서버에 저장되지 않아요!</div>
        </span>
        <LoginForm />
      </div>
    </div>
  );
}
