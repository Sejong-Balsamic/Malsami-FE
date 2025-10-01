"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import CommonHeader from "@/components/header/CommonHeader";
import { RIGHT_ITEM } from "@/types/header";
import { noticePostApi } from "@/apis/noticePostApi";
import { NoticePost } from "@/types/api/entities/postgres/noticePost";
import { Page } from "@/types/api/entities/interface/page";
import NoticeCard from "@/components/notice/NoticeCard";
import PinnedNoticeCard from "@/components/notice/PinnedNoticeCard";
import CommonPagination from "@/components/common/CommonPagination";
import NoticeListSkeleton from "@/components/common/skeletons/NoticeListSkeleton";

export default function NoticePage() {
  // 고정 페이지 크기 - 10개로 고정
  const fixedPageSize = 10;

  // 상태 선언
  const [isNoticeDataCurrentlyLoading, setIsNoticeDataCurrentlyLoading] = useState<boolean>(true);
  const [currentNoticePostsPageData, setCurrentNoticePostsPageData] = useState<Page<NoticePost> | null>(null);
  const [activePageNumber, setActivePageNumber] = useState<number>(0);
  const [noticeDataFetchErrorMessage, setNoticeDataFetchErrorMessage] = useState<string | null>(null);

  // isPinned가 true인 공지사항과 일반 공지사항 분리
  const { pinnedNotices, regularNotices } = useMemo(() => {
    if (!currentNoticePostsPageData?.content) {
      return { pinnedNotices: [], regularNotices: [] };
    }

    const pinned = currentNoticePostsPageData.content.filter(notice => notice.isPinned === true);
    const regular = currentNoticePostsPageData.content.filter(notice => notice.isPinned !== true);

    return { pinnedNotices: pinned, regularNotices: regular };
  }, [currentNoticePostsPageData]);

  // 공지사항 데이터 가져오기
  const fetchNoticePostsDataByPageNumber = useCallback(
    async (requestedPageNumber: number = 0) => {
      try {
        setIsNoticeDataCurrentlyLoading(true);
        setNoticeDataFetchErrorMessage(null);

        const noticePostsApiResponse = await noticePostApi.getFilteredNoticePosts({
          pageNumber: requestedPageNumber,
          pageSize: fixedPageSize,
          sortType: "LATEST",
        });

        setCurrentNoticePostsPageData(noticePostsApiResponse.noticePostsPage || null);
        setActivePageNumber(requestedPageNumber);
      } catch (apiError) {
        setNoticeDataFetchErrorMessage(
          apiError instanceof Error ? apiError.message : "공지사항을 불러오는데 실패했습니다.",
        );
      } finally {
        setIsNoticeDataCurrentlyLoading(false);
      }
    },
    [fixedPageSize],
  );

  // 페이지 변경 요청 핸들러
  const handlePageChangeRequest = (requestedNewPageNumber: number) => {
    fetchNoticePostsDataByPageNumber(requestedNewPageNumber);
  };

  // useEffect - 초기 데이터 로드
  useEffect(() => {
    fetchNoticePostsDataByPageNumber(0);
  }, [fetchNoticePostsDataByPageNumber]);

  // 로딩 상태 렌더링
  if (isNoticeDataCurrentlyLoading) {
    return (
      <div className="relative mx-auto w-full max-w-[640px]">
        <CommonHeader title="공지사항" rightType={RIGHT_ITEM.NONE} />
        <div className="px-5">
          <NoticeListSkeleton />
        </div>
      </div>
    );
  }

  // 에러 상태 렌더링
  if (noticeDataFetchErrorMessage) {
    return (
      <div className="relative mx-auto w-full max-w-[640px]">
        <CommonHeader title="공지사항" rightType={RIGHT_ITEM.NONE} />
        <div className="flex h-[calc(100vh-64px)] flex-col items-center justify-center px-5">
          <p className="mb-4 text-SUIT_18 font-semibold text-black">오류가 발생했습니다</p>
          <p className="text-center text-SUIT_14 font-medium text-ui-muted">{noticeDataFetchErrorMessage}</p>
        </div>
      </div>
    );
  }

  // 빈 상태 렌더링
  if (!currentNoticePostsPageData?.content || currentNoticePostsPageData.content.length === 0) {
    return (
      <div className="relative mx-auto w-full max-w-[640px]">
        <CommonHeader title="공지사항" rightType={RIGHT_ITEM.NONE} />
        <div className="flex h-[calc(100vh-64px)] flex-col items-center justify-center px-5">
          <p className="mb-4 text-SUIT_18 font-semibold text-black">공지사항이 없습니다</p>
          <p className="text-SUIT_14 font-medium text-ui-muted">아직 등록된 공지사항이 없습니다.</p>
        </div>
      </div>
    );
  }

  // 메인 렌더링
  return (
    <div className="relative mx-auto min-h-screen w-full max-w-[640px] bg-white">
      <CommonHeader title="공지사항" rightType={RIGHT_ITEM.NONE} />

      <div className="px-5">
        {/* 헤더 아래 20px 간격 */}
        <div className="h-5" />

        {/* 핀 고정 공지사항 (isPinned: true) */}
        {pinnedNotices.length > 0 && (
          <>
            {pinnedNotices.map(pinnedNotice => (
              <div key={pinnedNotice.noticePostId} className="mb-3">
                <PinnedNoticeCard noticePost={pinnedNotice} />
              </div>
            ))}
            {/* 핀 공지사항과 일반 공지사항 사이 간격 */}
            <div className="h-2" />
          </>
        )}

        {/* 일반 공지사항 리스트 */}
        <div className="space-y-4">
          {regularNotices.map(noticePost => (
            <NoticeCard key={noticePost.noticePostId} noticePost={noticePost} />
          ))}
        </div>

        {/* 페이지네이션 위 간격 */}
        <div className="h-10" />

        {/* 페이지네이션 */}
        <CommonPagination
          currentPage={activePageNumber}
          totalPages={Math.max(currentNoticePostsPageData.totalPages, 1)}
          onPageChange={handlePageChangeRequest}
        />

        {/* 하단 여백 */}
        <div className="h-8" />
      </div>
    </div>
  );
}
