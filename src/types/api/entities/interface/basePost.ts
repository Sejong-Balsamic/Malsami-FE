// src/types/api/entities/interface/basePost.ts
import { BaseEntity } from "@/types/api/entities/interface/baseEntity";

export interface BasePost extends BaseEntity {
  likeCount?: number;
  viewCount?: number;
  commentCount?: number;
  isPrivate?: boolean;
}
