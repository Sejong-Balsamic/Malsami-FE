// src/components/common/LandingHeader.tsx
import React from "react";
import Header from "@/components/nav/Header";
import { LEFT_ITEM, RIGHT_ITEM } from "@/types/header";
import { useRouter } from "next/router";

function LandingHeader() {
  const router = useRouter();

  // 왼쪽 버튼 클릭 ( 메인 로고 )
  const handleLeftClick = () => {
    router.push("/"); // 최상위 URL로 이동
  };

  // 오른쪽 버튼 클릭 ( 알림 아이콘 클릭 )
  const handleRightClick = () => {
    router.push("/notifications"); // 알림 페이지로 이동
  };

  return (
    <div className="fixed top-0 z-50 w-full max-w-[640px] bg-white">
      <Header
        leftType={LEFT_ITEM.LOGO} // 혹은 LEFT_ITEM.BACK 등 원하는 타입 선택
        rightType={RIGHT_ITEM.BELL} // 혹은 MENU, CLOSE 등
        onLeftClick={handleLeftClick}
        onRightClick={handleRightClick}
        hasNotification={false} // TODO: 리덕스 연동 필요 : 하드코딩으로 false
      />
    </div>
  );
}

export default LandingHeader;
