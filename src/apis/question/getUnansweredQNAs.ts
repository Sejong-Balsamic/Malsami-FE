import { apiClient } from "../clients/appClient";

interface GetUnansweredQNAsProps {
  faculty: string;
}

export default async function getUnansweredQNAs({ faculty }: GetUnansweredQNAsProps) {
  const formData = new FormData();
  formData.append("pageNumber", "0"); // 기본값 0
  formData.append("pageSize", "30"); // 기본값 30
  formData.append("faculty", faculty === "전체" ? "" : faculty); // faculty값 추가

  try {
    const response = await apiClient.post("/api/questions/get/unanswered", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.questionPostsPage.content; // API 호출 결과만 반환
  } catch (error) {
    console.error("질문 목록을 가져오는 중 오류 발생:", error);
    throw error; // 오류 발생 시 오류를 그대로 throw
  }
}
