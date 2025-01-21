import useUserPermissions from "@/utils/useUserPermissions";
import DocBoardCard from "./DocBoardCard";

export default function DocBoardContent() {
  const { canAccessCheonmin, canAccessJungin, canAccessYangban, canAccessKing } = useUserPermissions();

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <DocBoardCard title="CHEONMIN" link="/board/document/tier/cheonmin" accessible={canAccessCheonmin} />
        <DocBoardCard title="JUNGIN" link="/board/document/tier/jungin" accessible={canAccessJungin} />
        <DocBoardCard title="YANGBAN" link="/board/document/tier/yangban" accessible={canAccessYangban} />
        <DocBoardCard title="KING" link="/board/document/tier/king" accessible={canAccessKing} />
      </div>
    </div>
  );
}
