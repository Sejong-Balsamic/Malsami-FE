// src/apis/authApi.ts
import { AuthDto } from "@/types/api/responses/authDto";
import { AuthCommand } from "@/types/api/requests/authCommand";

import { apiClient } from "./appClient";

export const authApi = {
  // 로그인 (웹용)
  signIn: async (command: Partial<AuthCommand>): Promise<AuthDto> => {
    const formData = new FormData();
    Object.entries(command).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    const response = await apiClient.post<AuthDto>("/api/auth/signin", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    // 액세스 토큰을 세션스토리지에 저장
    if (response.data.accessToken) {
      sessionStorage.setItem("accessToken", response.data.accessToken);
    }

    return response.data;
  },

  // 모바일용 로그인
  signInForMobile: async (command: Partial<AuthCommand>): Promise<AuthDto> => {
    const formData = new FormData();
    Object.entries(command).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    const response = await apiClient.post<AuthDto>("/api/auth/mobile/signin", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  refresh: async (): Promise<AuthDto> => {
    const response = await apiClient.post<AuthDto>("/api/auth/refresh", null, {
      withCredentials: true,
    });
    const newAccessToken = response.data.accessToken;
    if (newAccessToken) {
      sessionStorage.setItem("accessToken", newAccessToken);
    }
    return response.data;
  },

  // 모바일용 토큰 갱신
  refreshForMobile: async (command: Partial<AuthCommand>): Promise<AuthDto> => {
    const formData = new FormData();
    Object.entries(command).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    const response = await apiClient.post<AuthDto>("/api/auth/mobile/refresh", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  logout: async (command: Partial<AuthCommand>): Promise<void> => {
    const formData = new FormData();
    Object.entries(command).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    await apiClient.post("/api/auth/logout", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    sessionStorage.removeItem("accessToken");
  },

  saveFcmToken: async (command: Partial<AuthCommand>): Promise<AuthDto> => {
    const formData = new FormData();
    Object.entries(command).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    const response = await apiClient.post<AuthDto>("/api/auth/fcm/token", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};

export default authApi;
