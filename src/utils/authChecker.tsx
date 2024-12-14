"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";
import LoginDirectModal from "@/components/common/LoginDirectModal";

interface AuthCheckerProps {
  children: ReactNode;
}

export default function AuthChecker({ children }: AuthCheckerProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const publicPaths = ["/", "/notice", "/login", "/help"];
    const currentPath = window.location.pathname; // 현재 경로 가져오기
    const accessToken = sessionStorage.getItem("accessToken");

    if (!publicPaths.includes(currentPath) && !accessToken) {
      setIsModalOpen(true); // 모달 열기
    }
  }, [router]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.replace("/"); // 랜딩 페이지로 리디렉트
  };

  return (
    <>
      <LoginDirectModal isOpen={isModalOpen} onClose={handleCloseModal} />
      {children}
    </>
  );
}
