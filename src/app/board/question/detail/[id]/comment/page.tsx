"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CommonHeader from "@/components/header/CommonHeader";

import getQuestionDetails from "@/apis/question/getQuestionDetails";
import { QuestionDto } from "@/types/api/responses/questionDto";
import QuestionSummary from "@/components/questionComment/QuestionSummary";
import CommentList from "@/components/questionComment/CommentList";
import CommentInput from "@/components/questionComment/CommentInput";
import QuestionSummarySkeleton from "@/components/common/skeletons/QuestionSummarySkeleton";
import useCommonToast from "@/global/hook/useCommonToast";

export default function CommentPage() {
  const router = useRouter();
  const params = useParams();
  const postId = Array.isArray(params.id) ? params.id[0] : params.id;
  const { showWarningToast } = useCommonToast();

  const [questionDetails, setQuestionDetails] = useState<QuestionDto | null>(null);
  const [isQuestionsLoading, setIsQuestionsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0); // 댓글 목록 리프레시를 위한 키
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false); // 기본값은 축소 상태(제목만 표시)

  // API 호출
  useEffect(() => {
    let isMounted = true;

    if (postId) {
      const fetchData = async () => {
        try {
          setIsQuestionsLoading(true);
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
            showWarningToast("질문 정보를 불러오는데 실패했습니다.");
          }
        } finally {
          if (isMounted) {
            setIsQuestionsLoading(false);
          }
        }
      };

      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [postId, showWarningToast]);

  const handleBackClick = () => {
    router.back();
  };

  const toggleExpanded = () => {
    setIsExpanded(prev => !prev);
  };

  // 댓글이 추가되었을 때 댓글 목록만 다시 로드
  const refreshComments = () => {
    console.log("댓글 새로고침 요청");
    // refreshKey를 증가시켜 CommentList를 강제로 다시 마운트
    setRefreshKey(prev => prev + 1);
  };

  // 디버깅용 로그
  console.log("페이지 렌더링 상태:", { isQuestionsLoading });

  if (error) return <p>오류가 발생했습니다. 다시 시도해주세요.</p>;
  if (!questionDetails && !isQuestionsLoading) return <p>질문을 찾을 수 없습니다.</p>;

  return (
    <div className="min-h-screen bg-white">
      {/* 고정 헤더 */}
      <div className="fixed top-0 z-50 w-full max-w-[640px] bg-white">
        <CommonHeader title="댓글" onLeftClick={handleBackClick} />
      </div>

      {/* 헤더 높이만큼 공백 */}
      <div className="h-16 w-full" />

      {/* 본문 영역 */}
      <div className="relative mx-auto w-full max-w-[640px]">
        {/* 질문 요약 - 항상 표시 */}
        {isQuestionsLoading ? (
          <QuestionSummarySkeleton />
        ) : (
          <QuestionSummary questionDto={questionDetails!} isExpanded={isExpanded} onToggleExpanded={toggleExpanded} />
        )}

        {/* 댓글 목록 */}
        <CommentList
          key={`comments-${refreshKey}`} // refreshKey 변경 시 컴포넌트 강제 재마운트
          postId={postId}
          questionAuthorId={questionDetails?.questionPost?.member?.memberId}
        />

        {/* 댓글 입력창 - 하단 고정 */}
        <div className="fixed bottom-0 left-0 right-0 z-40 mx-auto max-w-[640px] bg-white">
          <CommentInput
            postId={postId}
            isAuthor={questionDetails?.questionPost?.isAuthor || false}
            onCommentAdded={refreshComments}
          />
        </div>

        {/* 댓글 입력창 높이만큼 하단 여백 */}
        <div className="h-20 w-full" />
      </div>
    </div>
  );
}
