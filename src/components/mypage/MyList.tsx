import Image from "next/image";

interface MyListProps {
  title: string;
  content: string;
  thumbnail: string | null;
  rewardYeopjeon: number;
  categories: string[];
  likeCount: number;
  commentCount: number;
  viewCount: number;
  createdDate: string;
}

function MyList({
  title,
  content,
  thumbnail,
  rewardYeopjeon,
  categories,
  likeCount,
  commentCount,
  viewCount,
  createdDate,
}: MyListProps) {
  return (
    <div className="flex w-full flex-col rounded-[14px] bg-white p-[14px] shadow-[3px_2px_10px_0px_rgba(0,0,0,0.20)]">
      <div className="flex items-center justify-start gap-1">
        {rewardYeopjeon > 0 && (
          <div className="flex items-center justify-between gap-[3px] rounded-[33px] bg-[#f46b02] px-3 py-1">
            <Image src="/icons/Yeopjeon.svg" alt="Yeopjeon" width={14} height={14} />
            <span className="font-pretendard-semibold text-[14px] text-white">{rewardYeopjeon}</span>
          </div>
        )}
        {categories.map((category, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="flex items-center rounded-[33px] bg-[#03B89E] px-4 py-1">
            <span className="font-pretendard-semibold text-[14px] text-white">{category}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col justify-start">
          <span className="font-pretendard-bold pb-1 pt-3 text-[14px]">{title}</span>
          <span className="font-pretendard-meidum pb-3 text-[14px] leading-[18px] text-[#727272]">{content}</span>
          <div className="font-pretendard-medium flex items-center justify-start gap-2 text-[11px] text-[#bcbcbc]">
            <div className="flex gap-1">
              <Image src="/icons/LikeIcon.svg" alt="Like" width={12} height={12} />
              <span>{likeCount > 999 ? "999+" : likeCount}</span>
            </div>
            <div className="flex gap-1">
              <Image src="/icons/CommentIcon.svg" alt="Comment" width={12} height={12} />
              <span>{commentCount > 999 ? "999+" : commentCount}</span>
            </div>
            <span>·</span>
            <span>조회 {viewCount > 999 ? "999+" : viewCount}회</span>
            <span>·</span>
            <span>{createdDate}</span>
          </div>
        </div>
        {thumbnail ? (
          <Image src={thumbnail} alt="썸네일" width={80} height={80} className="h-[80px] w-[80px] rounded-md" />
        ) : (
          <div className="h-[80px] w-[80px] rounded-md bg-black/30" />
        )}
      </div>
    </div>
  );
}

export default MyList;
