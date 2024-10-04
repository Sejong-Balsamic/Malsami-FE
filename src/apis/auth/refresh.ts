import axios, { AxiosError } from "axios";

// refreshToken으로 새로운 accessToken 요청하는 함수
export const refreshAccessToken = async (): Promise<string> => {
  try {
    const response = await axios.post(
      "https://api.sejong-malsami.co.kr/api/auth/refresh",
      {},
      {
        withCredentials: true, // 쿠키나 인증 헤더를 포함시킬 수 있도록 설정
      },
    );

    const newAccessToken = response.data.accessToken;
    sessionStorage.setItem("accessToken", newAccessToken); // 새로운 accessToken 저장
    return newAccessToken;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Error refreshing access token:", axiosError.response?.data || axiosError.message);
    if (axiosError.response) {
      console.error("Response data:", axiosError.response.data);
    }
    return Promise.reject(axiosError);
  }
};
