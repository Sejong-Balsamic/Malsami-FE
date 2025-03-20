//  src/types/api/entities/postgres/documentFile.ts
import { BaseEntity } from "@/types/api/entities/interface/baseEntity";
import { DocumentPost } from "@/types/api/entities/postgres/documentPost";
import { Member } from "@/types/api/entities/postgres/member";

export interface DocumentFile extends BaseEntity {
  documentFileId?: string;
  documentPost?: DocumentPost;
  uploader?: Member;
  thumbnailUrl?: string;
  filePath?: string;
  originalFileName?: string;
  uploadedFileName?: string;
  fileSize?: number;
  mimeType?: MimeType;
  totalDownloadCount?: number;
  dailyDownloadCount?: number;
  weeklyDownloadCount?: number;
  password?: string;
  isInitialPasswordSet?: boolean;
  isDownloaded?: boolean;
}
