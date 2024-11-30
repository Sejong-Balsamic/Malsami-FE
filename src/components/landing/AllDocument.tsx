import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Document {
  subject: string;
  content: string;
}

interface AllDocumentProps {
  documents: Document[];
}

function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

function AllDocument({ documents }: AllDocumentProps) {
  const router = useRouter();

  return (
    <div className="z-0 w-full pb-[176px] pt-[100px]">
      <div className="mb-[14px] flex w-full items-center justify-between">
        <span className="font-pretendard-semibold text-[18px]">전체 자료 게시판</span>
        <button type="button" className="flex items-center gap-1" onClick={() => router.push("/board/document")}>
          <span className="font-pretendard-medium text-[14px] text-[#03B8A3]">더보기 </span>
          <Image src="/icons/Move.svg" alt="Mypage" width={7} height={14} />
        </button>
      </div>
      <div className="font-pretendard-medium w-full rounded-[20px] border border-gray-100 bg-white px-[14px] py-[22px] text-[14px] shadow-lg shadow-gray-200">
        <div className="relative grid w-full grid-cols-2 grid-cols-[1fr_2fr] grid-rows-5 gap-[15px]">
          {documents.map((doc, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center"> {truncateText(doc.subject, 10)}</div>
              <div className="flex items-center text-[#727272]">{truncateText(doc.content, 20)}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllDocument;
