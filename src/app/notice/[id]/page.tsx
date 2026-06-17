"use client";

import useApiErrorHandler from "@/global/hook/useApiErrorHandler";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import CommonHeader from "@/components/header/CommonHeader";
import { RIGHT_ITEM } from "@/types/header";
import NoticeDetail from "@/components/notice/NoticeDetail";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NoticePostCommand } from "@/types/api/requests/noticePostCommand";
import NoticeDetailSkeleton from "@/components/common/skeletons/NoticeDetailSkeleton";
import useCommonToast from "@/global/hook/useCommonToast";
import noticePostApi from "@/apis/noticePostApi";
import { NoticePostDto } from "@/types/api/responses/noticePostDto";

export default function Page() {
  const router = useRouter();
  const { showWarningToast } = useCommonToast();
  const { handleApiError } = useApiErrorHandler();

  // URL 파라미터 가져옴
  const params = useParams();
  const postId = Array.isArray(params.id) ? params.id[0] : params.id;

  // 상태 관리
  const [noticeDetails, setNoticeDetails] = useState<NoticePostDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API 호출 (postId 변경 시마다)
  useEffect(() => {
    let isMounted = true;

    if (postId) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const command: Partial<NoticePostCommand> = {
            noticePostId: postId,
          };
          const data = await noticePostApi.fetchNoticePost(command);

          if (isMounted) {
            setNoticeDetails(data);
          }
        } catch (innerError) {
          if (isMounted && !error) {
            // 공통 에러 핸들러 호출 (뒤로가기 이동 옵션 활성화)
            const message = handleApiError(innerError, "공지사항 상세 정보를 가져오는데 실패했습니다.", true);
            setError(message);
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
  }, [postId, router, showWarningToast]);

  // 오류 상태 처리
  if (error) return <p>오류가 발생했습니다. 다시 시도해주세요.</p>;

  return (
    <div className="mx-auto min-h-screen w-full max-w-[640px]">
      <ScrollToTopOnLoad />
      <CommonHeader title="공지사항" rightType={RIGHT_ITEM.NONE} />
      <div>
        {isLoading ? <NoticeDetailSkeleton /> : noticeDetails && <NoticeDetail noticePostDto={noticeDetails} />}
      </div>
    </div>
  );
}
