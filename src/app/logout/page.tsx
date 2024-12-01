"use client";

import { useRouter } from "next/navigation";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import logOut from "@/apis/auth/logOut";
import { useDispatch } from "react-redux";
import { addToast } from "@/store/toastSlice";
import { store } from "@/store";
import { ToastIcon, ToastAction } from "@/components/ui/toast";

export default function MyPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logOut(); // 로그아웃 API 호출
      dispatch(
        addToast({
          id: Date.now().toString(),
          icon:  <ToastIcon color="orange" />,
          title: "로그아웃 되었습니다.",
          action: <ToastAction color="orange" altText="확인">확인</ToastAction>, // 액션 전달
          color: "orange",
        })
      );
      router.push("/"); // 성공적으로 로그아웃 시 랜딩페이지 이동
    } catch {
      dispatch(
        addToast({
          id: Date.now().toString(),
          icon: "orange",
          title: "로그아웃 실패",
          color: "orange",
        })
      );
    }
  };

  console.log(store.getState().toast);

  return (
    <div className="bg-gray-white">
      <ScrollToTopOnLoad />
      <div className="flex min-h-screen flex-col items-center justify-center">
        <button
          type="button"
          onClick={handleLogout}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
