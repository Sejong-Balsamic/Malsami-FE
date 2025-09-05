"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { NoticePost } from "@/types/api/entities/postgres/noticePost";
import { getDateDiff } from "@/global/time";

interface NoticeCardProps {
  noticePost: NoticePost;
}

/**
 * 공지사항 카드 컴포넌트
 *
 * @param noticePost - 공지사항 데이터
 */
export default function NoticeCard({ noticePost }: NoticeCardProps) {
  const router = useRouter();

  // 1. 시간 문자열 생성
  const timeString = noticePost.createdDate ? getDateDiff(noticePost.createdDate) : "";

  // 2. 클릭 핸들러 - 공지사항 전체보기 페이지로 이동
  const handleCardClick = () => {
    router.push("/notice");
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCardClick();
    }
  };

  // 3. 렌더링
  return (
    <div
      className="-m-2 w-full cursor-pointer rounded-md p-2 transition-all duration-200 hover:bg-gray-50"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {/* 제목과 시간 - 첫 번째 줄 */}
      <div className="flex items-start justify-between">
        {/* 제목 */}
        <h3 className="font-suit-semibold mr-3 line-clamp-1 w-[272px] flex-1 text-sm leading-5 text-black">
          {noticePost.title || "제목 없음"}
        </h3>

        {/* 시간 */}
        <span className="font-suit-medium line-clamp-1 flex-shrink-0 text-xs leading-5 text-[#D1D1D1]">
          {timeString}
        </span>
      </div>

      {/* 제목과 본문 사이 4px 간격 */}
      <div className="h-1" />

      {/* 본문 내용 - 두 번째 줄 */}
      <div>
        <p className="font-suit-medium h-5 w-full truncate text-sm leading-5 text-[#929292]">
          {noticePost.content || "내용 없음"}
        </p>
      </div>

      {/* 본문과 좋아요 사이 4px 간격 */}
      <div className="h-1" />

      {/* 좋아요 - 세 번째 줄, 무조건 파랑색으로 표시 */}
      <div className="flex items-center">
        <div className="flex items-center gap-[6px]">
          {/* 좋아요 SVG 아이콘 */}
          <Image src="/icons/newLikeThumbGreen.svg" alt="좋아요" width={14} height={14} className="flex-shrink-0" />

          {/* 좋아요 개수 - 무조건 파랑색 */}
          <span className="font-suit-medium truncate text-sm leading-5 text-[#08E4BA]">
            {noticePost.likeCount ?? 0}
          </span>
        </div>
      </div>

      {/* 좋아요 아래 16px 후 구분선 */}
      <div className="h-4" />

      {/* 구분선 */}
      <div className="h-0.5 w-full rounded bg-[#F3F3F3]" />
    </div>
  );
}
