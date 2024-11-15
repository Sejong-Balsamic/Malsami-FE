"use client";

import DetailPageNav from "@/components/nav/DetailPageNav";
import QnaDetail from "@/components/board/question/QnaDetail";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import getQuestionDetails from "@/apis/question/getQuestionDetails";
import { QuestionDtoResponse } from "@/types/QuestionDtoResponse";

export default function Page() {
  // useParams를 사용해 URL의 동적 파라미터를 가져옴
  const params = useParams();
  let postId = Array.isArray(params.id) ? params.id[0] : params.id;

  // 기본 postId 설정
  if (!postId) {
    postId = "82902322-8e0b-4eef-a7f6-2e468c86c3e0";
  }

  // 상태 관리
  const [questionDetails, setQuestionDetails] = useState<QuestionDtoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API 호출 (postId 변경 시마다)
  useEffect(() => {
    if (postId) {
      const fetchData = async () => {
        try {
          setLoading(true); // 로딩 상태 활성화
          const data = await getQuestionDetails(postId); // postId를 이용해 API 호출
          setQuestionDetails(data); // 데이터 설정
        } catch (innerError) {
          console.error("질문 상세 정보 가져오기 실패:", error);
          setError(error); // 오류 설정
        } finally {
          setLoading(false); // 로딩 상태 비활성화
        }
      };

      fetchData();
    }
  }, [error, postId]);

  // 로딩 상태 처리
  if (loading) return <p>로딩 중</p>;
  // 오류 상태 처리
  if (error) return <p>오류가 발생했습니다. 다시 시도해주세요.</p>;

  return (
    <div className="mx-auto w-full max-w-[640px]" style={{ height: "943px" }}>
      <ScrollToTopOnLoad />
      <DetailPageNav />
      {questionDetails && (
        <QnaDetail
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
        />
      )}
    </div>
  );
}
