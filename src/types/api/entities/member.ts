// src/types/api/entities/member.ts

import { Role } from "@/types/api/constants/role";
import { AccountStatus } from "@/types/api/constants/accountStatus";

export interface Member {
  memberId?: string;
  studentId?: number;
  studentName?: string;
  uuidNickname?: string;
  major?: string;
  academicYear?: string;
  enrollmentStatus?: string;
  profileUrl?: string;
  faculties?: string[];
  isNotificationEnabled?: boolean;
  roles?: Role[];
  accountStatus?: AccountStatus;
  lastLoginTime?: string;
  isFirstLogin?: boolean;
}
