// src/types/api/responses/reportDto.ts
import { Report } from "@/types/api/entities/postgres/report";

export interface ReportDto {
  report?: Report;
}
