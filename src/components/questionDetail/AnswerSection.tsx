import { useEffect, useState } from "react";
import { Button } from "@/components/shadcn/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/shadcn/accordion";
import Image from "next/image";
import { formatDateTime } from "@/global/time";
import getAnswer from "@/apis/question/getAnswer";
import postLikeQuestion from "@/apis/question/postLikeQuestion";
import sameMember from "@/global/sameMember";
import AttachedFiles from "@/components/common/AttachedFiles";
import { AnswerPost } from "@/types/api/entities/postgres/answerPost";
import CommentSection from "./ACommentSection";
import ChaetaekCheckModal from "./ChaetaekCheckModal";

interface AnswerSectionProps {
  postId: string;
  isAuthor: boolean;
}

function AnswerSection({ postId, isAuthor }: AnswerSectionProps) {
  const [answers, setAnswers] = useState<AnswerPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
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
      prevAnswers.map(ans =>
        ans.answerPostId === answerId ? { ...ans, commentCount: (ans.commentCount || 0) + 1 } : ans,
      ),
    );
  };

  const handleLikeClick = async (answerId: string) => {
    const targetAnswer = answers.find(a => a.answerPostId === answerId);
    if (!targetAnswer || targetAnswer.isLiked || sameMember(targetAnswer.member?.memberId as string)) return;

    try {
      setAnswers(prevAnswers =>
        prevAnswers.map(ans =>
          ans.answerPostId === answerId ? { ...ans, isLiked: true, likeCount: (ans.likeCount || 0) + 1 } : ans,
        ),
      );

      await postLikeQuestion(answerId, "ANSWER");
    } catch (likeError) {
      console.error("좋아요 업데이트 실패:", likeError);
      setAnswers(prevAnswers =>
        prevAnswers.map(ans =>
          ans.answerPostId === answerId ? { ...ans, isLiked: false, likeCount: (ans.likeCount || 0) - 1 } : ans,
        ),
      );
    }
  };

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        setIsLoading(true);
        const response = await getAnswer(postId);
        setAnswers(Array.isArray(response) ? response : []);
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
    return <p className="text-center text-SUIT_14 font-medium text-[#7b7b7c]">답변을 불러오는 중입니다...</p>;
  }

  if (loadError) {
    return <p className="text-center text-SUIT_14 font-medium text-[#f56565]">{loadError}</p>;
  }

  return (
    <div className="flex h-auto min-w-[336px] max-w-[640px] flex-col">
      {answers.length === 0 ? (
        <p className="text-center text-SUIT_14 font-medium text-ui-muted">아직 답변이 없습니다.</p>
      ) : (
        answers.map((ans, index) => (
          <div key={ans.answerPostId || index} className="flex flex-col">
            {/* 상단 라인 */}
            {index !== 0 && <div className="mx-auto h-[1px] w-[353px] rounded-[2px] bg-[#EDEDED]"></div>}

            {/* 상단 정보 */}
            <div className="flex items-center gap-[4px]">
              {/* 채택 태그 */}
              {ans.isChaetaek && (
                <div className="inline-flex items-center justify-center rounded bg-tag-accept px-[14px] py-[6px]">
                  <span className="text-SUIT_12 font-bold text-white">채택됨</span>
                </div>
              )}

              {/* 닉네임 */}
              <span className="text-SUIT_14 font-medium text-ui-body">
                @{ans.isPrivate ? "익명" : ans.member?.uuidNickname ?? "익명"}
              </span>

              {/* 점 */}
              <span className="text-ui-muted">·</span>

              {/* 전공 */}
              <span className="text-SUIT_12 font-medium text-ui-body">
                {ans.member?.major ?? "전공 비공개"}
              </span>

              {/* 점 */}
              <span className="text-ui-muted">·</span>

              {/* 날짜 */}
              <span className="text-SUIT_12 font-medium text-ui-muted">
                {ans.createdDate ? formatDateTime(ans.createdDate) : "--/-- --:--"}
              </span>
            </div>

            {/* 본문 */}
            <p className="mt-4 line-clamp-1 text-SUIT_14 font-medium leading-[19.6px] text-black">
              {ans.content || "내용 없음"}
            </p>

            {/* 이미지 리스트 */}
            {ans.mediaFiles && ans.mediaFiles.length > 0 && (
              <div className="mt-2 flex gap-[8px] overflow-x-auto">
                {ans.mediaFiles.map((f, i) => (
                  <Image
                    key={i}
                    src={f.uploadedImageUrl || ""}
                    alt="ans-img"
                    width={90}
                    height={90}
                    className="h-[90px] w-[90px] flex-shrink-0 rounded-[8px] object-cover"
                  />
                ))}
              </div>
            )}

            {/* 좋아요 영역 */}
            <div className="mt-4 flex items-center gap-[8px] pb-5">
              <div
                role="button"
                tabIndex={0}
                onClick={() => ans.answerPostId && handleLikeClick(ans.answerPostId)}
                onKeyDown={e =>
                  (e.key === "Enter" || e.key === " ") && ans.answerPostId && handleLikeClick(ans.answerPostId)
                }
                className="flex cursor-pointer items-center gap-[4px]"
              >
                <Image
                  src={ans.isLiked ? "/icons/newLikeThumbGreen.svg" : "/icons/newLikeThumbGray.svg"}
                  alt="like"
                  width={16}
                  height={16}
                />
                <span className="text-SUIT_12 font-medium text-ui-count">{ans.likeCount || 0}</span>
              </div>
            </div>

            {/* 채택 모달 */}
            {ans.answerPostId && (
              <ChaetaekCheckModal
                isOpen={isModalOpen && currentAnswerId === ans.answerPostId}
                author={ans.member?.uuidNickname || "익명"}
                onClose={closeModal}
                answerPostId={ans.answerPostId}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default AnswerSection;
