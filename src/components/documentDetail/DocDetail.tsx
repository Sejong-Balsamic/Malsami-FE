// src/components/documentDetail/DocDetail.tsx
/* eslint-disable */

import { useState } from "react";
import Image from "next/image";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/shadcn/drawer";
import { likeApi } from "@/apis/likeApi"; // 통합 좋아요 API 호출로 교체
import { DocumentCommand } from "@/types/api/requests/documentCommand";
import { getDateDiff } from "@/global/time";
import { DocumentDto } from "@/types/api/responses/documentDto";
import { isSameMemberById } from "@/global/memberUtil";
import DownloadFile from "@/components/documentDetail/DownloadFile";
import DocumentCommentSection from "@/components/documentDetail/DocumentCommentSection";

// 한국어 태그 매핑
const tagMapping: { [key: string]: string } = {
  DOCUMENT: "강의자료",
  SOLUTION: "해설",
  PAST_EXAM: "과제 기출",
};

// 영어 태그를 한국어로 변환하는 함수
const getKoreanTag = (englishTag: string): string => {
  return tagMapping[englishTag] || englishTag;
};

function DocDetail({ documentDto }: { documentDto: DocumentDto }) {
  const [isLiked, setIsLiked] = useState(documentDto.documentPost?.isLiked || false);
  const [currentLikeCount, setCurrentLikeCount] = useState(documentDto.documentPost?.likeCount || 0);
  const [currentDislikeCount, setCurrentDislikeCount] = useState(documentDto.documentPost?.dislikeCount || 0);
  const [isDisliked, setIsDisliked] = useState(false);
  const [commentCount, setCommentCount] = useState(documentDto.documentPost?.commentCount || 0);

  const handleLikeClick = async () => {
    if (isLiked || isDisliked) return;
    if (isSameMemberById(documentDto.documentPost?.member?.memberId || "")) return;

    try {
      setIsLiked(true);
      setCurrentLikeCount(prev => prev + 1);

      const command: Partial<DocumentCommand> = {
        documentPostId: documentDto.documentPost?.documentPostId,
        contentType: "DOCUMENT",
        likeType: "LIKE",
      };
      await likeApi.documentBoardLike(command); // 통합 좋아요 API 호출로 교체
    } catch (error) {
      console.error("좋아요 업데이트 실패:", error);
      setIsLiked(false);
      setCurrentLikeCount(prev => prev - 1);
    }
  };

  const handleDisLikeClick = async () => {
    if (isLiked || isDisliked) return;
    if (isSameMemberById(documentDto.documentPost?.member?.memberId || "")) return;

    try {
      setIsDisliked(true);
      setCurrentDislikeCount(prev => prev + 1);

      const command: Partial<DocumentCommand> = {
        documentPostId: documentDto.documentPost?.documentPostId,
        contentType: "DOCUMENT",
        likeType: "DISLIKE",
      };
      await likeApi.documentBoardLike(command); // 통합 좋아요 API 호출로 교체
    } catch (error) {
      console.error("싫어요 업데이트 실패:", error);
      setIsDisliked(false);
      setCurrentDislikeCount(prev => prev - 1);
    }
  };

  const buttonClass = (isActive: boolean) =>
    isActive
      ? "border-legacy-teal text-legacy-teal cursor-default"
      : "border-ui-divider-light text-ui-count cursor-pointer";

  const incrementCommentCount = () => {
    setCommentCount(prev => (prev !== undefined ? prev + 1 : 1));
  };

  return (
    <div className="flex flex-col justify-center px-5">
      {/* 교과목명 */}
      <div className="mt-8 h-6 w-full max-w-[640px]">
        <div className="flex items-center">
          <div className="font-suit-bold flex h-6 items-center justify-center rounded-xl bg-legacy-teal px-3.5 py-1.5 text-SUIT_12 text-white">
            {documentDto.documentPost?.subject || "과목명 없음"}
          </div>
        </div>
      </div>

      {/* 글 정보 */}
      <div className="flex h-auto w-full max-w-[640px] flex-col">
        <div className="mt-5">
          <span className="font-suit-bold text-SUIT_18">{documentDto.documentPost?.title || "제목 없음"}</span>
          <div className="font-suit-medium mt-2.5 text-SUIT_14 leading-normal text-ui-body-soft">
            {documentDto.documentPost?.content || "내용 없음"}
          </div>
        </div>
        <DownloadFile documentFiles={documentDto.documentFiles || []} /> {/* 기본값 제공 */}
        {/* 카테고리 */}
        <div className="mt-5 h-6 w-full max-w-[640px]">
          <div className="flex items-center gap-2.5">
            {documentDto.documentPost?.documentTypes?.map((tag, index) => (
              <div
                key={index}
                className="flex h-6 w-auto items-center justify-center rounded-full border border-ui-divider-light px-2.5"
              >
                <span className="font-suit-medium text-SUIT_14 text-ui-count">{getKoreanTag(tag)}</span>
              </div>
            )) || <span>태그 없음</span>}
          </div>
        </div>
        {/* 작성자 정보 */}
        <div className="flex h-[72px] w-full max-w-[640px] flex-col">
          <div className="mt-5 text-right">
            <div>
              <span className="font-suit-medium mb-1 text-SUIT_12">
                @{documentDto.documentPost?.member?.uuidNickname || "익명"}
              </span>
            </div>
            <div>
              <span className="font-suit-medium mr-1 text-SUIT_12 text-ui-muted">
                {getDateDiff(documentDto.documentPost?.createdDate || "") || "날짜 없음"}
              </span>
              <span className="font-suit-medium mr-1 text-SUIT_12 text-ui-muted">
                • 조회수 {documentDto.documentPost?.viewCount || 0}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-start border-b-2 py-8">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2.5">
              {/* 좋아요 */}
              <div
                onClick={!isLiked ? handleLikeClick : undefined}
                className={`flex h-8 w-[70px] items-center justify-center gap-1 rounded-full border-2 ${buttonClass(
                  isLiked,
                )}`}
              >
                <Image
                  src={isLiked ? "/icons/Like_Clicked.svg" : "/icons/Like_UnClicked.svg"}
                  alt={isLiked ? "Like_Clicked" : "Like_UnClicked"}
                  width={16}
                  height={16}
                />
                <span className={`font-suit-semibold text-SUIT_12 ${isLiked ? "text-legacy-teal" : "text-ui-count"}`}>
                  {currentLikeCount}
                </span>
              </div>
              {/* 싫어요 */}
              <div
                onClick={!isDisliked ? handleDisLikeClick : undefined}
                className={`flex h-8 w-[70px] items-center justify-center gap-1 rounded-full border-2 ${buttonClass(
                  isDisliked,
                )}`}
              >
                <Image
                  src={isDisliked ? "/icons/Dislike_Clicked.svg" : "/icons/Dislike_UnClicked.svg"}
                  alt={isDisliked ? "Dislike_Clicked" : "Dislike_UnClicked"}
                  width={16}
                  height={16}
                />
                <span
                  className={`font-suit-semibold text-SUIT_12 ${isDisliked ? "text-legacy-teal" : "text-ui-count"}`}
                >
                  {currentDislikeCount}
                </span>
              </div>
            </div>
            {/* 댓글 */}
            <Drawer>
              <DrawerTrigger asChild>
                <div className="flex h-8 w-[70px] cursor-pointer items-center justify-center gap-1 rounded-full border-2 border-ui-divider-light">
                  <Image src="/icons/Comment_UnClicked.svg" alt="Comment_UnClicked" width={16} height={16} />
                  <span className="font-suit-semibold text-SUIT_12 text-ui-count">{commentCount}</span>
                </div>
              </DrawerTrigger>
              <DrawerContent className="px-5 pb-5">
                <DrawerHeader className="px-0">
                  <DrawerTitle className="font-suit-bold flex text-SUIT_14 text-ui-body">
                    댓글 {commentCount}
                  </DrawerTitle>
                </DrawerHeader>
                <div className="max-h-100 overflow-y-auto">
                  <DocumentCommentSection
                    postId={documentDto.documentPost?.documentPostId || ""}
                    contentType="DOCUMENT"
                    onCommentAdded={incrementCommentCount}
                  />
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocDetail;
