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
}: CardProps) {
  return (
    <article
      className="flex h-[194px] w-[261px] flex-col justify-between rounded-[20px] bg-white p-[20px] shadow-md hover:shadow-xl"
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
          {customTags && customTags.length > 0 && (
            <>
              {/* 태그들의 총 길이를 계산해서 표시 방식 결정 */}
              {(() => {
                const totalLength = customTags.slice(0, 2).reduce((sum, tag) => sum + tag.length, 0);

                // 총 길이가 12글자를 넘거나 개별 태그가 8글자를 넘으면 하나만 표시
                if (totalLength > 12 || customTags.some(tag => tag.length > 8)) {
                  return (
                    <>
                      <CustomTag tagName={customTags[0]} />
                      {customTags.length > 1 && (
                        <span className="inline-flex items-center rounded-[14px] bg-[#F5F5F5] px-2.5 py-[2px] text-SUIT_12 font-semibold leading-[20px] text-[#666666]">
                          +{customTags.length - 1}
                        </span>
                      )}
                    </>
                  );
                } else {
                  // 짧으면 최대 2개까지 표시
                  return customTags.slice(0, 2).map(label => <CustomTag key={label} tagName={label} />);
                }
              })()}
            </>
          )}
        </div>

        {/* 좋아요 수와 답변 수 표시 */}
        <div className="ml-auto flex items-center gap-1.5 text-SUIT_14 text-[#929292]">
          {/* 좋아요 */}
          <span className="flex items-center gap-1">
            {isLiked ? (
              <Image src="/icons/actions/hand-thumbs-up-fill.svg" alt="좋아요" width={16} height={16} />
            ) : (
              <Image src="/icons/actions/hand-thumbs-up.svg" alt="좋아요" width={16} height={16} />
            )}
            {likeCount}
          </span>

          {/* 답변 수 (질문 카드인 경우에만 표시) */}
          {answerCount !== undefined && (
            <span className="flex items-center gap-1">
              <Image src="/icons/actions/comment.svg" alt="답변" width={16} height={16} />
              {answerCount}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
