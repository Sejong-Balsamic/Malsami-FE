// src/types/header.ts

export const LEFT_ITEM = {
  BACK: "BACK", // 뒤로가기
  LOGO: "LOGO", // 메인 로고
  NONE: "NONE", // 없음
} as const;
export type LeftItemType = (typeof LEFT_ITEM)[keyof typeof LEFT_ITEM];

export const RIGHT_ITEM = {
  BELL: "BELL", // 알림 아이콘
  CLOSE: "CLOSE", // X 버튼
  MENU: "MENU", // 세로 점 3개 아이콘
  NONE: "NONE", // 없음
} as const;
export type RightItemType = (typeof RIGHT_ITEM)[keyof typeof RIGHT_ITEM];
