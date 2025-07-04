"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Header from "@/components/header/Header";
import DocumentCardList from "@/components/documentMain/DocumentCardList";
import CommonPagination from "@/components/common/CommonPagination";
import DocumentFilteringBottomSheet from "@/components/common/DocumentFilteringBottomSheet";
import { LEFT_ITEM, RIGHT_ITEM } from "@/types/header";
import { documentPostApi } from "@/apis/documentPostApi";
import { DocumentPost } from "@/types/api/entities/postgres/documentPost";
import { DocumentCommand } from "@/types/api/requests/documentCommand";
import { setDocumentFilteringOpen } from "@/global/store/bottomSheetSlice";
import { SortType } from "@/types/api/constants/sortType";

export default function HotDownloadPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  // 상태 관리
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [documentData, setDocumentData] = useState<DocumentPost[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  // 현재 적용된 필터링 상태
  const [currentFiltering, setCurrentFiltering] = useState<Partial<DocumentCommand>>({
    sortType: SortType.DOWNLOAD_COUNT,
    documentTypes: [],
  });

  // 데이터 로드 함수
  const fetchHotDownloadDocuments = useCallback(async (
    page: number = 0,
    filtering: Partial<DocumentCommand> = currentFiltering,
  ) => {
    setIsLoading(true);
    try {
      const response = await documentPostApi.getHotDownload({
        pageNumber: page,
        pageSize: 10,
        ...filtering,
      });

      if (response && response.documentPostsPage) {
        setDocumentData(response.documentPostsPage.content || []);
        setTotalPages(response.documentPostsPage.totalPages || 0);
      }
    } catch (error) {
      setDocumentData([]);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  }, [currentFiltering]);

  // 데이터 로드
  useEffect(() => {
    fetchHotDownloadDocuments(currentPage);
  }, [currentPage, fetchHotDownloadDocuments]);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleBackClick = () => {
    router.back();
  };

  // 필터링 핸들러들
  const handleDocumentConfirm = async (filtering: Partial<DocumentCommand>) => {
    // 필터링 상태 업데이트하고 API 호출
    // 항상 다운로드 수 기준 정렬 유지
    const updatedFiltering = { ...filtering, sortType: SortType.DOWNLOAD_COUNT };
    setCurrentFiltering(updatedFiltering);
    setCurrentPage(0);
    await fetchHotDownloadDocuments(0, updatedFiltering);
  };

  const handleFilterReset = () => {
    // API 호출하지 않고 BottomSheet 내부만 초기화
    // BottomSheet 컴포넌트에서 로컬 상태만 초기화됨
  };

  // 오른쪽 메뉴 아이콘 클릭 핸들러
  const handleMenuClick = () => {
    dispatch(setDocumentFilteringOpen(true));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="fixed top-0 z-50 w-full max-w-[640px] bg-white">
        <Header
          title="인기 다운로드"
          leftType={LEFT_ITEM.BACK}
          rightType={RIGHT_ITEM.MENU}
          onLeftClick={handleBackClick}
          onRightClick={handleMenuClick}
        />
      </div>

      {/* 헤더 높이만큼 스페이서 (4rem) */}
      <div className="h-16 w-full" />

      {/* 메인 콘텐츠 */}
      <div className="px-5">
        {/* 24px 공백 */}
        <div className="h-6" />

        {/* 자료 리스트 */}
        <div className="w-full bg-white">
          {isLoading && (
            <div className="flex h-40 items-center justify-center">
              <span className="text-SUIT_14 font-medium text-[#C5C5C5]">로딩 중...</span>
            </div>
          )}
          {!isLoading && documentData.length > 0 && <DocumentCardList data={documentData} />}
          {!isLoading && documentData.length === 0 && (
            <div className="flex h-40 items-center justify-center">
              <span className="text-SUIT_14 font-medium text-[#C5C5C5]">표시할 인기 다운로드 자료가 없습니다.</span>
            </div>
          )}
        </div>

        {/* 24px 공백 */}
        <div className="h-6" />

        {/* 페이지네이션 */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center">
            <CommonPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        )}

        {/* 61px 하단 여백 (모바일 탭바 고려) */}
        <div className="h-[61px]" />
      </div>

      {/* DocumentFilteringBottomSheet */}
      <DocumentFilteringBottomSheet
        onReset={handleFilterReset}
        onConfirm={handleDocumentConfirm}
        currentFiltering={currentFiltering}
        trigger={<div />} // 빈 트리거 (Header의 메뉴 버튼으로 제어)
        activeColor="#00D1F2" // 파란색 테마
      />
    </div>
  );
}
