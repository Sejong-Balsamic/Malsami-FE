import { apiClient } from "../clients/appClient";

// 자료 파일 다운로드 함수
export default async function fileDownload(documentFileId: string): Promise<Blob> {
  try {
    // `FormData` 객체 생성 및 `documentFileId` 추가
    const formData = new FormData();
    formData.append("documentFileId", documentFileId);

    // 자료 파일 다운로드를 위한 POST 요청
    const response = await apiClient.post<Blob>("/api/document/file/download", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob", // 응답 타입을 Blob으로 설정 (파일 다운로드)
    });

    console.log("File Download Response:", response); // 응답 데이터 확인
    return response.data;
  } catch (error) {
    // 오류 발생 시 에러 출력
    console.error("파일 다운로드 중 오류 발생:", error);
    throw error;
  }
}
