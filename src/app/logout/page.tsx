"use client";

import { useRouter } from "next/navigation";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import { useDispatch, useSelector } from "react-redux";
import { addToast } from "@/global/store/toastSlice";
import { ToastIcon, ToastAction } from "@/components/shadcn/toast";
import CommonHeader from "@/components/header/CommonHeader";
import { RIGHT_ITEM } from "@/types/header";
import authApi from "@/apis/authApi";
import { RootState } from "@/global/store"; // Redux 스토어 타입 가져오기 (필요 시 정의)

export default function MyPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const fcmToken = useSelector((state: RootState) => state.fcm.fcmToken); // fcmToken 가져오기

  const showToast = (message: string) => {
    dispatch(
      addToast({
        id: Date.now().toString(),
        icon: <ToastIcon color="orange" />,
        title: message,
        color: "orange",
        action: (
          <ToastAction color="orange" altText="확인">
            확인
          </ToastAction>
        ),
      }),
    );
  };

  const handleLogout = async (token: string | null) => {
    try {
      await authApi.logout({ fcmToken: token || "" }); // fcmToken이 없으면 빈 문자열 전달
      showToast("로그아웃 되었습니다.");
      router.push("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      showToast("로그아웃을 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="bg-gray-white">
      <ScrollToTopOnLoad />
      <CommonHeader title="로그아웃" rightType={RIGHT_ITEM.NONE} />
      <div>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <button
            type="button"
            onClick={() => handleLogout(fcmToken)} // fcmToken 전달
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
