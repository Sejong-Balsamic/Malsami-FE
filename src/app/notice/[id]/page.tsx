"use client";

import axios from "axios";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import CommonHeader from "@/components/header/CommonHeader";
import { RIGHT_ITEM } from "@/types/header";
import NoticeDetail from "@/components/notice/NoticeDetail";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NoticePostCommand } from "@/types/api/requests/noticePostCommand";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import useCommonToast from "@/global/hook/useCommonToast";
import noticePostApi from "@/apis/noticePostApi";
import { NoticePostDto } from "@/types/api/responses/noticePostDto";

export default function Page() {
  const router = useRouter();
  const { showWarningToast } = useCommonToast();

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
          const command: Partial<NoticePostCommand> = {
            noticePostId: postId,
          };
          const data = await noticePostApi.getNoticePost(command);

          if (isMounted) {
            setNoticeDetails(data);
          }
        } catch (innerError) {
          if (isMounted && !error) {
            if (axios.isAxiosError(innerError)) {
              // 인증 관련 에러(401, 403)는 appClient에서 처리하므로 여기서는 router.back()만 실행
              if (innerError.response?.status === 401 || innerError.response?.status === 403) {
                if (typeof window !== "undefined" && window.history.length > 1) {
                  router.back();
                } else {
                  router.replace("/");
                }
              } else if (innerError.response?.data?.errorCode === "MISSING_REFRESH_TOKEN") {
                // MISSING_REFRESH_TOKEN 에러도 appClient에서 모달 처리
                if (typeof window !== "undefined" && window.history.length > 1) {
                  router.back();
                } else {
                  router.replace("/");
                }
              } else {
                // 다른 에러는 기존 로직 유지
                const message = innerError.response?.data?.errorMessage || "알 수 없는 오류가 발생했습니다.";
                showWarningToast(message);
                setError(message);
                if (typeof window !== "undefined" && window.history.length > 1) {
                  router.back();
                } else {
                  router.replace("/");
                }
              }
            } else {
              showWarningToast("예상치 못한 오류가 발생했습니다.");
              if (typeof window !== "undefined" && window.history.length > 1) {
                router.back();
              } else {
                router.replace("/");
              }
            }
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
  }, [postId, error, router, showWarningToast]);

  // 로딩 상태 처리
  if (isLoading) return <LoadingSpinner />;
  // 오류 상태 처리
  if (error) return <p>오류가 발생했습니다. 다시 시도해주세요.</p>;

  return (
    <div className="mx-auto min-h-screen w-full max-w-[640px]">
      <ScrollToTopOnLoad />
      <CommonHeader title="공지사항 상세보기" rightType={RIGHT_ITEM.NONE} />
      <div>{noticeDetails && <NoticeDetail noticePostDto={noticeDetails} />}</div>
    </div>
  );
}
