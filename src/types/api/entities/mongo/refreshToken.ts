// src/types/api/entities/mongo/refreshToken.ts
export interface RefreshToken {
  refreshTokenId?: string;
  token?: string;
  memberId?: string;
  expiryDate?: string; // LocalDateTime
}
