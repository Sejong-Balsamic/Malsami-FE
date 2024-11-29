import Image from "next/image";

function Facility() {
  return (
    <div className="flex flex-col">
      <div className="relative grid w-full grid-cols-1 grid-rows-3 gap-[22px] border-b-2 border-[#EEEEEE] p-[24px]">
        <button type="button" className="flex w-full items-center justify-between">
          <span className="font-pretendard-semibold text-[18px]">로그아웃</span>
          <Image src="/icons/mypage/Move_gray.svg" alt="YeopJeon" width={7} height={14} className="h-[14px] w-[7px]" />
        </button>
        <button type="button" className="flex w-full items-center justify-between">
          <span className="font-pretendard-semibold text-[18px]">회원탈퇴</span>
          <Image src="/icons/mypage/Move_gray.svg" alt="YeopJeon" width={7} height={14} className="h-[14px] w-[7px]" />
        </button>
        <button type="button" className="flex w-full items-center justify-between">
          <span className="font-pretendard-semibold text-[18px]">개인정보 처리방침</span>
          <Image src="/icons/mypage/Move_gray.svg" alt="YeopJeon" width={7} height={14} className="h-[14px] w-[7px]" />
        </button>
      </div>
      <div className="relative grid w-full grid-cols-1 grid-rows-2 gap-[22px] border-b-2 border-[#EEEEEE] p-[24px]">
        <button type="button" className="flex w-full items-center justify-between">
          <span className="font-pretendard-semibold text-[18px]">세종말싸미 이용도우미</span>
          <Image src="/icons/mypage/Move_gray.svg" alt="YeopJeon" width={7} height={14} className="h-[14px] w-[7px]" />
        </button>
        <button type="button" className="flex w-full items-center justify-between">
          <span className="font-pretendard-semibold text-[18px]">이용규칙</span>
          <Image src="/icons/mypage/Move_gray.svg" alt="YeopJeon" width={7} height={14} className="h-[14px] w-[7px]" />
        </button>
      </div>
      <div className="relative grid w-full grid-cols-1 grid-rows-1 border-b-2 border-[#EEEEEE] p-[24px]">
        <button type="button" className="flex w-full items-center justify-between">
          <span className="font-pretendard-semibold text-[18px]">공지사항</span>
          <Image src="/icons/mypage/Move_gray.svg" alt="YeopJeon" width={7} height={14} className="h-[14px] w-[7px]" />
        </button>
      </div>
    </div>
  );
}

export default Facility;
