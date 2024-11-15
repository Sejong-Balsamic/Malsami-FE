import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import { Answer } from "@/types/answer";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";

interface AnswerSectionProps {
  postId: string;
  answers: Answer[];
  answerComments: any[];
  fetchAnswerComments: () => void;
}

function AnswerSection({ postId, answers, answerComments, fetchAnswerComments }: AnswerSectionProps) {
  // 답변 댓글을 새로 고침하는 함수
  const refreshComments = (contentType: string) => {
    if (contentType === "ANSWER") {
      fetchAnswerComments();
    }
  };

  return (
    <div className="my-[40px] flex h-auto min-w-[336px] max-w-[640px] flex-col">
      <span className="font-pretendard-bold mb-[10px] text-[14px] text-[#3D3D3D]">답변 {answers.length}</span>
      {answers.map((answer, index) => (
        <div key={answer.answerPostId} className="my-[30px] flex flex-col gap-[12px] rounded-lg bg-[#f7f8fb] p-[12px]">
          <div>
            <Button
              variant="ghost"
              className="font-pretendard-medium mr-[6px] h-[26px] rounded-[13px] bg-[#0062D2] px-[15px] py-[6px] text-[12px] text-[#ffffff]"
            >
              채택됨
            </Button>
            <span className="font-pretendard-bold mb-[4px] text-[14px]">@{answer.member.uuidNickname}</span>
            <span className="font-pretendard-medium mb-[4px] text-[12px] text-[#737373]"> • {answer.member.major}</span>
          </div>
          <div className="font-pretendard-medium m-auto text-[14px] leading-relaxed text-[#444444]">
            {answer.content}
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value={`item-${index}`}>
              <div className="flex w-full justify-between pb-[36px]">
                <p className="font-pretendard-medium text-[12px] text-[#bcbcbc]">{answer.createdDate}</p>
                <AccordionTrigger>
                  <div className="flex cursor-pointer items-center gap-1">
                    <Image src="/icons/Comment_UnClicked.svg" alt="Comment_Unclicked" width={16} height={16} />
                    <p className="font-pretendard-medium text-[14px] text-[#bcbcbc]">{answer.commentCount}</p>
                  </div>
                </AccordionTrigger>
              </div>
              <AccordionContent>
                {/* 답변 댓글 작성 */}
                <CommentInput postId={postId} contentType="ANSWER" refreshComments={() => refreshComments("ANSWER")} />
                {/* 답변 댓글 정보 */}
                <CommentList comments={answerComments} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  );
}

export default AnswerSection;
