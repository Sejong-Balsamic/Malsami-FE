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
    <div className="flex flex-col justify-center px-[20px]">
      {/* 교과목명 */}
      <div className="mt-[30px] h-[26px] w-[336px] max-w-[640px]">
        <div className="flex items-center">
          <div className="font-pretendard-bold flex h-[26px] items-center justify-center rounded-[13px] bg-legacy-teal px-[14px] py-[6px] text-[12px] text-white">
            {documentDto.documentPost?.subject || "과목명 없음"}
          </div>
        </div>
      </div>

      {/* 글 정보 */}
      <div className="flex h-auto min-w-[336px] max-w-[640px] flex-col">
        <div className="mt-[20px]">
          <span className="font-pretendard-bold text-[18px]">{documentDto.documentPost?.title || "제목 없음"}</span>
          <div className="font-pretendard-medium mt-[10px] text-[14px] leading-normal text-ui-body-soft">
            {documentDto.documentPost?.content || "내용 없음"}
          </div>
        </div>
        <DownloadFile documentFiles={documentDto.documentFiles || []} /> {/* 기본값 제공 */}
        {/* 카테고리 */}
        <div className="mt-[20px] h-[26px] w-[336px] max-w-[640px]">
          <div className="flex items-center gap-[10px]">
            {documentDto.documentPost?.documentTypes?.map((tag, index) => (
              <div
                key={index}
                className="flex h-[25px] w-auto items-center justify-center rounded-[28px] border border-ui-divider-light px-[10px]"
              >
                <span className="font-pretendard-medium text-[14px] text-ui-count">{getKoreanTag(tag)}</span>
              </div>
            )) || <span>태그 없음</span>}
          </div>
        </div>
        {/* 작성자 정보 */}
        <div className="flex h-[72px] min-w-[336px] max-w-[640px] flex-col">
          <div className="mt-[20px] text-right">
            <div>
              <span className="font-pretendard-medium mb-[4px] text-[12px]">
                @{documentDto.documentPost?.member?.uuidNickname || "익명"}
              </span>
            </div>
            <div>
              <span className="font-pretendard-medium mr-[3px] text-[12px] text-ui-muted">
                {getDateDiff(documentDto.documentPost?.createdDate || "") || "날짜 없음"}
              </span>
              <span className="font-pretendard-medium mr-[3px] text-[12px] text-ui-muted">
                • 조회수 {documentDto.documentPost?.viewCount || 0}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-start border-b-2 py-[30px]">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-[10px]">
              {/* 좋아요 */}
              <div
                onClick={!isLiked ? handleLikeClick : undefined}
                className={`flex h-[30px] w-[70px] items-center justify-center gap-[5px] rounded-[28px] border-2 ${buttonClass(
                  isLiked,
                )}`}
              >
                <Image
                  src={isLiked ? "/icons/Like_Clicked.svg" : "/icons/Like_UnClicked.svg"}
                  alt={isLiked ? "Like_Clicked" : "Like_UnClicked"}
                  width={16}
                  height={16}
                />
                <span
                  className={`font-pretendard-semibold text-[12px] ${isLiked ? "text-legacy-teal" : "text-ui-count"}`}
                >
                  {currentLikeCount}
                </span>
              </div>
              {/* 싫어요 */}
              <div
                onClick={!isDisliked ? handleDisLikeClick : undefined}
                className={`flex h-[30px] w-[70px] items-center justify-center gap-[5px] rounded-[28px] border-2 ${buttonClass(
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
                  className={`font-pretendard-semibold text-[12px] ${isDisliked ? "text-legacy-teal" : "text-ui-count"}`}
                >
                  {currentDislikeCount}
                </span>
              </div>
            </div>
            {/* 댓글 */}
            <Drawer>
              <DrawerTrigger asChild>
                <div className="flex h-[30px] w-[70px] cursor-pointer items-center justify-center gap-[5px] rounded-[28px] border-2 border-ui-divider-light">
                  <Image src="/icons/Comment_UnClicked.svg" alt="Comment_UnClicked" width={16} height={16} />
                  <span className="font-pretendard-semibold text-[12px] text-ui-count">{commentCount}</span>
                </div>
              </DrawerTrigger>
              <DrawerContent className="px-[20px] pb-[20px]">
                <DrawerHeader className="px-0">
                  <DrawerTitle className="font-pretendard-bold flex text-[14px] text-[#3c3c3c]">
                    댓글 {commentCount}
                  </DrawerTitle>
                </DrawerHeader>
                <div className="max-h-[400px] overflow-y-auto">
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
