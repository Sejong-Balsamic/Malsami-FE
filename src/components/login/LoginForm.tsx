/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */

"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch } from "react-redux";
import authApi from "@/apis/authApi";
import { AuthCommand } from "@/types/api/requests/authCommand";
import { setMemberId } from "@/global/store/authSlice";
import LoginInput from "../common/LoginInput";
import LoginSuccessModal from "./LoginSuccessModal";

interface LoginFormProps {
  onShowLoading?: () => void;
  onShowSuccess?: () => Promise<void> | void;
  onHideOverlay?: () => void;
}

export default function LoginForm({ onShowLoading = () => {}, onShowSuccess, onHideOverlay }: LoginFormProps) {
  const [studentId, setStudentId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
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

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

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
        // 로그인 성공 시에만 로딩 오버레이 표시
        onShowLoading?.();

        setUserName(getUserInfo.studentName || "");
        setIsFirstLogin(getUserInfo.isFirstLogin || false);
        setLoginFailedMessage(null);

        // Redux 상태에 memberId 저장
        dispatch(setMemberId(getUserInfo.memberId));

        if (getUserInfo.isFirstLogin) {
          setIsLoginModalOpen(true);
        } else {
          // 성공 오버레이 표시 후 메인 페이지로 이동
          if (onShowSuccess) {
            await onShowSuccess();
          }
          // 성공 메시지 표시 직후 페이지 이동
          router.push("/");
        }
      } else {
        // 로그인 실패 시 에러 메시지만 표시
        setLoginFailedMessage("로그인에 실패했습니다. 다시 시도해주세요.");
        onHideOverlay?.();
      }
    } catch (error) {
      // 로그인 실패 시 에러 메시지만 표시
      setLoginFailedMessage("로그인에 실패했습니다. 다시 시도해주세요.");
      onHideOverlay?.();
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
          <LoginInput
            label="학번"
            placeholder="학번을 입력해주세요."
            value={studentId}
            onChange={e => setStudentId(e.target.value)}
          />
          <LoginInput
            label="비밀번호"
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={e => setPassword(e.target.value)}
            rightElement={
              <button
                type="button"
                onMouseDown={e => e.preventDefault()}
                onClick={togglePassword}
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
                className="focus:outline-none"
              >
                <Image
                  src={showPassword ? "/icons/viewEyeGray.svg" : "/icons/viewCloseEyeGray.svg"}
                  alt={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
                  width={20}
                  height={20}
                />
              </button>
            }
          />

          {/* 에러 메시지 */}
          {loginFailedMessage && (
            <div className="flex items-center">
              <Image src="/icons/ErrorExclamation.svg" alt="ErrorExclamation" width={18} height={18} />
              <p className="ml-2 text-SUIT_14 font-medium text-red-500">{loginFailedMessage}</p>
            </div>
          )}
        </div>

        {/* 로그인 제출 버튼 */}
        <div className="mb-10 mt-auto">
          <button
            type="submit"
            className={`w-full rounded-md py-4 text-SUIT_16 font-extrabold text-white ${
              isFormValid ? "bg-gradient-to-r from-document-main to-question-main hover:opacity-90" : "bg-ui-muted"
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
