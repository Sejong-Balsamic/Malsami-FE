// src/types/api/entities/postgres/testMember.ts
import { BaseEntity } from "@/types/api/entities/interface/baseEntity";
import { Member } from "@/types/api/entities/postgres/member";

export interface TestMember extends BaseEntity {
  testMemberId?: string;
  testStudentId?: number;
  password?: string;
  testStudentName?: string;
  testMajor?: string;
  testAcademicYear?: string;
  testEnrollmentStatus?: string;
  createdBy?: Member;
  isActive?: boolean;
}
