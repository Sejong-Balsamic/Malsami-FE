"use client";

import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/shadcn/accordion";
import getQuestionDetails from "@/apis/question/getQuestionDetails";
import SubjectTag from "@/components/common/tags/SubjectTag";
import RewardTag from "@/components/common/tags/RewardTag";
import HotTag from "@/components/common/tags/HotTag";
import ChaetaekTag from "@/components/common/tags/ChaetaekTag";
import { QuestionDto } from "@/types/api/responses/questionDto";

function OriginalQuestion({ questionPostId }: { questionPostId: string }) {
  const [questionData, setQuestionData] = useState<QuestionDto | null>(null);

  useEffect(() => {
    const fetchQuestionContent = async () => {
      try {
        const response = await getQuestionDetails(questionPostId);
        setQuestionData(response);
      } catch (error) {
        console.error("Failed to fetch question content:", error);
        setQuestionData(null);
      }
    };

    if (questionPostId) {
      fetchQuestionContent();
    }
  }, [questionPostId]);

  const isHot = (questionData?.questionPost?.viewCount || 0) > 100;
  const isOpen = questionData?.questionPost?.content !== undefined;

  return (
    <div className="mb-4 block">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger className="p-0 transition-all duration-300 ease-in-out hover:no-underline [&[data-state=open]>div>img]:rotate-180">
            <div className="flex w-full flex-col items-start gap-0 text-left">
              {questionData && (
                <div className="flex w-full flex-col">
                  {/* 태그 영역 */}
                  <div className="flex flex-wrap items-center gap-[4px]">
                    {isHot && <HotTag />}
                    {questionData.questionPost?.chaetaekStatus && <ChaetaekTag />}
                    <SubjectTag subjectName={questionData.questionPost?.subject} type="question" />
                    <RewardTag amount={questionData.questionPost?.rewardYeopjeon as number} />
                  </div>

                  {/* 제목 */}
                  <h3 className="mt-3 text-SUIT_16 font-medium text-black">
                    {questionData.questionPost?.title || "제목 없음"}
                  </h3>

                  {/* 화살표 아이콘 */}
                  <div className="mt-3 flex justify-center">
                    <img
                      src={isOpen ? "/icons/arrowUp.svg" : "/icons/arrowDown.svg"}
                      alt={isOpen ? "접기" : "펼치기"}
                      width={20}
                      height={20}
                      className="transition-transform duration-300 ease-in-out"
                    />
                  </div>

                  {/* 구분선 */}
                  <div className="mx-auto mt-2 h-1 w-full max-w-[433px] rounded-sm bg-ui-divider-thick" />
                </div>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-0 transition-all duration-300 ease-in-out">
            <div className="animate-fadeIn mt-4 rounded-md bg-gray-100 p-[14px]">
              <p className="text-SUIT_14 font-medium text-[#444444]">
                {questionData?.questionPost?.content || "질문 내용을 불러오는 데 실패했습니다."}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default OriginalQuestion;
