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

const tagTranslations: { [key: string]: string } = {
  EXAM_PREPARATION: "시험 대비",
  OUT_OF_CLASS: "수업 외 내용",
  UNKNOWN_CONCEPT: "개념 모름",
  BETTER_SOLUTION: "더 나은 풀이",
  DOCUMENT_REQUEST: "자료 요청",
  STUDY_TIPS: "공부 팁",
  ADVICE_REQUEST: "조언 구함",
};

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
    <div className="... mb-3 flex flex-col rounded-[26px] bg-white p-[14px] shadow-[0_4px_8px_0_rgba(0,0,0,0.2)]">
      <div className="mb-2">
        {rewardYeopjeon !== 0 && <YeopjeonTag key={rewardYeopjeon} point={rewardYeopjeon} />}
        <ChaeTakTag />
        {JiJeongTags.map(tag => (
          <JiJeongTag key={tag} label={tagTranslations[tag] ?? tag} />
        ))}
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <h2 className="font-pretendard-bold mb-1 line-clamp-1 text-sm">{title}</h2>
          <p className="font-pretendard-medium mb-4 line-clamp-1 text-sm text-[#737373]">{content}</p>
          <div className="font-pretendard-medium flex items-center text-xs text-[#BCBCBC]">
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
          className="ml-4 rounded-sm border"
        />
      </div>
    </div>
  );
}

export default QuestionCard;
