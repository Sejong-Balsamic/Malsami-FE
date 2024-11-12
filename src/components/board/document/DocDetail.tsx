import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Image from "next/image";

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
      {/* 작성자 정보 */}
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
      {/* 글 정보 */}
      <div className="flex flex-col w-[336px] max-w-[640px] h-auto">
        <div className="mt-[40px]">
          <span className="text-[18px] font-pretendard-bold">우리 차문화의 이해 수업 정리본</span>
          <div className="mt-[14px] text-[14px] font-pretendard-bold text-[#727272] leading-normal min-h-[230px]">
            글을 작성해주세요. 글을 작성해주세요. 글을 작성해주세요. 글을 작성해주세요. 글을 작성해주세요. 글을
            작성해주세요.
          </div>
        </div>
        {/* 반응 */}
        <div className="flex justify-end mt-4 mx-[5px]">
          <div className="flex items-center gap-[14px]">
            <div className="flex items-center gap-[5px]">
              <Image src="/icons/Like.svg" alt="Like" width={18} height={18} />
              <span className="text-[#09bba2] text-[12px] font-pretendard-semibold">13</span>
            </div>
            <div className="flex items-center gap-[5px]">
              <Image src="/icons/Dislike.svg" alt="Dislike" width={18} height={18} />
              <span className="text-[#09bba2] text-[12px] font-pretendard-semibold">13</span>
            </div>
          </div>
        </div>
      </div>
      {/* 댓글 */}
      <div className="flex flex-col w-[336px] max-w-[640px] h-auto my-[40px]">
        <span className="text-[#727272] text-[12px] font-pretendard-bold mb-[10px]">댓글 7</span>
        {/* 댓글 작성 */}
        <div>
          <div className="flex items-center gap-[10px]">
            <Input
              type="text"
              placeholder="댓글을 입력해주세요."
              className="h-[32px] text-[#bcbcbc] text-[12px] font-pretendard-medium flex-1"
            />
          </div>
          <div className="flex items-center justify-end gap-[10px] mt-2">
            <Checkbox id="Anonymous" />
            <p className="text-[#727272] text-[12px] font-pretendard-medium">익명</p>
            <Button className="bg-[#09BBA2] w-[90px] h-[32px] text-[12px] font-pretendard-medium">댓글 남기기</Button>
          </div>
        </div>
        {/* 댓글 정보 */}
        <div className="my-[30px] flex flex-col gap-[12px]">
          <div className="min-h-[88px] bg-[#f7f8fb] rounded-lg p-[14px]">
            <div className="text-[#09bba2] text-[14px] font-pretendard-bold">익명</div>
            <div className="mb-[10px] text-[#bcbcbc] text-[12px] font-pretendard-medium">1일전</div>
            <div className="text-[#7b7b7c] text-[14px] font-pretendard-medium">댓글 남겨요~!</div>
          </div>
          <div className="min-h-[88px] bg-[#f7f8fb] rounded-lg p-[14px]">
            <div className="text-[#09bba2] text-[14px] font-pretendard-bold">익명</div>
            <div className="mb-[10px] text-[#bcbcbc] text-[12px] font-pretendard-medium">3일전</div>
            <div className="text-[#7b7b7c] text-[14px] font-pretendard-medium">댓글입ㄴ다</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocDetail;
