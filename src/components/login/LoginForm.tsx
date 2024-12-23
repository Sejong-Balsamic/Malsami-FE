"use client";

import { useState, FormEvent, useEffect } from "react";
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
  const [isFormValid, setIsFormValid] = useState<boolean>(false); // 폼 유효성 상태 추가

  const router = useRouter(); // useRouter 사용

  useEffect(() => {
    setIsFormValid(!!id.trim() && !!password.trim()); // 학번,비밀번호가 비어있는지 확인
  }, [id, password]);

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
    <div className="w-full">
      <form onSubmit={handleLogin} className="space-y-2">
        {/* 아이디 입력 */}
        <div>
          <input
            type="text"
            id="id"
            value={id}
            onChange={e => setId(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg px-3 py-2 caret-custom-blue-400 shadow-sm outline-none ring-1 ring-gray-300 valid:ring-custom-blue-400 invalid:ring-gray-300 focus:ring-custom-blue-200"
            placeholder="학번 (테스트학번: 99999999)"
          />
        </div>
        {/* 비밀번호 입력 */}
        <div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg px-3 py-2 caret-custom-blue-400 shadow-sm outline-none ring-1 ring-gray-300 valid:ring-custom-blue-400 invalid:ring-gray-300 focus:ring-custom-blue-300"
            placeholder="비밀번호 (테스트비번: 99999999)"
          />
        </div>

        {/* 에러 메시지 */}
        {errorMessage && <p className="mb-4 text-center text-sm text-red-500">{errorMessage}</p>}

        {/* 로그인 제출 버튼 */}
        <button
          type="submit"
          className={`mt-10 w-full rounded-lg px-4 py-2 text-white ${
            isFormValid ? "bg-custom-blue-300 hover:bg-custom-blue-500 focus:ring-custom-blue-400" : "bg-[#D9D9D9]"
          }`}
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </button>
      </form>

      {/* 안내 메시지 */}
      <div className="mt-4 text-center text-xs text-gray-500">
        입력하신 비밀번호는 서버에 저장되지 않으며, <br /> 암호화된 상태로 처리됩니다.
      </div>

      {/* 로그인 성공 모달 */}
      {isModalOpen && <LoginSuccessModal onClose={handleModalClose} userName={userName} />}
    </div>
  );
}
