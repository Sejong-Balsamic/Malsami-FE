// src/types/api/requests/fileUploadCommand.ts
import { Member } from "@/types/api/entities/postgres/member";

export interface FileUploadCommand {
  member?: Member;
  file?: File;
  filePath?: string;
}
