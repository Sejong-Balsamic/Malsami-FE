import useUserPermissions from "@/utils/useUserPermissions";
import { PostTiersKeys } from "@/lib/constants/postTiers"; // PostTiers와 PostTiersKeys 가져오기
import DocBoardCard from "./DocBoardCard";

export default function DocBoardContent() {
  const { canAccessCheonmin, canAccessJungin, canAccessYangban, canAccessKing } = useUserPermissions();

  // 권한 객체를 만들어서 PostTiersKeys와 연결
  const permissions = {
    CHEONMIN: canAccessCheonmin,
    JUNGIN: canAccessJungin,
    YANGBAN: canAccessYangban,
    KING: canAccessKing,
  };

  return (
    <div className="p-5">
      <div className="flex justify-between">
        {/* PostTiersKeys 배열로 반복문을 사용해 카드들을 렌더링 */}
        {PostTiersKeys.map(tier => (
          <DocBoardCard
            key={tier}
            tier={tier}
            link={`/board/document/tier/${tier.toLowerCase()}`}
            accessible={permissions[tier]}
          />
        ))}
      </div>
    </div>
  );
}
