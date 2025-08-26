"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { commentApi } from "@/apis/commentApi";
import memberApi from "@/apis/memberApi";
import useCommonToast from "@/global/hook/useCommonToast";

interface CommentInputProps {
  postId: string;
  isAuthor: boolean;
  onCommentAdded?: () => void;
}

export default function CommentInput({ postId, isAuthor, onCommentAdded }: CommentInputProps) {
  const [comment, setComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCurrentUserAuthor, setIsCurrentUserAuthor] = useState<boolean>(isAuthor);
  const { showWarningToast } = useCommonToast();

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
          // 에러 처리
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

      // 성공 시 입력창 초기화 및 댓글 목록만 새로고침
      setComment("");

      // 댓글이 추가되었음을 부모 컴포넌트에 알림
      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (error) {
      showWarningToast("댓글 작성에 실패했습니다. 다시 시도해주세요.");
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
    <div className="mx-[20px] mb-4 flex h-[52px] w-auto flex-shrink-0 items-center rounded-[7px] border-2 border-question-main bg-white">
      {/* 익명 체크박스 - 작성자는 익명으로 댓글 작성 불가 */}
      <button
        type="button"
        onClick={() => !isCurrentUserAuthor && setIsAnonymous(prev => !prev)}
        className={`ml-4 flex items-center gap-1 ${isCurrentUserAuthor ? "cursor-not-allowed opacity-50" : ""}`}
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
      <span
        className={`ml-1 text-SUIT_14 font-medium leading-[100%] text-[#898989] ${isCurrentUserAuthor ? "opacity-50" : ""}`}
      >
        익명
      </span>

      {/* 댓글 입력 필드 */}
      <input
        type="text"
        value={comment}
        onChange={e => setComment(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="댓글을 입력하세요."
        className="ml-4 flex-1 border-none bg-transparent text-SUIT_14 font-medium leading-[100%] text-black outline-none placeholder:font-medium placeholder:text-[#C5C5C5]"
        disabled={isSubmitting}
      />

      {/* 전송 버튼 */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!comment.trim() || isSubmitting}
        className="mr-4 flex h-8 w-8 items-center justify-center rounded-full transition-opacity disabled:opacity-50"
      >
        <Image src="/icons/arrowUpCircleGreen.svg" alt="전송" width={20} height={20} />
      </button>
    </div>
  );
}

CommentInput.defaultProps = {
  onCommentAdded: () => {},
};
