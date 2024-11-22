import { apiClient } from "../clients/appClient";

interface LikeResponse {
  questionPost: {
    questionPostId: string;
    likeCount: number;
  };
}

// 특정 질문 글 또는 답변에 좋아요를 누르는 함수
export default async function likePost(postId: string, contentType: string): Promise<LikeResponse> {
  try {
    // FormData 객체 생성 및 데이터 추가
    const formData = new FormData();
    formData.append("postId", postId);
    formData.append("contentType", contentType);

    // 좋아요를 위한 POST 요청
    const response = await apiClient.post<LikeResponse>("/api/likes/question/board", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Content-Type 설정
      },
    });

    // 응답 데이터 반환
    return response.data;
  } catch (error) {
    // 오류 발생 시 에러 출력
    console.error("좋아요 증가 중 오류 발생:", error);
    throw error;
  }
}
