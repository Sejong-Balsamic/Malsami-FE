// src/apis/authApi.ts
import { AuthDto } from "@/types/api/responses/authDto";
import { AuthCommand } from "@/types/api/requests/authCommand";
import { postApiRequest } from "./apiUtils";

export const authApi = {
  // 로그인 (웹용)
  signIn: async (command: Partial<AuthCommand>): Promise<AuthDto> =>
    postApiRequest<AuthCommand, AuthDto>("/api/auth/signin", command),

  // 모바일용 로그인
  signInForMobile: async (command: Partial<AuthCommand>): Promise<AuthDto> =>
    postApiRequest<AuthCommand, AuthDto>("/api/auth/mobile/signin", command),

  // 토큰 갱신
  refresh: async (): Promise<AuthDto> => postApiRequest<AuthCommand, AuthDto>("/api/auth/refresh", {}),

  // 모바일용 토큰 갱신
  refreshForMobile: async (command: Partial<AuthCommand>): Promise<AuthDto> =>
    postApiRequest<AuthCommand, AuthDto>("/api/auth/mobile/refresh", command),

  // 로그아웃
  logout: async (command: Partial<AuthCommand>): Promise<void> =>
    postApiRequest<AuthCommand, void>("/api/auth/logout", command),

  // FCM 토큰 저장
  saveFcmToken: async (command: Partial<AuthCommand>): Promise<AuthDto> =>
    postApiRequest<AuthCommand, AuthDto>("/api/auth/fcm/token", command),
};

export default authApi;
