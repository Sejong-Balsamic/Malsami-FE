// src/types/api/entities/postgres/departmentFile.ts
import { BaseEntity } from "@/types/api/entities/interface/baseEntity";
import { FileStatus } from "@/types/api/constants/fileStatus";

export interface DepartmentFile extends BaseEntity {
  departmentFileId?: string;
  fileName?: string;
  fileHash?: string;
  fileStatus?: FileStatus;
  errorMessage?: string;
  durationSeconds?: number;
  processedAt?: string;
}
