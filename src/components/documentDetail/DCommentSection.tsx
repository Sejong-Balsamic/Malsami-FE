import React, { useState, useEffect } from "react";
import { Input } from "@/components/shadcn/input";
import { Checkbox } from "@/components/shadcn/checkbox";
import Image from "next/image";
import postComment from "@/apis/question/postComment";
import refreshComments from "@/apis/question/refreshComments";
import { Comment } from "@/types/api/entities/postgres/comment";
import { getDateDiff } from "@/global/time";
import postLikeComment from "@/apis/question/postLikeComment";
import sameMember from "@/global/sameMember";

interface CommentSectionProps {
  postId: string;
  contentType: "QUESTION" | "ANSWER" | "DOCUMENT" | "DOCUMENT_REQUEST";
  onCommentAdded: () => void;
}

function CommentSection({ postId, contentType, onCommentAdded }: CommentSectionProps) {
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    const loadComments = async () => {
      await refreshComments({
        postId,
        contentType,
        setComments,
        setTotalComments,
      });
    };
    loadComments();
  }, [postId, contentType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    setIsPrivate(checked === true);
  };

  const handleSaveClick = async () => {
    if (!content.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      await postComment({
        content,
        postId,
        contentType,
        isPrivate,
      });
      setContent(""); // 입력 필드 초기화

      // 댓글 새로고침
      refreshComments({
        postId,
        contentType,
        setComments,
        setTotalComments,
      });
      onCommentAdded();
    } catch (error) {
      console.error("댓글 등록 실패:", error);
    }
  };

  const handleLikeClick = async (commentId: string) => {
    const updatedComments = [...comments];
    const commentIndex = updatedComments.findIndex(c => c.commentId === commentId);
    if (commentIndex === -1) return;

    const comment = updatedComments[commentIndex];
    if (comment.isLiked) return; // 이미 좋아요를 눌렀다면 실행하지 않음
    if (sameMember(comment.member.memberId)) return; // 작성자가 좋아요를 누르지 못하도록 차단

    try {
      updatedComments[commentIndex].isLiked = true; // 즉시 반영: 버튼 비활성화 및 색상 변경
      updatedComments[commentIndex].likeCount += 1; // 즉시 반영: 좋아요 숫자 증가
      setComments(updatedComments);

      await postLikeComment(commentId); // API 호출
    } catch (error) {
      console.error("댓글 좋아요 실패:", error);
      updatedComments[commentIndex].isLiked = false; // 실패 시 롤백
      updatedComments[commentIndex].likeCount -= 1; // 숫자도 원래대로 롤백
      setComments(updatedComments);
    }
  };

  return (
    <div className="flex flex-col gap-[20px]">
      {/* 댓글 입력 */}
      <div className="min-h-[70px] min-w-[310px] rounded-lg border border-[#d9d9d9] bg-[#ffffff] p-[14px]">
        <div className="mb-[10px] flex items-center">
          <Input
            type="text"
            value={content}
            onChange={handleInputChange}
            placeholder="댓글을 입력해주세요."
            className="font-pretendard-medium h-[32px] flex-1 border-none text-[12px] text-[#000000] placeholder-[#bcbcbc] caret-[#03B89E] focus:ring-0"
          />
        </div>
        <div className="m-auto flex items-center justify-between">
          <div className="flex items-center gap-[4px]">
            <Checkbox id="isPrivate" checked={isPrivate} onCheckedChange={handleCheckboxChange} />
            <p className="font-pretendard-medium text-[12px] text-[#727272]">익명</p>
          </div>
          <div
            onClick={handleSaveClick}
            onKeyPress={e => {
              if (e.key === "Enter") {
                handleSaveClick();
              }
            }}
            className="cursor-pointer"
            tabIndex={0}
            role="button"
          >
            <Image src={content.trim() ? "/icons/Save.svg" : "/icons/Save_Un.svg"} alt="Save" width={24} height={24} />
          </div>
        </div>
      </div>

      {/* 댓글 리스트 */}
      <div>
        {totalComments === 0 ? (
          <p className="font-pretendard-medium text-[14px] text-[#7b7b7c]">댓글이 없습니다.</p>
        ) : (
          comments.map(comment => (
            <div
              key={comment.commentId}
              className="mb-[14px] min-h-[88px] min-w-[310px] rounded-lg bg-[#f7f8fb] p-[14px]"
            >
              <div className="flex items-center gap-[8px]">
                {!comment.isPrivate ? (
                  <span className="font-pretendard-bold text-[14px] text-[#09bba2]">
                    @{comment.member.uuidNickname}
                  </span>
                ) : (
                  <span className="font-pretendard-bold text-[14px]">익명</span>
                )}
                <div className="font-pretendard-medium text-[12px] text-[#bcbcbc]">
                  {getDateDiff(comment.createdDate)}
                </div>
              </div>
              <p className="font-pretendard-medium my-[10px] min-h-[20px] w-full text-[14px] text-[#7b7b7c]">
                {comment.content}
              </p>
              <div className="flex justify-end">
                <button
                  type="button" // 명시적으로 type을 설정
                  onClick={() => handleLikeClick(comment.commentId)} // 좋아요 클릭 핸들러
                  disabled={comment.isLiked} // 좋아요가 눌린 상태라면 버튼 비활성화
                  className={`flex h-[30px] items-center justify-center gap-[5px] border-none bg-transparent ${
                    comment.isLiked ? "cursor-default text-[#03b89e]" : "cursor-pointer text-[#aaaaaa]"
                  }`}
                >
                  <Image
                    src={comment.isLiked ? "/icons/Like_Clicked.svg" : "/icons/Like_Empty_UnClicked.svg"}
                    alt={comment.isLiked ? "Like_Clicked" : "Like_UnClicked"}
                    width={16}
                    height={16}
                  />
                  <span
                    className={`font-pretendard-medium text-[14px] ${comment.isLiked ? "text-[#03b89e]" : "text-[#737373]"}`}
                  >
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

export default CommentSection;
