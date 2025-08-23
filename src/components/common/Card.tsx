/* eslint-disable */

// 사용방법. 어차피 api연결해야함
// <Card
//    number={1}
//    subject="기초 3D 그래픽스"
//    title="기초 3D 그래픽스제목인데 길게 함 해봐야겠다"
//    content="A+비법 전수해준다. CAD옥테인 블랜더고인, 이렇게 설치 해요. 본문인데"
//    isCurrentlyPopular
//    likeCount={35}
//    customTags={["커스텀태그", "커스텀태그2"]}
//    isLiked
//    onClick={() => console.log("카드 클릭됨")}
// />

"use client";

import React from "react";
import CustomTag from "./tags/CustomTag";
import SubjectTag from "@/components/common/tags/SubjectTag";
import HotTag from "./tags/HotTag";
import Image from "next/image";

// TODO: 랜딩페이지 카드 스와이프 구현
// FIX: type정의 된 것으로 수정해야함.
interface CardProps {
  number?: number; // 카드 번호
  subject: string;
  title: string;
  content: string;
  isCurrentlyPopular?: boolean; // HOT 태그 표시 여부 (선택적)
  likeCount?: number; // 좋아요 수 (선택적)
  answerCount?: number; // 답변 수 (질문 카드용, 선택적)
  customTags?: string[]; // 버튼 텍스트 배열 (선택적)
  isLiked: boolean;
  onClick?: () => void; // 카드 클릭 시. 상세페이지로 이동
  type?: "document" | "question"; // 자료게시판 또는 질문게시판 타입
}

export default function Card({
  number,
  subject,
  title,
  content,
  isCurrentlyPopular = false,
  likeCount,
  answerCount,
  customTags,
  isLiked,
  onClick,
  type = "question", // 기본값은 질문게시판용 카드
}: CardProps) {
  // 타입에 따라 색상 및 아이콘 결정
  const mainColor = type === "document" ? "#19C8FF" : "#19C859";

  // 댓글 아이콘 경로 결정
  const getCommentIconPath = () => {
    return "/icons/newChatBubbleGray.svg";
  };

  return (
    <article
      className="relative flex h-44 w-72 flex-col rounded-lg bg-white shadow-md"
      onClick={onClick}
    >
      {/* 상단 Row: 순번 + 과목 태그 */}
      <div className="ml-4 mt-4 flex items-start gap-2">
        {/* 순번 */}
        {number && <span className="text-[18px] font-bold leading-[18px] text-[#1D1E27]">{number}</span>}
        {/* 과목 태그 */}
        <SubjectTag subjectName={subject} type={type} />
        {isCurrentlyPopular && <HotTag />}
      </div>

      {/* 제목 */}
      <h2 className="mx-4 mt-4 line-clamp-1 text-base font-bold leading-4 text-black">{title}</h2>

      {/* 본문 내용 */}
      <p className="mx-4 mt-2 line-clamp-2 text-sm font-normal leading-5 text-ui-body">
        {content}
      </p>

      {/* 하단 Row: 커스텀 태그 + 좋아요/답변 */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        {/* 커스텀 태그 */}
        <div className="flex gap-2 overflow-hidden whitespace-nowrap">
          {customTags && customTags.map((tag, index) => <CustomTag key={`${tag}-${index}`} tagName={tag} />)}
        </div>

        {/* 좋아요 수와 답변 수 표시 */}
        <div className="ml-2 flex flex-shrink-0 items-center gap-[4px]">
          {/* 좋아요 */}
          <span className="flex items-center gap-1">
            <Image src="/icons/newLikeThumbGray.svg" alt="좋아요" width={14} height={14} />
            <span className="text-xs font-medium leading-3 text-ui-muted">{likeCount}</span>
          </span>

          {/* 답변 수 (질문 카드인 경우에만 표시) */}
          {answerCount !== undefined && (
            <span className="ml-2 flex items-center gap-1">
              <Image src={getCommentIconPath()} alt="답변" width={14} height={14} />
              <span className="text-[12px] font-medium leading-[12px] text-[#C5C5C5]">{answerCount}</span>
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
