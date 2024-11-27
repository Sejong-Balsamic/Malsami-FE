import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import { Answer } from "@/types/answer";
import getDateDiff from "@/utils/getDateDiff";
import getAnswer from "@/apis/question/getAnswer";
import CommentSection from "./ACommentSection";
import ChaetaekCheckModal from "./ChaetaekCheckModal";
import postLikeQuestion from "@/apis/question/postLikeQuestion";
import sameMember from "@/utils/sameMember";

interface AnswerSectionProps {
  postId: string;
  isAuthor: boolean;
}

function AnswerSection({ postId, isAuthor }: AnswerSectionProps) {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAnswerId, setCurrentAnswerId] = useState<string | null>(null);

  const openModalForAnswer = (answerId: string) => {
    setCurrentAnswerId(answerId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentAnswerId(null);
  };

  const incrementCommentCount = (answerId: string) => {
    setAnswers(prevAnswers =>
      prevAnswers.map(answer =>
        answer.answerPostId === answerId ? { ...answer, commentCount: answer.commentCount + 1 } : answer,
      ),
    );
  };

  const handleLikeClick = async (answerId: string) => {
    const answer = answers.find(a => a.answerPostId === answerId);
    if (!answer || answer.isLiked) return; // 이미 좋아요를 눌렀다면 실행하지 않음
    if (sameMember(answer.member.memberId)) return; // 작성자가 자신에게 좋아요를 누르지 못하도록 차단

    try {
      setAnswers(prevAnswers =>
        prevAnswers.map(answer =>
          answer.answerPostId === answerId ? { ...answer, isLiked: true, likeCount: answer.likeCount + 1 } : answer,
        ),
      );

      await postLikeQuestion(answerId, "ANSWER");
    } catch (error) {
      console.error("좋아요 업데이트 실패:", error);

      // 실패 시 상태 롤백
      setAnswers(prevAnswers =>
        prevAnswers.map(answer =>
          answer.answerPostId === answerId ? { ...answer, isLiked: false, likeCount: answer.likeCount - 1 } : answer,
        ),
      );
    }
  };

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
          <div className="mb-[4px] flex items-center justify-between">
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
              <span className="font-pretendard-medium mb-[4px] text-[12px] text-[#737373]">
                • {answer.isPrivate ? "비공개" : answer.member.major}
              </span>
            </div>
            {isAuthor && !answer.isChaetaek && (
              <Button
                variant="ghost"
                onClick={() => openModalForAnswer(answer.answerPostId)}
                className="font-pretendard-medium ml-[6px] h-[26px] rounded-[13px] border border-[#0062D2] px-[15px] py-[6px] text-[12px] text-[#0062D2]"
              >
                채택하기
              </Button>
            )}
          </div>
          <div className="font-pretendard-medium text-[14px] leading-relaxed text-[#444444]">{answer.content}</div>
          <Accordion type="single" collapsible>
            <AccordionItem value={`item-${index}`}>
              <div className="flex h-[24px] w-full justify-between">
                <p className="font-pretendard-medium text-[12px] text-[#bcbcbc]">
                  <p className="font-pretendard-medium text-[12px] text-[#bcbcbc]">{getDateDiff(answer.createdDate)}</p>
                </p>
                <div className="flex gap-4">
                  <div
                    className="mb-2 flex cursor-pointer items-center gap-1"
                    onClick={() => handleLikeClick(answer.answerPostId)}
                  >
                    <Image
                      src={answer.isLiked ? "/icons/Like_Clicked.svg" : "/icons/Like_Empty_UnClicked.svg"}
                      alt={answer.isLiked ? "Like_Clicked" : "Like_Unclicked"}
                      width={16}
                      height={16}
                    />
                    <p className="font-pretendard-medium text-[14px] text-[#000000]">{answer.likeCount}</p>
                  </div>
                  <AccordionTrigger>
                    <div className="mb-4 flex cursor-pointer items-center gap-1">
                      <Image src="/icons/Comment_Empty_UnClicked.svg" alt="Comment_Unclicked" width={16} height={16} />
                      <p className="font-pretendard-medium text-[14px] text-[#000000]">{answer.commentCount}</p>
                    </div>
                  </AccordionTrigger>
                </div>
              </div>
              <AccordionContent>
                <CommentSection
                  postId={answer.answerPostId}
                  contentType="ANSWER"
                  onCommentAdded={() => incrementCommentCount(answer.answerPostId)}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <ChaetaekCheckModal
            isOpen={isModalOpen && currentAnswerId === answer.answerPostId}
            author={answer.member.uuidNickname}
            onClose={closeModal}
            answerPostId={answer.answerPostId}
          />
        </div>
      ))}
    </div>
  );
}

export default AnswerSection;
