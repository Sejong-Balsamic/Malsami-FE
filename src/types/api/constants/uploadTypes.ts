// src/types/api/constants/uploadType.ts
export const UploadType = {
  IMAGE: "IMAGE",
  DOCUMENT: "DOCUMENT",
  VIDEO: "VIDEO",
  MUSIC: "MUSIC",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type UploadType = keyof typeof UploadType;
