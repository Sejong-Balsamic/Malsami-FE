// src/types/api/responses/sejongAcademicDto.ts
import { Faculty } from "@/types/api/entities/postgres/faculty";

export interface SejongAcademicDto {
  faculties?: Faculty[];
  subjects?: string[];
}
