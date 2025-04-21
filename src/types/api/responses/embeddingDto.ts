// src/types/api/responses/embeddingDto.ts
import { Page } from "@/types/api/entities/interface/page";
import { PostEmbedding } from "@/types/api/entities/postgres/postEmbedding";

export interface EmbeddingDto {
  postEmbeddingsPage?: Page<PostEmbedding>;
  generalPostsPage?: Page<any>;
}
