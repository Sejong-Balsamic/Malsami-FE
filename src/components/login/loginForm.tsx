"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/apis/auth/auth";

export default function LoginForm() {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter(); // useRouter 사용

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await login(id, password);
      setErrorMessage(null);
      router.push("/");
    } catch (error) {
      setErrorMessage("로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      {/* 아이디 입력 */}
      <div>
        <label htmlFor="id" className="block text-sm font-medium text-gray-700">
          아이디
          <input
            type="text"
            id="id"
            value={id}
            onChange={e => setId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="아이디를 입력하세요"
          />
        </label>
      </div>

      {/* 비밀번호 입력 */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          비밀번호
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="비밀번호를 입력하세요"
          />
        </label>
      </div>

      {/* 에러 메시지 */}
      {errorMessage && <p className="text-red-500 text-center text-sm mb-4">{errorMessage}</p>}

      {/* 로그인 제출 버튼 */}
      <button
        type="submit"
        className="w-full bg-custom-orange-100 text-white py-2 px-4 rounded hover:bg-custom-orange-200 focus:outline-none focus:ring-2 focus:ring-custom-orange-200"
        disabled={isLoading}
      >
        {isLoading ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}
