// src/types/api/entities/fcmToken.ts
export interface FcmToken {
  fcmTokenId?: string;
  memberId: string; // UUID
  fcmToken: string;
  createdDate?: string; // ISO 형식
  updatedDate?: string;
  isEdited?: boolean;
  isDeleted?: boolean;
}
