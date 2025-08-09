"use client";

import { useEffect, useState } from "react";
import { commentApi } from "@/apis/commentApi";
import { Comment } from "@/types/api/entities/postgres/comment";
import { getCurrentMemberInfo } from "@/global/memberUtil";
import CommentItem from "./CommentItem";

interface CommentListProps {
  postId: string;
  questionAuthorId?: string;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CommentList({ postId, questionAuthorId, setIsLoading: setParentLoading }: CommentListProps) {
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

  // 댓글 데이터 가져오는 함수
  const fetchComments = async () => {
    try {
      console.log("댓글 데이터 요청 시작");
      setIsLoading(true);
      
      // commentApi를 통해 댓글 목록 가져오기
      const commentsData = await commentApi.getAllCommentsByPostId({
        postId,
        contentType: "QUESTION",
        pageNumber: 0,
        pageSize: 100, // 일단 많이 가져오기
      });
      
      const list: Comment[] = commentsData.commentsPage?.content || [];
      console.log("댓글 데이터 받음:", list.length, "개");
      setComments(list);
    } catch (error) {
      console.error("댓글 목록 가져오기 실패:", error);
    } finally {
      setIsLoading(false);
      if (setParentLoading) {
        console.log("부모 컴포넌트 로딩 상태 false로 설정");
        setParentLoading(false);
      }
    }
  };

  // 초기 로딩 및 postId 변경 시 데이터 로드
  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  // 부모 컴포넌트의 로딩 상태가 true일 때 다시 로드
  useEffect(() => {
    // 부모의 로딩 상태를 직접 감지할 수 없으므로, 
    // CommentPage에서 refreshComments를 호출하면
    // 새로운 함수 참조가 전달되어 이 효과가 트리거됩니다
    if (setParentLoading) {
      fetchComments();
    }
  }, [setParentLoading]);

  // 로딩 상태 표시
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-[14px] text-[#757575]">댓글을 불러오는 중...</div>
      </div>
    );
  }

  // 댓글 목록이 비어 있는 경우
  if (comments.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-[14px] text-[#757575]">아직 댓글이 없습니다.</div>
      </div>
    );
  }
  
  // 디버깅용 로그
  console.log("댓글 목록 렌더링:", comments.length, "개");
  
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
  setIsLoading: undefined,
};