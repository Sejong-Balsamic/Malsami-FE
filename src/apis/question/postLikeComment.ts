import { apiClient } from "../clients/appClient";
import { Comment } from "@/types/comment";

interface CommentLikeResponse {
  commentDto: Comment;
}

// 특정 댓글에 좋아요를 누르는 함수
export default async function postLikeComment(postId: string): Promise<CommentLikeResponse> {
  try {
    // FormData 객체 생성 및 데이터 추가
    const formData = new FormData();
    formData.append("postId", postId);

    // 좋아요를 위한 POST 요청
    const response = await apiClient.post<CommentLikeResponse>("/api/likes/comment", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Content-Type 설정
      },
    });

    // 응답 데이터 반환
    return response.data;
  } catch (error) {
    // 오류 발생 시 처리
    console.error("댓글 좋아요 증가 중 오류 발생:", error);
    throw error;
  }
}
