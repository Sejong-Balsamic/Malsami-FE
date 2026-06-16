"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Input } from "@/components/shadcn/input";
import { Checkbox } from "@/components/shadcn/checkbox";
import { commentApi } from "@/apis/commentApi";
import likeApi from "@/apis/likeApi";
import { Comment } from "@/types/api/entities/postgres/comment";
import { ContentType } from "@/types/api/constants/contentType";
import { LikeType } from "@/types/api/constants/likeType";
import { getDateDiff } from "@/global/time";
import { isSameMemberById } from "@/global/memberUtil";
import useCommonToast from "@/global/hook/useCommonToast";

interface DocumentCommentSectionProps {
  postId: string;
  contentType: ContentType;
  onCommentAdded: () => void;
}

// 자료 상세 페이지 댓글 영역 — 신식 commentApi/likeApi 기반 (구식 DCommentSection 대체)
function DocumentCommentSection({ postId, contentType, onCommentAdded }: DocumentCommentSectionProps) {
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const { showWarningToast } = useCommonToast();

  // 댓글 목록 로드
  const loadComments = useCallback(async () => {
    if (!postId) return;
    try {
      const res = await commentApi.getAllCommentsByPostId({ postId, contentType, pageNumber: 0, pageSize: 100 });
      setComments(res.commentsPage?.content || []);
    } catch (error) {
      showWarningToast("댓글을 불러오는데 실패했습니다.");
    }
  }, [postId, contentType, showWarningToast]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  // 댓글 등록
  const handleSaveClick = async () => {
    if (!content.trim()) {
      showWarningToast("댓글 내용을 입력해주세요.");
      return;
    }
    try {
      await commentApi.saveComment({ content, postId, contentType, isPrivate });
      setContent("");
      await loadComments();
      onCommentAdded();
    } catch (error) {
      showWarningToast("댓글 등록 중 오류가 발생했습니다.");
    }
  };

  // 댓글 좋아요 (낙관적 업데이트 + 실패 시 롤백)
  const handleLikeClick = async (commentId: string) => {
    const target = comments.find(c => c.commentId === commentId);
    if (!target || target.isLiked) return;
    // 작성자 본인은 좋아요 불가
    if (isSameMemberById(target.member?.memberId as string)) return;

    setComments(prev =>
      prev.map(c => (c.commentId === commentId ? { ...c, isLiked: true, likeCount: c.likeCount + 1 } : c)),
    );

    try {
      await likeApi.commentLike({ postId: commentId, contentType: ContentType.COMMENT, likeType: LikeType.LIKE });
    } catch (error) {
      setComments(prev =>
        prev.map(c => (c.commentId === commentId ? { ...c, isLiked: false, likeCount: c.likeCount - 1 } : c)),
      );
      showWarningToast("좋아요 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* 댓글 입력 */}
      <div className="min-h-[70px] rounded-lg border border-ui-border bg-white p-3.5">
        <div className="mb-2.5 flex items-center">
          <Input
            type="text"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="댓글을 입력해주세요."
            className="h-8 flex-1 border-none text-SUIT_12 text-black placeholder:text-ui-muted focus:ring-0"
          />
        </div>
        <div className="m-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Checkbox id="isPrivate" checked={isPrivate} onCheckedChange={checked => setIsPrivate(checked === true)} />
            <p className="text-SUIT_12 text-ui-body">익명</p>
          </div>
          <div
            onClick={handleSaveClick}
            onKeyDown={e => e.key === "Enter" && handleSaveClick()}
            className="cursor-pointer"
            tabIndex={0}
            role="button"
          >
            <Image src={content.trim() ? "/icons/Save.svg" : "/icons/Save_Un.svg"} alt="저장" width={24} height={24} />
          </div>
        </div>
      </div>

      {/* 댓글 리스트 */}
      <div>
        {comments.length === 0 ? (
          <p className="text-SUIT_14 text-ui-body">댓글이 없습니다.</p>
        ) : (
          comments.map(comment => (
            <div key={comment.commentId} className="mb-3.5 min-h-[88px] rounded-lg bg-ui-tag-bg p-3.5">
              <div className="flex items-center gap-2">
                {!comment.isPrivate ? (
                  <span className="text-SUIT_14 font-bold text-question-main">@{comment.member.uuidNickname}</span>
                ) : (
                  <span className="text-SUIT_14 font-bold">익명</span>
                )}
                <div className="text-SUIT_12 text-ui-muted">{getDateDiff(comment.createdDate as string)}</div>
              </div>
              <p className="my-2.5 min-h-[20px] w-full text-SUIT_14 text-ui-body">{comment.content}</p>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => handleLikeClick(comment.commentId)}
                  disabled={comment.isLiked}
                  className={`flex h-[30px] items-center justify-center gap-[5px] border-none bg-transparent ${
                    comment.isLiked ? "cursor-default" : "cursor-pointer"
                  }`}
                >
                  <Image
                    src={comment.isLiked ? "/icons/Like_Clicked.svg" : "/icons/Like_Empty_UnClicked.svg"}
                    alt="좋아요"
                    width={16}
                    height={16}
                  />
                  <span className={`text-SUIT_14 ${comment.isLiked ? "text-question-main" : "text-ui-count"}`}>
                    {comment.likeCount}
                  </span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DocumentCommentSection;
