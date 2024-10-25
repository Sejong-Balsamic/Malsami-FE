import React from "react";
import Image from "next/image";
import getDateDiff from "@/utils/getDateDiff";
import ResolvedTag from "../ResolvedTag";
import AssignedTag from "../AssignedTag";

interface QuestionCardProps {
  assignedTags: string[];
  title: string;
  content: string;
  thumbnail: string;
  createdDate: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

function QuestionCard({
  assignedTags,
  title,
  content,
  thumbnail,
  createdDate,
  viewCount,
  likeCount,
  commentCount,
}: QuestionCardProps) {
  return (
    <div className="flex border p-4 rounded-lg shadow-md">
      <div className="w-1/4">
        <Image src={thumbnail} alt="썸네일" className="w-full h-auto rounded-lg" />
      </div>
      <div className="w-3/4 pl-4">
        <div className="mb-2">
          <ResolvedTag />
          {assignedTags.map(tag => (
            <AssignedTag key={tag} label={tag} />
          ))}
        </div>
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="mb-4">{content}</p>
        <div className="text-gray-600 text-sm">
          <span>{viewCount} 조회수</span> | <span>{likeCount} 추천수</span> | <span>{commentCount} 댓글수</span> |{" "}
          <span>{getDateDiff(createdDate)}</span>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
