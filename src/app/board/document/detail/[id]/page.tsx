"use client";

import axios from "axios";
import DetailPageNav from "@/components/nav/DDetailNav";
import DocDetail from "@/components/board/document/detail/DocDetail";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import getDocumentDetails from "@/apis/document/getDocumentDetails";
import { DocumentData } from "@/types/DocumentDetailData";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useDispatch } from "react-redux";
import { showToast } from "@/utils/toastUtils";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();

  // URL 파라미터 가져옴
  const params = useParams();
  const postId = Array.isArray(params.id) ? params.id[0] : params.id;

  // 상태 관리
  const [documentDetails, setDocumentDetails] = useState<DocumentData | null>(null);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // API 호출 (postId 변경 시마다)
  useEffect(() => {
    let isMounted = true;

    if (postId) {
      const fetchData = async () => {
        try {
          setIsLoading(true); // 로딩 상태 활성화
          const data = await getDocumentDetails(postId);

          if (isMounted) {
            // postId 설정
            setDocumentDetails({
              ...data,
              documentPost: {
                ...data.documentPost,
                documentPostId: postId,
              },
            });
          }
        } catch (innerError) {
          console.error("문서 상세 정보 가져오기 실패:", innerError);
          if (isMounted && !error) {
            // 에러 객체가 AxiosError인지 확인
            if (axios.isAxiosError(innerError)) {
              const message = innerError.response?.data?.errorMessage || "알 수 없는 오류가 발생했습니다.";
              showToast(dispatch, message, "orange");
              setError(innerError.response?.data?.errorMessage); // 오류 설정
              router.back(); // 이전 페이지로 이동
            } else {
              // AxiosError가 아닌 경우 처리
              showToast(dispatch, "예상치 못한 오류가 발생했습니다.", "orange");
              router.back(); // 이전 페이지로 이동
            }
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

  return (
    <div className="mx-auto w-full max-w-[640px]" style={{ height: "943px" }}>
      <ScrollToTopOnLoad />
      {documentDetails && <DetailPageNav documentData={documentDetails} />}
      {documentDetails && <DocDetail documentData={documentDetails} />}
    </div>
  );
}
