import Image from "next/image";

interface BasicInfoProps {
  memberInfo: {
    member: {
      studentName: string;
      uuidNickname: string;
      studentId: number;
      major: string;
    };
    yeopjeon: {
      yeopjeon: number;
    };
  } | null;
}

function BasicInfo({ memberInfo }: BasicInfoProps) {
  return (
    <div className="flex">
      <div className="float-right pb-[10px] pt-[30px]">
        <div className="flex w-full pb-[10px]">
          <div className="flex flex-col items-end">
            <div className="flex items-end gap-[6px]">
              <span className="font-pretendard-semibold text-[18px]">{memberInfo?.member.studentName || "사용자"}</span>
              <span className="font-pretendard-medium text-[14px]">@{memberInfo?.member.uuidNickname || "아이디"}</span>
            </div>
            <div>
              <span className="font-pretendard-medium text-[14px] text-[#737373]">
                {memberInfo?.member.studentId} | {memberInfo?.member.major}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="flex h-[29px] w-[87px] items-center justify-between gap-[8px] rounded-[28px] border-2 border-[#74d7cb] bg-white px-[12px]"
          >
            <Image src="/icons/Yeopjeon.svg" alt="Yeopjeon" width={16} height={16} className="h-[16px] w-[16px]" />
            <span className="font-pretendard-semibold text-[14px] text-[#03b89e]">
              {memberInfo?.yeopjeon.yeopjeon || "0"}
            </span>
            <Image src="/icons/Move.svg" alt="Move" width={6} height={12} className="h-[12px] w-[6px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BasicInfo;