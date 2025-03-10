// import { apiClient } from "@/apis/appClient";
// import { MemberDto } from "@/types/api/responses/memberDto";
//
// export default async function getMyPage(): Promise<MemberDto> {
//   try {
//     // FormData 객체 생성
//     const formData = new FormData();
//
//     // POST 요청으로 회원 정보 조회
//     const response = await apiClient.post<MemberDto>("/api/member/my-page", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data", // Content-Type 설정
//         Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`, // JWT 토큰 설정
//       },
//     });
//
//     return response.data; // 서버로부터 반환된 데이터
//   } catch (error) {
//     console.error("회원 정보 가져오기 실패:", error);
//     throw error;
//   }
// }
