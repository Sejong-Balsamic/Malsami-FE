"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { noticePostApi } from "@/apis/noticePostApi";
import { NoticePost } from "@/types/api/entities/postgres/noticePost";
import MovingCardNotice from "@/components/common/MovingCardNotice";
import MovingNoticeCardSkeleton from "@/components/common/skeletons/MovingNoticeCardSkeleton";

interface NoticeSectionProps {
  onViewAll: () => void;
}

// 목 데이터 생성 함수
const generateMockNoticeData = (count: number = 10): NoticePost[] => {
  return Array.from({ length: count }, (_, i) => ({
    noticePostId: `mock-notice-${i}`,
    title: `공지사항 제목 ${i + 1}: 중요한 내용을 알려드립니다`,
    content: `공지사항 ${i + 1}의 내용입니다. 학생 여러분께 중요한 정보를 안내드리며, 자세한 내용은 본문을 확인해 주시기 바랍니다. 많은 관심 부탁드립니다.`,
    likeCount: 5 + Math.floor(Math.random() * 20),
    viewCount: 50 + Math.floor(Math.random() * 200),
    createdDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
    isLiked: false,
    isHidden: false,
  }));
};

// 목 데이터
const MOCK_NOTICE_DATA = generateMockNoticeData(10);

export default function NoticeSection({ onViewAll }: NoticeSectionProps) {
  const [notices, setNotices] = useState<NoticePost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNotices = async () => {
      setIsLoading(true);
      try {
        const response = await noticePostApi.fetchFilteredNoticePosts({
          pageNumber: 0,
          pageSize: 10,
          sortType: "LATEST",
        });

        if (
          response &&
          response.noticePostsPage &&
          response.noticePostsPage.content &&
          response.noticePostsPage.content.length > 0
        ) {
          setNotices(response.noticePostsPage.content);
        } else {
          // API 응답이 비어있으면 목 데이터 사용
          setNotices(MOCK_NOTICE_DATA);
        }
      } catch (error) {
        // API 호출 실패 시 목 데이터 사용
        setNotices(MOCK_NOTICE_DATA);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div>
      {/* 헤더 영역: 제목, 전체보기 */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/icons/noticeMegaphone.svg" alt="공지사항" width={24} height={24} />
          <h2 className="ml-2 text-SUIT_18 font-medium">공지사항</h2>
        </div>

        {/* 전체보기 링크 */}
        <button
          type="button"
          onClick={onViewAll}
          className="flex-shrink-0 whitespace-nowrap text-SUIT_14 font-medium text-ui-muted"
        >
          전체보기
        </button>
      </div>

      {/* 카드 스와이핑 영역 */}
      {/* 로딩 중일 때 스켈레톤 표시 */}
      {isLoading && <MovingNoticeCardSkeleton />}
      {/* 데이터가 있을 때 MovingCardNotice 컴포넌트 렌더링 */}
      {!isLoading && notices.length > 0 && <MovingCardNotice data={notices} />}
      {/* 데이터가 없을 때 표시되는 메시지 */}
      {!isLoading && notices.length === 0 && (
        <div className="h-33 flex w-full items-center justify-center">
          <span>표시할 공지사항이 없습니다.</span>
        </div>
      )}
    </div>
  );
}
