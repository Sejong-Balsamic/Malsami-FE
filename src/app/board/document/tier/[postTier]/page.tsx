"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Header from "@/components/header/Header";
import DocumentCardList from "@/components/documentMain/DocumentCardList";
import CommonPagination from "@/components/common/CommonPagination";
import DocumentFilteringBottomSheet from "@/components/common/DocumentFilteringBottomSheet";
import { LEFT_ITEM, RIGHT_ITEM } from "@/types/header";
import { documentPostApi } from "@/apis/documentPostApi";
import { DocumentPost } from "@/types/api/entities/postgres/documentPost";
import { DocumentCommand } from "@/types/api/requests/documentCommand";
import { setDocumentFilteringOpen } from "@/global/store/bottomSheetSlice";
import { PostTier } from "@/types/api/constants/postTier";
import useUserPermissions from "@/global/useUserPermissions";
import { PostTiers } from "@/types/postTiers";

// 티어 표시 매핑
const TIER_DISPLAY_NAME: Record<string, string> = {
  CHEONMIN: "천민",
  JUNGIN: "중인",
  YANGBAN: "양반",
  KING: "왕",
};

interface DocumentTierPageProps {
  params: {
    postTier: PostTier;
  };
}

export default function DocumentTierPage({ params }: DocumentTierPageProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { postTier } = params;
  const memberDto = useUserPermissions(); // 사용자 권한 정보 가져오기

  // 상태 관리
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [documentData, setDocumentData] = useState<DocumentPost[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 제한 모달 상태

  // 현재 적용된 필터링 상태
  const [currentFiltering, setCurrentFiltering] = useState<Partial<DocumentCommand>>({
    sortType: "LATEST",
    documentTypes: [],
    postTier: postTier,
  });

  // 티어별 접근 권한 확인
  useEffect(() => {
    if (memberDto) {
      let hasAccess = false;
      
      switch (postTier.toUpperCase()) {
        case "CHEONMIN":
          hasAccess = memberDto.canAccessCheonmin ?? false;
          break;
        case "JUNGIN":
          hasAccess = memberDto.canAccessJungin ?? false;
          break;
        case "YANGBAN":
          hasAccess = memberDto.canAccessYangban ?? false;
          break;
        case "KING":
          hasAccess = memberDto.canAccessKing ?? false;
          break;
        default:
          hasAccess = false;
      }
      
      if (!hasAccess) {
        setIsModalOpen(true);
      } else {
        fetchTierDocuments(currentPage);
      }
    }
  }, [memberDto, postTier]);

  // 모달 닫기 및 이전 페이지로 이동
  const closeModal = () => {
    setIsModalOpen(false);
    router.back(); // 모달 닫은 후 이전 페이지로 이동
  };

  // 데이터 로드 함수
  const fetchTierDocuments = async (page: number = 0, filtering: Partial<DocumentCommand> = currentFiltering) => {
    setIsLoading(true);
    try {
      const response = await documentPostApi.filteredDocumentPost({
        pageNumber: page,
        pageSize: 10,
        sortType: filtering.sortType || "LATEST",
        documentTypes: filtering.documentTypes,
        postTier: postTier,
      });

      if (response && response.documentPostsPage) {
        setDocumentData(response.documentPostsPage.content || []);
        setTotalPages(response.documentPostsPage.totalPages || 0);
      }
    } catch (error) {
      console.error(`${TIER_DISPLAY_NAME[postTier.toUpperCase()]} 자료를 불러오는데 실패했습니다:`, error);
      setDocumentData([]);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleBackClick = () => {
    router.back();
  };

  // 필터링 핸들러들
  const handleDocumentConfirm = async (filtering: Partial<DocumentCommand>) => {
    console.log("자료 필터링 적용:", filtering);
    // 필터링 상태 업데이트하고 API 호출
    const updatedFiltering = { ...filtering, postTier };
    setCurrentFiltering(updatedFiltering);
    setCurrentPage(0);
    await fetchTierDocuments(0, updatedFiltering);
  };

  const handleFilterReset = () => {
    console.log("BottomSheet 내부 필터 초기화");
    // API 호출하지 않고 BottomSheet 내부만 초기화
    // BottomSheet 컴포넌트에서 로컬 상태만 초기화됨
  };

  // 오른쪽 메뉴 아이콘 클릭 핸들러
  const handleMenuClick = () => {
    dispatch(setDocumentFilteringOpen(true));
  };

  // 접근 제한 모달 컴포넌트
  const AccessRestrictedModal = () => {
    // 표시할 티어의 대문자 변환
    const tierUpper = postTier.toUpperCase();
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative w-[330px] rounded-lg bg-white p-6 shadow-md">
          {/* 닫기 버튼 */}
          <button
            type="button"
            onClick={closeModal}
            className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>

          {/* 알림 이미지와 내용 */}
          <div className="flex flex-col items-center text-center">
            <Image
              src={`/icons/tier/${tierUpper}Icon.svg`}
              alt={tierUpper}
              width={170}
              height={170}
              className="mb-4 rounded-full"
            />
            <h1 className="font-pretendard-bold text-lg">게시판 입장 제한</h1>
            <p className="mt-2 text-sm text-gray-600">
              해당 게시판은 게시판 등급이 <span className="font-bold">{TIER_DISPLAY_NAME[tierUpper]} 이상</span>일 경우에만
              입장이 가능합니다
            </p>
            <button
              type="button"
              onClick={closeModal}
              className="hover:bg-custom-blue-600 mt-4 w-full rounded-[10px] bg-custom-blue-500 px-4 py-2 text-white"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 접근 제한 모달 - 접근 권한이 없는 경우 표시 */}
      {isModalOpen && <AccessRestrictedModal />}

      {/* Header */}
      <div className="fixed top-0 z-50 w-full max-w-[640px] bg-white">
        <Header
          title={`${TIER_DISPLAY_NAME[postTier.toUpperCase()]} 자료`}
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
              <span className="text-SUIT_14 font-medium text-[#C5C5C5]">
                표시할 {TIER_DISPLAY_NAME[postTier.toUpperCase()]} 자료가 없습니다.
              </span>
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
