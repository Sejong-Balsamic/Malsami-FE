"use client";

import useUserPermissions from "@/global/useUserPermissions";
import { PostTiersKeys } from "@/types/postTiers";
import TierBoardNavigateCard from "./TierBoardNavigateCard";
import TierBoardNavigateCardSkeleton from "./TierBoardNavigateCardSkeleton";

export default function TierBoardNavigateSection() {
  const memberDto = useUserPermissions(); // MemberDto | null 반환

  // 로딩 중일 때 스켈레톤 UI 표시
  if (!memberDto) {
    return (
      <div className="flex justify-between">
      {PostTiersKeys.map(tier => (
          <TierBoardNavigateCardSkeleton key={tier} />
        ))}
      </div>
    );
  }

  // 권한 필드 추출 (기본값 false 설정)
  const canAccessCheonmin = memberDto?.canAccessCheonmin ?? false;
  const canAccessJungin = memberDto?.canAccessJungin ?? false;
  const canAccessYangban = memberDto?.canAccessYangban ?? false;
  const canAccessKing = memberDto?.canAccessKing ?? false;

  // 권한 객체를 만들어서 PostTiersKeys와 연결
  const tierPermissions = {
    CHEONMIN: canAccessCheonmin,
    JUNGIN: canAccessJungin,
    YANGBAN: canAccessYangban,
    KING: canAccessKing,
  };

  return (
    <div className="flex justify-between">
      {PostTiersKeys.map(tier => (
        <TierBoardNavigateCard
          key={tier}
          tier={tier}
          link={`/board/document/tier/${tier.toLowerCase()}`}
          accessible={tierPermissions[tier]}
        />
      ))}
    </div>
  );
}
