// import { apiClient } from "@/apis/appClient";
//
// export default async function getDocRequest() {
//   try {
//     const response = await apiClient.post(
//       "/api/document-request/filter",
//       {},
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       },
//     );
//     return response.data.documentRequestPostsPage.content; // API 호출 결과만 반환
//   } catch (error) {
//     console.error("자료요쳥 목록을 가져오는 중 오류 발생:", error);
//     throw error; // 오류 발생 시 오류를 그대로 throw
//   }
// }
