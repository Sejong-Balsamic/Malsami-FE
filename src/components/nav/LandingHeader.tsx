// src/components/common/LandingHeader.tsx

"use client";

import React from "react";
import { useRouter } from "next/navigation"; // next/router 대신 next/navigation 사용
import Header from "@/components/nav/Header";
import { LEFT_ITEM, RIGHT_ITEM } from "@/types/header";

/**
 * LandingHeader
 *  - 왼쪽: 로고 (LOGO)
 *  - 오른쪽: 알림 (BELL)
 */
function LandingHeader() {
  const router = useRouter();

  // 왼쪽 버튼: 로고 클릭 시 메인("/") 이동
  const handleLeftClick = () => {
    router.push("/");
  };

  // 오른쪽 버튼: 알림 아이콘 클릭 시 "/notifications" 이동
  const handleRightClick = () => {
    router.push("/notifications");
  };

  return (
    <div className="fixed top-0 z-50 w-full max-w-[640px] bg-white">
      <Header
        leftType={LEFT_ITEM.LOGO}
        rightType={RIGHT_ITEM.BELL}
        onLeftClick={handleLeftClick}
        onRightClick={handleRightClick}
        hasNotification={false} // 알림 여부 (Redux 연동 전, 일단 false)
      />
    </div>
  );
}

export default LandingHeader;
