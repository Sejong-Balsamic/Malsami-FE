// src/components/common/CommonHeader.tsx

"use client";

import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/Header";
import { PageContainer, TopBarContainer } from "@/components/layout/AppContainer";
import { LEFT_ITEM, RIGHT_ITEM, RightItemType } from "@/types/header";

interface CommonHeaderProps {
  title: string;
  // eslint-disable-next-line react/require-default-props
  subtitle?: string;
  // eslint-disable-next-line react/require-default-props
  rightType?: RightItemType;
  // eslint-disable-next-line react/require-default-props
  onRightClick?: () => void;
  // eslint-disable-next-line react/require-default-props
  onLeftClick?: () => void;
  // eslint-disable-next-line react/require-default-props
  children?: ReactNode;
  // eslint-disable-next-line react/require-default-props
  rightButtonRef?: React.RefObject<HTMLButtonElement>;
}

export default function CommonHeader({
  title,
  subtitle,
  rightType = RIGHT_ITEM.NONE,
  onRightClick,
  onLeftClick,
  children,
  rightButtonRef,
}: CommonHeaderProps) {
  const router = useRouter();
  const handleLeftClick = () => {
    if (onLeftClick) {
      onLeftClick();
    } else {
      router.back();
    }
  };
  const handleRightClick = () => onRightClick?.();

  return (
    <>
      {/* fixed 헤더 — 컨테이너 폭에 맞춰 중앙 정렬 */}
      <TopBarContainer className="z-40">
        <Header
          leftType={LEFT_ITEM.BACK}
          rightType={rightType}
          onLeftClick={handleLeftClick}
          onRightClick={handleRightClick}
          title={title}
          subtitle={subtitle}
          rightButtonRef={rightButtonRef}
        />
      </TopBarContainer>

      {/* 헤더 높이만큼 스페이서 (4rem) */}
      <div className="h-16 w-full" />

      {/* children 이 있으면 그냥 바로 렌더 */}
      <PageContainer className="bg-white">{children}</PageContainer>
    </>
  );
}
