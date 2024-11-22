import { apiClient } from "@/apis/clients/appClient";

export default async function getDocWeeklyPopulars() {
  try {
    const response = await apiClient.post(
      "/api/document/popular/weekly",
      {},
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data.documentPostsPage.content; // API 호출 결과만 반환
  } catch (error) {
    console.error("인기글 목록을 가져오는 중 오류 발생:", error);
    throw error; // 오류 발생 시 오류를 그대로 throw
  }
}