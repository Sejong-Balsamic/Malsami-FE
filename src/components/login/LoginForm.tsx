"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/apis/auth/auth";
import Image from "next/image";
import Input from "../common/input/Input";
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
      <form onSubmit={handleLogin} className="space-y-10">
        <div>
          <Input label="학번" placeholder="학번을 입력해주세요." value={id} onChange={e => setId(e.target.value)} />
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          {/* 에러 메시지 */}
          {errorMessage && (
            <div className="flex items-center">
              <Image src="/icons/ErrorExclamation.svg" alt="ErrorExclamation" width={18} height={18} />
              <p className="ml-2 text-SUIT_14 font-medium text-[#FF3232]">{errorMessage}</p>
            </div>
          )}
        </div>

        {/* 로그인 제출 버튼 */}
        <button
          type="submit"
          className={`mt-[300px] w-full rounded-md py-4 text-SUIT_16 font-extrabold text-white ${
            isFormValid
              ? "bg-gradient-to-r from-[#08E4BB] to-[#5FF48D] hover:from-[#07D1AA] hover:to-[#50E47F]"
              : "bg-[#D1D1D1]"
          }`}
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </button>
      </form>

      {/* 로그인 성공 모달 */}
      {isModalOpen && <LoginSuccessModal onClose={handleModalClose} userName={userName} />}
    </div>
  );
}
