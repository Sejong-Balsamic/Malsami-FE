"use client";

import Image from "next/image";
import { NoticePostDto } from "@/types/api/responses/noticePostDto";
import { getDateDiff } from "@/global/time";

interface NoticeDetailProps {
  noticePostDto: NoticePostDto;
}

export default function NoticeDetail({ noticePostDto }: NoticeDetailProps) {
  const likeCount = noticePostDto.noticePost?.likeCount || 0;

  return (
    <div className="flex flex-col px-5">
      {/* 상단 여백 */}
      <div className="h-8" />

      {/* 제목 */}
      <h1 className="text-SUIT_18 font-bold leading-tight text-black">
        {noticePostDto.noticePost?.title || "제목 없음"}
      </h1>

      {/* 작성자 정보 */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-SUIT_12 font-medium text-black">
            @{noticePostDto.noticePost?.member?.uuidNickname || "익명"}
          </span>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="text-SUIT_12 font-medium text-ui-muted">
              {getDateDiff(noticePostDto.noticePost?.createdDate || "")}
            </span>
            <span className="text-SUIT_12 font-medium text-ui-muted">•</span>
            <span className="text-SUIT_12 font-medium text-ui-muted">
              조회수 {noticePostDto.noticePost?.viewCount || 0}
            </span>
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div className="my-6 h-px w-full bg-ui-divider" />

      {/* 본문 내용 */}
      <div className="text-SUIT_14 font-medium leading-relaxed text-gray-700">
        {noticePostDto.noticePost?.content || "내용 없음"}
      </div>

      {/* 하단 여백 */}
      <div className="h-8" />

      {/* 구분선 */}
      <div className="h-px w-full bg-ui-divider" />

      {/* 좋아요 섹션 */}
      <div className="flex justify-start py-6">
        <div className="flex h-8 w-20 items-center justify-center gap-1.5 rounded-full border-2 border-gray-200">
          <Image src="/icons/Like_UnClicked.svg" alt="좋아요" width={16} height={16} />
          <span className="text-SUIT_12 font-semibold text-ui-muted">{likeCount}</span>
        </div>
      </div>
    </div>
  );
}
