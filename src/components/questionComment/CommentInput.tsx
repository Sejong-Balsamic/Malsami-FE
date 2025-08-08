"use client";

import { useState } from "react";
import Image from "next/image";
import { commentApi } from "@/apis/commentApi";
import { ContentType } from "@/types/api/constants/contentType";

interface CommentInputProps {
  postId: string;
}

export default function CommentInput({ postId }: CommentInputProps) {
  const [comment, setComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await commentApi.saveComment({
        content: comment,
        postId,
        contentType: "QUESTION",
        isPrivate: isAnonymous,
      });
      
      // 성공 시 입력창 초기화 및 페이지 새로고침으로 댓글 목록 갱신
      setComment("");
      window.location.reload(); // 댓글 작성 후 목록 새로고침
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      alert("댓글 작성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-white border-t border-[#E0E0E0] px-5 py-3">
      <div className="flex items-center gap-4 rounded-[24px] border-2 border-question-main bg-white px-4 py-3">
        {/* 익명 체크박스 */}
        <button
          onClick={() => setIsAnonymous(prev => !prev)}
          className="flex items-center gap-1"
        >
          <div className="relative h-4 w-4">
            <Image
              src={
                isAnonymous 
                  ? "/icons/chaetaekCheckboxChecked.svg" 
                  : "/icons/chaetaekCheckboxUnchecked.svg"
              }
              alt="익명 체크박스"
              width={16}
              height={16}
            />
          </div>
        </button>

        {/* 익명 텍스트 */}
        <span className="text-SUIT_16 text-ui-body">익명</span>

        {/* 댓글 입력 필드 */}
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="댓글을 입력하세요."
          className="flex-1 border-none bg-transparent text-SUIT_16 text-black placeholder-ui-muted outline-none"
          disabled={isSubmitting}
        />

        {/* 전송 버튼 */}
        <button
          onClick={handleSubmit}
          disabled={!comment.trim() || isSubmitting}
          className="flex h-8 w-8 items-center justify-center rounded-full transition-opacity disabled:opacity-50"
        >
          <Image src="/icons/arrowUp.svg" alt="전송" width={20} height={20} className="transform rotate-180" />
        </button>
      </div>
    </div>
  );
}