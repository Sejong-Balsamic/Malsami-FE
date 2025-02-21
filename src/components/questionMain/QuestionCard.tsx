import Image from "next/image";
import getDateDiff from "@/global/getDateDiff";
import ImageWrapper from "@/components/deprecated/ImageWrapper";
import ChaeTaekTag from "@/components/deprecated/ChaeTaekTag";
import YeopjeonTag from "@/components/common/tags/YeopjeonTag";
import SubjectTag from "@/components/deprecated/SubjectTag";
import JiJeongTag from "@/components/common/tags/JiJeongTag";

interface QuestionCardProps {
  title: string;
  content: string;
  thumbnail: string;
  createdDate: string;
  viewCount: number;
  likeCount: number;
  rewardYeopjeon: number;
  chaetaekStatus: boolean;
  subject: string;
}

function QuestionCard({
  title,
  content,
  thumbnail,
  createdDate,
  viewCount,
  likeCount,
  subject,
  rewardYeopjeon = 0,
  chaetaekStatus,
}: QuestionCardProps) {
  return (
    <div className="... mb-3 flex flex-col rounded-[26px] bg-white p-[14px] shadow-[0_4px_8px_0_rgba(0,0,0,0.2)]">
      <div className="mb-2.5 flex">
        <SubjectTag subject={subject} />
        {!chaetaekStatus && rewardYeopjeon !== 0 && <YeopjeonTag key={rewardYeopjeon} point={rewardYeopjeon} />}
        {chaetaekStatus && <ChaeTaekTag />}
      </div>
      <div className="flex flex-row justify-between">
        {/* 왼쪽 텍스트 콘텐츠 */}
        <div className="flex flex-col">
          {/* 제목 */}
          <p className="font-pretendard-bold mb-1 line-clamp-1 text-sm text-black">{title}</p>
          {/* 내용 */}
          <p className="font-pretendard-medium mb-2 line-clamp-1 text-xs text-[#737373]">{content}</p>
          {/* 태그 및 기타 정보 */}
          <div className="font-pretendard-medium flex flex-wrap items-center text-xs text-[#BCBCBC]">
            <div className="flex flex-wrap items-center">
              <span className="flex items-center">
                <ImageWrapper src="/icons/LikeIcon.svg" />
                <span className="ml-1 text-xs">{likeCount > 999 ? "999+" : likeCount}</span>
              </span>
              <span className="mx-1.5">·</span>
              <ImageWrapper src="/icons/ViewCountIcon.svg" />
              <span className="ml-1">{viewCount > 999 ? "999+" : viewCount}</span>
              <span className="mx-1.5">·</span>
              <span>{getDateDiff(createdDate)}</span>
            </div>
          </div>
        </div>

        {thumbnail && (
          <Image
            src={thumbnail}
            alt="썸네일"
            width={74}
            height={74}
            className="ml-4 rounded-sm border"
            style={{ maxWidth: "74px", maxHeight: "74px", width: "auto", height: "auto" }}
          />
        )}
      </div>
    </div>
  );
}

export default QuestionCard;
