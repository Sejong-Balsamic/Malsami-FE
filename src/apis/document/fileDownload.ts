import { apiClient } from "../clients/appClient";

// 자료 파일 다운로드 함수
export default async function fileDownload(documentFileId: string, fileName: string): Promise<void> {
  try {
    // `FormData` 객체 생성 및 `documentFileId` 추가
    const formData = new FormData();
    formData.append("documentFileId", documentFileId);

    // 자료 파일 다운로드를 위한 POST 요청
    const response = await apiClient.post<string>("/api/document/file/download", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("File Download Response (Blob URL):", response.data); // 서버에서 반환된 Blob URL 확인

    // 다운로드를 위한 동적 `<a>` 태그 생성
    const a = document.createElement("a");
    a.href = response.data; // 서버에서 반환된 Blob URL을 href로 설정
    a.download = fileName; // 파일 이름 설정
    document.body.appendChild(a); // `<a>` 태그를 DOM에 추가
    a.click(); // 클릭 이벤트로 다운로드 트리거
    document.body.removeChild(a); // `<a>` 태그 제거
  } catch (error) {
    // 오류 발생 시 에러 출력
    console.error("파일 다운로드 중 오류 발생:", error);
    throw error;
  }
}
