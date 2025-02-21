// src/components/common/CommonHeader.tsx

"use client";

import React from "react";
import { useRouter } from "next/navigation"; // next/navigation 사용
import Header from "@/components/nav/Header";
import { LEFT_ITEM, RIGHT_ITEM, RightItemType } from "@/types/header";

/**
 * CommonHeader
 *  - 왼쪽: 무조건 뒤로 가기 (BACK)
 *  - 중앙: title
 *  - 오른쪽: MENU / CLOSE / NONE (기본값 NONE)
 */
interface CommonHeaderProps {
  title: string; // 중앙에 보여줄 타이틀
  // eslint-disable-next-line react/require-default-props
  rightType?: RightItemType; // MENU | CLOSE | NONE (기본값 NONE)
  // eslint-disable-next-line react/require-default-props
  onRightClick?: () => void; // 오른쪽 아이콘 클릭 시 동작
}

function CommonHeader({ title, rightType = RIGHT_ITEM.NONE, onRightClick }: CommonHeaderProps) {
  const router = useRouter();

  // 왼쪽 버튼: 뒤로 가기
  const handleLeftClick = () => {
    router.back();
  };

  // 오른쪽 버튼: 상황에 따라 동작
  const handleRightClick = () => {
    if (onRightClick) {
      onRightClick();
    }
  };

  return (
    <div className="fixed top-0 z-50 w-full max-w-[640px] bg-white">
      <Header
        leftType={LEFT_ITEM.BACK}
        rightType={rightType}
        onLeftClick={handleLeftClick}
        onRightClick={handleRightClick}
        title={title}
      />
    </div>
  );
}

export default CommonHeader;
