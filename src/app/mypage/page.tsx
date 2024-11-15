"use client";

import { useRouter } from "next/navigation";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import logOut from "@/apis/auth/logOut";

export default function MyPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut(); // 로그아웃 API 호출
      alert("로그아웃에 성공하였습니다.");
      router.push("/"); // 성공적으로 로그아웃 시 랜딩페이지 이동
    } catch {
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="bg-gray-white">
      <ScrollToTopOnLoad />
      <div className="flex min-h-screen flex-col items-center justify-center">
        <button onClick={handleLogout} className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700">
          Log Out
        </button>
      </div>
    </div>
  );
}
