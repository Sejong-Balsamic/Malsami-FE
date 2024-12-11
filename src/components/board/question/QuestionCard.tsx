import Image from "next/image";
import getDateDiff from "@/utils/getDateDiff";
import ImageWrapper from "../tags/ImageWrapper";
import ChaeTakTag from "../tags/ChaeTakTag";
import DocJiJeongTag from "../document/tags/DocJiJeongTag";
import YeopjeonTag from "../tags/YeopjeonTag";
import SubjectTag from "../tags/SubjectTag";

interface QuestionCardProps {
  JiJeongTags: string[];
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
  subject,
  rewardYeopjeon = 0,
  chaetaekStatus,
}: QuestionCardProps) {
  return (
    <div className="... mb-3 flex flex-col rounded-[26px] bg-white p-[14px] shadow-[0_4px_8px_0_rgba(0,0,0,0.2)]">
      <div className="mb-2.5 flex">
        <SubjectTag subject={subject} />
        {!chaetaekStatus && rewardYeopjeon !== 0 && <YeopjeonTag key={rewardYeopjeon} point={rewardYeopjeon} />}
        {chaetaekStatus && <ChaeTakTag />}
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
            {/* <div className="flex flex-wrap items-center">
              {JiJeongTags?.[0] && <DocJiJeongTag tag={tagTranslations[JiJeongTags[0]] || "알 수 없는 태그"} />}
            </div> */}
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
