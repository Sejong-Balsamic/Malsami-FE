import { ContentType } from "@/types/api/constants/contentTypes";
import { CommonSortType } from "@/types/api/constants/sortTypes";
import { AccountStatus } from "@/types/api/constants/accountStatus";
import { Role } from "@/types/api/constants/role";

export interface MemberCommand {
  memberId?: string;
  memberIdStr?: string;
  studentId?: number;
  studentIdString?: string;
  studentName?: string;
  uuidNickname?: string;
  major?: string;
  academicYear?: string;
  enrollmentStatus?: string;
  faculty?: string;
  sejongPortalId?: string;
  sejongPortalPassword?: string;
  pageNumber?: number; // default: 0
  pageSize?: number; // default: 30
  contentType?: ContentType;
  sortType?: CommonSortType;
  sortField?: string;
  sortDirection?: "asc" | "desc";
  searchTerm?: string;
  accountStatus?: AccountStatus;
  role?: Role;
  lastLoginStart?: string;
  lastLoginEnd?: string;
  isFirstLogin?: boolean;
  isEdited?: boolean;
  isDeleted?: boolean;
}
