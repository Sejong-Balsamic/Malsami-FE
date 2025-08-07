// src/components/common/LandingHeader.tsx

"use client";

import React, { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/Header";
import { LEFT_ITEM, RIGHT_ITEM } from "@/types/header";
import CreditModal from "@/components/common/CreditModal";

interface LandingHeaderProps {
  // eslint-disable-next-line react/require-default-props
  children?: ReactNode;
}

export default function LandingHeader({ children }: LandingHeaderProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLeftClick = () => setIsModalOpen(true);
  const handleRightClick = () => router.push("/notifications");
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <CreditModal isOpen={isModalOpen} onClose={handleCloseModal} />
      {/* fixed 헤더 */}
      <div className="fixed top-0 z-50 w-full max-w-[640px] bg-white">
        <Header
          leftType={LEFT_ITEM.LOGO}
          rightType={RIGHT_ITEM.BELL}
          onLeftClick={handleLeftClick}
          onRightClick={handleRightClick}
          hasNotification={false}
        />
      </div>

      {/* 헤더 높이만큼 스페이서 (4rem) */}
      <div className="h-16 w-full max-w-[640px]" />

      {/* children 렌더 */}
      <div className="w-full max-w-[640px] bg-white">{children}</div>
    </>
  );
}
