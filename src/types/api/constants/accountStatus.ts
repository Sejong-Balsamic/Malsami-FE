// src/types/api/constants/accountStatus.ts
export const AccountStatus = {
  ACTIVE: "ACTIVE",
  DELETED: "DELETED",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type AccountStatus = keyof typeof AccountStatus;
