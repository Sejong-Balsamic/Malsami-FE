"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import SubjectTag from "@/components/common/tags/SubjectTag";
import CustomTag from "@/components/common/tags/CustomTag";
import { useRouter } from "next/navigation";
import AllDocumentsSectionSkeleton from "@/components/common/skeletons/AllDocumentsSectionSkeleton";
import { useDispatch } from "react-redux";
import { showModal } from "@/global/store/modalSlice";

// 카드 항목의 타입 정의
interface CardItem {
  id: number;
  subject: string;
  title: string;
  content: string;
  customTags: string[];
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
}

// 임시 데이터
const mockDocuments: CardItem[] = [
  {
    id: 1,
    subject: "과학사",
    title: "분량이 개-많은 과학사가 꼴교양이 된 이유 3줄요약 해드림",
    content:
      "1. 중간고사를 안 본다: 중간고사에 시험이 많은 학과는 이게 진짜 큰 메리트 2. 교양이 나온다: 분량이 많긴 하지만 교양에 포함",
    customTags: ["커스텀 태그", "커스텀 태그"],
    likeCount: 11,
    commentCount: 5,
    isLiked: true,
  },
  {
    id: 2,
    subject: "생명의미시적세계",
    title: "생미시는 그렇게 분량이 많은데 요약을 아무도 안 파나?",
    content: "하셨죠? 네, 제가 팝니다.",
    customTags: ["커스텀 태그"],
    likeCount: 11,
    commentCount: 5,
    isLiked: false,
  },
  {
    id: 3,
    subject: "과학사",
    title: "분량이 개-많은 과학사가 꼴교양이 된 이유 3줄요약 해드림",
    content:
      "1. 중간고사를 안 본다: 중간고사에 시험이 많은 학과는 이게 진짜 큰 메리트 2. 교양이 나온다: 분량이 많긴 하지만 교양에 포함",
    customTags: ["커스텀 태그", "커스텀 태그"],
    likeCount: 11,
    commentCount: 5,
    isLiked: true,
  },
];

interface AllDocumentsSectionProps {
  onViewAll: () => void;
}

export default function AllDocumentsSection({ onViewAll }: AllDocumentsSectionProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [documents, setDocuments] = useState<CardItem[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    // 실제 API 호출로 대체될 부분
    const fetchData = async () => {
      try {
        // TODO: 실제 API 호출
        // await documentApi.getDocuments();
        await new Promise(resolve => {
          setTimeout(resolve, 1000);
        }); // 임시 로딩 시뮬레이션
        setDocuments(mockDocuments);
      } catch (error) {
        console.error("전체 자료 데이터 로드 실패:", error);
        setDocuments([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // 자료 상세 페이지로 이동
  const handleCardClick = (documentId: number) => {
    const accessToken = sessionStorage.getItem("accessToken");

    // 로그인 체크
    if (!accessToken) {
      dispatch(showModal("로그인 후 이용가능합니다."));
      return;
    }

    router.push(`/board/document/detail/${documentId}`);
  };

  // 데이터가 없는 경우 빈 상태 처리
  const renderEmptyState = () => (
    <div className="flex h-40 w-full items-center justify-center rounded-lg border border-[#F1F1F1] bg-white p-5 text-[#929292] shadow-[2px_2px_10px_0px_rgba(0,0,0,0.10)]">
      표시할 자료가 없습니다.
    </div>
  );

  return (
    <div>
      {/* 헤더 영역: 제목, 전체보기 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/icons/openFileFolder.svg" alt="자료" width={18} height={18} />
          <h2 className="ml-[10px] whitespace-nowrap text-SUIT_18 font-medium">자료 게시판</h2>
        </div>

        {/* 전체보기 링크 */}
        <button
          type="button"
          onClick={onViewAll}
          className="ml-2 flex-shrink-0 whitespace-nowrap text-SUIT_14 font-medium text-[#A7A7A7]"
        >
          전체보기
        </button>
      </div>

      {/* 카드 리스트 영역 */}
      {(() => {
        if (isLoading) {
          return <AllDocumentsSectionSkeleton />;
        }
        if (documents.length > 0) {
          return (
            <div className="w-full rounded-lg bg-white shadow-[2px_2px_10px_0px_rgba(0,0,0,0.10)]">
              {documents.map((document, index) => (
                <button
                  type="button"
                  key={document.id}
                  className={`w-full cursor-pointer px-5 py-6 text-left ${index < documents.length - 1 ? "border-b border-[#EDEDED]" : ""}`}
                  onClick={() => handleCardClick(document.id)}
                >
                  {/* 상단 부분 - 과목 태그 */}
                  <div className="mb-3">
                    <SubjectTag subjectName={document.subject} type="document" />
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
                      {document.customTags.map((customTag, tagIndex) => (
                        <CustomTag key={`${document.id}-tag-${tagIndex}`} tagName={customTag} />
                      ))}
                    </div>

                    {/* 좋아요 및 댓글 */}
                    <div className="flex items-center gap-[4px]">
                      {/* 좋아요 */}
                      <span className="flex items-center gap-[4px]">
                        <Image src="/icons/newLikeThumbGray.svg" alt="좋아요" width={14} height={14} />
                        <span className="text-[12px] font-medium leading-[12px] text-[#C5C5C5]">
                          {document.likeCount}
                        </span>
                      </span>

                      {/* 댓글 */}
                      <span className="ml-[8px] flex items-center gap-[4px]">
                        <Image src="/icons/newChatBubbleGray.svg" alt="댓글" width={14} height={14} />
                        <span className="text-[12px] font-medium leading-[12px] text-[#C5C5C5]">
                          {document.commentCount}
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
