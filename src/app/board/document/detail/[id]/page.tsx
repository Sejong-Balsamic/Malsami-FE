"use client";

import DetailPageNav from "@/components/nav/DDetailNav";
import DocDetail from "@/components/board/document/detail/DocDetail";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import getDocumentDetails from "@/apis/document/getDocumentDetails";
import { DocumentData } from "@/types/DocumentData";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import sameMember from "@/utils/sameMember";

export default function Page() {
  // URL 파라미터 가져옴
  const params = useParams();
  let postId = Array.isArray(params.id) ? params.id[0] : params.id;

  // 상태 관리
  const [documentDetails, setDocumentDetails] = useState<DocumentData | null>(null);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // API 호출 (postId 변경 시마다)
  useEffect(() => {
    if (postId) {
      const fetchData = async () => {
        try {
          setIsLoading(true); // 로딩 상태 활성화
          const data = await getDocumentDetails(postId);
          setDocumentDetails({
            ...data,
            documentPost: {
              ...data.documentPost,
              documentPostId: postId,
            },
          }); // postId 설정
        } catch (innerError) {
          console.error("문서 상세 정보 가져오기 실패:", error);
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

  const isAuthor = documentDetails && sameMember(documentDetails.documentPost.member.memberId);

  return (
    <div className="mx-auto w-full max-w-[640px]" style={{ height: "943px" }}>
      <ScrollToTopOnLoad />
      <DetailPageNav />
      {documentDetails && (
        <>
          <DocDetail documentData={documentDetails} />
        </>
      )}
    </div>
  );
}
