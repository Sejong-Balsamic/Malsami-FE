// src/types/contentTypes.ts
export type ContentType =
  | "THUMBNAIL"
  | "COMMENT"
  | "QUESTION"
  | "ANSWER"
  | "NOTICE"
  | "DOCUMENT"
  | "COURSES"
  | "DOCUMENT_REQUEST";

// UI용 매핑 객체 (필요 시 사용)
export const ContentTypeLabels: Record<ContentType, string> = {
  THUMBNAIL: "썸네일",
  COMMENT: "댓글",
  QUESTION: "질문글",
  ANSWER: "답변글",
  NOTICE: "공지사항",
  DOCUMENT: "자료글",
  COURSES: "교과목",
  DOCUMENT_REQUEST: "자료요청글",
};
