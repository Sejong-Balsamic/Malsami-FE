"use client";

import LoginForm from "@/components/login/LoginForm";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <ScrollToTopOnLoad />
      <div className="min-h-screen w-full min-w-[386px] max-w-[640px] bg-white px-10 py-12">
        <h1 className="font-pretendard-semibold mb-1.5 text-left text-2xl">안녕하시오!</h1>
        <h1 className="font-pretendard-semibold mb-2.5 text-left text-2xl">
          <span className="font-pretendard-bold">세종말싸미</span>라 하옵니다.
        </h1>

        <div className="font-pretendard-medium mb-[50px] text-left text-sm text-[#737373]">
          *세종대학교 포털의 학번과 비밀번호로 로그인해주세요.{" "}
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
