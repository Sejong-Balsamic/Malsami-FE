// src/types/api/constants/expAction.ts
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
export type ExpAction = keyof typeof ExpAction;
