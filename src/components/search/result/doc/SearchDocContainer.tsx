"use client";

import DocCard from "@/components/board/document/DocCard";
import { DocCardProps } from "@/types/docCard.type";
import { useRouter } from "next/navigation";

interface SearchDocContainerProps {
  docResults: DocCardProps[];
}

export default function SearchDocContainer({ docResults }: SearchDocContainerProps) {
  const router = useRouter();
  return (
    <div className="p-5">
      {docResults.length > 0 ? (
        docResults.map((card: DocCardProps) => (
          <div
            onClick={() => router.push(`/board/document/detail/${card.documentPostId}`)}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") {
                router.push(`/board/document/detail/${card.documentPostId}`);
              }
            }} // 키보드 이벤트 추가
            className="cursor-pointer"
          >
            <DocCard
              key={card.documentPostId}
              documentPostId={card.documentPostId}
              subject={card.subject || "과목명"}
              title={card.title || "타이틀"}
              content={card.content || "내용이 없습니다."}
              documentTypes={card.documentTypes}
              createdDate={card.createdDate || ""}
              thumbnailUrl={card.thumbnailUrl || ""}
              viewCount={card.viewCount || 0}
              likeCount={card.likeCount || 0}
            />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">결과가 없습니다.</p>
      )}
    </div>
  );
}
