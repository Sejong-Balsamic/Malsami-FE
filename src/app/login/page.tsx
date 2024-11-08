"use client";

import LoginForm from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md rounded bg-white p-10">
        <h1 className="font-pretendard-bold mb-[4rem] text-center text-2xl">세종말싸미</h1>
        <LoginForm />
      </div>
    </div>
  );
}
