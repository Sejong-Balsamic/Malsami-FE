"use client";

import useUserPermissions from "@/global/useUserPermissions";
import { PostTiersKeys } from "@/types/postTiers";
import TierBoardNavigateCard from "./TierBoardNavigateCard";
import TierBoardNavigateCardSkeleton from "./TierBoardNavigateCardSkeleton";

export default function TierBoardNavigateSection() {
  const memberDto = useUserPermissions(); // MemberDto | null 반환 (엽전 정보 포함)

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

  // 엽전 요구사항
  const tierRequirements = {
    CHEONMIN: memberDto?.cheonminRequirement ?? 0,
    JUNGIN: memberDto?.junginRequirement ?? 0,
    YANGBAN: memberDto?.yangbanRequirement ?? 0,
    KING: memberDto?.kingRequirement ?? 0,
  };

  return (
    <div className="flex justify-between gap-2">
      {PostTiersKeys.map(tier => (
        <TierBoardNavigateCard
          key={tier}
          tier={tier}
          link={`/board/document/tier/${tier.toLowerCase()}`}
          accessible={tierPermissions[tier]}
          requiredYeopjeon={tierRequirements[tier]}
          currentYeopjeon={memberDto?.yeopjeon?.yeopjeon ?? 0}
        />
      ))}
    </div>
  );
}
