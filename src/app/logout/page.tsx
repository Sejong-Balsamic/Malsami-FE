"use client";

import { useRouter } from "next/navigation";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import logOut from "@/apis/auth/logOut";
import { useToast } from "@/hooks/use-toast";
import { ToastAction, ToastIcon } from "@/components/ui/toast";

export default function MyPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logOut(); // 로그아웃 API 호출
      toast({
        icon: <ToastIcon color="orange" />,
        title: "로그아웃 되었습니다.",
        action: (
          <ToastAction color="orange" altText="확인">
            확인
          </ToastAction>
        ),
      });
      router.push("/"); // 성공적으로 로그아웃 시 랜딩페이지 이동
    } catch {
      toast({
        icon: <ToastIcon color="orange" />,
        title: "로그아웃을 실패했습니다. 다시 시도해주세요.",
        action: (
          <ToastAction color="orange" altText="확인">
            확인
          </ToastAction>
        ),
      });    }
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
