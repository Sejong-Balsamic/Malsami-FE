"use client";

import DetailPageNav from "@/components/nav/DetailPageNav";
import QnaDetail from "@/components/board/question/detail/QnaDetail";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import getQuestionDetails from "@/apis/question/getQuestionDetails";
import { QuestionDtoResponse } from "@/types/QuestionDtoResponse";
import AnswerFAB from "@/components/board/question/detail/AnswerFAB";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function Page() {
  // URL 파라미터 가져옴
  const params = useParams();
  let postId = Array.isArray(params.id) ? params.id[0] : params.id;

  // 기본 postId 설정
  if (!postId) {
    postId = "49a3d54f-1f5b-42fd-9337-456c7bb8f199"; // 테스트용
  }

  // 상태 관리
  const [questionDetails, setQuestionDetails] = useState<QuestionDtoResponse | null>(null);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // API 호출 (postId 변경 시마다)
  useEffect(() => {
    if (postId) {
      const fetchData = async () => {
        try {
          setIsLoading(true); // 로딩 상태 활성화
          const data = await getQuestionDetails(postId);
          setQuestionDetails({
            ...data,
            questionPost: {
              ...data.questionPost,
              questionPostId: postId,
            },
            customTags: data.customTags || [],
          }); // postId 설정
        } catch (innerError) {
          console.error("질문 상세 정보 가져오기 실패:", error);
          setError(error); // 오류 설정
        } finally {
          setIsLoading(false); // 로딩 상태 비활성화
        }
      };

      fetchData();
    }
  }, [error, postId]);

  // 로딩 상태 처리
  if (isloading) return <LoadingSpinner />;
  // 오류 상태 처리
  if (error) return <p>오류가 발생했습니다. 다시 시도해주세요.</p>;

  return (
    <div className="mx-auto w-full max-w-[640px]" style={{ height: "943px" }}>
      <ScrollToTopOnLoad />
      <DetailPageNav />
      {questionDetails && (
        <>
          <QnaDetail
            postId={questionDetails.questionPost.questionPostId}
            subject={questionDetails.questionPost.subject}
            rewardYeopjeon={questionDetails.questionPost.rewardYeopjeon}
            title={questionDetails.questionPost.title}
            content={questionDetails.questionPost.content}
            createdDate={questionDetails.questionPost.createdDate}
            uuidNickname={questionDetails.questionPost.member.uuidNickname}
            likeCount={questionDetails.questionPost.likeCount}
            commentCount={questionDetails.questionPost.commentCount}
            questionPresetTags={questionDetails.questionPost.questionPresetTags}
            viewCount={questionDetails.questionPost.viewCount}
            answerCount={questionDetails.questionPost.answerCount}
            customTags={questionDetails.customTags}
          />
          <AnswerFAB postId={questionDetails.questionPost.questionPostId} />
        </>
      )}
    </div>
  );
}
