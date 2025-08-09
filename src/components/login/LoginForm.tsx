"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch } from "react-redux";
import authApi from "@/apis/authApi";
import { AuthCommand } from "@/types/api/requests/authCommand";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { setMemberId } from "@/global/store/authSlice";
import CustomInput from "../common/CustomInput";
import LoginSuccessModal from "./LoginSuccessModal";

export default function LoginForm() {
  const [studentId, setStudentId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginFailedMessage, setLoginFailedMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [, setIsFirstLogin] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsFormValid(!!studentId.trim() && !!password.trim());
  }, [studentId, password]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const command: Partial<AuthCommand> = {
        sejongPortalId: studentId,
        sejongPortalPassword: password,
      };
      const getUserInfo = await authApi.signIn(command);

      if (getUserInfo.accessToken && getUserInfo.studentName && getUserInfo.memberId) {
        setUserName(getUserInfo.studentName || "");
        setIsFirstLogin(getUserInfo.isFirstLogin || false);
        setLoginFailedMessage(null);

        // Redux 상태에 memberId 저장
        dispatch(setMemberId(getUserInfo.memberId));

        if (getUserInfo.isFirstLogin) {
          setIsLoginModalOpen(true);
        } else {
          router.push("/");
        }
      } else {
        setLoginFailedMessage("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      setLoginFailedMessage("로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsLoginModalOpen(false);
    router.push("/");
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

        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-60">
            <LoadingSpinner />
          </div>
        )}

        {/* 로그인 제출 버튼 */}
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
