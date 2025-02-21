// 유니언 타입 정의. 키를 영어로 사용해 백엔드와 동일한 컨벤션 유지.
type ReportReasonsKey =
  | "INAPPROPRIATE_BOARD"
  | "PROFANITY"
  | "OBSCENE_INTERACTION"
  | "ADVERTISEMENT"
  | "FRAUD_IMPERSONATION"
  | "SPAM"
  | "INFO_REQUEST"
  | "OFF_TOPIC"
  | "CASH_REQUEST"
  | "INAPPROPRIATE_PHOTOS"
  | "COPYRIGHT_VIOLATION"
  | "OTHER";

// 매핑 객체. 객체의 키가 정의된 ReportReasonsKey 타입 내에서만 허용
export const ReportReasons: Record<ReportReasonsKey, string> = {
  INAPPROPRIATE_BOARD: "게시판 성격에 부적절해요",
  PROFANITY: "욕설이나 비하가 있어요",
  OBSCENE_INTERACTION: "음란물이나 불건전한 만남 및 대화를 유도해요",
  ADVERTISEMENT: "광고, 판매글이에요",
  FRAUD_IMPERSONATION: "유출, 사칭, 사기가 의심돼요",
  SPAM: "낚시, 놀람, 도배가 있어요",
  INFO_REQUEST: "개인정보, SNS 등의 정보를 요구해요",
  OFF_TOPIC: "풀이와 상관없는 대화를 시도해요",
  CASH_REQUEST: "금전적인 보상, 현금을 요구해요",
  INAPPROPRIATE_PHOTOS: "부적절한 내용과 사진이 포함됐어요",
  COPYRIGHT_VIOLATION: "저작권 침해 또는 무단 도용이에요",
  OTHER: "기타",
};

export default ReportReasons;
