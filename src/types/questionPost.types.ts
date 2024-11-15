export interface QuestionPost {
  postId: string;
  title: string;
  subject: string;
  likeCount: number;
  commentCount: number;
  JiJeongTags: string[];
  rewardYeopjeon?: number;
}
