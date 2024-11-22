import Link from "next/link";
import Image from "next/image";

interface DocCategoryCardProps {
  title: string; // 게시판 카테고리 제목
  link: string; // 접근 가능한 경우 이동할 링크
  accessible: boolean; // 접근 가능 여부
}

export default function DocBoardCard({ title, link, accessible }: DocCategoryCardProps) {
  // 이미지 경로를 title에 따라 동적으로 설정
  const getImageSrc = () => {
    switch (title) {
      case "천민 게시판":
        return accessible ? "/icons/CheonminIcon.svg" : "/icons/CheonminIcon.svg";
      case "중인 게시판":
        return accessible ? "/icons/JunginIcon.svg" : "/icons/JunginIcon.svg";
      case "양반 게시판":
        return accessible ? "/icons/YangbanIcon.svg" : "/icons/YangbanIcon.svg";
      case "왕 게시판":
        return accessible ? "/icons/KingIcon.svg" : "/icons/KingIcon.svg";
      default:
        return "/icons/CheonminIcon.svg"; // 기본값을 설정하여 undefined 방지
    }
  };
  const imageSrc = getImageSrc();

  return (
    <div className="flex flex-col items-center space-y-2">
      {accessible ? (
        <Link href={link} className="rounded-full transition-transform hover:scale-105">
          <Image src={imageSrc} alt={title} width={66} height={66} className="rounded-full" />
        </Link>
      ) : (
        <div className="h-[66px] w-[66px] rounded-[14px] bg-gray-300 shadow-md">
          <p className="mt-1 text-center text-sm text-gray-400">접근 불가</p>
        </div>
        // 나중에 흑백사진 받아서 바꿔야 함.
      )}
      {/* 게시판 카테고리 제목 */}
      <span className={`font-pretendard-medium text-xs ${accessible ? "text-black" : "text-gray-400"}`}>{title}</span>
    </div>
  );
}
