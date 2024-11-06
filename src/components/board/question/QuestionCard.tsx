import React from "react";
import Image from "next/image";
import getDateDiff from "@/utils/getDateDiff";
import ImageWrapper from "../tags/ImageWrapper";
import ChaeTakTag from "../tags/ChaeTakTag";
import JiJeongTag from "../tags/JiJeongTag";
import YeopjeonTag from "../tags/YeopjeonTag";

interface QuestionCardProps {
  JiJeongTags: string[];
  title: string;
  content: string;
  thumbnail: string;
  createdDate: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  rewardYeopjeon: number;
}

function QuestionCard({
  JiJeongTags,
  title,
  content,
  thumbnail,
  createdDate,
  viewCount,
  likeCount,
  commentCount,
  rewardYeopjeon = 0,
}: QuestionCardProps) {
  const displayThumbnail = thumbnail || "/image/PartyPopper.jpg";

  return (
    <div className="flex flex-col bg-white p-[14px] rounded-[26px] mb-3 shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] ...">
      <div className="mb-2">
        {rewardYeopjeon !== 0 && <YeopjeonTag key={rewardYeopjeon} point={rewardYeopjeon} />}
        <ChaeTakTag />
        {JiJeongTags.map(tag => (
          <JiJeongTag key={tag} label={tag} />
        ))}
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <h2 className="text-sm font-pretendard-bold mb-1 line-clamp-1">{title}</h2>
          <p className="text-sm font-pretendard-medium text-[#737373] mb-4 line-clamp-1">{content}</p>
          <div className="flex items-center text-[#BCBCBC] text-xs font-pretendard-medium">
            <span className="mr-[3px]">
              <ImageWrapper src="/icons/LikeIcon.svg" />
              <span className="ml-1 text-xs">{likeCount}</span>
            </span>
            <span className="mr-[6px]">
              <ImageWrapper src="/icons/CommentIcon.svg" />
              <span className="ml-1 text-xs">{commentCount}</span>
            </span>
            · <span className="ml-[6px] mr-[6px] text-[11px]"> 조회 {viewCount} </span> ·{" "}
            <span className="ml-[6px] text-[11px]">{getDateDiff(createdDate)}</span>
          </div>
        </div>
        <Image
          src={displayThumbnail} // 이미지 썸네일 경로로 나중에 바꿔야 함
          alt="썸네일"
          width={74}
          height={74}
          className="border rounded-sm ml-4"
        />
      </div>
    </div>
  );
}

export default QuestionCard;
