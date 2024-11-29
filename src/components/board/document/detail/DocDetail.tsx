/* eslint-disable */

import { useState } from "react";
import Image from "next/image";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import postLikeDocument from "@/apis/document/postLikeDocument";
import getDateDiff from "@/utils/getDateDiff";
import { DocumentData } from "@/types/DocumentData";
import CommentSection from "../../document/detail/DCommentSection";
import sameMember from "@/utils/sameMember";
import DownloadFile from "./DownloadFile";

// 한국어 태그 매핑
const tagMapping: { [key: string]: string } = {
  DOCUMENT: "자료",
  SOLUTION: "솔루션",
  PAST_EXAM: "기출 문제",
};

// 영어 태그를 한국어로 변환하는 함수
const getKoreanTag = (englishTag: string): string => {
  return tagMapping[englishTag] || englishTag; // 매핑되지 않은 경우 원래의 태그 반환
};

function DocDetail({ documentData }: { documentData: DocumentData }) {
  const [isLiked, setIsLiked] = useState(documentData.documentPost.isLiked);
  const [currentLikeCount, setCurrentLikeCount] = useState(documentData.documentPost.likeCount);
  const [currentDislikeCount, setCurrentDislikeCount] = useState(documentData.documentPost.dislikeCount);
  const [isDisliked, setIsDisliked] = useState(false);

  const handleLikeClick = async () => {
    if (isLiked || isDisliked) return; // 이미 좋아요 또는 싫어요를 누른 경우
    if (sameMember(documentData.documentPost.member.memberId)) return; // 작성자가 좋아요를 누르지 못하도록 차단

    try {
      setIsLiked(true); // 즉시 반영: 버튼 비활성화 및 색상 변경
      setCurrentLikeCount(currentLikeCount + 1); // 즉시 반영: 좋아요 숫자 증가

      await postLikeDocument(documentData.documentPost.documentPostId, "DOCUMENT", "LIKE");
    } catch (error) {
      console.error("좋아요 업데이트 실패");
      setIsLiked(false); // 실패 시 롤백
      setCurrentLikeCount(currentLikeCount - 1); // 숫자도 원래대로 롤백
    }
  };

  const handleDisLikeClick = async () => {
    if (isLiked || isDisliked) return; // 이미 좋아요 또는 싫어요를 누른 경우
    if (sameMember(documentData.documentPost.member.memberId)) return; // 작성자가 싫어요를 누르지 못하도록 차단

    try {
      setIsDisliked(true); // 즉시 반영: 버튼 비활성화 및 색상 변경
      setCurrentDislikeCount(currentDislikeCount + 1); // 즉시 반영: 싫어요 숫자 증가

      await postLikeDocument(documentData.documentPost.documentPostId, "DOCUMENT", "DISLIKE");
    } catch (error) {
      console.error("싫어요 업데이트 실패");
      setIsDisliked(false); // 실패 시 롤백
      setCurrentDislikeCount(currentDislikeCount - 1); // 숫자도 원래대로 롤백
    }
  };

  const buttonClass = (isActive: boolean) =>
    isActive ? "border-[#03b89e] text-[#03b89e] cursor-default" : "border-[#e7e7e7] text-[#aaaaaa] cursor-pointer";

  const [commentCount, setCommentCount] = useState(documentData.documentPost.commentCount);
  const incrementCommentCount = () => {
    setCommentCount(prevCount => prevCount + 1);
  };

  return (
    <div className="flex flex-col justify-center px-[20px]">
      {/* 교과목명 */}
      <div className="mt-[30px] h-[26px] w-[336px] max-w-[640px]">
        <div className="flex items-center">
          <div className="font-pretendard-bold flex h-[26px] items-center justify-center rounded-[13px] bg-[#03b89e] px-[14px] py-[6px] text-[12px] text-[#ffffff]">
            {documentData.documentPost.subject}
          </div>
        </div>
      </div>

      {/* 글 정보 */}
      <div className="flex h-auto min-w-[336px] max-w-[640px] flex-col">
        <div className="mt-[20px]">
          <span className="font-pretendard-bold text-[18px]">{documentData.documentPost.title}</span>
          <div className="font-pretendard-medium mt-[10px] text-[14px] leading-normal text-[#727272]">
            {documentData.documentPost.content}
          </div>
        </div>
        <DownloadFile />
        {/* 카테고리 */}
        <div className="mt-[20px] h-[26px] w-[336px] max-w-[640px]">
          <div className="flex items-center gap-[10px]">
            {documentData.documentPost.documentTypes.map((tag, index) => (
              <div
                key={index}
                className="flex h-[25px] w-auto items-center justify-center rounded-[28px] border border-[#e7e7e7] px-[10px]"
              >
                <span className="font-pretendard-medium text-[14px] text-[#aaaaaa]">{getKoreanTag(tag)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 작성자 정보 */}
        <div className="flex h-[72px] min-w-[336px] max-w-[640px] flex-col">
          <div className="mt-[20px] text-right">
            <div>
              <span className="font-pretendard-medium mb-[4px] text-[12px]">
                @{documentData.documentPost.member.uuidNickname}
              </span>
            </div>
            <div>
              <span className="font-pretendard-medium mr-[3px] text-[12px] text-[#bdbdbd]">
                {getDateDiff(documentData.documentPost.createdDate)}
              </span>
              <span className="font-pretendard-medium mr-[3px] text-[12px] text-[#bdbdbd]">
                • 조회수 {documentData.documentPost.viewCount}
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
                  className={`font-pretendard-semibold text-[12px] ${isLiked ? "text-[#03b89e]" : "text-[#aaaaaa]"}`}
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
                  className={`font-pretendard-semibold text-[12px] ${isDisliked ? "text-[#03b89e]" : "text-[#aaaaaa]"}`}
                >
                  {currentDislikeCount}
                </span>
              </div>
            </div>
            {/* 댓글 */}
            <Drawer>
              <DrawerTrigger asChild>
                <div className="flex h-[30px] w-[70px] cursor-pointer items-center justify-center gap-[5px] rounded-[28px] border-2 border-[#e7e7e7]">
                  <Image src="/icons/Comment_UnClicked.svg" alt="Comment_UnClicked" width={16} height={16} />
                  <span className="font-pretendard-semibold text-[12px] text-[#aaaaaa]">{commentCount}</span>
                </div>
              </DrawerTrigger>
              <DrawerContent className="px-[20px] pb-[20px]">
                <DrawerHeader className="px-0">
                  <DrawerTitle className="font-pretendard-bold flex text-[14px] text-[#3c3c3c]">
                    댓글 {commentCount}
                  </DrawerTitle>
                </DrawerHeader>
                <div className="max-h-[400px] overflow-y-auto">
                  <CommentSection
                    postId={documentData.documentPost.documentPostId}
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
