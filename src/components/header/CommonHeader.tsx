// src/components/common/CommonHeader.tsx

"use client";

import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/Header";
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
      {/* fixed 헤더 */}
      <div className="fixed top-0 z-50 w-full max-w-[640px] bg-white">
        <Header
          leftType={LEFT_ITEM.BACK}
          rightType={rightType}
          onLeftClick={handleLeftClick}
          onRightClick={handleRightClick}
          title={title}
          subtitle={subtitle}
          rightButtonRef={rightButtonRef}
        />
      </div>

      {/* 헤더 높이만큼 스페이서 (4rem) */}
      <div className="h-16 w-full max-w-[640px]" />

      {/* children 이 있으면 그냥 바로 렌더 */}
      <div className="w-full max-w-[640px] bg-white">{children}</div>
    </>
  );
}
