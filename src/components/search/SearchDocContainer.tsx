"use client";

import { useRouter } from "next/navigation";
import { DocCardProps } from "@/types/docCard.type";
import SearchDocCard from "./SearchDocCard";

interface SearchDocContainerProps {
  docResults: DocCardProps[];
  searchValue: string;
  subject: string;
}

export default function SearchDocContainer({ docResults, searchValue, subject }: SearchDocContainerProps) {
  const router = useRouter();
  return (
    <div className="p-5">
      {docResults.length > 0 ? (
        docResults.map((card: DocCardProps) => (
          <div
            role="button"
            tabIndex={0} // 키보드 포커스 가능하도록 추가
            key={card.documentPostId}
            onClick={() => router.push(`/board/document/detail/${card.documentPostId}`)}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") {
                router.push(`/board/document/detail/${card.documentPostId}`);
              }
            }} // 키보드 이벤트 추가
            className="cursor-pointer"
          >
            <SearchDocCard
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
              postTier={card.postTier}
            />
          </div>
        ))
      ) : (
        <p className="font-pretendard-medium text-center text-gray-500">
          <span className="font-pretendard-bold">{subject} </span>
          <span className="font-pretendard-bold">{searchValue}</span> 에 대한 결과가 없습니다.
        </p>
      )}
    </div>
  );
}
