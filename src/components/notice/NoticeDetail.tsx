"use client";

import Image from "next/image";
import { useState } from "react";
import { NoticePostDto } from "@/types/api/responses/noticePostDto";
import { NoticePostCommand } from "@/types/api/requests/noticePostCommand";
import likeApi from "@/apis/likeApi";
import useCommonToast from "@/global/hook/useCommonToast";

interface NoticeDetailProps {
  noticePostDto: NoticePostDto;
}

export default function NoticeDetail({ noticePostDto }: NoticeDetailProps) {
  const { showWarningToast } = useCommonToast();
  const [isLiked, setIsLiked] = useState(noticePostDto.noticePost?.isLiked || false);
  const [likeCount, setLikeCount] = useState(noticePostDto.noticePost?.likeCount || 0);
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  const handleLikeToggle = async () => {
    if (isLikeLoading) return;

    try {
      setIsLikeLoading(true);
      const command: Partial<NoticePostCommand> = {
        noticePostId: noticePostDto.noticePost?.noticePostId,
      };

      const response = await likeApi.noticeBoardLike(command);

      if (response.noticePost) {
        setIsLiked(response.noticePost.isLiked || false);
        setLikeCount(response.noticePost.likeCount || 0);
      }
    } catch (error) {
      showWarningToast("좋아요 처리 중 오류가 발생했습니다.");
    } finally {
      setIsLikeLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* 헤더 아래 16px */}
      <div className="px-5 pt-4">
        {/* 제목 - 18px */}
        <h1 className="text-SUIT_18 font-semibold leading-tight text-black">
          {noticePostDto.noticePost?.title || "제목 없음"}
        </h1>

        {/* 제목 아래 8px - 운영자 · 조회수 */}
        <div className="flex items-center gap-2 pt-2">
          <span className="text-SUIT_12 text-ui-muted">운영자</span>
          <span className="text-ui-muted">·</span>
          <div className="flex items-center gap-1">
            <Image src="/viewCountGray.svg" width={12} height={12} alt="" />
            <span className="text-SUIT_12 text-ui-muted">{noticePostDto.noticePost?.viewCount || 0}</span>
          </div>
        </div>

        {/* 본문 (메타정보 아래 16px) - 14px */}
        <div className="whitespace-pre-wrap pt-4 text-SUIT_14 leading-relaxed text-black">
          {noticePostDto.noticePost?.content || "내용 없음"}
        </div>

        {/* 얇은 구분선 (본문 아래 20px) */}
        <hr className="mt-5 h-px w-full rounded-sm bg-ui-divider" />

        {/* 좋아요 버튼 */}
        <div className="mb-3 mt-3 flex justify-center">
          <button
            type="button"
            onClick={handleLikeToggle}
            disabled={isLikeLoading}
            className="flex items-center gap-1 transition-colors disabled:opacity-50"
            aria-label={isLiked ? "좋아요 취소" : "좋아요"}
          >
            <Image
              src={isLiked ? "/icons/newLikeThumbBlue.svg" : "/icons/newLikeThumbGray.svg"}
              alt="좋아요"
              width={16}
              height={16}
              className="flex-shrink-0"
            />
            <span
              className={`text-SUIT_12 font-medium leading-none transition-colors ${
                isLiked ? "text-document-main" : "text-ui-muted"
              }`}
            >
              {likeCount}
            </span>
          </button>
        </div>
      </div>

      {/* 두꺼운 구분선 (전체 너비, 패딩 바깥쪽) */}
      <div className="border-t-8 border-ui-divider" />

      {/* 댓글 작성 불가 메시지 - 남은 공간의 정중앙에 배치 */}
      <div className="flex min-h-[300px] w-full flex-1 items-center justify-center">
        <span className="text-SUIT_12 font-semibold text-[#898989]">댓글 작성이 불가능한 글입니다.</span>
      </div>
    </div>
  );
}
