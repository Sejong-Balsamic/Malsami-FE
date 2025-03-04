"use client";

import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import CommonHeader from "@/components/header/CommonHeader";
import { RIGHT_ITEM } from "@/types/header";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import getQuestionDetails from "@/apis/question/getQuestionDetails";
import { QuestionData } from "@/types/apiTypes/QuestionDetailData";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import sameMember from "@/global/sameMember";
import QnaDetail from "@/components/questionDetail/QnaDetail";
import AnswerFAB from "@/components/questionDetail/AnswerFAB";
import { Drawer, DrawerContent } from "@/components/shadcn/drawer";
import Image from "next/image";
import { Button } from "@/components/shadcn/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function Page() {
  const router = useRouter();

  // URL 파라미터 가져옴
  const params = useParams();
  const postId = Array.isArray(params.id) ? params.id[0] : params.id;

  // 상태 관리
  const [questionDetails, setQuestionDetails] = useState<QuestionData | null>(null);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Drawer 열기/닫기 핸들러
  const toggleDrawer = () => setIsDrawerOpen(prev => !prev);

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
      <CommonHeader title="질문 상세보기" rightType={RIGHT_ITEM.MENU} onRightClick={toggleDrawer} />
      {/* 헤더 아래 여백 추가 */}
      <div className="mt-[64px]">
        {questionDetails && (
          <>
            <QnaDetail questionData={questionDetails} />
            {!isAuthor && <AnswerFAB postId={questionDetails.questionPost.questionPostId} />}
          </>
        )}
        {/* Drawer 컴포넌트 */}
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerContent>
            <VisuallyHidden>
              <h1>Options</h1>
              <p>차피 안 보이는 부분</p>
            </VisuallyHidden>
            <div className="flex flex-col pb-[30px]">
              <Button variant="ghost" className="font-pretendard-semibold gap-[10px] text-[16px] text-[#f46b02]">
                <Image src="/icons/Share.svg" alt="share" width={12} height={15} />
                공유하기
              </Button>
              <Button variant="ghost" className="font-pretendard-semibold gap-[10px] text-[16px] text-[#f46b02]">
                <Image src="/icons/Block.svg" alt="block" width={12} height={12} />
                차단하기
              </Button>
              <Button variant="ghost" className="font-pretendard-semibold gap-[10px] text-[16px] text-[#f46b02]">
                <Image src="/icons/Report.svg" alt="report" width={12} height={12} />
                신고하기
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
