import { useState, useEffect } from "react";
import { CardProps } from "@/types/DocCardProps.type";
import { documentPostApi } from "@/apis/documentPostApi";
import { DocumentCommand } from "@/types/api/requests/documentCommand";
import { useRouter } from "next/navigation";
import MovingCardDocument from "./MovingCardDocument";

export default function DocRequestContent() {
  const router = useRouter();
  const [docRequestItems, setDocRequestItems] = useState<CardProps[]>([]); // 자료요청 카드들

  // API 호출로 자료요청 카드 세팅
  useEffect(() => {
    const fetchDocRequestItems = async () => {
      const command: Partial<DocumentCommand> = {}; // 기본 필터링 조건 없음
      try {
        // `/api/document-request/filter`를 호출한다고 가정
        const response = await documentPostApi.filteredDocumentPost(command); // 실제 엔드포인트 확인 필요
        const content = response.documentPostsPage?.content; // 자료 요청 데이터 구조 확인 필요
        if (content) {
          const data = content.map((item: any) => ({
            postId: item.documentRequestPostId || item.documentPostId, // 백엔드 응답에 따라 조정
            subject: item.subject || "과목명",
            title: item.title || "타이틀",
          }));
          setDocRequestItems(data);
        } else {
          console.warn("documentPostsPage.content가 비어 있습니다.");
          setDocRequestItems([]);
        }
      } catch (error) {
        console.error("자료요청 데이터를 불러오는 중 오류 발생:", error);
        setDocRequestItems([]);
      }
    };

    fetchDocRequestItems();
  }, []);

  return (
    <div>
      {/* 콘텐츠 제목 */}
      <div className="mb-3.5 flex justify-between">
        <span className="font-pretendard-semibold text-lg text-custom-blue-500">자료 요청</span>
        <button
          type="button"
          className="font-pretendard-medium cursor-pointer text-sm text-custom-blue-500"
          onClick={() => router.push("/board/document/sub/request")}
        >
          더 보기 {">"}
        </button>
      </div>
      {/* 콘텐츠 내용 */}
      <div className="flex items-center justify-center">
        <div className="flex w-full min-w-[370px] transition-all duration-300 ease-in-out sm:px-10">
          <MovingCardDocument data={docRequestItems} />
        </div>
      </div>
    </div>
  );
}
