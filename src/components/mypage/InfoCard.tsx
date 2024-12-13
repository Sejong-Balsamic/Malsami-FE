import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-flip";
import Image from "next/image";
import AnimatedNumber from "@/utils/AnimatedNumber";
import ExpBar from "./ExpBar";
import { ScrollArea } from "../ui/scroll-area";

interface InfoProps {
  memberInfo: {
    yeopjeon: {
      yeopjeon: number;
    };
    exp: {
      exp: number;
      expId: string;
      expTier: string;
    };
    totalLikeCount: number;
    expPercentile: number;
  } | null;
}

const getRankName = (
  tier: "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R",
): string => {
  const ranks = {
    A: "정1품",
    B: "종1품",
    C: "정2품",
    D: "종2품",
    E: "정3품",
    F: "종3품",
    G: "정4품",
    H: "종4품",
    I: "정5품",
    J: "종5품",
    K: "정6품",
    L: "종6품",
    M: "정7품",
    N: "종7품",
    O: "정8품",
    P: "종8품",
    Q: "정9품",
    R: "종9품",
  };
  return ranks[tier] || "랭킹 없음"; // 기본값 처리
};

function InfoCard({ memberInfo }: InfoProps) {
  const expTier = memberInfo?.exp.expTier || "R"; // 기본값: 종9품
  const currentRank = getRankName(
    expTier as
      | "A"
      | "B"
      | "C"
      | "D"
      | "E"
      | "F"
      | "G"
      | "H"
      | "I"
      | "J"
      | "K"
      | "L"
      | "M"
      | "N"
      | "O"
      | "P"
      | "Q"
      | "R",
  ); // 현재 품계

  const nextRank =
    expTier > "A"
      ? getRankName(
          String.fromCharCode(expTier.charCodeAt(0) - 1) as
            | "A"
            | "B"
            | "C"
            | "D"
            | "E"
            | "F"
            | "G"
            | "H"
            | "I"
            | "J"
            | "K"
            | "L"
            | "M"
            | "N"
            | "O"
            | "P"
            | "Q"
            | "R",
        )
      : "랭킹 없음"; // 다음 품계
  return (
    <div className="relative w-full">
      <Swiper
        effect="flip" // flip 효과 활성화
        modules={[EffectFlip]} // EffectFlip 모듈 등록
        className="h-full w-full"
      >
        {/* 슬라이드 앞면 */}
        <SwiperSlide className="flex rounded-[15px] bg-[#95e4da]">
          <div className="flex h-full w-full flex-col gap-7 px-[20px] py-5">
            <div>
              <div className="flex items-center justify-between">
                <div className="font-pretendard-medium text-[14px]">경험치</div>
                <div className="flex items-center gap-1">
                  <span className="font-pretendard-semibold text-[20px]"> {memberInfo?.exp.exp || "0"}</span>
                  <span className="font-pretendard-medium text-[14px]">EXP</span>
                  <Image src="/icons/Move.svg" alt="Move" width={6} height={12} className="h-[12px] w-[6px]" />
                </div>
              </div>
              <div className="py-2">
                <ExpBar value={memberInfo?.exp.exp || 0} />
              </div>
              <div className="flex items-center justify-between">
                <div className="font-pretendard-medium text-[14px]">{currentRank}</div>
                <div className="flex items-center gap-1">
                  <span className="font-pretendard-medium text-[14px] text-[#016C5D]">{nextRank}</span>
                </div>
              </div>
            </div>
            <div className="relative grid grid-cols-2 grid-rows-1">
              <div className="flex flex-col items-center justify-center">
                <div className="font-pretendard-medium text-[16px]">상위</div>
                <div className="flex items-center gap-2">
                  <Image src="/icons/mypage/Rank.svg" alt="Rank" width={18} height={18} className="h-[18px] w-[18px]" />
                  <span className="font-pretendard-semibold text-[20px]">
                    {memberInfo ? (
                      <>
                        <AnimatedNumber target={memberInfo.expPercentile || 0} />%
                      </>
                    ) : (
                      "0%"
                    )}
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 top-0 w-[2px] bg-[#03B89E]" />
              <div className="flex flex-col items-center justify-center">
                <div className="font-pretendard-medium text-[16px]">받은 좋아요</div>
                <div className="flex items-center gap-2">
                  <Image src="/icons/mypage/Like.svg" alt="Like" width={18} height={18} className="h-[18px] w-[18px]" />
                  <span className="font-pretendard-semibold text-[20px]">
                    {memberInfo ? <AnimatedNumber target={memberInfo.totalLikeCount || 0} /> : "0"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* 슬라이드 뒷면 */}
        <SwiperSlide className="flex items-stretch rounded-[15px] border-2 border-[#95e4da] bg-white">
          <div className="flex h-full w-full flex-col gap-3 p-5">
            <span className="font-pretendard-medium text-[14px]">
              <span className="font-pretendard-semibold">세종말싸미</span>에는
              <span className="font-pretendard-semibold text-[#03B89E]"> 경험치</span>를 기준으로 품계가 존재합니다.
              <br />
              종9품 ~ 정1품까지 총 18개로 이루어져 있으며 각 품계의 경험치 기준은 아래 표를 참고해주세요.
            </span>
            <ScrollArea className="relative h-[98px] w-full rounded-[15px] bg-[#95e4da] p-2">
              <div className="grid h-auto w-full grid-cols-3 gap-2 p-1">
                {Array.from({ length: 18 }).map((_, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <React.Fragment key={index}>
                    <div className="font-pretendard-semibold flex items-center justify-start text-[18px]">
                      #{index + 1}
                    </div>
                    <div className="font-pretendard-medium flex items-center justify-start text-[14px]">
                      {
                        [
                          "정1품",
                          "종1품",
                          "정2품",
                          "종2품",
                          "정3품",
                          "종3품",
                          "정4품",
                          "종4품",
                          "정5품",
                          "종5품",
                          "정6품",
                          "종6품",
                          "정7품",
                          "종7품",
                          "정8품",
                          "종8품",
                          "정9품",
                          "종9품",
                        ][17 - index]
                      }
                    </div>
                    <div className="font-pretendard-medium flex items-center justify-end text-[14px]">
                      {index * 500} EXP 이상
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </ScrollArea>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default InfoCard;
