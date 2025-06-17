"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { noticePostApi } from "@/apis/noticePostApi";
import { NoticePost } from "@/types/api/entities/postgres/noticePost";

interface NoticeSectionProps {
  // eslint-disable-next-line react/require-default-props
  onViewAll?: () => void;
}

export default function NoticeSection({ onViewAll }: NoticeSectionProps) {
  const router = useRouter();
  const [latestNotice, setLatestNotice] = useState<NoticePost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNotice = async () => {
      try {
        const response = await noticePostApi.getFilteredNoticePosts({
          pageNumber: 0,
          pageSize: 1,
          sortType: "LATEST",
        });

        if (response.noticePostsPage?.content && response.noticePostsPage.content.length > 0) {
          setLatestNotice(response.noticePostsPage.content[0]);
        }
      } catch (error) {
        // 공지사항을 불러오는 중 오류가 발생했습니다
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestNotice();
  }, []);

  const handleNoticeClick = () => {
    if (onViewAll) {
      onViewAll();
    } else {
      router.push("/notice");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleNoticeClick();
    }
  };

  if (isLoading) {
    return (
      <div className="mb-8 animate-pulse rounded-[12px] bg-[#D9FFD4] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-white shadow-sm" />
            <div>
              <div className="mb-1 h-[20px] w-16 rounded bg-white/50" />
              <div className="h-[20px] w-48 rounded bg-white/50" />
            </div>
          </div>
          <div className="h-8 w-8 rounded-full bg-[#37E36D]" />
        </div>
      </div>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className="mb-8 cursor-pointer rounded-[12px] bg-[#D9FFD4] p-4 transition-all duration-200 hover:shadow-md"
      onClick={handleNoticeClick}
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* 확성기 아이콘 */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <Image src="/icons/Megaphone.svg" alt="공지사항" width={30} height={30} className="text-orange-500" />
          </div>

          <div className="flex-1">
            <h3 className="font-suit-bold mb-1 text-sm leading-5 text-black">공지사항</h3>
            <p className="font-suit-medium line-clamp-1 text-sm leading-5 text-[#252525]">
              {latestNotice?.title || "자료 업로드 방식이 변경되었어요!"}
            </p>
          </div>
        </div>

        {/* 화살표 아이콘 */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#37E36D] text-white transition-colors hover:opacity-90">
          <Image src="/icons/arrowRight.svg" alt="오른쪽 화살표" width={13} height={13} />
        </div>
      </div>
    </div>
  );
}
