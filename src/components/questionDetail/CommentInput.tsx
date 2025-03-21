/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { Input } from "@/components/shadcn/input";
import { Checkbox } from "@/components/shadcn/checkbox";
import Image from "next/image";
import postComment from "@/apis/question/postComment";
import refreshComments from "@/apis/question/refreshComments";
import { Comment } from "@/types/api/entities/postgres/comment";

interface CommentInputProps {
  postId: string;
  contentType: "QUESTION" | "ANSWER" | "DOCUMENT" | "DOCUMENT_REQUEST";
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>; // 댓글 목록 상태
  // eslint-disable-next-line react/require-default-props
  setTotalComments?: React.Dispatch<React.SetStateAction<number>>; // 총 댓글 개수 상태 (선택)
}

function CommentInput({ postId, contentType, setComments, setTotalComments }: CommentInputProps) {
  const [content, setContent] = useState(""); // 입력한 댓글 내용
  const [isPrivate, setIsPrivate] = useState(false); // 익명 여부

  // 댓글 입력값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  // 익명 여부 체크박스 변경 핸들러
  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    setIsPrivate(checked === true);
  };

  // 댓글 저장 및 새로고침 핸들러
  const handleSaveClick = async () => {
    if (!content.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      // 댓글 등록 API 호출
      await postComment({
        content,
        postId,
        contentType,
        isPrivate,
      });
      console.log("댓글 등록 성공");

      // 댓글 입력란 초기화
      setContent("");

      // 댓글 새로고침 (페이지네이션 기본값 명시)
      await refreshComments({
        postId,
        contentType,
        setComments,
        setTotalComments,
        pageNumber: 0, // 첫 페이지로 설정
        pageSize: 30, // 기본 페이지 크기 설정
      });
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="mb-[20px] min-h-[70px] min-w-[310px] rounded-lg bg-[#ffffff] p-[14px]">
      <div className="mb-[10px] flex items-center">
        <Input
          type="text"
          value={content}
          onChange={handleInputChange}
          placeholder="댓글을 입력해주세요."
          className="font-pretendard-medium h-[32px] flex-1 border-none text-[12px] text-[#000000] placeholder-[#bcbcbc] focus:ring-0"
        />
      </div>
      <div className="m-auto flex items-center justify-between">
        <div className="flex items-center gap-[4px]">
          <Checkbox id="isPrivate" checked={isPrivate} onCheckedChange={handleCheckboxChange} />
          <p className="font-pretendard-medium text-[12px] text-[#727272]">익명</p>
        </div>
        <div onClick={handleSaveClick} className="cursor-pointer">
          <Image src="/icons/Save.svg" alt="Save" width={24} height={24} />
        </div>
      </div>
    </div>
  );
}

export default CommentInput;
