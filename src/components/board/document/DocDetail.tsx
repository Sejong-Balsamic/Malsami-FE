import { Button } from "@/components/ui/button";

function DocDetail() {
  return (
    <div className="flex flex-col justify-center px-[20px]">
      <div className=" w-[336px] max-w-[640px] h-[56px] border-b border-[#d9d9d9]">
        <div className="w-full h-full flex items-center">
          <Button
            variant="ghost"
            className="h-[26px] px-[15px] py-[6px] mr-[6px] bg-[#f7f8fb] rounded-[13px] text-[#929292] font-pretendard-medium text-xs"
          >
            커스텀 태그
          </Button>
          <Button
            variant="ghost"
            className="h-[26px] bg-[#f7f8fb] rounded-[13px] text-[#929292] font-pretendard-medium text-xs"
          >
            카테고리
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-[336px] max-w-[640px] h-[72px]">
        <div className="mt-[20px]">
          <div>
            <span className="text-xs font-pretendard-medium mb-[4px]">닉네임</span>
          </div>
          <div>
            <span className="text-[#929292] text-xs font-pretendard-medium mr-[3px]">경영학과 •</span>
            <span className="text-[#bdbdbd] text-xs font-pretendard-medium mr-[3px]">2시간 전 •</span>
            <span className="text-[#bdbdbd] text-xs font-pretendard-medium">조회수 7</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocDetail;
