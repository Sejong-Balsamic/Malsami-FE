"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CommonHeader from "@/components/header/CommonHeader";

import getQuestionDetails from "@/apis/question/getQuestionDetails";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { QuestionDto } from "@/types/api/responses/questionDto";
import QuestionSummary from "@/components/questionComment/QuestionSummary";
import CommentList from "@/components/questionComment/CommentList";
import CommentInput from "@/components/questionComment/CommentInput";

export default function CommentPage() {
  const router = useRouter();
  const params = useParams();
  const postId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [questionDetails, setQuestionDetails] = useState<QuestionDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false); // 기본값은 축소 상태(제목만 표시)

  // API 호출
  useEffect(() => {
    let isMounted = true;

    if (postId) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const data = await getQuestionDetails(postId);

          if (isMounted) {
            setQuestionDetails({
              ...data,
              questionPost: {
                ...data.questionPost,
                questionPostId: postId,
              },
            });
          }
        } catch (innerError) {
          console.error("질문 상세 정보 가져오기 실패:", innerError);
          if (isMounted) {
            setError("데이터를 불러오는데 실패했습니다.");
          }
        } finally {
          if (isMounted) {
            setIsLoading(false);
          }
        }
      };

      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [postId]);

  const handleBackClick = () => {
    router.back();
  };

  const toggleExpanded = () => {
    setIsExpanded(prev => !prev);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>오류가 발생했습니다. 다시 시도해주세요.</p>;
  if (!questionDetails) return <p>질문을 찾을 수 없습니다.</p>;

  return (
    <div className="min-h-screen bg-white">
      {/* 고정 헤더 */}
      <div className="fixed top-0 z-50 w-full max-w-[640px] bg-white">
        <CommonHeader
          title="댓글"
          onLeftClick={handleBackClick}
        />
      </div>

      {/* 헤더 높이만큼 공백 */}
      <div className="h-16 w-full" />

      {/* 본문 영역 */}
      <div className="relative mx-auto w-full max-w-[640px]">
        {/* 질문 요약 */}
        <QuestionSummary 
          questionDto={questionDetails} 
          isExpanded={isExpanded}
          onToggleExpanded={toggleExpanded}
        />

        {/* 댓글 목록 */}
        <CommentList 
          postId={postId} 
          questionAuthorId={questionDetails?.questionPost?.member?.memberId}
        />

        {/* 댓글 입력창 - 하단 고정 */}
        <div className="fixed bottom-0 left-0 right-0 z-40 mx-auto max-w-[640px]">
          <CommentInput 
            postId={postId} 
            isAuthor={questionDetails?.questionPost?.isAuthor || false} 
          />
        </div>

        {/* 댓글 입력창 높이만큼 하단 여백 */}
        <div className="h-20 w-full" />
      </div>
    </div>
  );
}