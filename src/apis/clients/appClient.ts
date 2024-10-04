/* eslint-disable */

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { refreshAccessToken } from "../auth/refresh";

// 사용법: axios 대신 apiClient import해서 사용
const apiClient = axios.create({
  baseURL: "https://api.sejong-malsami.co.kr",
});

// 요청 인터셉터 설정
apiClient.interceptors.request.use(
  requestConfig => {
    // 요청을 구성하는 설정 객체
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      requestConfig.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return requestConfig;
  },
  error => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터 설정
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    // originalRequest 저장
    const originalRequest = error.config as AxiosRequestConfig;

    // 400 오류 발생 시 로그인 페이지로 리디렉션
    if (error.response?.status === 400) {
      alert("로그아웃 되었습니다. 다시 로그인해주세요");
      window.location.href = "/login"; // 전체 페이지를 새로고침하면서 이동하기 때문에, 상태나 데이터가 모두 초기화
    }

    // 401 오류가 발생 시 refreshAccessToken 후 재시도
    else if (error.response?.status === 401) {
      try {
        // refreshToken 사용해 새로운 accessToken 요청
        await refreshAccessToken();
        const newAccessToken = sessionStorage.getItem("accessToken");

        // 원래 요청의 Authorization 헤더를 새로운 accessToken으로 업데이트
        if (newAccessToken) {
          if (!originalRequest.headers) {
            originalRequest.headers = {}; // headers가 undefined인 경우 초기화??
          }
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        }

        return apiClient(originalRequest); // 원래 요청 재전송
      } catch (refreshError) {
        console.error("refreshToken 요청 실패:", refreshError);
        return Promise.reject(refreshError); // 오류를 상위로 전달
      }
    }

    return Promise.reject(error); // 다른 에러는 그대로 전달
  },
);