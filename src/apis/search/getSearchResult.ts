import { apiClient } from "@/apis/appClient";

export default async function getSearchResult({ params }: { params: { query: string; subject: string } }) {
  try {
    // FormData 객체 생성
    const formData = new FormData();
    formData.append("query", params.query);
    formData.append("subject", params.subject);

    // POST 요청으로 회원 정보 조회
    const response = await apiClient.post("/api/query", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Content-Type 설정
      },
    });

    return response.data;
  } catch (error) {
    console.error("회원 정보 가져오기 실패:", error);
    throw error;
  }
}
