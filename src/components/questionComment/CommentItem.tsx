"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Comment } from "@/types/api/entities/postgres/comment";
import { isSameMemberById } from "@/global/memberUtil";
import { commentApi } from "@/apis/commentApi";

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(comment.likeCount ?? 0);
  const [dislikeCount, setDislikeCount] = useState<number>(0);

  const isAuthor: boolean = useMemo(
    () => isSameMemberById(comment.member?.memberId as string),
    [comment.member?.memberId],
  );

  const handleLike = async () => {
    if (isLiked) return; // 이미 좋아요를 누른 상태라면 반응하지 않음
    
    try {
      // 클라이언트에서 즉시 반영
      if (isDisliked) {
        setDislikeCount(prev => Math.max(0, prev - 1));
        setIsDisliked(false);
      }
      setLikeCount(prev => prev + 1);
      setIsLiked(true);
      
      // API 호출
      await commentApi.commentLike({
        postId: comment.commentId
      });
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
      // 실패시 상태 되돌리기
      setLikeCount(prev => Math.max(0, prev - 1));
      setIsLiked(false);
    }
  };

  const handleDislike = async () => {
    if (isDisliked) {
      // 이미 싫어요를 누른 상태라면 취소
      setDislikeCount(prev => Math.max(0, prev - 1));
      setIsDisliked(false);
    } else {
      // 좋아요가 눌려있었다면 취소
      if (isLiked) {
        setLikeCount(prev => Math.max(0, prev - 1));
        setIsLiked(false);
      }
      // 싫어요 추가
      setDislikeCount(prev => prev + 1);
      setIsDisliked(true);
      
      // 싫어요 API가 없을 가능성이 있으므로 클라이언트에서만 처리
    }
  };

  const handleMoreOptions = () => {
    // TODO: 더보기 옵션 모달
  };

  const nickname = comment.isPrivate ? "익명" : comment.member?.uuidNickname ?? "익명";

  return (
    <div className="px-5 py-4">
      {/* 헤더 */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          {isAuthor && (
            <div className="inline-flex items-center justify-center gap-[10px] rounded-[4px] bg-question-main px-[6px] py-[4px]">
              <span className="truncate text-SUIT_12 font-bold leading-[100%] text-white">작성자</span>
            </div>
          )}

          {/* 사용자 @uuid */}
          <div className="flex items-center gap-1">
            <span className="text-SUIT_12 text-ui-body">@{nickname}</span>
          </div>
        </div>

        {/* 작성일 + 더보기 */}
        <div className="flex items-center gap-2">
          <span className="text-SUIT_12 text-ui-muted">
            {comment.createdDate ? new Date(comment.createdDate).toLocaleDateString() : ""}
          </span>
          <button onClick={handleMoreOptions} className="p-1">
            <Image src="/icons/threeDotsVerticalGray.svg" alt="더보기" width={14} height={14} />
          </button>
        </div>
      </div>

      {/* 내용 */}
      <div className="mb-3">
        <p className="whitespace-pre-wrap text-SUIT_14 leading-[1.4] text-black">{comment.content}</p>
      </div>

      {/* 좋아요/싫어요 */}
      <div className="flex items-center gap-4">
        <button onClick={handleLike} className="flex items-center gap-2 transition-opacity hover:opacity-70">
          <Image src={isLiked ? "/icons/newLikeThumbGreen.svg" : "/icons/newLikeThumbGray.svg"} alt="좋아요" width={14} height={14} />
          <span className="text-SUIT_12 font-medium text-ui-count">{likeCount}</span>
        </button>

        <button onClick={handleDislike} className="flex items-center gap-2 transition-opacity hover:opacity-70">
          <Image src="/icons/newLikeThumbDownGray.svg" alt="싫어요" width={14} height={14} />
          <span className="text-SUIT_12 font-medium text-ui-count">{dislikeCount}</span>
        </button>
      </div>
    </div>
  );
}