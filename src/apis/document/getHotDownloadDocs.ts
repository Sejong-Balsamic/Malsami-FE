import { apiClient } from "@/apis/clients/appClient";

interface FilteringDocListParams {
  pageNumber?: number; // 페이지 번호 (default = 0)
  pageSize?: number; // 한 페이지 조회 글 개수 (default = 30)
}

export default async function getHotDownloadDocs(params: FilteringDocListParams) {
  try {
    const formData = new FormData();

    formData.append("pageNumber", (params.pageNumber ?? 0).toString()); // 페이지 번호
    formData.append("pageSize", (params.pageSize ?? 15).toString()); // 페이지 크기

    const response = await apiClient.post("/api/document/hot-download", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.documentPostsPage; // API 호출 결과만 반환
  } catch (error) {
    console.error("내 전공 관련 자료 목록을 가져오는 중 오류 발생:", error);
    throw error; // 오류 발생 시 오류를 그대로 throw
  }
}
