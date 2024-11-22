import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import { Answer } from "@/types/answer";
import getDateDiff from "@/utils/getDateDiff";
import getAnswer from "@/apis/question/getAnswer";
import CommentSection from "./CommentSection";

interface AnswerSectionProps {
  postId: string;
}

function AnswerSection({ postId }: AnswerSectionProps) {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        setIsLoading(true);
        const response = await getAnswer(postId);
        setAnswers(response || []); // 답변 데이터 설정
      } catch (err) {
        console.error("답변 불러오기 실패:", err);
        setError("답변을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnswers();
  }, [postId]);

  if (isLoading) {
    return <p className="font-pretendard-medium text-center text-[14px] text-[#7b7b7c]">답변을 불러오는 중입니다...</p>;
  }

  if (error) {
    return <p className="font-pretendard-medium text-center text-[14px] text-[#f56565]">{error}</p>;
  }

  return (
    <div className="my-[40px] flex h-auto min-w-[336px] max-w-[640px] flex-col">
      <span className="font-pretendard-bold mb-[10px] text-[14px] text-[#3D3D3D]">답변 {answers.length}</span>
      {answers.map((answer, index) => (
        <div key={answer.answerPostId} className="my-[10px] flex flex-col gap-[12px] rounded-lg bg-[#f7f8fb] p-[12px]">
          <div>
            {answer.isChaetaek && (
              <Button
                variant="ghost"
                className="font-pretendard-medium mr-[6px] h-[26px] rounded-[13px] bg-[#0062D2] px-[15px] py-[6px] text-[12px] text-[#ffffff]"
              >
                채택됨
              </Button>
            )}
            <span className="font-pretendard-bold mb-[4px] text-[14px]">@{answer.member.uuidNickname}</span>
            <span className="font-pretendard-medium mb-[4px] text-[12px] text-[#737373]"> • {answer.member.major}</span>
          </div>
          <div className="font-pretendard-medium text-[14px] leading-relaxed text-[#444444]">{answer.content}</div>
          <Accordion type="single" collapsible>
            <AccordionItem value={`item-${index}`}>
              <div className="flex w-full justify-between">
                <p className="font-pretendard-medium text-[12px] text-[#bcbcbc]">
                  <p className="font-pretendard-medium text-[12px] text-[#bcbcbc]">{getDateDiff(answer.createdDate)}</p>
                </p>
                <AccordionTrigger>
                  <div className="flex cursor-pointer items-center gap-1">
                    <Image src="/icons/Comment_UnClicked.svg" alt="Comment_Unclicked" width={16} height={16} />
                    <p className="font-pretendard-medium text-[14px] text-[#bcbcbc]">{answer.commentCount}</p>
                  </div>
                </AccordionTrigger>
              </div>
              <AccordionContent>
                <CommentSection postId={answer.answerPostId} contentType="ANSWER" />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  );
}

export default AnswerSection;
