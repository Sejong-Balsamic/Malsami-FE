"use client";

import useUserPermissions from "@/global/useUserPermissions"; // 경로 확인 필요
import { PostTiersKeys } from "@/types/postTiers";
import DocBoardCard from "./DocBoardCard";

export default function DocBoardNavigateSection() {
  const memberDto = useUserPermissions(); // MemberDto | null 반환

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

  // 로딩 중일 때는 아무것도 렌더링하지 않음 (필요하면 로딩 UI 추가 가능)
  if (!memberDto) return null;

  return (
    <div className="p-5">
      <div className="flex justify-between">
        {/* PostTiersKeys 배열로 반복문을 사용해 카드들을 렌더링 */}
        {PostTiersKeys.map(tier => (
          <DocBoardCard
            key={tier}
            tier={tier}
            link={`/board/document/tier/${tier.toLowerCase()}`}
            accessible={tierPermissions[tier]}
          />
        ))}
      </div>
    </div>
  );
}
