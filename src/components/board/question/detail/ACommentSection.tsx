import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import postComment from "@/apis/question/postComment";
import refreshComments from "@/apis/question/refreshComments";
import { Comment } from "@/types/comment";
import getDateDiff from "@/utils/getDateDiff";

interface CommentSectionProps {
  postId: string;
  contentType: "QUESTION" | "ANSWER" | "DOCUMENT" | "DOCUMENT_REQUEST";
}

function CommentSection({ postId, contentType }: CommentSectionProps) {
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
    } catch (error) {
      console.error("댓글 등록 실패:", error);
    }
  };

  return (
    <div className="flex flex-col gap-[20px]">
      {/* 댓글 입력 */}
      <div className="min-h-[70px] min-w-[310px] rounded-lg bg-[#ffffff] p-[14px]">
        <div className="mb-[10px] flex items-center">
          <Input
            type="text"
            value={content}
            onChange={handleInputChange}
            placeholder="댓글을 입력해주세요."
            className="font-pretendard-medium h-[32px] flex-1 border-none text-[12px] text-[#000000] placeholder-[#bcbcbc] caret-[#03B89E] focus:outline-none"
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
              className="mb-[10px] min-h-[88px] min-w-[310px] rounded-lg bg-[#ffffff] p-[14px]"
            >
              {!comment.isPrivate ? (
                <span className="font-pretendard-bold text-[14px]">@{comment.member.uuidNickname}</span>
              ) : (
                <span className="font-pretendard-medium text-[12px] text-[#737373]">비공개</span>
              )}
              <p className="font-pretendard-medium mb-[18px] mt-[10px] min-h-[20px] w-full text-[14px] text-[#7b7b7c]">
                {comment.content}
              </p>
              <div className="font-pretendard-medium mb-[10px] text-[12px] text-[#bcbcbc]">
                {getDateDiff(comment.createdDate)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommentSection;
