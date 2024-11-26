export interface Answer {
  createdDate: string;
  answerPostId: string;
  isLiked: Boolean;
  member: {
    uuidNickname: string;
    major: string;
  };
  content: string;
  likeCount: number;
  commentCount: number;
  isChaetaek: boolean;
  isPrivate: true;
}
