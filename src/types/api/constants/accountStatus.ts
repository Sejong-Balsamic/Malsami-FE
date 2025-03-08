export const AccountStatus = {
  ACTIVE: "ACTIVE",
  DELETED: "DELETED",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type AccountStatus = (typeof AccountStatus)[keyof typeof AccountStatus];

export const accountStatusLabels: Record<AccountStatus, string> = {
  [AccountStatus.ACTIVE]: "활성화된 계정",
  [AccountStatus.DELETED]: "삭제된 계정",
};
