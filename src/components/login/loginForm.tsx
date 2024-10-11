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
  const [userName, setUserName] = useState<string>(""); // 사용자 이름 상태 추가

  const router = useRouter(); // useRouter 사용

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const getUserInfo = await login(id, password);
      setErrorMessage(null);
      setUserName(getUserInfo.member.studentName);
      setIsModalOpen(true);
      //추가 작업 필요: 최초 로그인 시 로그인성공모달 열리게
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
              className="mt-1 block w-full px-3 py-2 ring-2 ring-gray-300 rounded-lg shadow-sm focus:ring-custom-orange-100
            outline-none caret-custom-orange-400 invalid:ring-gray-300 valid:ring-custom-orange-400"
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
              className="mt-1 block w-full px-3 py-2 ring-2 ring-gray-300 rounded-lg shadow-sm focus:ring-custom-orange-100
            outline-none caret-custom-orange-400 invalid:ring-gray-300 valid:ring-custom-orange-400"
              placeholder="비밀번호를 입력해주세요"
            />
          </label>
        </div>

        {/* 에러 메시지 */}
        {errorMessage && <p className="text-red-500 text-center text-sm mb-4">{errorMessage}</p>}

        {/* 로그인 제출 버튼 */}
        <button
          type="submit"
          className="w-full mt-10 bg-custom-orange-100 text-white py-2 px-4 rounded-lg hover:bg-custom-orange-400 focus:outline-none focus:ring-2 focus:ring-custom-orange-400"
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
