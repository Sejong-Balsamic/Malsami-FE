/* eslint-disable */

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { refreshAccessToken } from "../auth/refresh";
import { store } from "@/store";
import { showModal } from "@/store/modalSlice";

// 사용법: axios 대신 apiClient import해서 사용
export const apiClient = axios.create({
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

// 한 페이지에서 apiClient요청을 n번이상 부르면, 로그인 다이렉트 alret창이 n번 나온다. 이를 방지하고자
let isRedirecting = false;

// 응답 인터셉터 설정
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    // originalRequest 저장
    const originalRequest = error.config as AxiosRequestConfig;

    // 400,403 오류 발생 시 로그인 페이지로 리다이렉션. 리프레시토큰 없으면 403.
    if (error.response?.status === 403 && !isRedirecting) {
      isRedirecting = true; // 리다이렉트를 설정했음을 표시
      // alert("해당 페이지는 로그인을 해야 열람할 수 있습니다.");
      store.dispatch(showModal("해당 페이지는 로그인을 해야 열람할 수 있습니다."));
      console.log("Redux State After Dispatch:", store.getState().modal);
      // window.location.href = "/login"; // 전체 페이지를 새로고침하면서 이동하기 때문에, 상태나 데이터가 모두 초기화
    }

    // 401 오류가 발생 시 refreshAccessToken 후 재시도. 엑세스 토큰 만료 시 401 에러
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
        // refreshAccessToken 실패 시 403으로 처리
        if (!isRedirecting) {
          isRedirecting = true;
          // alert("해당 페이지는 로그인을 해야 열람할 수 있습니다.");
          store.dispatch(showModal("해당 페이지는 로그인을 해야 열람할 수 있습니다."));
          console.log("Redux State After Dispatch:", store.getState().modal);
          // window.location.href = "/login";
        }
        return Promise.reject(refreshError); // 오류를 상위로 전달
      }
    }

    // 500 오류 처리
    else {
      const errorData = error.response?.data;
      const errorMessage =
        errorData && typeof errorData === "object" && "errorMessage" in errorData
          ? (errorData as { errorMessage: string }).errorMessage
          : "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";

      console.error("서버 오류:", errorMessage);
      alert(errorMessage);
    }

    return Promise.reject(error); // 다른 에러는 그대로 전달
  },
);
