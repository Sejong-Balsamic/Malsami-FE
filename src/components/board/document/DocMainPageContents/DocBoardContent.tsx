import useUserPermissions from "@/utils/useUserPermissions";
import DocBoardCard from "./DocBoardCard";

export default function DocBoardContent() {
  const { canAccessCheonmin, canAccessJungin, canAccessYangban, canAccessKing } = useUserPermissions();

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <DocBoardCard title="천민" link="/board/document/tier/cheonmin" accessible={canAccessCheonmin} />
        <DocBoardCard title="중인" link="/board/document/tier/jungin" accessible={canAccessJungin} />
        <DocBoardCard title="양반" link="/board/document/tier/yangban" accessible={canAccessYangban} />
        <DocBoardCard title="왕" link="/board/document/tier/king" accessible={canAccessKing} />
      </div>
    </div>
  );
}
