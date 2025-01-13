// 유니언 타입 정의. 키를 영어로 사용해 백엔드와 동일한 컨벤션 유지.
type ContentTypesKey =
  | "THUMBNAIL"
  | "COMMENT"
  | "QUESTION"
  | "ANSWER"
  | "NOTICE"
  | "DOCUMENT"
  | "COURSES"
  | "DOCUMENT_REQUEST";

// 매핑 객체. 객체의 키가 정의된 ContentTypeKey 타입 내에서만 허용.
export const ContentTypes: Record<ContentTypesKey, string> = {
  THUMBNAIL: "썸네일",
  COMMENT: "댓글",
  QUESTION: "질문글",
  ANSWER: "답변글",
  NOTICE: "공지사항",
  DOCUMENT: "자료글",
  COURSES: "교과목",
  DOCUMENT_REQUEST: "자료요청글",
};

export default ContentTypes;
