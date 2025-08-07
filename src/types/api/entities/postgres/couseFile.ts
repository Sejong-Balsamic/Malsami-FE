// src/types/api/entities/courseFile.ts
import { BaseEntity } from "@/types/api/entities/interface/baseEntity";
import { FileStatus } from "@/types/api/constants/fileStatus";

export interface CourseFile extends BaseEntity {
  courseFileId?: string;
  fileName?: string;
  year?: number;
  semester?: number;
  processedAt?: string;
  fileStatus?: FileStatus;
  filePath?: string;
  errorMessage?: string;
  durationSeconds?: number;
}
