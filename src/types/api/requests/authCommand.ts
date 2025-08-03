// src/types/api/requests/authCommand.ts

import { Member } from "@/types/api/entities/postgres/member";

export interface AuthCommand {
  refreshToken?: string;
  accessToken?: string;
  memberId?: string;
  member?: Member;
  fcmToken?: string;
  // 로그인 관련 필드 추가
  sejongPortalId?: string;
  sejongPortalPassword?: string;
}
