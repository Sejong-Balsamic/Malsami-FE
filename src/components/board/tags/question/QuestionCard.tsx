import React from "react";
import Image from "next/image";
import getDateDiff from "@/utils/getDateDiff";
import ImageWrapper from "../ImageWrapper";
import ResolvedTag from "../ResolvedTag";
import AssignedTag from "../AssignedTag";
import YeopjeonTag from "../YeopjeonTag";

interface QuestionCardProps {
  assignedTags: string[];
  title: string;
  content: string;
  thumbnail: string;
  createdDate: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  rewardYeopjeon?: number;
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
  rewardYeopjeon = 0,
}: QuestionCardProps) {
  return (
    <div className="flex flex-col bg-white p-3 rounded-[26px] mb-3">
      <div className="mb-2">
        {rewardYeopjeon !== 0 && <YeopjeonTag key={rewardYeopjeon} point={rewardYeopjeon} />}
        <ResolvedTag />
        {assignedTags.map(tag => (
          <AssignedTag key={tag} label={tag} />
        ))}
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <h2 className="text-base font-pretendard-medium mb-1">{title}</h2>
          <p className="text-sm font-pretendard-medium text-[#ABABAB] mb-4">{content}</p>
        </div>
        <Image
          src={thumbnail} // 이미지 썸네일 경로로 나중에 바꿔야 함
          alt="썸네일"
          width={80}
          height={80}
          className="border rounded-sm ml-[1px]"
        />
      </div>
      <div className="flex items-center text-[#D9D9D9] text-xs font-pretendard-medium">
        <span className="mr-3">
          <ImageWrapper src="/icons/LikeIcon.jpg" />
          <span className="text-[#09BBA2] ml-1">{likeCount}</span>
        </span>
        <span className="mr-3">
          <ImageWrapper src="/icons/CommentIcon.jpg" />
          <span className="text-[#09BBA2] ml-1">{commentCount}</span>
        </span>
        | <span className="ml-1 mr-1"> 조회 {viewCount} </span> |{" "}
        <span className="ml-1">{getDateDiff(createdDate)}</span>
      </div>
    </div>
  );
}

export default QuestionCard;
