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
 * NoticeSection과 동일한 스타일 적용
 *
 * @param noticePost - 공지사항 데이터
 */
export default function PinnedNoticeCard({ noticePost }: PinnedNoticeCardProps) {
  const router = useRouter();

  // 1. 클릭 핸들러 - 공지사항 전체보기 페이지로 이동
  const handleCardClick = () => {
    router.push("/notice");
  };

  // 2. 렌더링
  return (
    <button
      type="button"
      aria-label="공지사항 전체보기"
      className="flex h-16 w-full flex-shrink-0 cursor-pointer items-center justify-between rounded-2xl bg-green-100 p-4 transition-opacity hover:opacity-90"
      onClick={handleCardClick}
    >
      {/* 왼쪽 영역: 흰색 원 + 핀 아이콘 + 제목 */}
      <div className="flex min-w-0 flex-1 items-center space-x-2.5">
        {/* 흰색 원 + 핀 아이콘 */}
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
          <Image src="/icons/pushPin.svg" alt="고정됨" width={24} height={24} />
        </div>

        {/* 제목 */}
        <div className="min-w-0 flex-1">
          <h3 className="font-suit-bold truncate text-sm leading-5 text-black">
            {noticePost.title || "중요 공지사항"}
          </h3>
          <p className="font-suit-medium truncate text-xs leading-4 text-gray-600">
            {noticePost.content?.slice(0, 20) || "공지사항 내용"}...
          </p>
        </div>
      </div>

      {/* 오른쪽 영역: 화살표 (NoticeSection과 동일) */}
      <div className="ml-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-white transition-colors hover:opacity-90">
        <Image src="/icons/arrowRight.svg" alt="오른쪽 화살표" width={13} height={13} />
      </div>
    </button>
  );
}
