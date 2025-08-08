"use client";

import { useEffect, useState } from "react";
import { commentApi } from "@/apis/commentApi";
import { Comment } from "@/types/api/entities/postgres/comment";
import { getCurrentMemberInfo } from "@/global/memberUtil";
import CommentItem from "./CommentItem";

interface CommentListProps {
  postId: string;
  questionAuthorId?: string;
}

export default function CommentList({ postId, questionAuthorId }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [questionAuthorMemberId, setQuestionAuthorMemberId] = useState<string | undefined>(questionAuthorId);

  // 질문 게시글 작성자 ID 가져오기
  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        // 중앙 관리 함수로 회원 정보 가져오기 (캐싱 활용)
        const memberInfo = await getCurrentMemberInfo();
        if (memberInfo) {
          // 현재 로그인한 사용자의 memberId 저장
          setQuestionAuthorMemberId(memberInfo.memberId);
        }
      } catch (error) {
        console.error("로그인 사용자 정보 가져오기 실패:", error);
      }
    };

    // 질문 작성자 ID가 전달되지 않았을 경우 현재 로그인한 사용자 정보 가져오기
    if (!questionAuthorId) {
      fetchMyInfo();
    }
  }, [questionAuthorId]);

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
          <CommentItem comment={comment} isQuestionAuthor={comment.member?.memberId === questionAuthorMemberId} />
          {index < comments.length - 1 && (
            <div className="mx-5">
              <div className="h-[1px] w-full bg-ui-divider" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

CommentList.defaultProps = {
  questionAuthorId: undefined,
};
