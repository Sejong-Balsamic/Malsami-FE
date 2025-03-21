// src/types/api/entities/postEmbedding.ts
import { BaseEntity } from "@/types/api/entities/interface/baseEntity";
import { ContentType } from "@/types/api/constants/contentType";
import { FileStatus } from "@/types/api/constants/fileStatus";

export interface PostEmbedding extends BaseEntity {
  postEmbeddingId?: string;
  postId?: string;
  embedding?: number[];
  contentType?: ContentType;
  fileStatus?: FileStatus;
  message?: string;
}
