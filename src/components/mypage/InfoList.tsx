import Image from "next/image";

interface InfoProps {
  memberInfo: {
    totalPopularPostCount: number;
    totalCommentCount: number;
    totalPostCount: number;
  } | null;
}

function InfoList({ memberInfo }: InfoProps) {
  return (
    <div className="mt-[20px] flex flex-col gap-[20px]">
      <div className="relative grid w-full grid-cols-3 grid-rows-1 rounded-[10px] border-2 border-[#95e4da] py-[24px]">
        <div className="flex flex-col items-center justify-center gap-[12px]">
          <div className="flex items-center gap-2">
            <Image src="/icons/mypage/Comment.svg" alt="Comment" width={18} height={18} className="h-[18px] w-[18px]" />
            <span className="font-pretendard-medium text-[16px]">{memberInfo?.totalCommentCount}</span>
          </div>
          <div className="font-pretendard-medium text-[14px] text-[#737373]">작성한 댓글</div>
        </div>
        <div className="absolute bottom-[24px] left-1/3 top-[24px] w-[2px] bg-[#95E4DA]" />
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            <Image src="/icons/mypage/Post.svg" alt="Post" width={18} height={18} className="h-[18px] w-[18px]" />
            <span className="font-pretendard-medium text-[16px]">{memberInfo?.totalPostCount}</span>
          </div>
          <div className="font-pretendard-medium text-[14px] text-[#737373]">작성한 글</div>
        </div>
        <div className="absolute bottom-[24px] left-2/3 top-[24px] w-[2px] bg-[#95E4DA]" />
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            <Image src="/icons/mypage/Star.svg" alt="Star" width={18} height={18} className="h-[18px] w-[18px]" />
            <span className="font-pretendard-medium text-[16px]">{memberInfo?.totalPopularPostCount}</span>
          </div>
          <div className="font-pretendard-medium text-[14px] text-[#737373]">올린 인기자료</div>
        </div>
      </div>
      <div className="relative grid w-full grid-cols-1 grid-rows-2 gap-[20px] rounded-[10px] border-2 border-[#95e4da] p-[20px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <Image src="/icons/mypage/Post.svg" alt="Post" width={18} height={18} className="h-[18px] w-[18px]" />
            <span className="font-pretendard-medium text-[16px]">내가 작성한 글</span>
          </div>
          <Image src="/icons/mypage/Move_gray.svg" alt="YeopJeon" width={7} height={14} className="h-[14px] w-[7px]" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <Image src="/icons/mypage/Folder.svg" alt="Folder" width={18} height={18} className="h-[18px] w-[18px]" />
            <span className="font-pretendard-medium text-[16px]">내가 올린 자료글</span>
          </div>
          <Image src="/icons/mypage/Move_gray.svg" alt="YeopJeon" width={7} height={14} className="h-[14px] w-[7px]" />
        </div>
      </div>
      <div className="relative grid w-full grid-cols-1 grid-rows-2 gap-[20px] rounded-[10px] border-2 border-[#95e4da] p-[20px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <Image
              src="/icons/mypage/YeopJeon.svg"
              alt="YeopJeon"
              width={18}
              height={18}
              className="h-[18px] w-[18px]"
            />
            <span className="font-pretendard-medium text-[16px]">내가 구매한 자료</span>
          </div>
          <Image src="/icons/mypage/Move_gray.svg" alt="YeopJeon" width={7} height={14} className="h-[14px] w-[7px]" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <Image src="/icons/mypage/Like.svg" alt="Like" width={18} height={18} className="h-[18px] w-[18px]" />
            <span className="font-pretendard-medium text-[16px]">내가 추천한 자료</span>
          </div>
          <Image src="/icons/mypage/Move_gray.svg" alt="YeopJeon" width={7} height={14} className="h-[14px] w-[7px]" />
        </div>
      </div>
    </div>
  );
}

export default InfoList;
