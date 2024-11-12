import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Image from "next/image";

function DocDetail() {
  return (
    <div className="flex flex-col justify-center px-[20px]">
      <div className="h-[56px] w-[336px] max-w-[640px] border-b border-[#d9d9d9]">
        <div className="flex h-full w-full items-center">
          <Button
            variant="ghost"
            className="font-pretendard-medium mr-[6px] h-[26px] rounded-[13px] bg-[#f7f8fb] px-[15px] py-[6px] text-xs text-[#929292]"
          >
            커스텀 태그
          </Button>
          <Button
            variant="ghost"
            className="font-pretendard-medium h-[26px] rounded-[13px] bg-[#f7f8fb] text-xs text-[#929292]"
          >
            카테고리
          </Button>
        </div>
      </div>
      {/* 작성자 정보 */}
      <div className="flex h-[72px] w-[336px] max-w-[640px] flex-col">
        <div className="mt-[20px]">
          <div>
            <span className="font-pretendard-medium mb-[4px] text-xs">닉네임</span>
          </div>
          <div>
            <span className="font-pretendard-medium mr-[3px] text-xs text-[#929292]">경영학과 •</span>
            <span className="font-pretendard-medium mr-[3px] text-xs text-[#bdbdbd]">2시간 전 •</span>
            <span className="font-pretendard-medium text-xs text-[#bdbdbd]">조회수 7</span>
          </div>
        </div>
      </div>
      {/* 글 정보 */}
      <div className="flex h-auto w-[336px] max-w-[640px] flex-col">
        <div className="mt-[40px]">
          <span className="font-pretendard-bold text-[18px]">우리 차문화의 이해 수업 정리본</span>
          <div className="font-pretendard-bold mt-[14px] min-h-[230px] text-[14px] leading-normal text-[#727272]">
            글을 작성해주세요. 글을 작성해주세요. 글을 작성해주세요. 글을 작성해주세요. 글을 작성해주세요. 글을
            작성해주세요.
          </div>
        </div>
        {/* 반응 */}
        <div className="mx-[5px] mt-4 flex justify-end">
          <div className="flex items-center gap-[14px]">
            <div className="flex items-center gap-[5px]">
              <Image src="/icons/Like.svg" alt="Like" width={18} height={18} />
              <span className="font-pretendard-semibold text-[12px] text-[#09bba2]">13</span>
            </div>
            <div className="flex items-center gap-[5px]">
              <Image src="/icons/Dislike.svg" alt="Dislike" width={18} height={18} />
              <span className="font-pretendard-semibold text-[12px] text-[#09bba2]">13</span>
            </div>
          </div>
        </div>
      </div>
      {/* 댓글 */}
      <div className="my-[40px] flex h-auto w-[336px] max-w-[640px] flex-col">
        <span className="font-pretendard-bold mb-[10px] text-[12px] text-[#727272]">댓글 7</span>
        {/* 댓글 작성 */}
        <div>
          <div className="flex items-center gap-[10px]">
            <Input
              type="text"
              placeholder="댓글을 입력해주세요."
              className="font-pretendard-medium h-[32px] flex-1 text-[12px] text-[#bcbcbc]"
            />
          </div>
          <div className="mt-2 flex items-center justify-end gap-[10px]">
            <Checkbox id="Anonymous" />
            <p className="font-pretendard-medium text-[12px] text-[#727272]">익명</p>
            <Button className="font-pretendard-medium h-[32px] w-[90px] bg-[#09BBA2] text-[12px]">댓글 남기기</Button>
          </div>
        </div>
        {/* 댓글 정보 */}
        <div className="my-[30px] flex flex-col gap-[12px]">
          <div className="min-h-[88px] rounded-lg bg-[#f7f8fb] p-[14px]">
            <div className="font-pretendard-bold text-[14px] text-[#09bba2]">익명</div>
            <div className="font-pretendard-medium mb-[10px] text-[12px] text-[#bcbcbc]">1일전</div>
            <div className="font-pretendard-medium text-[14px] text-[#7b7b7c]">댓글 남겨요~!</div>
          </div>
          <div className="min-h-[88px] rounded-lg bg-[#f7f8fb] p-[14px]">
            <div className="font-pretendard-bold text-[14px] text-[#09bba2]">익명</div>
            <div className="font-pretendard-medium mb-[10px] text-[12px] text-[#bcbcbc]">3일전</div>
            <div className="font-pretendard-medium text-[14px] text-[#7b7b7c]">댓글입ㄴ다</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocDetail;
