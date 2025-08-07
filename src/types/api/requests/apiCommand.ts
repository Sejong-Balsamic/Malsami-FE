// src/types/api/requests/apiCommand.ts
export interface AuthCommand {
  refreshToken?: string; // refresh 토큰 (쿠키에서 추출 가능)
  accessToken?: string; // access 토큰
  memberId?: string; // UUID
  fcmToken?: string; // FCM 토큰
}
