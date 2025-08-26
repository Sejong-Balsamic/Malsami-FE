/* eslint-disable */
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { store } from "@/global/store";
import { showModal } from "@/global/store/modalSlice";
import { AuthDto } from "@/types/api/responses/authDto";

export const apiClient = axios.create({
  baseURL: "https://api.sejong-malsami.co.kr",
  withCredentials: true,
});

// Function to refresh the access token
const refreshAccessToken = async (): Promise<AuthDto> => {
  const response = await apiClient.post<AuthDto>("/api/auth/refresh", null, {
    withCredentials: true,
  });
  const newAccessToken = response.data.accessToken;
  if (newAccessToken) {
    sessionStorage.setItem("accessToken", newAccessToken);
  }
  return response.data;
};

// Request interceptor: Add access token to headers
apiClient.interceptors.request.use(
  (requestConfig: InternalAxiosRequestConfig) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      requestConfig.headers = requestConfig.headers || {};
      requestConfig.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return requestConfig;
  },
  (error: AxiosError) => Promise.reject(error),
);

// Prevent multiple modal popups during redirects
let isRedirecting = false;

// Response interceptor: Handle 401 and 403 errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig; // 타입 수정

    if (error.response?.status === 403 && !isRedirecting) {
      const errorData = error.response.data as { errorCode?: string } | undefined;
      if (errorData?.errorCode !== "SEJONG_AUTH_DATA_FETCH_ERROR") {
        isRedirecting = true;
        store.dispatch(showModal("로그인 후 이용가능합니다."));

        // isRedirecting을 일정 시간 후 초기화
        setTimeout(() => {
          isRedirecting = false;
        }, 1000);
      }
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      try {
        const authDto = await refreshAccessToken();
        const newAccessToken = authDto.accessToken;

        if (newAccessToken && originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error("리프레시 토큰 요청 실패:", refreshError);
        if (!isRedirecting) {
          isRedirecting = true;
          store.dispatch(showModal("로그인 후 이용가능합니다."));

          // isRedirecting을 일정 시간 후 초기화
          setTimeout(() => {
            isRedirecting = false;
          }, 1000);
        }
        return Promise.reject(refreshError);
      }
    }

    const errorData = error.response?.data;

    // MISSING_REFRESH_TOKEN 에러 처리
    if (errorData && typeof errorData === "object" && "errorCode" in errorData) {
      const errorCode = (errorData as { errorCode: string }).errorCode;

      if (errorCode === "MISSING_REFRESH_TOKEN" && !isRedirecting) {
        isRedirecting = true;
        // 로그인 모달 표시
        store.dispatch(showModal("로그인 후 이용가능합니다."));

        // 리다이렉트 제거 - 모달만 표시

        // isRedirecting을 일정 시간 후 초기화
        setTimeout(() => {
          isRedirecting = false;
        }, 1000);

        return Promise.reject(error);
      }
    }

    const errorMessage =
      errorData && typeof errorData === "object" && "errorMessage" in errorData
        ? (errorData as { errorMessage: string }).errorMessage
        : "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";
    console.error("apiClient 오류:", errorMessage);
    return Promise.reject(error);
  },
);
