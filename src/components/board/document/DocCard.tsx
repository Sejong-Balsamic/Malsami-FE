import Image from "next/image";
import getDateDiff from "@/utils/getDateDiff";
import { DocCardProps } from "@/types/docCard.type";
import ImageWrapper from "../tags/ImageWrapper";
import SubjectTag from "./tags/SubjectTag";
import DocJiJeongTag from "./tags/DocJiJeongTag";

const tagTranslations: { [key: string]: string } = {
  DOCUMENT: "강의 자료",
  PAST_EXAM: "과제 기출",
  SOLUTION: "해설",
};

export default function DocCard({
  subject,
  title,
  content,
  documentTypes,
  createdDate,
  thumbnailUrl,
  viewCount,
  likeCount,
}: DocCardProps) {
  return (
    <div className="mb-3 flex flex-col rounded-[26px] bg-white p-[14px] shadow-[0_4px_8px_0_rgba(0,0,0,0.2)]">
      <SubjectTag subject={subject} />
      <div className="flex flex-row items-center justify-between">
        {/* 왼쪽 텍스트 콘텐츠 */}
        <div className="flex flex-col">
          {/* 제목 */}
          <p className="font-pretendard-bold mb-1 line-clamp-1 text-sm text-black">{title}</p>
          {/* 내용 */}
          <p className="font-pretendard-medium mb-2 line-clamp-2 text-xs text-[#737373]">{content}</p>
          {/* 태그 및 기타 정보 */}
          <div className="font-pretendard-medium flex flex-wrap items-center text-xs text-[#BCBCBC]">
            <div className="flex flex-wrap items-center">
              {documentTypes?.map(type => <DocJiJeongTag key={type} tag={tagTranslations[type]} />)}
            </div>
            <div className="flex flex-wrap items-center">
              <span className="flex items-center">
                <ImageWrapper src="/icons/LikeIcon.svg" />
                <span className="ml-1 text-xs">{likeCount}</span>
              </span>
              <span className="mx-2 text-[11px]">· 조회수 {viewCount} ·</span>
              <span className="text-[11px]">{getDateDiff(createdDate)}</span>
            </div>
          </div>
        </div>
        {/* 썸네일 */}
        <Image
          src={thumbnailUrl || "/image/PartyPopper.jpg"} // 이미지 썸네일 경로로 나중에 바꿔야 함
          alt="썸네일"
          width={74}
          height={74}
          className="ml-4 rounded-sm border"
          style={{ maxWidth: "74px", maxHeight: "74px", width: "auto", height: "auto" }}
        />
      </div>
    </div>
  );
}
