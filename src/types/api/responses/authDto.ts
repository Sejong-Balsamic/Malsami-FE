// src/types/api/responses/authDto.ts

import { FcmToken } from "@/types/api/entities/mongo/fcmToken";

export interface AuthDto {
  accessToken?: string;
  refreshToken?: string;
  isValidToken?: boolean;
  studentName?: string;
  memberId?: string; // UUID
  fcmToken?: FcmToken;
  isFirstLogin?: boolean;
  isAdmin?: boolean;
  major?: string;
  studentIdString?: string;
  academicYear?: string;
  enrollmentStatus?: string;
}
