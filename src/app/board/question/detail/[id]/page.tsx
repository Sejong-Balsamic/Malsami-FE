"use client";

import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import CommonHeader from "@/components/header/CommonHeader";
import { RIGHT_ITEM } from "@/types/header";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { questionPostApi } from "@/apis/questionPostApi";
import useApiErrorHandler from "@/global/hook/useApiErrorHandler";
import QuestionDetailSkeleton from "@/components/common/skeletons/QuestionDetailSkeleton";
import { isSameMemberById } from "@/global/memberUtil";
import QuestionDetail from "@/components/questionDetail/QuestionDetail";
import QuestionDetailFAB from "@/components/questionDetail/QuestionDetailFAB";
import CommonContextMenu from "@/components/common/CommonContextMenu";
import { QuestionDto } from "@/types/api/responses/questionDto";
import { PageContainer, TopBarContainer } from "@/components/layout/AppContainer";

export default function Page() {
  const router = useRouter();
  const { handleApiError } = useApiErrorHandler();

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
  };

  const handleBlock = () => {
    // TODO: 차단 기능 구현
  };

  // API 호출 (postId 변경 시마다)
  useEffect(() => {
    let isMounted = true;

    if (postId) {
      const fetchData = async () => {
        try {
          setIsLoading(true); // 로딩 상태 활성화
          // 신식 API 패턴(questionPostApi) 사용 — postId를 Command로 전달
          const data = await questionPostApi.getQuestionPost({ postId });

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
            // 공통 에러 핸들러 적용 (뒤로가기 이동 옵션 활성화)
            const message = handleApiError(innerError, "질문 상세 정보를 가져오는데 실패했습니다.", true);
            setError(message); // 오류 설정
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
      <div className="min-h-screen overflow-x-hidden bg-gray-100">
        <ScrollToTopOnLoad />

        {/* 고정 헤더 — PC에서도 컨테이너 폭 안에서만 흰 배경 */}
        <TopBarContainer>
          <CommonHeader title="질문 상세" rightType={RIGHT_ITEM.NONE} />
        </TopBarContainer>

        {/* 본문 컨테이너 — 컨테이너 영역만 흰 배경, 바깥은 회색 */}
        <PageContainer className="min-h-screen bg-white px-5">
          {/* 헤더 높이만큼 공백 */}
          <div className="h-16 w-full" />
          <QuestionDetailSkeleton />
        </PageContainer>
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
    <div className="min-h-screen overflow-x-hidden bg-gray-100">
      <ScrollToTopOnLoad />

      {/* 고정 헤더 — PC에서도 컨테이너 폭 안에서만 흰 배경 */}
      <TopBarContainer>
        <CommonHeader
          title={questionDetails?.questionPost?.subject || "질문 상세"}
          rightType={RIGHT_ITEM.MENU}
          onRightClick={toggleMenu}
          subtitle={questionDetails?.questionPost?.member?.major || "전공 비공개"}
          rightButtonRef={menuButtonRef}
        />
      </TopBarContainer>

      {/* 본문 컨테이너 — 컨테이너 영역만 흰 배경, 바깥은 회색 */}
      <PageContainer className="min-h-screen bg-white px-5 pb-20">
        {/* 헤더 높이만큼 공백 */}
        <div className="h-16 w-full" />
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
      </PageContainer>
    </div>
  );
}
