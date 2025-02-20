// src/components/common/LandingHeader.tsx
import React from "react";
import Header from "@/components/nav/Header";
import { LEFT_ITEM, RIGHT_ITEM } from "@/types/header";
import { useRouter } from "next/router";

function LandingHeader() {
  const router = useRouter();

  // 왼쪽 버튼 클릭 핸들러
  const handleLeftClick = () => {
    // 왼쪽 아이콘 타입에 따라 동작
    // 예: BACK 아이콘이면 이전 페이지로 이동
    //     LOGO 아이콘이면 최상위 URL('/')로 이동
    // 아래 예시는 LOGO 타입을 가정
    router.push("/"); // 최상위 URL로 이동
    // 만약 BACK 버튼일 경우: window.history.back();
  };

  // 오른쪽 버튼 클릭 핸들러
  const handleRightClick = () => {
    // 오른쪽 아이콘 타입에 따라 동작
    // 예: BELL 아이콘이면 알림 페이지로 이동
    //     MENU 아이콘이면 모달 창을 열도록 처리
    // 여기서는 BELL 아이콘에 대한 예시
    router.push("/notifications"); // 알림 페이지로 이동

    // MENU 버튼 예시 (주석)
    // setModalVisible(true); // 모달을 여는 상태값 변경
  };

  // return
  // (
  //   <div className="fixed top-0 z-50 w-full max-w-[640px] bg-white">
  //     <Header
  //       leftType={LEFT_ITEM.BACK} // 혹은 LEFT_ITEM.BACK 등 원하는 타입 선택
  //       rightType={RIGHT_ITEM.여기 따로 받아야됨} // 혹은 MENU, CLOSE 등
  //       onLeftClick={handleLeftClick} -> 이건 무조건 이전 페이디로 돌아가기
  //       onRightClick={handleRightClick} -? 따로 받은값에 따라서 달라짐, 메뉴모달에 대한 참조 state값을 넣어야함? 그래야지 메뉴 모달창 리랜더링시키는거아님?
  //     />
  //   </div>
  // );
}

export default LandingHeader;
