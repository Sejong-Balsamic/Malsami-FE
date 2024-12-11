import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip } from "swiper/modules"; // EffectFlip을 modules에서 가져오기
import "swiper/css";
import "swiper/css/effect-flip";
import Image from "next/image";
import AnimatedNumber from "@/utils/AnimatedNumber";
import ExpBar from "./ExpBar";

interface InfoProps {
  memberInfo: {
    yeopjeon: {
      yeopjeon: number;
    };
    exp: {
      exp: number;
      expId: string;
    };
    totalLikeCount: number;
    expPercentile: number;
  } | null;
}

function InfoCard({ memberInfo }: InfoProps) {
  return (
    <div className="relative w-full">
      <Swiper
        effect="flip" // flip 효과 활성화
        modules={[EffectFlip]} // EffectFlip 모듈 등록
        className="h-full w-full"
      >
        {/* 슬라이드 앞면 */}
        <SwiperSlide>
          <div className="flex w-full flex-col gap-7 rounded-[15px] bg-[#95e4da] px-[20px] py-[30px]">
            <div>
              <div className="mb-2">
                <ExpBar value={memberInfo?.exp.exp || 0} />
              </div>
              <div className="flex justify-between">
                <div className="font-pretendard-medium text-[14px]">종3품</div>
                <div className="font-pretendard-medium flex items-center gap-[6px] text-[14px]">
                  {memberInfo?.exp.exp || "0"}
                  <Image src="/icons/Move.svg" alt="Move" width={6} height={12} className="h-[12px] w-[6px]" />
                </div>
              </div>
            </div>
            <div className="relative grid grid-cols-2 grid-rows-1">
              <div className="flex flex-col items-center justify-center">
                <div className="font-pretendard-medium text-[16px]">상위</div>
                <div className="flex items-center gap-2">
                  <Image src="/icons/mypage/Like.svg" alt="Like" width={18} height={18} className="h-[18px] w-[18px]" />
                  <span className="font-pretendard-semibold text-[20px]">
                    {memberInfo ? <AnimatedNumber target={memberInfo.expPercentile || 0} /> : "0%"}
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 top-0 w-[2px] bg-[#03B89E]" />
              <div className="flex flex-col items-center justify-center">
                <div className="font-pretendard-medium text-[16px]">받은 좋아요</div>
                <div className="flex items-center gap-2">
                  <Image src="/icons/mypage/Like.svg" alt="Like" width={18} height={18} className="h-[18px] w-[18px]" />
                  <span className="font-pretendard-semibold text-[20px]">
                    {memberInfo ? <AnimatedNumber target={memberInfo.totalLikeCount || 0} /> : "0%"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* 슬라이드 뒷면 */}
        <SwiperSlide>
          <div className="flex w-full flex-col gap-7 rounded-[15px] border-2 border-[#95e4da] bg-white px-[20px] py-[30px]">
            <span className="font-pretendard-medium">
              세종말싸미에는 레베루가 존재합니다.. 바로바로 품계명인데요 종9품 정9품 종8품 정8품 종7품 정7품 종6품 정6품
              종5품 정5품 종4품 정4품 종3품 정3품 종2품 정2품 종1품 정1품 <br />
              열심히 해서 품계를 올려봅시다 !!
            </span>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default InfoCard;
