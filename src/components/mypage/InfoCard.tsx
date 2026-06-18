// src/components/mypage/InfoCard.tsx

"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-flip";
import Image from "next/image";
import ExpBar from "@/components/mypage/ExpBar";
import { ScrollArea } from "@/components/shadcn/scroll-area";
import { MemberDto } from "@/types/api/responses/memberDto";
import { expTierRanges, ExpTier } from "@/types/api/constants/expTier";
import AnimatedNumber from "./AnimatedNumber";

function InfoCard({ memberDto }: { memberDto: MemberDto | null }) {
  if (!memberDto) {
    return <div>Loading...</div>;
  }

  const expTier = (memberDto.exp?.expTier || "R") as ExpTier;
  const currentRank = expTierRanges[expTier].label;
  const nextTier = expTier > "A" ? (String.fromCharCode(expTier.charCodeAt(0) - 1) as ExpTier) : null;
  const nextRank = nextTier ? expTierRanges[nextTier].label : "최고 등급";

  return (
    <div className="relative w-full">
      <Swiper effect="flip" modules={[EffectFlip]} className="h-full w-full">
        <SwiperSlide className="flex rounded-2xl bg-legacy-teal-sub">
          <div className="flex h-full w-full flex-col gap-7 px-5 py-5">
            <div>
              <div className="flex items-center justify-between">
                <div className="font-suit-medium text-SUIT_14">경험치</div>
                <div className="flex items-center gap-1">
                  <span className="font-suit-semibold text-SUIT_20">{memberDto?.exp?.exp || "0"}</span>
                  <span className="font-suit-medium text-SUIT_14">EXP</span>
                  <Image src="/icons/Move.svg" alt="Move" width={6} height={12} className="h-3 w-1.5" />
                </div>
              </div>
              <div className="py-2">
                <ExpBar value={memberDto?.exp?.exp || 0} />
              </div>
              <div className="flex items-center justify-between">
                <div className="font-suit-medium text-SUIT_14">{currentRank}</div>
                <div className="flex items-center gap-1">
                  <span className="font-suit-medium text-SUIT_14 text-mypage-teal">{nextRank}</span>
                </div>
              </div>
            </div>
            <div className="relative grid grid-cols-2 grid-rows-1">
              <div className="flex flex-col items-center justify-center">
                <div className="font-suit-medium text-SUIT_16">상위</div>
                <div className="flex items-center gap-2">
                  <Image src="/icons/mypage/Rank.svg" alt="Rank" width={18} height={18} />
                  <span className="font-suit-semibold text-SUIT_20">
                    {memberDto ? <AnimatedNumber target={memberDto.expPercentile || 0} /> : "0"}%
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 top-0 w-0.5 bg-legacy-teal" />
              <div className="flex flex-col items-center justify-center">
                <div className="font-suit-medium text-SUIT_16">받은 좋아요</div>
                <div className="flex items-center gap-2">
                  <Image src="/icons/mypage/Like.svg" alt="Like" width={18} height={18} />
                  <span className="font-suit-semibold text-SUIT_20">
                    {memberDto ? <AnimatedNumber target={memberDto.totalLikeCount || 0} /> : "0"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-stretch rounded-2xl border-2 border-legacy-teal-sub bg-white">
          <div className="flex h-full w-full flex-col gap-3 p-5">
            <span className="font-suit-medium text-SUIT_14">
              <span className="font-suit-semibold">세종말싸미</span>에는
              <span className="font-suit-semibold text-legacy-teal"> 경험치</span>를 기준으로 품계가 존재합니다.
              <br />
              종9품 ~ 정1품까지 총 18개로 이루어져 있으며 각 품계의 경험치 기준은 아래 표를 참고해주세요.
            </span>
            <ScrollArea className="relative h-24 w-full rounded-2xl bg-legacy-teal-sub p-2">
              <div className="grid h-auto w-full grid-cols-3 gap-2 p-1" style={{ gridTemplateColumns: "1fr 1fr 2fr" }}>
                {Object.entries(expTierRanges)
                  .reverse()
                  .map(([tier, { label, minExp }], index) => (
                    <React.Fragment key={tier}>
                      <div className="font-suit-semibold flex items-center justify-start text-SUIT_18">
                        #{index + 1}
                      </div>
                      <div className="font-suit-medium flex items-center justify-start text-SUIT_14">{label}</div>
                      <div className="font-suit-medium flex items-center justify-end text-SUIT_14">
                        {minExp} EXP 이상
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
