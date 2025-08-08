"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { formatDateTime } from "@/global/time";
import getAnswer from "@/apis/question/getAnswer";
import postLikeQuestion from "@/apis/question/postLikeQuestion";
import { ContentType } from "@/types/api/constants/contentType";
import { isSameMemberById } from "@/global/memberUtil";
import { AnswerPost } from "@/types/api/entities/postgres/answerPost";
import ChaetaekTag from "@/components/common/tags/ChaetaekTag";
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

  // 작성자용: 선택된 답변 ID 상태
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);

  // 답변 선택 핸들러 (단일 선택)
  const handleSelect = (answerId: string) => {
    setSelectedAnswerId(prev => (prev === answerId ? null : answerId));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentAnswerId(null);
  };

  const handleLikeClick = async (answerId: string) => {
    const targetAnswer = answers.find(a => a.answerPostId === answerId);
    if (!targetAnswer || targetAnswer.isLiked || isSameMemberById(targetAnswer.member?.memberId as string)) return;

    try {
      setAnswers(prevAnswers =>
        prevAnswers.map(ans =>
          ans.answerPostId === answerId ? { ...ans, isLiked: true, likeCount: (ans.likeCount || 0) + 1 } : ans,
        ),
      );

      await postLikeQuestion(answerId, ContentType.ANSWER);
    } catch (likeError) {
      console.error("좋아요 업데이트 실패:", likeError);
      setAnswers(prevAnswers =>
        prevAnswers.map(answerPost =>
          answerPost.answerPostId === answerId
            ? { ...answerPost, isLiked: false, likeCount: (answerPost.likeCount || 0) - 1 }
            : answerPost,
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
        answers.map((answerPost, index) => (
          <div key={answerPost.answerPostId || index} className="flex">
            {isAuthor && !answerPost.isChaetaek && (
              <div className="mr-[8px] pt-[2px]">
                <Image
                  src={
                    selectedAnswerId === answerPost.answerPostId
                      ? "/icons/chaetaekCheckboxChecked.svg"
                      : "/icons/chaetaekCheckboxUnchecked.svg"
                  }
                  alt={selectedAnswerId === answerPost.answerPostId ? "채택 선택됨" : "채택 선택 안됨"}
                  width={16}
                  height={16}
                  className="cursor-pointer"
                  onClick={() => handleSelect(answerPost.answerPostId as string)}
                />
              </div>
            )}
            <div className="flex flex-1 flex-col">
              {/* 상단 라인 */}
              {index !== 0 && <div className="mx-auto h-[1px] w-[353px] rounded-[2px] bg-[#EDEDED]" />}

              {/* 상단 정보 */}
              <div className="flex items-center gap-[4px]">
                {/* 채택 태그 */}
                {answerPost.isChaetaek && <ChaetaekTag />}

                {/* 닉네임 */}
                <span className="text-SUIT_14 font-medium text-ui-body">
                  @{answerPost.isPrivate ? "익명" : (answerPost.member?.uuidNickname ?? "익명")}
                </span>

                {/* 점 */}
                <span className="text-ui-muted">·</span>

                {/* 날짜 */}
                <span className="text-SUIT_12 font-medium text-ui-muted">
                  {answerPost.createdDate ? formatDateTime(answerPost.createdDate) : "--/-- --:--"}
                </span>
              </div>

              {/* 본문 */}
              <p className="mt-4 line-clamp-1 text-SUIT_14 font-medium leading-[19.6px] text-black">
                {answerPost.content || "내용 없음"}
              </p>

              {/* 이미지 리스트 */}
              {answerPost.mediaFiles && answerPost.mediaFiles.length > 0 && (
                <div className="mt-2 flex gap-[8px] overflow-x-auto">
                  {answerPost.mediaFiles.map((f, i) => (
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
                  onClick={() => answerPost.answerPostId && handleLikeClick(answerPost.answerPostId)}
                  onKeyDown={e =>
                    (e.key === "Enter" || e.key === " ") &&
                    answerPost.answerPostId &&
                    handleLikeClick(answerPost.answerPostId)
                  }
                  className="flex cursor-pointer items-center gap-[4px]"
                >
                  <Image
                    src={answerPost.isLiked ? "/icons/newLikeThumbGreen.svg" : "/icons/newLikeThumbGray.svg"}
                    alt="like"
                    width={16}
                    height={16}
                  />
                  <span
                    className={`text-[12px] font-medium leading-[100%] ${answerPost.isLiked ? "text-[#00E271]" : "text-ui-count"}`}
                  >
                    {answerPost.likeCount || 0}
                  </span>
                </div>
              </div>

              {/* 채택 모달 */}
              {answerPost.answerPostId && (
                <ChaetaekCheckModal
                  isOpen={isModalOpen && currentAnswerId === answerPost.answerPostId}
                  author={answerPost.member?.uuidNickname || "익명"}
                  onClose={closeModal}
                  answerPostId={answerPost.answerPostId}
                />
              )}
            </div>
          </div>
        ))
      )}

      {/* 작성자 전용 채택 버튼 */}
      {isAuthor && (
        <div className="fixed bottom-[20px] left-1/2 z-50 w-full max-w-[640px] -translate-x-1/2 px-[20px]">
          <button
            type="button"
            disabled={!selectedAnswerId}
            onClick={() => {
              if (selectedAnswerId) {
                setCurrentAnswerId(selectedAnswerId);
                setIsModalOpen(true);
              }
            }}
            className={`h-[48px] w-full rounded-[12px] text-SUIT_16 font-bold text-white ${
              selectedAnswerId ? "bg-question-main" : "bg-ui-disabled"
            }`}
          >
            채택하기
          </button>
        </div>
      )}
    </div>
  );
}

export default AnswerSection;
