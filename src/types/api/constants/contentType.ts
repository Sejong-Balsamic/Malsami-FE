// src/types/api/constants/contentTypes.ts
export const ContentType = {
  THUMBNAIL: "THUMBNAIL",
  COMMENT: "COMMENT",
  QUESTION: "QUESTION",
  ANSWER: "ANSWER",
  NOTICE: "NOTICE",
  DOCUMENT: "DOCUMENT",
  COURSES: "COURSES",
  DOCUMENT_REQUEST: "DOCUMENT_REQUEST",
} as const;

export type ContentType = keyof typeof ContentType;
