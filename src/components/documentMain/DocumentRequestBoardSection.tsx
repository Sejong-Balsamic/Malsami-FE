"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SubjectTag from "@/components/common/tags/SubjectTag";
import CustomTag from "@/components/common/tags/CustomTag";
import { documentPostApi } from "@/apis/documentPostApi";
import DocumentRequestSectionSkeleton from "@/components/common/skeletons/DocumentRequestSectionSkeleton";
import { DocumentPost } from "@/types/api/entities/postgres/documentPost";

export default function DocumentRequestBoardSection() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [documents, setDocuments] = useState<DocumentPost[]>([]);

  useEffect(() => {
    const fetchDocumentRequests = async () => {
      try {
        setIsLoading(true);
        // 자료 요청 API 호출
        const response = await documentPostApi.filteredDocumentPost({
          sortType: "LATEST",
          pageSize: 3, // 최근 3개만 표시
        });

        if (response && response.documentPostsPage && response.documentPostsPage.content) {
          setDocuments(response.documentPostsPage.content);
        } else {
          setDocuments([]);
        }
      } catch (error) {
        console.error("자료 요청 데이터를 불러오는 중 오류 발생:", error);
        setDocuments([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocumentRequests();
  }, []);

  // 자료 상세 페이지로 이동
  const handleCardClick = (documentId: number) => {
    router.push(`/board/document/detail/${documentId}`);
  };

  // 전체보기 페이지로 이동
  const handleViewAll = () => {
    router.push("/board/document/sub/request");
  };

  // 데이터가 없는 경우 빈 상태 처리
  const renderEmptyState = () => (
    <div className="flex h-40 w-full items-center justify-center rounded-lg border border-[#F1F1F1] bg-white p-5 text-[#929292] shadow-[2px_2px_10px_0px_rgba(0,0,0,0.10)]">
      표시할 자료 요청이 없습니다.
    </div>
  );

  return (
    <div>
      {/* 헤더 영역: 제목, 전체보기 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/icons/fire.svg" alt="자료 요청" width={18} height={18} />
          <h2 className="ml-[10px] whitespace-nowrap text-SUIT_18 font-medium">자료 요청 게시판</h2>
        </div>

        {/* 전체보기 링크 */}
        <button
          type="button"
          onClick={handleViewAll}
          className="ml-2 flex-shrink-0 whitespace-nowrap text-SUIT_14 font-medium text-[#A7A7A7]"
        >
          전체보기
        </button>
      </div>

      {/* 카드 리스트 영역 */}
      {(() => {
        if (isLoading) {
          return <DocumentRequestSectionSkeleton />;
        }
        if (documents.length > 0) {
          return (
            <div className="w-full rounded-lg bg-white shadow-[2px_2px_10px_0px_rgba(0,0,0,0.10)]">
              {documents.map((document, index) => (
                <button
                  type="button"
                  key={document.documentPostId}
                  className={`w-full cursor-pointer px-5 py-6 text-left ${index < documents.length - 1 ? "border-b border-[#EDEDED]" : ""}`}
                  onClick={() => handleCardClick(Number(document.documentPostId))}
                >
                  {/* 상단 부분 - 과목 태그 */}
                  <div className="mb-3">
                    <SubjectTag subjectName={document.subject || "과목 없음"} type="document" />
                  </div>

                  {/* 게시물 제목 */}
                  <h3 className="mb-2 line-clamp-1 text-SUIT_16 font-bold leading-[18px] text-black">
                    {document.title}
                  </h3>

                  {/* 게시물 내용 */}
                  <p className="mb-4 line-clamp-2 text-SUIT_14 font-medium leading-[22.4px] text-[#616161]">
                    {document.content}
                  </p>

                  {/* 하단 부분 */}
                  <div className="flex items-center justify-between">
                    {/* 커스텀 태그 */}
                    {/* eslint-disable-next-line react/no-array-index-key */}
                    <div className="flex gap-2 overflow-hidden whitespace-nowrap">
                      {document.customTags?.map((customTag, tagIndex) => (
                        <CustomTag key={`${document.documentPostId}-tag-${tagIndex}`} tagName={customTag} />
                      ))}
                    </div>

                    {/* 좋아요 및 댓글 */}
                    <div className="flex items-center gap-[4px]">
                      {/* 좋아요 */}
                      <span className="flex items-center gap-[4px]">
                        <Image src="/icons/newLikeThumbGray.svg" alt="좋아요" width={14} height={14} />
                        <span className="text-[12px] font-medium leading-[12px] text-[#C5C5C5]">
                          {document.likeCount || 0}
                        </span>
                      </span>

                      {/* 댓글 */}
                      <span className="ml-[8px] flex items-center gap-[4px]">
                        <Image src="/icons/newChatBubbleGray.svg" alt="댓글" width={14} height={14} />
                        <span className="text-[12px] font-medium leading-[12px] text-[#C5C5C5]">
                          {document.commentCount || 0}
                        </span>
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          );
        }
        return renderEmptyState();
      })()}
    </div>
  );
}
