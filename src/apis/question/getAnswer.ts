import { AnswerPost } from "@/types/api/entities/postgres/answerPost";
import { QuestionDto } from "@/types/api/responses/questionDto";
import { apiClient } from "../appClient";

// 특정 질문 글에 작성된 답변 조회
export default async function getAnswer(questionPostId: string): Promise<AnswerPost[] | undefined> {
  try {
    // FormData 객체 생성 및 데이터 추가
    const formData = new FormData();
    formData.append("questionPostId", questionPostId);

    // POST 요청으로 답변 리스트 조회
    const response = await apiClient.post<QuestionDto>("/api/answer/get/all", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Content-Type 설정
      },
    });

    return response.data.answerPosts;
  } catch (error) {
    console.error("답변 조회 중 오류 발생:", error);
    throw error;
  }
}
