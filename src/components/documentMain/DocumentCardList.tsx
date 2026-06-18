"use client";

import { useRouter } from "next/navigation";
import { DocumentPost } from "@/types/api/entities/postgres/documentPost";
import DocumentCard from "./DocumentCard";

interface DocumentCardListProps {
  data: DocumentPost[];
}

/**
 * 자료게시판의 카드 목록 컴포넌트
 *
 * @param data - 표시할 자료 게시글 배열
 */
export default function DocumentCardList({ data }: DocumentCardListProps) {
  const router = useRouter();

  if (!data || data.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center">
        <span className="text-SUIT_14 font-medium text-ui-muted">표시할 자료가 없습니다.</span>
      </div>
    );
  }

  /**
   * 자료 카드 클릭 핸들러
   */
  const handleCardClick = (documentPostId: string) => {
    router.push(`/board/document/detail/${documentPostId || ""}`);
  };

  return (
    // 모바일: 1열(카드 사이 divider), PC(lg): 2열 그리드(gap)
    <div className="w-full lg:grid lg:grid-cols-2 lg:gap-x-6 lg:gap-y-4">
      {data.map((document, index) => (
        <div key={document.documentPostId || `document-${index}`} className="lg:flex lg:flex-col">
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleCardClick(document.documentPostId || "")}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") {
                handleCardClick(document.documentPostId || "");
              }
            }}
            className="cursor-pointer lg:h-full"
          >
            <DocumentCard
              documentPostId={document.documentPostId || ""}
              subject={document.subject || "과목명"}
              title={document.title || "타이틀"}
              content={document.content || "내용이 없습니다."}
              documentTypes={document.documentTypes || []}
              createdDate={document.createdDate || ""}
              thumbnailUrl={document.thumbnailUrl || ""}
              viewCount={document.viewCount || 0}
              likeCount={document.likeCount || 0}
            />
          </div>

          {/* 마지막 카드가 아니면 구분선 (PC 그리드에서는 숨김) */}
          {index < data.length - 1 && (
            <div className="lg:hidden">
              <div className="h-4" />
              <div className="h-px w-full bg-ui-divider" />
              <div className="h-4" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
