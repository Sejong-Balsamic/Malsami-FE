// import axios, { AxiosError } from "axios";
// import authApi from "@/apis/authApi";
//
// // refreshToken으로 새로운 accessToken 요청하는 함수
// export const refreshAccessToken = async (): Promise<string> => {
//   try {
//
//     let response = authApi.refresh();
//     console.log(response);
//     const newAccessToken = response.accessToken;
//     sessionStorage.setItem("accessToken", newAccessToken); // 새로운 accessToken 저장
//     return newAccessToken;
//   } catch (error) {
//     const axiosError = error as AxiosError;
//     // 400 오류 발생 시 로그인 페이지로 리디렉션
//     if (axiosError.response?.status === 400) {
//       alert("로그아웃 되었습니다. 다시 로그인해주세요");
//       window.location.href = "/login"; // 전체 페이지를 새로고침하면서 이동하기 때문에, 상태나 데이터가 모두 초기화
//     }
//     console.error("Error refreshing access token:", axiosError.response?.data || axiosError.message); // 항상 오류 메시지를 출력
//     if (axiosError.response) {
//       // 응답이 있는 경우에만 상세한 응답 데이터를 출력
//       console.error("Response data:", axiosError.response.data);
//     }
//     return Promise.reject(axiosError);
//   }
// };
//
// export default refreshAccessToken;
