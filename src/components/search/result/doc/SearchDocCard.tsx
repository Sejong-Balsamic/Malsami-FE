import Image from "next/image";
import { useRouter } from "next/navigation";
import getDateDiff from "@/utils/getDateDiff";
import { DocCardProps } from "@/types/docCard.type";
import ImageWrapper from "@/components/board/tags/ImageWrapper";
import SubjectTag from "@/components/board/document/tags/SubjectTag";

const tagTranslations: { [key: string]: string } = {
  CHEONMIN: "천민 게시판",
  JUNGIN: "중인 게시판",
  YANGBAN: "양반 게시판",
  KING: "왕 게시판",
};

export default function SearchDocCard({
  subject,
  documentPostId,
  title,
  content,
  createdDate,
  thumbnailUrl,
  viewCount,
  likeCount,
  postTier,
}: DocCardProps) {
  const router = useRouter();
  const handleCardClick = (postId: string) => {
    if (!postId) {
      console.error("Invalid postId:", postId);
      return;
    }
    console.log("Clicked card postId:", postId);
    router.push(`/board/document/detail/${postId}`);
  };
  return (
    <div
      tabIndex={0}
      role="button"
      className="mb-3 flex cursor-pointer flex-col rounded-[26px] bg-white p-[14px] shadow-[0_4px_8px_0_rgba(0,0,0,0.2)]"
      onClick={() => handleCardClick(documentPostId || "")}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          handleCardClick(documentPostId || "");
        }
      }}
    >
      <SubjectTag subject={subject} />
      <div className="flex flex-row items-center justify-between">
        {/* 왼쪽 텍스트 콘텐츠 */}
        <div className="flex flex-col">
          {/* 제목 */}
          <p className="font-pretendard-bold mb-1 line-clamp-1 text-sm text-black">{title}</p>
          {/* 내용 */}
          <p className="font-pretendard-medium mb-2 line-clamp-1 text-sm text-[#737373]">{content}</p>
          {/* 태그 및 기타 정보 */}
          <div className="font-pretendard-medium flex flex-wrap items-center text-xs text-[#BCBCBC]">
            <div className="flex flex-wrap items-center">
              <span className="font-pretendard-medium mr-3.5 text-xs text-custom-blue-500">
                {tagTranslations[postTier as string] || "알 수 없는 게시판"}
              </span>
            </div>
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
        {/* 썸네일 */}
        {thumbnailUrl && (
          <Image
            src={thumbnailUrl}
            alt="썸네일"
            width={74}
            height={74}
            className="ml-3 rounded-sm border"
            style={{ maxWidth: "74px", maxHeight: "74px", width: "auto", height: "auto" }}
          />
        )}
      </div>
    </div>
  );
}