//  src/types/api/entities/postgres/course.ts
import { BaseEntity } from "@/types/api/entities/interface/baseEntity";

export interface Course extends BaseEntity {
  courseId?: string;
  subject?: string;
  faculty?: string;
  department?: string;
  year?: number;
  semester?: number;
}
