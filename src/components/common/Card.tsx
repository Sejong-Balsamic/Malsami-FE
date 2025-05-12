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
  customTags?: string[]; // 버튼 텍스트 배열 (선택적)
  isLiked: boolean;
  onClick?: () => void; // 카드 클릭 시. 상세페이지로 이동
}

export default function Card({
  number,
  subject,
  title,
  content,
  isCurrentlyPopular = false,
  likeCount,
  customTags,
  isLiked,
  onClick,
}: CardProps) {
  return (
    <article
      className="flex h-[194px] w-[261px] flex-col justify-between rounded-[20px] p-[20px] shadow-md hover:shadow-lg"
      onClick={onClick}
    >
      <>
        {/* 상단 부분. 랭킹,제목,HOT */}
        <div className="mb-4 flex">
          {number && <span className="mr-3 text-SUIT_20 font-bold">{number}</span>}
          <div className="flex gap-2.5">
            <SubjectTag subjectName={subject} />
            {isCurrentlyPopular && <HotTag />}
          </div>
        </div>
        {/* 메인. 제목,내용 */}
        <h2 className="mb-1.5 line-clamp-1 text-SUIT_16 font-semibold">{title}</h2>
        <p className="line-clamp-2 text-SUIT_16 font-medium">{content}</p>
      </>

      {/* 하단 */}
      <div className="mt-2 flex flex-row justify-between">
        <div className="flex gap-2">
          {customTags &&
            customTags
              .slice(0, 2)
              .map(label => <CustomTag key={label} tagName={label.length > 6 ? `${label.slice(0, 6)}..` : label} />)}
        </div>
        <span className="ml-auto flex items-center gap-1.5 text-SUIT_14 text-[#929292]">
          {isLiked ? (
            <Image src="/icons/actions/hand-thumbs-up-fill.svg" alt="좋아요" width={16} height={16} />
          ) : (
            <Image src="/icons/actions/hand-thumbs-up.svg" alt="좋아요" width={16} height={16} />
          )}
          {likeCount}
        </span>
      </div>
    </article>
  );
}
