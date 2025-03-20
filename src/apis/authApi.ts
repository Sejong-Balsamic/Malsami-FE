// src/apis/authApi.ts
import { AuthDto } from "@/types/api/responses/authDto";
import { AuthCommand } from "@/types/api/requests/apiCommand";
import { apiClient } from "./appClient";

export const authApi = {
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

  logout: async (command: Partial<AuthCommand>): Promise<void> => {
    const formData = new FormData();
    Object.entries(command).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    await apiClient.post("/api/auth/logout", formData, {
      headers: { "Content-Type": "multipart/form-data" },
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
