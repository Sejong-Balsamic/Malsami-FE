import { apiClient } from "../clients/appClient";

interface LikeResponse {
  documentPost: {
    likeCount: number;
    dislikeCount: number;
  };
  documentBoardLike: {
    createdDate: string;
    updatedDate: string;
    documentBoardLikeId: string;
    memberId: string;
    documentBoardId: string;
    contentType: string;
    reactionType: string;
  };
}

// 특정 자료글 또는 자료 요청글에 좋아요/싫어요를 누르는 함수
export default async function postLikeDocument(
  documentPostId: string,
  contentType: "DOCUMENT" | "DOCUMENT_REQUEST",
  reactionType: "LIKE" | "DISLIKE",
): Promise<LikeResponse> {
  try {
    // FormData 객체 생성 및 데이터 추가
    const formData = new FormData();
    formData.append("documentPostId", documentPostId);
    formData.append("contentType", contentType);
    formData.append("reactionType", reactionType);

    // 좋아요/싫어요를 위한 POST 요청
    const response = await apiClient.post<LikeResponse>("/api/likes/document/board", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Content-Type 설정
      },
    });

    // 응답 데이터 반환
    return response.data;
  } catch (error) {
    // 오류 발생 시 에러 출력
    console.error("좋아요/싫어요 처리 중 오류 발생:", error);
    throw error;
  }
}
