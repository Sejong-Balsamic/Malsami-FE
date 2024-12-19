import { apiClient } from "../clients/appClient";

// 자료 파일 다운로드 함수
export default async function fileDownload(documentFileId: string, originalFileName: string): Promise<void> {
  try {
    // FormData 생성
    const formData = new FormData();
    formData.append("documentFileId", documentFileId);

    // POST 요청으로 파일 다운로드
    const response = await apiClient.post("/api/document/file/download", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "arraybuffer", // 파일 데이터는 바이너리로 수신
    });

    // Blob 데이터 생성
    const blob = new Blob([response.data], { type: response.headers["content-type"] });

    // Blob URL 생성 및 다운로드 트리거
    const blobURL = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobURL;
    a.download = originalFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Blob URL 해제
    window.URL.revokeObjectURL(blobURL);
  } catch (error) {
    console.error("파일 다운로드 중 오류 발생:", error);
    throw error;
  }
}
