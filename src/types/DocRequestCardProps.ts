export interface DocRequestCardProps {
  documentRequestPostId: string;
  subject: string; // 상단 카테고리
  title: string; // 제목
  content: string; // 내용
  documentTypes: string[]; // 태그
  createdDate: string; // 작성 시간
  thumbnailUrl?: string; // 썸네일 이미지 경로
  viewCount: number; // 조회수
  likeCount: number; // 좋아요 수
}
