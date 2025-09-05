"use client";

import React from "react";
import Image from "next/image";
import { NoticePost } from "@/types/api/entities/postgres/noticePost";

interface NoticeCardProps {
  notice: NoticePost;
  onClick: () => void;
}

export default function NoticeCard({ notice, onClick }: NoticeCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <article
      className="h-33 flex w-72 cursor-pointer flex-col rounded-lg bg-white shadow-card-custom transition-all duration-200 hover:shadow-lg"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {/* 상단: 제목 */}
      <div className="mx-4 mt-4">
        <h3 className="line-clamp-1 text-SUIT_16 font-semibold text-gray-900">{notice.title || "공지사항 제목"}</h3>
      </div>

      {/* 중간: 본문 내용 (2줄) */}
      <div className="mx-4 mb-3 mt-2 flex-1">
        <p className="line-clamp-2 text-SUIT_14 font-normal leading-5 text-ui-body">
          {notice.content || "공지사항 내용입니다."}
        </p>
      </div>

      {/* 하단: 좋아요, 조회수 정보 */}
      <div className="mx-4 mb-4 flex items-center justify-end gap-4">
        {/* 좋아요 */}
        <div className="flex items-center gap-1">
          <Image src="/icons/newLikeThumbGray.svg" alt="좋아요" width={14} height={14} />
          <span className="text-SUIT_12 font-medium text-ui-muted">{notice.likeCount || 0}</span>
        </div>

        {/* 조회수 */}
        <div className="flex items-center gap-1">
          <Image src="/icons/viewEyeGray.svg" alt="조회수" width={14} height={14} />
          <span className="text-SUIT_12 font-medium text-ui-muted">{notice.viewCount || 0}</span>
        </div>
      </div>
    </article>
  );
}
