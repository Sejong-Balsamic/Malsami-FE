export const ExpAction = {
  CREATE_QUESTION_POST: "CREATE_QUESTION_POST",
  CREATE_DOCUMENT_POST: "CREATE_DOCUMENT_POST",
  CREATE_ANSWER_POST: "CREATE_ANSWER_POST",
  CREATE_COMMENT: "CREATE_COMMENT",
  PURCHASE_DOCUMENT: "PURCHASE_DOCUMENT",
  CHAETAEK_CHOSEN: "CHAETAEK_CHOSEN",
  CHAETAEK_ACCEPT: "CHAETAEK_ACCEPT",
  RECEIVE_LIKE: "RECEIVE_LIKE",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ExpAction = (typeof ExpAction)[keyof typeof ExpAction];

export const expActionLabels: Record<ExpAction, string> = {
  [ExpAction.CREATE_QUESTION_POST]: "질문 글 작성",
  [ExpAction.CREATE_DOCUMENT_POST]: "자료 글 작성",
  [ExpAction.CREATE_ANSWER_POST]: "답변 글 작성",
  [ExpAction.CREATE_COMMENT]: "댓글 작성",
  [ExpAction.PURCHASE_DOCUMENT]: "자료 구매",
  [ExpAction.CHAETAEK_CHOSEN]: "답변 채택됨",
  [ExpAction.CHAETAEK_ACCEPT]: "답변 채택함",
  [ExpAction.RECEIVE_LIKE]: "좋아요 받음",
};
