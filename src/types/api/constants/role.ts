export const Role = {
  ROLE_USER: "ROLE_USER",
  ROLE_ADMIN: "ROLE_ADMIN",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Role = (typeof Role)[keyof typeof Role];

export const roleLabels: Record<Role, string> = {
  [Role.ROLE_USER]: "일반 회원",
  [Role.ROLE_ADMIN]: "관리자",
};
