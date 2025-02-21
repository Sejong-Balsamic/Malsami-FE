"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/apis/auth/auth";
import Image from "next/image";
import CustomInput from "../common/CustomInput";
import LoginSuccessModal from "./LoginSuccessModal";
import NewLoadingSpinner from "../common/NewLoadingSpinner";

export default function LoginForm() {
  const [studentId, setStudentId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginFailedMessage, setLoginFailedMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isFirstLogin, setIsFirstLogin] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>(""); // 사용자 이름 상태 추가
  const [isFormValid, setIsFormValid] = useState<boolean>(false); // 폼 유효성 상태 추가

  const router = useRouter(); // useRouter 사용

  useEffect(() => {
    setIsFormValid(!!studentId.trim() && !!password.trim()); // 학번,비밀번호가 비어있는지 확인
  }, [studentId, password]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const getUserInfo = await login(studentId, password);
      setLoginFailedMessage(null);
      setUserName(getUserInfo.member.studentName);
      setIsFirstLogin(getUserInfo.member.isFirstLogin);
      if (isFirstLogin) setIsLoginModalOpen(true);
      else router.push("/");
    } catch (error) {
      setLoginFailedMessage("로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsLoginModalOpen(false); // 모달 닫기
    router.push("/"); // 홈 화면으로 이동
  };

  return (
    <>
      <form onSubmit={handleLogin} className="flex flex-1 flex-col">
        {/* 상단 Input 영역 */}
        <div className="flex flex-col space-y-8">
          <CustomInput
            label="학번"
            placeholder="학번을 입력해주세요."
            value={studentId}
            onChange={e => setStudentId(e.target.value)}
          />
          <CustomInput
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          {/* 에러 메시지 */}
          {loginFailedMessage && (
            <div className="flex items-center">
              <Image src="/icons/ErrorExclamation.svg" alt="ErrorExclamation" width={18} height={18} />
              <p className="ml-2 text-SUIT_14 font-medium text-[#FF3232]">{loginFailedMessage}</p>
            </div>
          )}
        </div>

        {/* Todo: 나중에 삭제해야함.  */}
        <NewLoadingSpinner />

        {/* 로그인 제출 버튼. 하단 버튼 영역 */}
        <div className="mb-[60px] mt-auto">
          <button
            type="submit"
            className={`w-full rounded-md py-4 text-SUIT_16 font-extrabold text-white ${
              isFormValid
                ? "bg-gradient-to-r from-[#08E4BB] to-[#5FF48D] hover:from-[#07D1AA] hover:to-[#50E47F]"
                : "bg-[#D1D1D1]"
            }`}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
        </div>
      </form>

      {/* 로그인 성공 모달 */}
      {isLoginModalOpen && <LoginSuccessModal onClose={handleModalClose} userName={userName} />}
    </>
  );
}
