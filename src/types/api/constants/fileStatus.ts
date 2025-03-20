// src/types/api/constants/fileStatus.ts
export const FileStatus = {
  EMPTY: "EMPTY",
  MOCK_DATA: "MOCK_DATA",
  NOT_FOUND: "NOT_FOUND",
  INVALID: "INVALID",
  DEPRECATED: "DEPRECATED",
  INITIAL: "INITIAL",
  PENDING: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
} as const;

export type FileStatus = keyof typeof FileStatus;
