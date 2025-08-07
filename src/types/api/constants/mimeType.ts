// src/types/api/constants/mimeType.ts

export const MimeType = {
  JPEG: "image/jpeg",
  JPG: "image/jpeg",
  PNG: "image/png",
  GIF: "image/gif",
  BMP: "image/bmp",
  TIFF: "image/tiff",
  SVG: "image/svg+xml",
  WEBP: "image/webp",
  PDF: "application/pdf",
  DOCX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  DOC: "application/msword",
  XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  XLS: "application/vnd.ms-excel",
  PPTX: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  PPT: "application/vnd.ms-powerpoint",
  HWP: "application/x-hwp",
  MP4: "video/mp4",
  AVI: "video/x-msvideo",
  MOV: "video/quicktime",
  MP3: "audio/mpeg",
  WAV: "audio/wav",
  AAC: "audio/aac",
  OGG: "audio/ogg",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type MimeType = keyof typeof MimeType;
