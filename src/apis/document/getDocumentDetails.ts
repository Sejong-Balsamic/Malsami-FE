import { DocumentData } from "@/types/DocumentData";
import { apiClient } from "../clients/appClient";

// 특정 문서 글을 조회하는 함수
export default async function getDocumentDetails(documentPostId: string): Promise<DocumentData> {
  try {
    // `FormData` 객체를 생성해 `postId` 추가
    const formData = new FormData();
    formData.append("documentPostId", documentPostId);

    // 특정 문서 글을 조회하기 위한 POST 요청을 보냄 (multipart/form-data 사용)
    const response = await apiClient.post<DocumentData>("/api/document/get", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Response Data:", response); // Add this line to inspect the API response
    // 응답 데이터를 반환
    return response.data;
  } catch (error) {
    // 오류 발생 시 콘솔에 에러를 출력
    console.error("문서 조회 중 오류 발생:", error);
    throw error;
  }
}
