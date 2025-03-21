"use client";

import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/shadcn/accordion";
import getQuestionDetails from "@/apis/question/getQuestionDetails";

function OriginalQuestion({ questionPostId }: { questionPostId: string }) {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const fetchQuestionContent = async () => {
      try {
        const response = await getQuestionDetails(questionPostId);
        setContent(response.questionPost?.content as string);
      } catch (error) {
        console.error("Failed to fetch question content:", error);
        setContent("질문 내용을 불러오는 데 실패했습니다.");
      }
    };

    if (questionPostId) {
      fetchQuestionContent();
    }
  }, [questionPostId]);

  return (
    <div className="mb-4 block">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-pretendard-semibold flex items-center gap-[6px] text-[18px]">
            원문 보기
          </AccordionTrigger>
          <AccordionContent>
            <div className="mt-[12px] rounded-md bg-gray-100 p-[14px]">
              <p className="font-pretendard-medium text-[14px] text-[#444444]">{content}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default OriginalQuestion;
