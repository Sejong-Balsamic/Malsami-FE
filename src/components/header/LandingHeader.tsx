// src/components/common/LandingHeader.tsx

"use client";

import React, { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/Header";
import { PageContainer, TopBarContainer } from "@/components/layout/AppContainer";
import { LEFT_ITEM, RIGHT_ITEM } from "@/types/header";
import CreditModal from "@/components/common/CreditModal";

interface LandingHeaderProps {
  // eslint-disable-next-line react/require-default-props
  children?: ReactNode;
  // eslint-disable-next-line react/require-default-props
  contentType?: "document" | "question";
}

export default function LandingHeader({ children, contentType }: LandingHeaderProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLeftClick = () => setIsModalOpen(true);
  const handleRightClick = () => router.push("/notifications");
  const handleCloseModal = () => setIsModalOpen(false);

  // contentType에 따라 적절한 bell 타입 결정
  const getBellType = () => {
    if (contentType === "document") return RIGHT_ITEM.BELL_DOCUMENT;
    if (contentType === "question") return RIGHT_ITEM.BELL_QUESTION;
    return RIGHT_ITEM.BELL; // 기본값
  };

  return (
    <>
      <CreditModal isOpen={isModalOpen} onClose={handleCloseModal} />
      {/* fixed 헤더 — 컨테이너 폭에 맞춰 중앙 정렬 */}
      <TopBarContainer>
        <Header
          leftType={LEFT_ITEM.LOGO}
          rightType={getBellType()}
          onLeftClick={handleLeftClick}
          onRightClick={handleRightClick}
          hasNotification={false}
        />
      </TopBarContainer>

      {/* 헤더 높이만큼 스페이서 (4rem) */}
      <div className="h-16 w-full" />

      {/* children 렌더 */}
      <PageContainer className="bg-white">{children}</PageContainer>
    </>
  );
}
