import { apiClient } from "@/apis/clients/appClient";

export default async function getDocMyFaculty({ faculty }: { faculty: string }) {
  try {
    const formData = new FormData();
    formData.append("faculty", faculty);
    // formData.append("subject", "");
    // formData.append("documentTypes", "");
    // formData.append("postTier", "");
    // formData.append("sortType", "");
    // formData.append("pageNumber", "");
    // formData.append("pageSize", "");

    const response = await apiClient.post("/api/document/filter", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.documentPostsPage.content; // API 호출 결과만 반환
  } catch (error) {
    console.error("내 전공 관련 자료 목록을 가져오는 중 오류 발생:", error);
    throw error; // 오류 발생 시 오류를 그대로 throw
  }
}
