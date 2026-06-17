// src/components/layout/AppContainer.tsx
//
// 앱 전역 컨테이너 폭(max-w-container / max-w-container-lg)을 한 곳에서 책임지는
// 레이아웃 컴포넌트 묶음. 폭 값 자체는 tailwind.config 의 maxWidth 토큰에서 관리한다.
//
// - PageContainer      : 일반 본문 컨테이너 (스크롤되는 페이지 본문)
// - TopBarContainer    : 상단 고정 헤더 래퍼 (fixed top-0, 컨테이너 폭에 맞춰 중앙 정렬)
// - BottomBarContainer : 하단 고정 바 래퍼 (fixed bottom, 입력창·완료버튼·네비 등)
//
// 컨테이너 폭을 바꿔야 하면 tailwind.config 의 container / container-lg 토큰만 수정하면 된다.

import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  className?: string;
}

// 공통 폭 토큰 (모바일 container, PC container-lg)
const CONTAINER_WIDTH = "max-w-container lg:max-w-container-lg";

/**
 * 페이지 본문 컨테이너.
 * 화면 중앙 정렬 + 앱 표준 폭. 페이지는 폭을 직접 신경 쓰지 않고 이 컴포넌트로 감싸기만 한다.
 */
export function PageContainer({ children, className = "" }: ContainerProps) {
  return <div className={`relative mx-auto w-full ${CONTAINER_WIDTH} ${className}`}>{children}</div>;
}

/**
 * 상단 고정 헤더 래퍼.
 * fixed top-0 + 컨테이너 폭에 맞춰 중앙 정렬되어, PC에서도 본문 컨테이너와 좌우가 어긋나지 않는다.
 */
export function TopBarContainer({ children, className = "" }: ContainerProps) {
  return (
    <div className={`fixed left-1/2 top-0 z-50 w-full -translate-x-1/2 ${CONTAINER_WIDTH} bg-white ${className}`}>
      {children}
    </div>
  );
}

/**
 * 하단 고정 바 래퍼.
 * fixed bottom + 컨테이너 폭 중앙 정렬. 댓글 입력창·완료 버튼 등 하단 고정 요소에 사용.
 */
export function BottomBarContainer({ children, className = "" }: ContainerProps) {
  return (
    <div className={`fixed bottom-0 left-1/2 z-40 w-full -translate-x-1/2 ${CONTAINER_WIDTH} ${className}`}>
      {children}
    </div>
  );
}
