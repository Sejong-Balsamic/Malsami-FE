"use client";

import { useRouter } from "next/navigation";
import { DocumentRequestPost } from "@/types/api/entities/postgres/documentRequestPost";
import DocumentCard from "./DocumentCard";

interface DocumentRequestCardListProps {
  data: DocumentRequestPost[];
}

/**
 * 자료 요청 게시판의 카드 목록 컴포넌트
 *
 * @param data - 표시할 자료 요청 게시글 배열
 */
export default function DocumentRequestCardList({ data }: DocumentRequestCardListProps) {
  const router = useRouter();

  if (!data || data.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center">
        <span className="text-SUIT_14 font-medium text-ui-muted">표시할 자료 요청이 없습니다.</span>
      </div>
    );
  }

  /**
   * 자료 요청 카드 클릭 핸들러
   */
  const handleCardClick = (documentRequestPostId: string) => {
    router.push(`/board/document-request/detail/${documentRequestPostId || ""}`);
  };

  return (
    <div className="w-full">
      {data.map((document, index) => (
        <div key={document.documentRequestPostId || `document-request-${index}`}>
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleCardClick(document.documentRequestPostId || "")}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") {
                handleCardClick(document.documentRequestPostId || "");
              }
            }}
            className="cursor-pointer"
          >
            <DocumentCard
              documentPostId={document.documentRequestPostId || ""}
              subject={document.subject || "과목명"}
              title={document.title || "타이틀"}
              content={document.content || "내용이 없습니다."}
              documentTypes={document.documentTypes || []}
              createdDate={document.createdDate || ""}
              thumbnailUrl={""} // 자료 요청은 썸네일 없음
              viewCount={document.viewCount || 0}
              likeCount={document.likeCount || 0}
            />
          </div>

          {/* 마지막 카드가 아니면 16px 간격 + 보더 + 16px 간격 */}
          {index < data.length - 1 && (
            <>
              <div className="h-4" />
              <div className="h-px w-full bg-ui-divider" />
              <div className="h-4" />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
