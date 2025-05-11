// src/components/common/CommonHeader.tsx

"use client";

import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/Header";
import { LEFT_ITEM, RIGHT_ITEM, RightItemType } from "@/types/header";

interface CommonHeaderProps {
  title: string;
  // eslint-disable-next-line react/require-default-props
  rightType?: RightItemType;
  // eslint-disable-next-line react/require-default-props
  onRightClick?: () => void;
  // eslint-disable-next-line react/require-default-props
  children?: ReactNode;
}

export default function CommonHeader({
  title,
  rightType = RIGHT_ITEM.NONE,
  onRightClick,
  children,
}: CommonHeaderProps) {
  const router = useRouter();
  const handleLeftClick = () => router.back();
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
        />
      </div>

      {/* 헤더 높이만큼 스페이서 (4rem) */}
      <div className="h-16 w-full max-w-[640px]" />

      {/* children 이 있으면 그냥 바로 렌더 */}
      <div className="w-full max-w-[640px] bg-white">{children}</div>
    </>
  );
}
