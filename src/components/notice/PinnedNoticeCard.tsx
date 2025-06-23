"use client";

import React from "react";
import Image from "next/image";
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
export default function PinnedNoticeCard({ 
  noticePost
}: PinnedNoticeCardProps) {
  // 1. 렌더링
  return (
    <div className="w-full h-16 flex items-center justify-between p-4 cursor-pointer hover:opacity-90 transition-opacity rounded-2xl bg-[#D9FFD4] flex-shrink-0">
      {/* 왼쪽 영역: 흰색 원 + 핀 아이콘 + 제목 */}
      <div className="flex items-center space-x-2.5 flex-1 min-w-0">
        {/* 흰색 원 + 핀 아이콘 */}
        <div className="w-11 h-11 flex items-center justify-center rounded-full bg-white shadow-sm flex-shrink-0">
          <Image
            src="/icons/pushPin.svg"
            alt="고정됨"
            width={24}
            height={24}
          />
        </div>
        
        {/* 제목 */}
        <div className="flex-1 min-w-0">
          <h3 className="font-suit-bold text-sm text-black leading-5 truncate">
            {noticePost.title || "중요 공지사항"}
          </h3>
          <p className="font-suit-medium text-xs text-gray-600 leading-4 truncate">
            {noticePost.content?.slice(0, 20) || "공지사항 내용"}...
          </p>
        </div>
      </div>

      {/* 오른쪽 영역: 화살표 (NoticeSection과 동일) */}
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#37E36D] text-white transition-colors hover:opacity-90 flex-shrink-0 ml-2">
        <Image 
          src="/icons/arrowRight.svg" 
          alt="오른쪽 화살표" 
          width={13} 
          height={13} 
        />
      </div>
    </div>
  );
} 