// src/types/api/responses/documentDto.ts
import { DocumentPost } from "@/types/api/entities/postgres/documentPost";
import { Page } from "@/types/api/entities/interface/page";
import { DocumentRequestPost } from "@/types/api/entities/postgres/documentRequestPost";
import { DocumentBoardLike } from "@/types/api/entities/mongo/documentBoardLike";
import { DocumentFile } from "@/types/api/entities/postgres/documentFile";

export interface DocumentDto {
  documentPost?: DocumentPost;
  documentPostsPage?: Page<DocumentPost>;
  documentRequestPost?: DocumentRequestPost;
  documentRequestPostsPage?: Page<DocumentRequestPost>;
  documentBoardLike?: DocumentBoardLike;
  customTags?: string[];
  documentFiles?: DocumentFile[];
  fileBytes?: Uint8Array;
  fileName?: string;
  mimeType?: string;
}
