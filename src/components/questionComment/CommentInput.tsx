"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { commentApi } from "@/apis/commentApi";
import memberApi from "@/apis/memberApi";
import { ContentType } from "@/types/api/constants/contentType";

interface CommentInputProps {
  postId: string;
  isAuthor: boolean;
}

export default function CommentInput({ postId, isAuthor }: CommentInputProps) {
  const [comment, setComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCurrentUserAuthor, setIsCurrentUserAuthor] = useState<boolean>(isAuthor);
  
  // memberApi를 통해 현재 로그인한 사용자가 질문 작성자인지 확인
  useEffect(() => {
    const checkIfAuthor = async () => {
      if (!isAuthor) {
        try {
          const myInfo = await memberApi.getMyInfo();
          if (myInfo && myInfo.member) {
            // TODO: 질문 작성자와 현재 로그인한 사용자 비교
            setIsCurrentUserAuthor(true); // 실제 구현에서는 비교 로직이 필요
          }
        } catch (error) {
          console.error('사용자 정보 가져오기 실패:', error);
        }
      }
    };
    
    if (isAuthor === undefined) {
      checkIfAuthor();
    }
  }, [isAuthor]);

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
        {/* 익명 체크박스 - 작성자는 익명으로 댓글 작성 불가 */}
        <button
          onClick={() => !isCurrentUserAuthor && setIsAnonymous(prev => !prev)}
          className={`flex items-center gap-1 ${isCurrentUserAuthor ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isCurrentUserAuthor}
        >
          <div className="relative h-4 w-4">
            <Image
              src={
                isAnonymous && !isCurrentUserAuthor
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
        <span className={`text-SUIT_16 ${isCurrentUserAuthor ? "text-ui-disabled" : "text-ui-body"}`}>익명</span>

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