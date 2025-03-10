export const UploadType = {
  IMAGE: "IMAGE",
  DOCUMENT: "DOCUMENT",
  VIDEO: "VIDEO",
  MUSIC: "MUSIC",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type UploadType = (typeof UploadType)[keyof typeof UploadType];

export const uploadTypeLabels: Record<UploadType, string> = {
  [UploadType.IMAGE]: "이미지 파일",
  [UploadType.DOCUMENT]: "문서 파일",
  [UploadType.VIDEO]: "비디오 파일",
  [UploadType.MUSIC]: "음원 파일",
};
