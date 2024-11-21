import useUserPermissions from "@/utils/useUserPermissions";
import DocBoardCard from "../DocBoardContent/DocBoardCard";

export default function DocBoardContent() {
  const { canAccessCheonmin, canAccessJungin, canAccessYangban, canAccessKing } = useUserPermissions();

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <DocBoardCard title="천민 게시판" link="/board/document/cheonmin" accessible={canAccessCheonmin} />
        <DocBoardCard title="중인 게시판" link="/board/document/jungin" accessible={canAccessJungin} />
        <DocBoardCard title="양반 게시판" link="/board/document/yangban" accessible={canAccessYangban} />
        <DocBoardCard title="왕 게시판" link="/board/document/king" accessible={canAccessKing} />
      </div>
    </div>
  );
}
