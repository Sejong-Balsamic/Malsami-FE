import { QuestionDto } from "@/types/api/responses/questionDto";
import { apiClient } from "../appClient";

export default async function chaetaekAnswer(postId: string): Promise<QuestionDto> {
  try {
    // 요청 데이터를 FormData로 생성
    const formData = new FormData();
    formData.append("postId", postId);

    // 채택 요청
    const response = await apiClient.post<QuestionDto>("/api/answer/chaetaek", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Content-Type 설정
      },
    });

    // 응답 데이터 반환
    return response.data;
  } catch (error) {
    // 오류 발생 시 처리
    console.error("답변 채택 중 오류 발생:", error);
    throw error;
  }
}
