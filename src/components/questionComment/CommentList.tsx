"use client";

import { useEffect, useState } from "react";
import getComments from "@/apis/question/getComments";
import { commentApi } from "@/apis/commentApi";
import { Comment } from "@/types/api/entities/postgres/comment";
import CommentItem from "./CommentItem";

interface CommentListProps {
  postId: string;
}

export default function CommentList({ postId }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        // commentApi를 통해 댓글 목록 가져오기
        const commentsData = await commentApi.getAllCommentsByPostId({
          postId,
          contentType: "QUESTION",
          pageNumber: 0,
          pageSize: 100, // 일단 많이 가져오기
        });
        const list: Comment[] = commentsData.commentsPage?.content || [];
        setComments(list);
      } catch (error) {
        console.error("댓글 목록 가져오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-[14px] text-[#757575]">댓글을 불러오는 중...</div>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-[14px] text-[#757575]">아직 댓글이 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {comments.map((comment, index) => (
        <div key={comment.commentId || index}>
          <CommentItem comment={comment} />
          {index < comments.length - 1 && (
            <div className="mx-5">
              <div className="h-[1px] w-[353px] rounded-[2px] bg-ui-divider-thick" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
