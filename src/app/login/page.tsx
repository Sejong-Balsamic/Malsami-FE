"use client";

import LoginForm from "@/components/login/loginForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-10 rounded w-full max-w-md">
        <h1 className="text-2xl font-pretendard-bold mb-[4rem] text-center ">세종말싸미</h1>
        <LoginForm />
      </div>
    </div>
  );
}
