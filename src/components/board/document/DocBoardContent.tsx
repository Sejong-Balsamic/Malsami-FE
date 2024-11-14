import useUserPermissions from "@/utils/useUserPermissions";
import DocCategoryCard from "./DocCategoryCard";

export default function DocBoardContent() {
  const { canAccessCheonmin, canAccessJungin, canAccessYangban, canAccessKing } = useUserPermissions();

  return (
    <div className="p-4">
      <div className="mt-4 flex justify-between">
        <DocCategoryCard title="천민 게시판" link="/board/document/cheonmin" accessible={canAccessCheonmin} />
        <DocCategoryCard title="중인 게시판" link="/board/document/jungin" accessible={canAccessJungin} />
        <DocCategoryCard title="양반 게시판" link="/board/document/yangban" accessible={canAccessYangban} />
        <DocCategoryCard title="왕 게시판" link="/board/document/king" accessible={canAccessKing} />
      </div>
    </div>
  );
}
