"use client";

import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface AuthCheckerProps {
  children: ReactNode;
}

export default function AuthChecker({ children }: AuthCheckerProps) {
  const router = useRouter();

  useEffect(() => {
    const publicPaths = ["/", "/notice", "/help"];
    const currentPath = window.location.pathname; // 현재 경로 가져오기
    const accessToken = sessionStorage.getItem("accessToken");

    if (!publicPaths.includes(currentPath) && !accessToken) {
      alert("로그인이 필요합니다.");
      router.replace("/"); // 랜딩 페이지로 리디렉트
    }
  }, [router]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>; // 자식 요소를 JSX로 반환
}
