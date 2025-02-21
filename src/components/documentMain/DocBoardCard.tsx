import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { PostTiers, PostTiersKey } from "@/types/postTiers";

interface DocCategoryCardProps {
  tier: PostTiersKey; // 게시판 카테고리 제목
  link: string; // 접근 가능한 경우 이동할 링크
  accessible: boolean; // 접근 가능 여부
}

export default function DocBoardCard({ tier, link, accessible }: DocCategoryCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  // 이미지 경로를 tier에 맞춰 동적으로 설정
  const getImageSrc = () => {
    return accessible ? `/icons/tier/${tier}Icon.svg` : `/icons/tier/${tier}Icon.svg`;
    // 추후 디자인 부탁해서 수정해야함
  };
  const getImageNoDurumariSrc = () => {
    return `/icons/tier/${tier}NoDurumari.svg`;
  };

  const imageSrc = getImageSrc();
  const imageNoDurumariSrc = getImageNoDurumariSrc();

  const handleCardClick = (e: React.MouseEvent) => {
    if (!accessible) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <>
      <div className="flex flex-col items-center space-y-2">
        <Link
          href={accessible ? link : "#"}
          onClick={handleCardClick}
          className="rounded-full transition-transform hover:scale-105"
        >
          <Image src={imageNoDurumariSrc} alt={tier} width={66} height={66} className="rounded-full" />
        </Link>
        {/* 게시판 카테고리 제목 */}
        <span className={`font-pretendard-medium text-xs ${accessible ? "text-black" : "text-gray-400"}`}>
          {PostTiers[tier].KR} 게시판 {/* PostTiers에서 KR 값 가져오기 */}
        </span>
      </div>

      {/* 제한 알림 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-[330px] rounded-lg bg-white p-6 shadow-md">
            {/* 닫기 버튼 */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            {/* 알림 이미지와 내용 */}
            <div className="flex flex-col items-center text-center">
              <Image src={imageSrc} alt={tier} width={170} height={170} className="mb-4 rounded-full" />
              <h1 className="font-pretendard-bold text-lg">게시판 입장 제한</h1>
              <p className="mt-2 text-sm text-gray-600">
                해당 게시판은 게시판 등급이 <span className="font-bold">{PostTiers[tier].KR} 이상</span>일 경우에만
                입장이 가능합니다
              </p>
              <button
                type="button"
                onClick={closeModal}
                className="hover:bg-custom-blue-600 mt-4 w-full rounded-[10px] bg-custom-blue-500 px-4 py-2 text-white"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
