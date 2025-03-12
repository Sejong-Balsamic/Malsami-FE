// src/types/api/constants/contentTypes.ts
export const ContentType = {
  QUESTION: "QUESTION", // 질문 게시글
  ANSWER: "ANSWER", // 답변
  DOCUMENT: "DOCUMENT", // 자료 게시글
  DOCUMENT_REQUEST: "DOCUMENT_REQUEST", // 자료 요청 게시글
  COMMENT: "COMMENT", // 댓글
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ContentType = (typeof ContentType)[keyof typeof ContentType];

export const contentTypeLabels: Record<ContentType, string> = {
  [ContentType.QUESTION]: "질문",
  [ContentType.ANSWER]: "답변",
  [ContentType.DOCUMENT]: "자료",
  [ContentType.DOCUMENT_REQUEST]: "자료 요청",
  [ContentType.COMMENT]: "댓글",
};
