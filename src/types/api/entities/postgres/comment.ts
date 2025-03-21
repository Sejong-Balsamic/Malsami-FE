// src/types/api/entities/postgres/comment.ts
import { BaseEntity } from "@/types/api/entities/interface/baseEntity";
import { ContentType } from "@/types/api/constants/contentType";
import { Member } from "@/types/api/entities/postgres/member";

export interface Comment extends BaseEntity {
  commentId: string;
  member: Member;
  postId: string;
  content: string;
  likeCount: number;
  contentType: ContentType;
  isPrivate: boolean;
  isLiked: boolean;
}
