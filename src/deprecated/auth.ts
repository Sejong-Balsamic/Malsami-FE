// import axios from "axios";
//
// export const login = async (id: string, password: string) => {
//   if (!id || !password) {
//     throw new Error("아이디와 비밀번호는 필수 입력 사항입니다.");
//   }
//
//   // form-data 객체 생성
//   const formData = new FormData();
//   formData.append("sejongPortalId", id);
//   formData.append("sejongPortalPassword", password);
//
//   try {
//     // 로그인 API 호출
//     const response = await axios.post("https://api.sejong-malsami.co.kr/api/member/signin", formData, {
//       withCredentials: true, // http-only로 Cookie에 refreshToken 저장
//     });
//
//     // 성공 처리
//     sessionStorage.setItem("accessToken", response.data.accessToken);
//     console.log("로그인 성공:", response.data);
//
//     return response.data; // 사용자 정보 반환
//   } catch (error) {
//     console.error("로그인 실패:", error);
//     throw error;
//   }
// };
//
// export default login;
