"use client";

import { useRouter } from "next/navigation";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import logOut from "@/apis/auth/logOut";
import { useDispatch } from "react-redux";
import { addToast } from "@/store/toastSlice";
import { ToastIcon, ToastAction } from "@/components/ui/toast";

export default function MyPage() {
  const router = useRouter();
  const dispatch = useDispatch();

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

  const handleLogout = async () => {
    try {
      await logOut(); // 로그아웃 API 호출
      showToast("로그아웃 되었습니다.");
      router.push("/"); // 성공적으로 로그아웃 시 랜딩페이지 이동
    } catch {
      showToast("로그아웃을 실패했습니다. 다시 시도해주세요.");
    }
  };

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
