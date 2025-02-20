// 자바의 enum 느낌으로 as const
export const LEFT_ITEM = {
  BACK: "BACK", // 뒤로가기
  LOGO: "LOGO", // 메인로고
  NONE: "NONE", // 존재안함
} as const;
export type HeaderLeftItemType = (typeof LEFT_ITEM)[keyof typeof LEFT_ITEM];

export const RIGHT_ITEM = {
  BELL: "BELL", // 알림 아이콘
  CLOSE: "CLOSE", // X 버튼
  MENU: "MENU", // 세로 점 3개 아이콘
  NONE: "NONE", // 존재안함
} as const;
export type HeaderRightItemType = (typeof RIGHT_ITEM)[keyof typeof RIGHT_ITEM];
