import { apiClient } from "@/apis/clients/appClient";
import { QuestionData } from "@/types/question";

export default async function getAllQuestions(): Promise<QuestionData> {
  try {
    // FormData 객체 생성
    const formData = new FormData();
    formData.append("pageSize", "5"); // 한 페이지에 조회할 글 개수 5개

    // POST 요청으로 회원 정보 조회
    const response = await apiClient.post<QuestionData>("/api/landing/question", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Content-Type 설정
      },
    });

    return response.data; // 서버로부터 반환된 데이터
  } catch (error) {
    console.error("전체 질문 가져오기 실패:", error);
    throw error;
  }
}
