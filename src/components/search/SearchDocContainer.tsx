"use client";

import { useRouter } from "next/navigation";
import SearchDocCard from "./SearchDocCard";
import { DocumentPost } from "../../types/api/entities/postgres/documentPost";

interface SearchDocContainerProps {
  data: DocumentPost[];
  searchValue: string;
  subject: string;
}

export default function SearchDocContainer({ data, searchValue, subject }: SearchDocContainerProps) {
  const router = useRouter();
  return (
    <div className="p-5">
      {data.length > 0 ? (
        data.map(documentPost => (
          <div
            role="button"
            tabIndex={0} // 키보드 포커스 가능하도록 추가
            key={documentPost.documentPostId}
            onClick={() => router.push(`/board/document/detail/${documentPost.documentPostId}`)}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") {
                router.push(`/board/document/detail/${documentPost.documentPostId}`);
              }
            }}
            className="cursor-pointer"
          >
            <SearchDocCard
              key={documentPost.documentPostId}
              documentPostId={documentPost.documentPostId as string}
              subject={documentPost.subject || "과목명"}
              title={documentPost.title || "타이틀"}
              content={documentPost.content || "내용이 없습니다."}
              documentTypes={documentPost.documentTypes}
              createdDate={documentPost.createdDate || ""}
              thumbnailUrl={documentPost.thumbnailUrl || ""}
              viewCount={documentPost.viewCount || 0}
              likeCount={documentPost.likeCount || 0}
              postTier={documentPost.postTier}
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
