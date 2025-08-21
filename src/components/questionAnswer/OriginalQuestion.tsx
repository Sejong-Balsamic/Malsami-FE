"use client";

import { useEffect, useState, useMemo } from "react";
import getQuestionDetails from "@/apis/question/getQuestionDetails";
import SubjectTag from "@/components/common/tags/SubjectTag";
import RewardTag from "@/components/common/tags/RewardTag";
import HotTag from "@/components/common/tags/HotTag";
import ChaetaekTag from "@/components/common/tags/ChaetaekTag";
import { QuestionDto } from "@/types/api/responses/questionDto";
import Image from "next/image";
import { formatDateTime } from "@/global/time";
import { QuestionPresetTagLabels } from "@/types/api/constants/questionPresetTag";

interface OriginalQuestionProps {
  questionPostId: string;
  isInAnswerPage?: boolean;
}

function OriginalQuestion({ questionPostId, isInAnswerPage = false }: OriginalQuestionProps) {
  const [questionData, setQuestionData] = useState<QuestionDto | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchQuestionContent = async () => {
      try {
        const response = await getQuestionDetails(questionPostId);
        setQuestionData(response);
      } catch (error) {
        // console.error("Failed to fetch question content:", error);
        setQuestionData(null);
      }
    };

    if (questionPostId) {
      fetchQuestionContent();
    }
  }, [questionPostId]);

  const isHot = questionData?.questionPost?.isPopular === true;
  const formattedDate = useMemo(
    () => formatDateTime(questionData?.questionPost?.createdDate ?? ""),
    [questionData?.questionPost?.createdDate],
  );

  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!questionData) {
    return (
      <div className="mb-4 block bg-white">
        <div className={`pt-4 ${isInAnswerPage ? "" : "px-5"}`}>
          <div className="animate-pulse">
            <div className="mb-3 flex gap-2">
              <div className="bg-ui-skeleton h-6 w-16 rounded-full" />
              <div className="bg-ui-skeleton h-6 w-20 rounded-full" />
            </div>
            <div className="bg-ui-skeleton mb-4 h-5 rounded" />
          </div>
          <div className={`mt-2 h-1 bg-ui-divider-thick ${isInAnswerPage ? "w-full" : "-mx-5 w-[calc(100%+40px)]"}`} />
        </div>
      </div>
    );
  }

  const { questionPost } = questionData;

  return (
    <div className="mb-4 block bg-white">
      {/* 질문 전체 내용 */}
      <div className={`pt-4 ${isInAnswerPage ? "" : "px-5"}`}>
        {/* 태그 영역 (HOT, 과목, 현상금, 채택) */}
        <div className="mb-3 flex flex-wrap items-center gap-1">
          {isHot && <HotTag />}
          {!!questionPost?.chaetaekStatus && <ChaetaekTag />}
          <SubjectTag subjectName={questionPost?.subject} type="question" />
          <RewardTag amount={questionPost?.rewardYeopjeon as number} />
        </div>

        {/* 제목 (항상 표시) */}
        <h2 className="text-SUIT_18 font-semibold leading-tight text-black">{questionPost?.title}</h2>

        {/* 확장된 내용 (isExpanded가 true일 때만 표시) */}
        {isExpanded && (
          <div className="animate-slideDown mt-2">
            {/* 전공 · 조회수 · 작성일 */}
            <div className="mt-2 flex items-center gap-1 text-SUIT_12 font-medium text-ui-muted">
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
            <div className="mt-4 text-SUIT_16 font-medium leading-relaxed text-black">{questionPost?.content}</div>

            {/* 이미지 및 동영상 */}
            {Array.isArray(questionData.mediaFiles) && questionData.mediaFiles.length > 0 && (
              <div className="mt-2 overflow-x-auto">
                <div className="flex gap-3 pb-2">
                  {questionData.mediaFiles.map((file, index) => (
                    <div
                      key={index}
                      className="h-30 w-30 bg-ui-skeleton flex flex-shrink-0 items-center justify-center overflow-hidden rounded-lg"
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
              <div className="mt-3 flex flex-wrap gap-2">
                {questionPost.questionPresetTags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex h-7 w-auto min-w-16 flex-shrink-0 items-center justify-center gap-1 rounded-full bg-tag-preset-question-bg px-3 py-2"
                  >
                    <span className="line-clamp-1 overflow-hidden text-ellipsis text-SUIT_12 font-bold leading-none text-tag-preset-question-text">
                      {QuestionPresetTagLabels[tag] || tag}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* 커스텀태그 */}
            {questionData.customTags && questionData.customTags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {questionData.customTags.map((tag, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-tag-custom-bg px-3 py-[8px]"
                  >
                    <span className="line-clamp-1 overflow-hidden text-ellipsis text-SUIT_12 font-bold leading-none text-tag-custom-text">
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 확장/축소 버튼 - 항상 콘텐츠 마지막에 위치 */}
        <button
          type="button"
          onClick={handleToggleExpanded}
          className="mt-4 flex w-full items-center justify-center hover:opacity-80"
          aria-label={isExpanded ? "내용 접기" : "내용 펼치기"}
        >
          <Image
            src={isExpanded ? "/icons/arrowUp.svg" : "/icons/arrowDown.svg"}
            alt={isExpanded ? "접기" : "펼치기"}
            width={20}
            height={20}
          />
        </button>
        {/* 구분선 - 화면 전체 너비 */}
        <div className={`mt-2 h-1 bg-ui-divider-thick ${isInAnswerPage ? "w-full" : "-mx-5 w-[calc(100%+40px)]"}`} />
      </div>
    </div>
  );
}

OriginalQuestion.defaultProps = {
  isInAnswerPage: false,
};

export default OriginalQuestion;
