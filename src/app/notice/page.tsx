"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  // 1. 고정 페이지 크기 - 10개로 고정
  const fixedPageSize = 10;

  // 2. 상태 선언
  const [isNoticeDataCurrentlyLoading, setIsNoticeDataCurrentlyLoading] = useState<boolean>(true);
  const [currentNoticePostsPageData, setCurrentNoticePostsPageData] = useState<Page<NoticePost> | null>(null);
  const [pinnedNoticePostData, setPinnedNoticePostData] = useState<NoticePost | null>(null);
  const [activePageNumber, setActivePageNumber] = useState<number>(0);
  const [noticeDataFetchErrorMessage, setNoticeDataFetchErrorMessage] = useState<string | null>(null);

  // 3. 공지사항 데이터 가져오기
  const fetchNoticePostsDataByPageNumber = useCallback(
    async (requestedPageNumber: number = 0) => {
      try {
        setIsNoticeDataCurrentlyLoading(true);
        setNoticeDataFetchErrorMessage(null);

        const noticePostsApiResponse = await noticePostApi.getFilteredNoticePosts({
          pageNumber: requestedPageNumber,
          pageSize: fixedPageSize, // 10개 고정
          sortType: "LATEST",
        });

        setCurrentNoticePostsPageData(noticePostsApiResponse.noticePostsPage || null);
        setActivePageNumber(requestedPageNumber);

        // FIXME: 첫 페이지일 때 첫 번째 공지사항을 핀 고정으로 설정 (임시)
        if (
          requestedPageNumber === 0 &&
          noticePostsApiResponse.noticePostsPage?.content &&
          noticePostsApiResponse.noticePostsPage.content.length > 0
        ) {
          setPinnedNoticePostData(noticePostsApiResponse.noticePostsPage.content[0]);
        }
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

  // 4. 페이지 변경 요청 핸들러
  const handlePageChangeRequest = (requestedNewPageNumber: number) => {
    fetchNoticePostsDataByPageNumber(requestedNewPageNumber);
  };

  // 5. useEffect - 초기 데이터 로드
  useEffect(() => {
    fetchNoticePostsDataByPageNumber(0);
  }, [fetchNoticePostsDataByPageNumber]);

  // 6. 로딩 상태 렌더링
  if (isNoticeDataCurrentlyLoading) {
    return (
      <div className="relative mx-auto w-full max-w-[640px]">
        <CommonHeader title="공지사항" rightType={RIGHT_ITEM.NONE} />
        <div className="px-6">
          <NoticeListSkeleton />
        </div>
      </div>
    );
  }

  // 7. 에러 상태 렌더링
  if (noticeDataFetchErrorMessage) {
    return (
      <div className="relative mx-auto w-full max-w-[640px]">
        <CommonHeader title="공지사항" rightType={RIGHT_ITEM.NONE} />
        <div className="flex h-[calc(100vh-64px)] flex-col items-center justify-center px-6">
          <p className="font-suit-medium mb-4 text-lg text-foreground">오류가 발생했습니다</p>
          <p className="font-pretendard-regular text-center text-sm text-muted-foreground">
            {noticeDataFetchErrorMessage}
          </p>
        </div>
      </div>
    );
  }

  // 8. 빈 상태 렌더링
  if (!currentNoticePostsPageData?.content || currentNoticePostsPageData.content.length === 0) {
    return (
      <div className="relative mx-auto w-full max-w-[640px]">
        <CommonHeader title="공지사항" rightType={RIGHT_ITEM.NONE} />
        <div className="flex h-[calc(100vh-64px)] flex-col items-center justify-center px-6">
          <p className="font-suit-medium mb-4 text-lg text-foreground">공지사항이 없습니다</p>
          <p className="font-pretendard-regular text-sm text-muted-foreground">아직 등록된 공지사항이 없습니다.</p>
        </div>
      </div>
    );
  }

  // 9. 메인 렌더링
  return (
    <div className="relative mx-auto min-h-screen w-full max-w-[640px] bg-background">
      <CommonHeader title="공지사항" rightType={RIGHT_ITEM.NONE} />

      <div className="px-5">
        {/* 헤더 기준 20px 간격 */}
        <div className="h-5" />

        {/* 핀 고정 공지사항 (최상단) */}
        {pinnedNoticePostData && (
          <>
            <PinnedNoticeCard noticePost={pinnedNoticePostData} />
            {/* 핀 공지사항과 일반 공지사항 사이 20px 간격 */}
            <div className="h-5" />
          </>
        )}

        {/* 일반 공지사항 리스트 */}
        {currentNoticePostsPageData.content.map((currentNoticePost, cardIndex) => (
          <div key={currentNoticePost.noticePostId || `notice-${cardIndex}`}>
            <NoticeCard noticePost={currentNoticePost} />
            {/* 구분선 아래 16px 간격 */}
            {cardIndex < currentNoticePostsPageData.content!.length - 1 && <div className="h-4" />}
          </div>
        ))}

        {/* 일반 공지사항과 페이지네이션 사이 40px 간격 */}
        <div className="h-10" />

        {/* 페이지네이션 - 페이지가 1개라도 항상 표시 */}
        <CommonPagination
          currentPage={activePageNumber}
          totalPages={Math.max(currentNoticePostsPageData.totalPages, 1)}
          onPageChange={handlePageChangeRequest}
        />

        {/* 하단 여백 */}
        <div className="h-6" />
      </div>
    </div>
  );
}
