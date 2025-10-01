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
 * 제목, 내용, 좋아요, 조회수를 표시
 *
 * @param noticePost - 공지사항 데이터
 */
export default function NoticeCard({ noticePost }: NoticeCardProps) {
  const router = useRouter();

  // 시간 문자열 생성
  const timeString = noticePost.createdDate ? getDateDiff(noticePost.createdDate) : "";

  // 클릭 핸들러 - 공지사항 상세 페이지로 이동
  const handleCardClick = () => {
    router.push(`/notice/${noticePost.noticePostId}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCardClick();
    }
  };

  return (
    <div className="w-full">
      <div
        className="w-full cursor-pointer transition-all duration-200 hover:bg-gray-50"
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        {/* 제목과 시간 */}
        <div className="flex items-center justify-between">
          <h3 className="line-clamp-1 flex-1 text-SUIT_14 font-semibold leading-tight text-black">
            {noticePost.title || "제목 없음"}
          </h3>
          <span className="ml-2 flex-shrink-0 text-SUIT_12 font-medium text-ui-muted">{timeString}</span>
        </div>

        {/* 8px 간격 */}
        <div className="h-2" />

        {/* 본문 내용 (2줄 제한) */}
        <p className="line-clamp-2 text-SUIT_14 font-medium leading-relaxed text-gray-600">
          {noticePost.content || "내용 없음"}
        </p>

        {/* 12px 간격 */}
        <div className="h-3" />

        {/* 좋아요, 조회수 */}
        <div className="flex items-center gap-4">
          {/* 좋아요 */}
          <div className="flex items-center gap-1.5">
            <Image src="/icons/newLikeThumbGray.svg" alt="좋아요" width={14} height={14} className="flex-shrink-0" />
            <span className="text-SUIT_12 font-medium text-ui-muted">{noticePost.likeCount ?? 0}</span>
          </div>

          {/* 조회수 */}
          <div className="flex items-center gap-1.5">
            <Image src="/icons/viewEyeGray.svg" alt="조회수" width={14} height={14} className="flex-shrink-0" />
            <span className="text-SUIT_12 font-medium text-ui-muted">{noticePost.viewCount ?? 0}</span>
          </div>
        </div>
      </div>

      {/* 16px 간격 */}
      <div className="h-4" />

      {/* 구분선 */}
      <div className="h-px w-full rounded-sm bg-gray-200" />
    </div>
  );
}
