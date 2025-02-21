import { useEffect, useState } from "react";
import { Button } from "@/components/shadcn/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/shadcn/accordion";
import Image from "next/image";
import { Answer } from "@/types/apiTypes/answer";
import getDateDiff from "@/global/getDateDiff";
import getAnswer from "@/apis/question/getAnswer";
import postLikeQuestion from "@/apis/question/postLikeQuestion";
import sameMember from "@/global/sameMember";
import CommentSection from "./ACommentSection";
import ChaetaekCheckModal from "./ChaetaekCheckModal";
import AttachedFiles from "@/components/common/AttachedFiles";

interface AnswerSectionProps {
  postId: string;
  isAuthor: boolean;
}

function AnswerSection({ postId, isAuthor }: AnswerSectionProps) {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null); // 변수명 변경
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
      prevAnswers.map(ans => (ans.answerPostId === answerId ? { ...ans, commentCount: ans.commentCount + 1 } : ans)),
    );
  };

  const handleLikeClick = async (answerId: string) => {
    const targetAnswer = answers.find(a => a.answerPostId === answerId);
    if (!targetAnswer || targetAnswer.isLiked) return;
    if (sameMember(targetAnswer.member.memberId)) return;

    try {
      setAnswers(prevAnswers =>
        prevAnswers.map(ans =>
          ans.answerPostId === answerId ? { ...ans, isLiked: true, likeCount: ans.likeCount + 1 } : ans,
        ),
      );

      await postLikeQuestion(answerId, "ANSWER");
    } catch (likeError) {
      console.error("좋아요 업데이트 실패:", likeError);

      setAnswers(prevAnswers =>
        prevAnswers.map(ans =>
          ans.answerPostId === answerId ? { ...ans, isLiked: false, likeCount: ans.likeCount - 1 } : ans,
        ),
      );
    }
  };

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        setIsLoading(true);
        const response = await getAnswer(postId);
        setAnswers(response || []);
      } catch (fetchError) {
        console.error("답변 불러오기 실패:", fetchError);
        setLoadError("답변을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnswers();
  }, [postId]);

  if (isLoading) {
    return <p className="font-pretendard-medium text-center text-[14px] text-[#7b7b7c]">답변을 불러오는 중입니다...</p>;
  }

  if (loadError) {
    return <p className="font-pretendard-medium text-center text-[14px] text-[#f56565]">{loadError}</p>;
  }

  return (
    <div className="my-[40px] flex h-auto min-w-[336px] max-w-[640px] flex-col">
      <span className="font-pretendard-bold mb-[10px] text-[14px] text-[#3D3D3D]">답변 {answers.length}</span>
      {answers.map((ans, index) => (
        <div key={ans.answerPostId} className="my-[10px] flex flex-col gap-[12px] rounded-lg bg-[#f7f8fb] p-[12px]">
          <div className="mb-[4px] flex items-center justify-between">
            <div className="flex items-center justify-between gap-[6px]">
              {ans.isChaetaek && (
                <div className="font-pretendard-bold flex h-[26px] items-center justify-center rounded-[13px] bg-[#0062D2] px-[14px] py-[6px] text-[12px] text-[#ffffff]">
                  채택됨
                </div>
              )}
              <span className="font-pretendard-bold text-[14px]">@{ans.member.uuidNickname}</span>
              <span className="font-pretendard-medium text-[12px] text-[#737373]">
                • {ans.isPrivate ? "비공개" : ans.member.major}
              </span>
            </div>
            {isAuthor && !ans.isChaetaek && (
              <Button
                variant="ghost"
                onClick={() => openModalForAnswer(ans.answerPostId)}
                className="font-pretendard-medium ml-[6px] h-[26px] rounded-[13px] border border-[#0062D2] px-[15px] py-[6px] text-[12px] text-[#0062D2]"
              >
                채택하기
              </Button>
            )}
          </div>
          <div className="font-pretendard-medium text-[14px] leading-relaxed text-[#444444]">{ans.content}</div>
          {/* 첨부파일 */}
          {ans.mediaFiles && ans.mediaFiles.length > 0 && (
            <div className="mt-4">
              <AttachedFiles files={ans.mediaFiles.map(file => file.uploadedImageUrl)} />
            </div>
          )}
          <Accordion type="single" collapsible>
            <AccordionItem value={`item-${index}`}>
              <div className="flex h-[24px] w-full justify-between">
                <p className="font-pretendard-medium text-[12px] text-[#bcbcbc]">{getDateDiff(ans.createdDate)}</p>
                <div className="flex gap-4">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => handleLikeClick(ans.answerPostId)}
                    onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleLikeClick(ans.answerPostId)}
                    className="mb-2 flex cursor-pointer items-center gap-1"
                  >
                    <Image
                      src={ans.isLiked ? "/icons/Like_Clicked.svg" : "/icons/Like_Empty_UnClicked.svg"}
                      alt={ans.isLiked ? "Like_Clicked" : "Like_Unclicked"}
                      width={16}
                      height={16}
                    />
                    <p className="font-pretendard-medium text-[14px] text-[#000000]">{ans.likeCount}</p>
                  </div>
                  <AccordionTrigger>
                    <div className="mb-4 flex cursor-pointer items-center gap-1">
                      <Image src="/icons/Comment_Empty_UnClicked.svg" alt="Comment_Unclicked" width={16} height={16} />
                      <p className="font-pretendard-medium text-[14px] text-[#000000]">{ans.commentCount}</p>
                    </div>
                  </AccordionTrigger>
                </div>
              </div>
              <AccordionContent>
                <CommentSection
                  postId={ans.answerPostId}
                  contentType="ANSWER"
                  onCommentAdded={() => incrementCommentCount(ans.answerPostId)}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <ChaetaekCheckModal
            isOpen={isModalOpen && currentAnswerId === ans.answerPostId}
            author={ans.member.uuidNickname}
            onClose={closeModal}
            answerPostId={ans.answerPostId}
          />
        </div>
      ))}
    </div>
  );
}

export default AnswerSection;
