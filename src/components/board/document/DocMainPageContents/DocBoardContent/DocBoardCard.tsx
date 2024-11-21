import Link from "next/link";

interface DocCategoryCardProps {
  title: string; // 게시판 카테고리 제목
  link: string; // 접근 가능한 경우 이동할 링크
  accessible: boolean; // 접근 가능 여부
}

export default function DocBoardCard({ title, link, accessible }: DocCategoryCardProps) {
  return (
    <div className="flex flex-col items-center space-y-2">
      {accessible ? (
        <Link href={link}>
          <div className="h-[66px] w-[66px] rounded-[14px] bg-[#D9D9D9] shadow-md transition-shadow hover:shadow-lg" />
        </Link>
      ) : (
        <div className="h-[66px] w-[66px] rounded-[14px] bg-gray-300 shadow-md">
          <p className="mt-1 text-center text-sm text-gray-400">접근 불가</p>
        </div>
      )}
      {/* 게시판 카테고리 제목 */}
      <span className={`font-pretendard-medium text-xs ${accessible ? "text-black" : "text-gray-400"}`}>{title}</span>
    </div>
  );
}
