// src/types/api/requests/commentCommand.ts

import { ContentType } from "@/types/api/constants/contentType";
import { LikeType } from "@/types/api/constants/likeType";

export interface CommentCommand {
  memberId?: string;
  postId?: string;
  content?: string;
  contentType?: ContentType;
  likeType?: LikeType;
  isPrivate?: boolean;
  pageNumber?: number;
  pageSize?: number;
}
