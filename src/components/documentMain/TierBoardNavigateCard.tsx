"use client";

import Link from "next/link";
import Image from "next/image";
import { PostTiers, PostTiersKey } from "@/types/postTiers";
import useCommonToast from "@/global/hook/useCommonToast";

interface TierBoardNavigateCardProps {
  tier: PostTiersKey; // 게시판 카테고리 제목
  link: string; // 접근 가능한 경우 이동할 링크
  accessible: boolean; // 접근 가능 여부
  // eslint-disable-next-line react/require-default-props
  requiredYeopjeon?: number; // 필요한 엽전 수
  // eslint-disable-next-line react/require-default-props
  currentYeopjeon?: number; // 현재 엽전 수
}

export default function TierBoardNavigateCard({
  tier,
  link,
  accessible,
  requiredYeopjeon = 0,
  currentYeopjeon = 0,
}: TierBoardNavigateCardProps) {
  const { showWarningToast } = useCommonToast();

  // 이미지 경로를 tier에 맞춰 동적으로 설정
  const imageSrc = `/icons/tier/${tier}.svg`;

  const handleCardClick = (e: React.MouseEvent) => {
    if (!accessible) {
      e.preventDefault();
      const neededYeopjeon = requiredYeopjeon - currentYeopjeon;
      showWarningToast(`${PostTiers[tier].KR} 게시판 입장에는 엽전 ${neededYeopjeon}개가 더 필요합니다.`);
    }
    // accessible이 true인 경우 기본 동작(링크로 이동)을 수행
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Link
        href={accessible ? link : "#"}
        onClick={handleCardClick}
        className="group relative flex h-[70px] w-[70px] items-center justify-center rounded-full border transition-transform hover:scale-105 xs:h-[82px] xs:w-[82px]"
        style={{
          backgroundColor: accessible ? "#FFF" : "#EDEDED",
          borderColor: accessible ? "#EDEDED" : "transparent",
        }}
      >
        <Image
          src={imageSrc}
          alt={tier}
          width={40}
          height={40}
          className="h-[40px] w-[40px] transition-opacity duration-300 xs:h-[48px] xs:w-[48px]"
          priority // 중요한 이미지이므로 우선 로딩
        />
      </Link>
      {/* 게시판 카테고리 제목 */}
      <span
        className="text-SUIT_14 font-medium xs:text-SUIT_16"
        style={{
          color: accessible ? "#000000" : "#898989",
        }}
      >
        {PostTiers[tier].KR}
      </span>
    </div>
  );
}
