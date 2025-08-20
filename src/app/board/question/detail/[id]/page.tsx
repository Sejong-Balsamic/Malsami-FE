"use client";

import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import CommonHeader from "@/components/header/CommonHeader";
import { RIGHT_ITEM } from "@/types/header";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import getQuestionDetails from "@/apis/question/getQuestionDetails";
import QuestionDetailSkeleton from "@/components/common/skeletons/QuestionDetailSkeleton";
import { isSameMemberById } from "@/global/memberUtil";
import QuestionDetail from "@/components/questionDetail/QuestionDetail";
import QuestionDetailFAB from "@/components/questionDetail/QuestionDetailFAB";
import Image from "next/image";
import CommonContextMenu from "@/components/common/CommonContextMenu";
import { QuestionDto } from "@/types/api/responses/questionDto";

export default function Page() {
  const router = useRouter();

  // URL 파라미터 가져옴
  const params = useParams();
  const postId = Array.isArray(params.id) ? params.id[0] : params.id;

  // 상태 관리
  const [questionDetails, setQuestionDetails] = useState<QuestionDto | null>(null);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // 메뉴 열기/닫기 핸들러
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  // 신고/차단 핸들러
  const handleReport = () => {
    // TODO: 신고 기능 구현
    console.log("신고하기");
  };

  const handleBlock = () => {
    // TODO: 차단 기능 구현
    console.log("차단하기");
  };

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
  if (isloading) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-white">
        <ScrollToTopOnLoad />

        {/* 고정 헤더 */}
        <div className="fixed left-0 right-0 top-0 z-50 bg-white">
          <div className="relative mx-auto w-full max-w-[640px]">
            <CommonHeader title="내 전공 질문" rightType={RIGHT_ITEM.NONE} />
          </div>
        </div>

        {/* 헤더 높이만큼 공백 */}
        <div className="h-16 w-full" />

        {/* 스켈레톤 UI */}
        <div className="relative mx-auto w-full max-w-[640px] px-5">
          <QuestionDetailSkeleton />
        </div>
      </div>
    );
  }
  // 오류 상태 처리
  if (error) return <p>오류가 발생했습니다. 다시 시도해주세요.</p>;

  const isAuthor: boolean =
    questionDetails?.questionPost?.isAuthor ??
    (questionDetails && isSameMemberById(questionDetails.questionPost?.member?.memberId as string)) ??
    false;

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <ScrollToTopOnLoad />

      {/* 고정 헤더 */}
      <div className="fixed left-0 right-0 top-0 z-50 bg-white">
        <div className="relative mx-auto w-full max-w-[640px]">
          <CommonHeader
            title="내 전공 질문"
            rightType={RIGHT_ITEM.NONE}
            subtitle={questionDetails?.questionPost?.member?.major || "내 전공"}
          />
          <button
            ref={menuButtonRef}
            type="button"
            className="absolute right-5 top-1/2 flex-shrink-0 -translate-y-1/2 p-1"
            onClick={toggleMenu}
          >
            <Image src="/icons/three-dots-vertical.svg" alt="메뉴" width={20} height={20} />
          </button>
        </div>
      </div>

      {/* 헤더 높이만큼 공백 */}
      <div className="h-16 w-full" />

      {/* 본문 영역 */}
      <div className="relative mx-auto w-full max-w-[640px] px-5 pb-20">
        {questionDetails && (
          <>
            <QuestionDetail
              questionDto={questionDetails}
              selectedAnswerId={selectedAnswerId}
              onAnswerSelect={setSelectedAnswerId}
            />
            <QuestionDetailFAB
              postId={questionDetails.questionPost?.questionPostId as string}
              isAuthor={isAuthor}
              selectedAnswerId={selectedAnswerId}
              hasChaetaek={questionDetails.questionPost?.chaetaekStatus || false}
              onChaetaekComplete={() => setSelectedAnswerId(null)}
            />
          </>
        )}

        {/* Context Menu */}
        <CommonContextMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          triggerRef={menuButtonRef}
          onReport={handleReport}
          onBlock={handleBlock}
        />
      </div>
    </div>
  );
}
