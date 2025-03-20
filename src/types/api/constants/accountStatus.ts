// src/types/api/constants/accountStatus.ts
export const AccountStatus = {
  ACTIVE: "ACTIVE",
  DELETED: "DELETED",
} as const;

export type AccountStatus = keyof typeof AccountStatus;
