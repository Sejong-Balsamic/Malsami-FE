"use client";

import DetailPageNav from "@/components/nav/QDetailNav";
import QnaDetail from "@/components/board/question/detail/QnaDetail";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import getQuestionDetails from "@/apis/question/getQuestionDetails";
import { QuestionData } from "@/types/QuestionDetailData";
import AnswerFAB from "@/components/board/question/detail/AnswerFAB";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import sameMember from "@/utils/sameMember";

export default function Page() {
  const router = useRouter();

  // URL 파라미터 가져옴
  const params = useParams();
  const postId = Array.isArray(params.id) ? params.id[0] : params.id;

  // 상태 관리
  const [questionDetails, setQuestionDetails] = useState<QuestionData | null>(null);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // API 호출 (postId 변경 시마다)
  useEffect(() => {
    let isMounted = true;

    if (postId) {
      const fetchData = async () => {
        try {
          setIsLoading(true); // 로딩 상태 활성화
          const data = await getQuestionDetails(postId);

          if (isMounted) {
            // postId 설정
            setQuestionDetails({
              ...data,
              questionPost: {
                ...data.questionPost,
                questionPostId: postId,
              },
            });
          }
        } catch (innerError) {
          console.error("문서 상세 정보 가져오기 실패:", innerError);
          if (isMounted && !error) {
            // 에러가 이미 설정되지 않은 경우만 처리
            setError(error); // 오류 설정
          }
        } finally {
          if (isMounted) {
            setIsLoading(false); // 로딩 상태 비활성화
          }
        }
      };

      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [postId, error, router]);

  // 로딩 상태 처리
  if (isloading) return <LoadingSpinner />;
  // 오류 상태 처리
  if (error) return <p>오류가 발생했습니다. 다시 시도해주세요.</p>;

  const isAuthor = questionDetails && sameMember(questionDetails.questionPost.member.memberId);

  return (
    <div className="mx-auto w-full max-w-[640px]" style={{ height: "943px" }}>
      <ScrollToTopOnLoad />
      <DetailPageNav />
      {questionDetails && (
        <>
          <QnaDetail questionData={questionDetails} />
          {!isAuthor && <AnswerFAB postId={questionDetails.questionPost.questionPostId} />}
        </>
      )}
    </div>
  );
}
