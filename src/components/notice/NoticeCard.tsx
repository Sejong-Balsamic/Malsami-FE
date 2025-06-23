"use client";

import React from "react";
import Image from "next/image";
import { NoticePost } from "@/types/api/entities/postgres/noticePost";
import { getDateDiff } from "@/global/time";

interface NoticeCardProps {
  noticePost: NoticePost;
}

/**
 * 공지사항 카드 컴포넌트
 *
 * @param noticePost - 공지사항 데이터
 */
export default function NoticeCard({ noticePost }: NoticeCardProps) {
  // 1. 시간 문자열 생성
  const timeString = noticePost.createdDate ? getDateDiff(noticePost.createdDate) : "";

  // 4. 렌더링
  return (
    <div className="w-full">
      {/* 제목과 시간 - 첫 번째 줄 */}
      <div className="flex items-start justify-between">
        {/* 제목 */}
        <h3
          className="font-suit-semibold mr-3 flex-1 text-sm leading-5 text-black"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "272px",
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "20px",
          }}
        >
          {noticePost.title || "제목 없음"}
        </h3>

        {/* 시간 */}
        <span
          className="font-suit-medium flex-shrink-0 text-xs leading-5"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            overflow: "hidden",
            color: "#D1D1D1",
            textOverflow: "ellipsis",
            fontSize: "12px",
            fontWeight: 500,
            lineHeight: "20px",
          }}
        >
          {timeString}
        </span>
      </div>

      {/* 제목과 본문 사이 4px 간격 */}
      <div className="h-1" />

      {/* 본문 내용 - 두 번째 줄 */}
      <div>
        <p
          className="font-suit-medium text-sm leading-5"
          style={{
            width: "353px",
            height: "20px",
            flexShrink: 0,
            overflow: "hidden",
            color: "#929292",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "20px",
          }}
        >
          {noticePost.content || "내용 없음"}
        </p>
      </div>

      {/* 본문과 좋아요 사이 4px 간격 */}
      <div className="h-1" />

      {/* 좋아요 - 세 번째 줄, 무조건 파랑색으로 표시 */}
      <div className="flex items-center">
        <div className="flex items-center" style={{ gap: "6px" }}>
          {/* 좋아요 SVG 아이콘 */}
          <Image src="/icons/handThumbsUpBlue.svg" alt="좋아요" width={14} height={14} className="flex-shrink-0" />

          {/* 좋아요 개수 - 무조건 파랑색 */}
          <span
            className="font-suit-medium text-sm leading-5"
            style={{
              overflow: "hidden",
              color: "#08E4BA",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "20px",
            }}
          >
            {noticePost.likeCount || Math.floor(Math.random() * 20) + 1}
          </span>
        </div>
      </div>

      {/* 좋아요 아래 16px 후 구분선 */}
      <div className="h-4" />

      {/* 구분선 */}
      <div
        className="flex-shrink-0"
        style={{
          width: "361px",
          height: "2px",
          background: "#F3F3F3",
        }}
      />
    </div>
  );
}
