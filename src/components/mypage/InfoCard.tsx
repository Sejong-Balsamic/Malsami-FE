import Image from "next/image";
import ExpBar from "./ExpBar";

interface BasicInfoProps {
  memberInfo: {
    yeopjeon: {
      yeopjeon: number;
    };
    exp: {
      exp: number;
      expId: string;
    };
    totalExp: number;
    totalLikeCount: number;
    expPercentile: number,
  } | null;
}

function InfoCard({ memberInfo }: BasicInfoProps) {
  return (
    <div className="flex w-full flex-col gap-7 rounded-[15px] bg-[#95e4da] px-[20px] py-[30px]">
      <div>
        <div className="mb-2">
          <ExpBar value={memberInfo?.totalExp || 0} />
        </div>
        <div className="flex justify-between">
          <div className="font-pretendard-medium text-[14px]">경험치</div>
          <div className="font-pretendard-medium flex items-center gap-[6px] text-[14px]">
            {memberInfo?.totalExp || "0"}
            <Image src="/icons/Move.svg" alt="Move" width={6} height={12} className="h-[12px] w-[6px]" />
          </div>
        </div>
      </div>
      <div className="relative grid grid-cols-2 grid-rows-1">
        <div className="flex flex-col items-center justify-center">
          <div className="font-pretendard-medium text-[16px]">상위</div>
          <div className="flex items-center gap-2">
            <Image src="/icons/LikeMyPage.svg" alt="Like" width={18} height={18} className="h-[18px] w-[18px]" />
            <span className="font-pretendard-semibold text-[20px]">{memberInfo?.expPercentile}%</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 top-0 w-[1px] bg-[#03B89E]" />
        <div className="flex flex-col items-center justify-center">
          <div className="font-pretendard-medium text-[16px]">받은 좋아요</div>
          <div className="flex items-center gap-2">
            <Image src="/icons/LikeMyPage.svg" alt="Like" width={18} height={18} className="h-[18px] w-[18px]" />
            <span className="font-pretendard-semibold text-[20px]">{memberInfo?.totalLikeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
