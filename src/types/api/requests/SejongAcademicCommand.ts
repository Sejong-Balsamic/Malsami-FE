// src/types/api/requests/sejongAcademicCommand.ts
import { Faculty } from "@/types/api/entities/postgres/faculty";

export interface SejongAcademicCommand {
  sejongCourseFile?: File;
  faculty?: Faculty;
  year?: number;
  semester?: number;
}
