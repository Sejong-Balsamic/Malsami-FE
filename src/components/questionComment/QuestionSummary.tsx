"use client";

import { QuestionDto } from "@/types/api/responses/questionDto";
import ChaetaekTag from "@/components/common/tags/ChaetaekTag";
import SubjectTag from "@/components/common/tags/SubjectTag";
import RewardTag from "@/components/common/tags/RewardTag";
import Image from "next/image";
import HotTag from "@/components/common/tags/HotTag";
import { useMemo } from "react";
import { formatDateTime } from "@/global/time";

interface QuestionSummaryProps {
  questionDto: QuestionDto;
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

export default function QuestionSummary({ 
  questionDto, 
  isExpanded, 
  onToggleExpanded 
}: QuestionSummaryProps) {
  const { questionPost } = questionDto;
  const isHot = questionPost?.isPopular === true;
  const formattedDate = useMemo(
    () => formatDateTime(questionPost?.createdDate ?? ""),
    [questionPost?.createdDate],
  );

  return (
    <div className="bg-white">
      {/* 질문 전체 내용 */}
      <div className="px-5 py-4">
        {/* 태그 영역 (HOT, 과목, 현상금, 채택) */}
        <div className="mb-3 flex flex-wrap items-center gap-[4px]">
          {isHot && <HotTag />}
          {!!questionPost?.chaetaekStatus && <ChaetaekTag />}
          <SubjectTag subjectName={questionPost?.subject} type="question" />
          <RewardTag amount={questionPost?.rewardYeopjeon as number} />
        </div>

        {/* 제목 (항상 표시) */}
        <h2 className="text-SUIT_18 font-semibold leading-[18px] text-black">{questionPost?.title}</h2>

        {/* 확장/축소 버튼 */}
        <button 
          onClick={onToggleExpanded} 
          className="mt-2 flex w-full items-center justify-center py-2 hover:opacity-80"
          aria-label={isExpanded ? "내용 접기" : "내용 펼치기"}
        >
          <Image
            src={isExpanded ? "/icons/arrowUp.svg" : "/icons/arrowDown.svg"}
            alt={isExpanded ? "접기" : "펼치기"}
            width={20}
            height={20}
          />
        </button>
        
        {/* 확장된 내용 (isExpanded가 true일 때만 표시) */}
        {isExpanded && (
          <div className="mt-3 border-t border-ui-divider-thick pt-4 animate-slideDown">
            {/* 전공 · 조회수 · 작성일 */}
            <div className="mt-2 flex items-center gap-[4px] text-SUIT_12 font-medium text-ui-muted">
              <span>{questionPost?.member?.major ?? "전공 비공개"}</span>
              <span className="text-ui-muted">•</span>
              <span className="inline-flex items-center gap-1">
                <Image src="/viewCountGray.svg" alt="views" width={12} height={12} />
                <span className="text-ui-count">{questionPost?.viewCount}</span>
              </span>
              <span className="text-ui-muted">•</span>
              <span className="text-ui-muted">{formattedDate}</span>
            </div>

            {/* 본문 텍스트 */}
            <div className="mt-[16px] text-SUIT_16 font-medium leading-[22.4px] text-black">
              {questionPost?.content}
            </div>

            {/* 이미지 및 동영상 */}
            {Array.isArray(questionDto.mediaFiles) && questionDto.mediaFiles.length > 0 && (
              <div className="mt-2 overflow-x-auto">
                <div className="flex gap-[12px] pb-[10px]">
                  {questionDto.mediaFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex h-[120px] w-[120px] flex-shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-[#EDEDED]"
                    >
                      <Image
                        src={file.uploadedImageUrl || ""}
                        alt={`첨부 이미지 ${index + 1}`}
                        width={120}
                        height={120}
                        className="h-full w-full object-cover"
                        onError={e => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = "/image/imagePlaceHolder.png";
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 지정태그 */}
            {questionPost?.questionPresetTags && questionPost.questionPresetTags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-[8px]">
                {questionPost.questionPresetTags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex h-[28px] w-auto min-w-[69px] flex-shrink-0 items-center justify-center gap-[4px] rounded-[34px] bg-tag-preset-question-bg px-[12px] py-[8px]"
                  >
                    <span className="line-clamp-1 overflow-hidden text-ellipsis text-[12px] font-bold leading-[100%] text-tag-preset-question-text">
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* 커스텀태그 */}
            {questionDto.customTags && questionDto.customTags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-[8px]">
                {questionDto.customTags.map((tag, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center justify-center gap-[10px] rounded-[34px] bg-tag-custom-bg px-[14px] py-[8px]"
                  >
                    <span className="line-clamp-1 overflow-hidden text-ellipsis text-[12px] font-bold leading-[100%] text-tag-custom-text">
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}