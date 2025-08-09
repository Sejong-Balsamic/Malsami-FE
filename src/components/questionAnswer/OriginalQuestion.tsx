"use client";

import { useEffect, useState, useMemo } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/shadcn/accordion";
import getQuestionDetails from "@/apis/question/getQuestionDetails";
import SubjectTag from "@/components/common/tags/SubjectTag";
import RewardTag from "@/components/common/tags/RewardTag";
import HotTag from "@/components/common/tags/HotTag";
import ChaetaekTag from "@/components/common/tags/ChaetaekTag";
import Image from "next/image";
import { QuestionDto } from "@/types/api/responses/questionDto";
import { formatDateTime } from "@/global/time";

// 영어 → 한국어 프리셋 태그 매핑
const tagMapping: Record<string, string> = {
  OUT_OF_CLASS: "수업 외 내용",
  UNKNOWN_CONCEPT: "개념 모름",
  BETTER_SOLUTION: "더 나은 풀이",
  EXAM_PREPARATION: "시험 대비",
  DOCUMENT_REQUEST: "자료 요청",
  STUDY_TIPS: "공부 팁",
  ADVICE_REQUEST: "조언 구함",
};

const getKoreanTag = (english: string) => tagMapping[english] ?? english;

interface OriginalQuestionProps {
  /** 질문글 UUID */
  questionPostId: string;
}

/**
 * 답변 작성/댓글 페이지에서 사용하는 원문(preview) 컴포넌트
 * 1. 태그 + 제목만 기본 표시
 * 2. 화살표(아래) 클릭 시 상세 정보(전공·조회수·날짜, 본문, 이미지, 태그 등) 노출
 * 3. 상세 펼침 상태에서는 화살표(위) + 두꺼운 구분선 렌더링
 */
export default function OriginalQuestion({ questionPostId }: OriginalQuestionProps) {
  const [questionData, setQuestionData] = useState<QuestionDto | null>(null);

  // Accordion open 상태 관리 (아이콘 전환 용도)
  const [isOpen, setIsOpen] = useState(false);

  // Fetch question detail
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getQuestionDetails(questionPostId);
        setQuestionData(res);
      } catch (err) {
        console.error("원문 불러오기 실패", err);
      }
    };
    if (questionPostId) fetch();
  }, [questionPostId]);

  const isHot = questionData?.questionPost?.isPopular === true;
  const formattedDate = useMemo(
    () => formatDateTime(questionData?.questionPost?.createdDate ?? ""),
    [questionData?.questionPost?.createdDate],
  );

  const mediaFiles = (questionData?.mediaFiles?.map(f => f.uploadedImageUrl).filter(Boolean) as string[]) ?? [];

  return (
    <Accordion type="single" collapsible className="w-full" onValueChange={value => setIsOpen(!!value)}>
      <AccordionItem value="preview" className="border-none">
        {/* HEADER (태그 + 제목 + ↓ 아이콘 + 구분선) */}
        <AccordionTrigger className="p-0 hover:no-underline">
          <div className="flex w-full flex-col items-start">
            {/* 태그 리스트 */}
            <div className="mt-4 flex flex-wrap items-center gap-[4px]">
              {isHot && <HotTag />}
              {questionData?.questionPost?.chaetaekStatus && <ChaetaekTag />}
              <SubjectTag subjectName={questionData?.questionPost?.subject} type="question" />
              <RewardTag amount={questionData?.questionPost?.rewardYeopjeon as number} />
            </div>

            {/* 제목 */}
            <h3 className="mt-3 text-SUIT_18 font-semibold leading-[18px] text-black">
              {questionData?.questionPost?.title ?? "제목 없음"}
            </h3>

            {/* 화살표 (12px 아래) */}
            <div className="mt-3 flex w-full justify-center">
              <Image
                src={isOpen ? "/icons/arrowUp.svg" : "/icons/arrowDown.svg"}
                alt={isOpen ? "접기" : "펼치기"}
                width={20}
                height={20}
              />
            </div>

            {/* 두꺼운 구분선 (8px 아래) */}
            <div className="mx-auto mt-2 h-[4px] w-[433px] flex-shrink-0 rounded-[2px] bg-[#EDEDED]" />
          </div>
        </AccordionTrigger>

        {/* CONTENT (펼침 영역) */}
        <AccordionContent className="pb-0">
          {/* 메타 정보 (전공 · 조회수 · 날짜) */}
          <div className="mt-3 flex items-center gap-[4px] text-SUIT_12 font-medium text-ui-muted">
            <span>{questionData?.questionPost?.member?.major ?? "전공 비공개"}</span>
            <span className="text-ui-muted">•</span>
            <span className="inline-flex items-center gap-1">
              <Image src="/viewCountGray.svg" alt="views" width={12} height={12} />
              <span className="text-ui-count">{questionData?.questionPost?.viewCount}</span>
            </span>
            <span className="text-ui-muted">•</span>
            <span className="text-ui-muted">{formattedDate}</span>
          </div>

          {/* 본문 텍스트 */}
          <div className="mt-[16px] text-SUIT_16 font-medium leading-[22.4px] text-black">
            {questionData?.questionPost?.content}
          </div>

          {/* 이미지 리스트 */}
          {mediaFiles.length > 0 && (
            <div className="mt-2 overflow-x-auto">
              <div className="flex gap-[12px] pb-[10px]">
                {mediaFiles.map((url, idx) => (
                  <div
                    key={idx}
                    className="flex h-[120px] w-[120px] flex-shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-[#EDEDED]"
                  >
                    <Image
                      src={url}
                      alt={`image-${idx}`}
                      width={120}
                      height={120}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 프리셋 태그 */}
          {questionData?.questionPost?.questionPresetTags && (
            <div className="mt-3 flex flex-wrap gap-[8px]">
              {questionData.questionPost.questionPresetTags.map(tag => (
                <div
                  key={tag}
                  className="flex h-[28px] min-w-[69px] items-center justify-center gap-[4px] rounded-[34px] bg-tag-preset-question-bg px-[12px] py-[8px]"
                >
                  <span className="line-clamp-1 overflow-hidden text-ellipsis text-[12px] font-bold leading-[100%] text-tag-preset-question-text">
                    {getKoreanTag(tag)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* 커스텀 태그 */}
          {questionData?.customTags && questionData.customTags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-[8px]">
              {questionData.customTags.map(tag => (
                <div
                  key={tag}
                  className="inline-flex items-center justify-center gap-[10px] rounded-[34px] bg-tag-custom-bg px-[14px] py-[8px]"
                >
                  <span className="line-clamp-1 overflow-hidden text-ellipsis text-[12px] font-bold leading-[100%] text-tag-custom-text">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* 화살표 위 (16px) */}
          <div className="mt-4 flex w-full justify-center">
            <Image src="/icons/arrowUp.svg" alt="접기" width={20} height={20} />
          </div>

          {/* 두꺼운 구분선 (8px 아래) */}
          <div className="mx-auto mt-2 h-[4px] w-[433px] flex-shrink-0 rounded-[2px] bg-[#EDEDED]" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
