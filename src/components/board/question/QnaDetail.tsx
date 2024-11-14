import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import JiJeongTag from "@/components/common/tags/JiJeongTag";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import YeopjeonTag from "../tags/YeopjeonTag";

function QnaDetail() {
  return (
    <div className="flex flex-col justify-center px-[20px]">
      {/* 교과목명 현상금  */}
      <div className="mt-[30px] h-[26px] w-[336px] max-w-[640px]">
        <div className="flex h-full w-full items-center">
          <Button
            variant="ghost"
            className="font-pretendard-medium mr-[6px] h-[26px] rounded-[13px] bg-[#03b89e] px-[15px] py-[6px] text-[12px] text-[#ffffff]"
          >
            우리차문화의이해
          </Button>
          <YeopjeonTag point={50} />
        </div>
      </div>
      {/* 글 정보 */}
      <div className="flex h-auto min-w-[336px] max-w-[640px] flex-col">
        <div className="mt-[20px]">
          <span className="font-pretendard-bold text-[18px]">우리차문화의이해 수업 2주차에서요</span>
          <div className="font-pretendard-medium mt-[10px] min-h-[100px] text-[14px] leading-normal text-[#727272]">
            글을 작성해주세요. 글을 작성해주세요. 글을 작성해주세요. 글을 작성해주세요. 글을 작성해주세요. 글을
            작성해주세요.
          </div>
        </div>
        {/* 커스텀태그 */}
        <div className="mt-[30px] h-[26px] w-[336px] max-w-[640px]">
          <div className="flex h-full w-full items-center gap-[4px]">
            <JiJeongTag title="차" color="#aaaaaa" />
            <JiJeongTag title="문화" color="#aaaaaa" />
            <JiJeongTag title="수업정리본" color="#aaaaaa" />
            <JiJeongTag title="경영" color="#aaaaaa" />
            <JiJeongTag title="우리차문화" color="#aaaaaa" />
          </div>
        </div>
        {/* 지정태그 */}
        <div className="mt-[20px] h-[26px] w-[336px] max-w-[640px]">
          <div className="flex h-full w-full items-center">
            <Button
              variant="ghost"
              className="font-pretendard-medium mr-[6px] h-[26px] rounded-[13px] border border-[#e7e7e7] bg-transparent px-[15px] py-[6px] text-[12px] text-[#aaaaaa]"
            >
              개념 모름
            </Button>
            <Button
              variant="ghost"
              className="font-pretendard-medium mr-[6px] h-[26px] rounded-[13px] border border-[#e7e7e7] bg-transparent px-[15px] py-[6px] text-[12px] text-[#aaaaaa]"
            >
              개념 모름
            </Button>
          </div>
        </div>
        {/* 작성자 정보 */}
        <div className="flex h-[72px] min-w-[336px] max-w-[640px] flex-col">
          <div className="mt-[20px] text-right">
            <div>
              <span className="font-pretendard-medium mb-[4px] text-[12px]">@280fee</span>
            </div>
            <div>
              <span className="font-pretendard-medium mr-[3px] text-[12px] text-[#bdbdbd]">2시간 전 •</span>
              <span className="font-pretendard-medium text-[12px] text-[#bdbdbd]">조회수 7</span>
            </div>
          </div>
        </div>
        {/* 반응 */}
        <div className="mx-[5px] mt-4 flex justify-start">
          <div className="flex items-center gap-[10px]">
            <div className="flex h-[30px] w-[70px] items-center justify-center gap-[5px] rounded-[28px] border-2 border-[#e7e7e7]">
              <Image src="/icons/Like_Unclicked.svg" alt="Like_Unclicked" width={16} height={16} />
              <span className="font-pretendard-semibold text-[12px] text-[#aaaaaa]">13</span>
            </div>
            <div className="flex h-[30px] w-[70px] items-center justify-center gap-[5px] rounded-[28px] border-2 border-[#e7e7e7]">
              <Image src="/icons/Comment_Unclicked.svg" alt="Comment_Unclicked" width={16} height={16} />
              <span className="font-pretendard-semibold text-[12px] text-[#aaaaaa]">13</span>
            </div>
          </div>
        </div>
      </div>
      {/* 답변 */}
      <div className="my-[40px] flex h-auto min-w-[336px] max-w-[640px] flex-col">
        <span className="font-pretendard-bold mb-[10px] text-[14px] text-[#3D3D3D]">답변 7</span>
        {/* 답변 정보 */}
        <div className="my-[30px] flex flex-col gap-[12px] rounded-lg bg-[#f7f8fb] p-[12px]">
          <div>
            <Button
              variant="ghost"
              className="font-pretendard-medium mr-[6px] h-[26px] rounded-[13px] bg-[#0062D2] px-[15px] py-[6px] text-[12px] text-[#ffffff]"
            >
              채택됨
            </Button>
            <span className="font-pretendard-bold mb-[4px] text-[14px]">@280fee</span>
            <span className="font-pretendard-medium mb-[4px] text-[12px] text-[#737373]"> • 경영학과</span>
          </div>
          <div className="font-pretendard-medium m-auto text-[14px] leading-relaxed text-[#444444]">
            우리차문화 정리본 여기있습니다...우리차문화 정리본 여기있습니다...우리차문화 정리본
            여기있습니다...우리차문화 정리본 여기있습니다...
          </div>
          {/* 답변 댓글 */}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <div className="flex w-full justify-between pb-[36px]">
                <p className="font-pretendard-medium text-[12px] text-[#bcbcbc]">3시간 전</p>
                <AccordionTrigger>
                  <div className="flex cursor-pointer items-center gap-1">
                    <Image src="/icons/Comment_Unclicked.svg" alt="Comment_Unclicked" width={16} height={16} />
                    <p className="font-pretendard-medium text-[14px] text-[#bcbcbc]">3</p>
                  </div>
                </AccordionTrigger>
              </div>
              <AccordionContent>
                {/* 댓글 작성 */}
                <div className="mb-[20px] min-h-[70px] min-w-[310px] rounded-lg bg-[#ffffff] p-[14px]">
                  <div className="mb-[10px] flex items-center">
                    <Input
                      type="text"
                      placeholder="댓글을 입력해주세요."
                      className="font-pretendard-medium h-[32px] flex-1 border-none text-[12px] text-[#000000] placeholder-[#bcbcbc] focus:ring-0"
                    />
                  </div>
                  <div className="m-auto flex items-center justify-between">
                    <div className="flex items-center gap-[4px]">
                      <Checkbox id="Anonymous" />
                      <p className="font-pretendard-medium text-[12px] text-[#727272]">익명</p>
                    </div>
                    <Image src="/icons/Save.svg" alt="Comment_Unclicked" width={24} height={24} />
                  </div>
                </div>
                {/* 댓글 정보 */}
                <div className="min-h-[88px] min-w-[310px] rounded-lg bg-[#ffffff] p-[14px]">
                  <span className="font-pretendard-bold mb-[4px] text-[14px]">@280fee</span>
                  <span className="font-pretendard-medium mb-[4px] text-[12px] text-[#737373]"> • 비공개</span>
                  <p className="font-pretendard-medium min-h-[20px] w-full text-[14px] text-[#7b7b7c]">와 굿굿</p>
                  <div className="font-pretendard-medium mb-[10px] text-[12px] text-[#bcbcbc]">1일전</div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default QnaDetail;
