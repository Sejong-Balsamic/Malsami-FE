// src/types/api/entities/mediaFile.ts
import { BaseEntity } from "./baseEntity";
import { ContentType } from "../constants/contentTypes";

export interface MediaFile extends BaseEntity {
  mediaFileId?: string;
  contentId?: string;
  contentType?: ContentType;
  originalFilename?: string;
  storedFilename?: string;
  fileExtension?: string;
  fileSize?: number;
  fileUrl?: string;
  thumbnailUrl?: string;
}
