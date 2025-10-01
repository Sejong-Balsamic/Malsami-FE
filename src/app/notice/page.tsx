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
  // 고정 페이지 크기 - 10개로 고정
  const FIXED_PAGE_SIZE = 10;

  // 상태 선언
  const [isNoticeDataCurrentlyLoading, setIsNoticeDataCurrentlyLoading] = useState<boolean>(true);
  const [currentNoticePostsPageData, setCurrentNoticePostsPageData] = useState<Page<NoticePost> | null>(null);
  const [pinnedNoticePosts, setPinnedNoticePosts] = useState<NoticePost[]>([]);
  const [activePageNumber, setActivePageNumber] = useState<number>(0);
  const [noticeDataFetchErrorMessage, setNoticeDataFetchErrorMessage] = useState<string | null>(null);

  // 핀된 공지사항 가져오기
  const fetchPinnedNoticePosts = useCallback(async () => {
    try {
      const pinnedResponse = await noticePostApi.fetchPinnedNoticePosts();
      if (pinnedResponse.noticePosts) {
        setPinnedNoticePosts(pinnedResponse.noticePosts);
      }
    } catch (error) {
      console.error("핀된 공지사항을 불러오는데 실패했습니다:", error);
      // 핀된 공지사항 실패는 전체 로딩 실패로 처리하지 않음
    }
  }, []);

  // 공지사항 데이터 가져오기
  const fetchNoticePostsDataByPageNumber = useCallback(
    async (requestedPageNumber: number = 0) => {
      try {
        setIsNoticeDataCurrentlyLoading(true);
        setNoticeDataFetchErrorMessage(null);

        // 첫 페이지인 경우 핀된 공지사항도 함께 가져오기
        if (requestedPageNumber === 0) {
          await fetchPinnedNoticePosts();
        }

        const noticePostsApiResponse = await noticePostApi.fetchFilteredNoticePosts({
          pageNumber: requestedPageNumber,
          pageSize: FIXED_PAGE_SIZE,
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
    [FIXED_PAGE_SIZE, fetchPinnedNoticePosts],
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

        {/* 핀 고정 공지사항 (별도 API로 가져온 핀된 공지사항) */}
        {pinnedNoticePosts.length > 0 && (
          <>
            {pinnedNoticePosts.map((pinnedNotice, index) => (
              <div key={pinnedNotice.noticePostId || `pinned-${index}`} className="mb-3">
                <PinnedNoticeCard noticePost={pinnedNotice} />
              </div>
            ))}
            {/* 핀 공지사항과 일반 공지사항 사이 간격 */}
            <div className="h-2" />
          </>
        )}

        {/* 일반 공지사항 리스트 */}
        <div className="space-y-4">
          {currentNoticePostsPageData?.content?.map((noticePost, index) => (
            <NoticeCard key={noticePost.noticePostId || `notice-${index}`} noticePost={noticePost} />
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
