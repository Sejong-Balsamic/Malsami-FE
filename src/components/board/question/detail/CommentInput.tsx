/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import postComment from "@/apis/question/postComment";

interface CommentInputProps {
  postId: string;
  contentType: "QUESTION" | "ANSWER" | "DOCUMENT" | "DOCUMENT_REQUEST";
  refreshComments: () => void; // New prop to refresh comments
}

function CommentInput({ postId, contentType, refreshComments }: CommentInputProps) {
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

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
      console.log("Comment posted successfully");
      setContent("");
      refreshComments();
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
