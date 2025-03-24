// import { apiClient } from "@/apis/appClient";
// import { DocumentDto } from "@/types/api/responses/documentDto";
//
// export default async function getAllDocuments(): Promise<DocumentDto> {
//   try {
//     // FormData 객체 생성
//     const formData = new FormData();
//     formData.append("pageSize", "5"); // 한 페이지에 조회할 글 개수 5개
//
//     // POST 요청으로 회원 정보 조회
//     const response = await apiClient.post<DocumentDto>("/api/landing/document", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data", // Content-Type 설정
//       },
//     });
//
//     return response.data; // 서버로부터 반환된 데이터
//   } catch (error) {
//     console.error("전체 자료 가져오기 실패:", error);
//     throw error;
//   }
// }
