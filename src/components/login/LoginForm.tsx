"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/apis/auth/auth";
import LoginSuccessModal from "./LoginSuccessModal";

export default function LoginForm() {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFirstLogin, setIsFirstLogin] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>(""); // 사용자 이름 상태 추가

  const router = useRouter(); // useRouter 사용

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const getUserInfo = await login(id, password);
      setErrorMessage(null);
      setUserName(getUserInfo.member.studentName);
      setIsFirstLogin(getUserInfo.member.isFirstLogin);
      if (isFirstLogin) setIsModalOpen(true);
      else router.push("/");
    } catch (error) {
      setErrorMessage("로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // 모달 닫기
    router.push("/"); // 홈 화면으로 이동
  };

  return (
    <div>
      <form onSubmit={handleLogin} className="space-y-6">
        {/* 아이디 입력 */}
        <div>
          <label htmlFor="id" className="block text-sm font-medium text-black">
            학번
            <input
              type="text"
              id="id"
              value={id}
              onChange={e => setId(e.target.value)}
              required
              className="mt-1 block w-full rounded-lg px-3 py-2 caret-custom-blue-400 shadow-sm outline-none ring-2 ring-gray-300 valid:ring-custom-blue-400 invalid:ring-gray-300 focus:ring-custom-blue-200"
              placeholder="학번을 입력해주세요"
            />
          </label>
        </div>
        {/* 비밀번호 입력 */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-black">
            비밀번호
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-lg px-3 py-2 caret-custom-blue-400 shadow-sm outline-none ring-2 ring-gray-300 valid:ring-custom-blue-400 invalid:ring-gray-300 focus:ring-custom-blue-300"
              placeholder="비밀번호를 입력해주세요"
            />
          </label>
        </div>

        {/* 에러 메시지 */}
        {errorMessage && <p className="mb-4 text-center text-sm text-red-500">{errorMessage}</p>}

        {/* 로그인 제출 버튼 */}
        <button
          type="submit"
          className="mt-10 w-full rounded-lg bg-custom-blue-300 px-4 py-2 text-white hover:bg-custom-blue-400 focus:outline-none focus:ring-2 focus:ring-custom-blue-400"
          disabled={isLoading}
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </button>
      </form>

      {/* 로그인 성공 모달 */}
      {isModalOpen && <LoginSuccessModal onClose={handleModalClose} userName={userName} />}
    </div>
  );
}
