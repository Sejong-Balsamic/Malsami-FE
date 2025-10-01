"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { NoticePost } from "@/types/api/entities/postgres/noticePost";

interface PinnedNoticeCardProps {
  noticePost: NoticePost;
}

/**
 * 핀으로 고정된 공지사항 카드 컴포넌트
 * isPinned: true인 공지사항을 상단에 표시
 *
 * @param noticePost - 공지사항 데이터
 */
export default function PinnedNoticeCard({ noticePost }: PinnedNoticeCardProps) {
  const router = useRouter();

  // 클릭 핸들러 - 공지사항 상세 페이지로 이동
  const handleCardClick = () => {
    router.push(`/notice/${noticePost.noticePostId}`);
  };

  return (
    <div
      className="flex w-full cursor-pointer items-center gap-3 rounded-xl bg-blue-50 p-4 transition-all hover:bg-blue-100"
      onClick={handleCardClick}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`고정된 공지: ${noticePost.title ?? "제목 없음"}`}
    >
      {/* 핀 아이콘 */}
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white">
        <Image src="/icons/pushpinBlue.svg" alt="고정" width={20} height={20} />
      </div>

      {/* 텍스트 영역 */}
      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-1 text-SUIT_14 font-semibold leading-tight text-black">
          {noticePost.title || "제목 없음"}
        </h3>
        <p className="mt-1 line-clamp-1 text-SUIT_12 font-medium text-gray-600">{noticePost.content || "내용 없음"}</p>
      </div>

      {/* 화살표 아이콘 */}
      <Image src="/icons/arrowRight.svg" alt="이동" width={16} height={16} className="flex-shrink-0 opacity-60" />
    </div>
  );
}
