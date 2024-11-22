export interface Answer {
  answerPostId: string;
  member: {
    uuidNickname: string;
    major: string;
  };
  content: string;
  createdDate: string;
  commentCount: number;
}
