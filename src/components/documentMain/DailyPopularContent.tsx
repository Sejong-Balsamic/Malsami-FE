import { PopularItem } from "@/types/DocPopularItem.type";
import { useState, useEffect } from "react";
import { documentPostApi } from "@/apis/documentPostApi";
import { useRouter } from "next/navigation";
import { DocumentCommand } from "@/types/api/requests/documentCommand";
import DocPopularContainer from "./DocPopularContainer";

export default function DailyPopularContent() {
  const router = useRouter();
  const [popularItems, setPopularItems] = useState<PopularItem[]>([]); // 전체 인기 데이터

  useEffect(() => {
    const fetchPopularItems = async () => {
      const command: Partial<DocumentCommand> = {
        pageNumber: 0,
        pageSize: 5,
      };
      try {
        const response = await documentPostApi.getDailyPopularDocumentPost(command);
        const content = response.documentPostsPage?.content;
        if (content) {
          const data = content.slice(0, 5).map((item: any, index: number) => ({
            postId: item.documentPostId,
            rank: index + 1,
            subject: item.subject || "과목명",
            title: item.title || "타이틀",
          }));
          setPopularItems(data);
        } else {
          console.warn("documentPostsPage.content가 비어 있습니다.");
          setPopularItems([]); // 빈 배열로 초기화
        }
      } catch (error) {
        console.error("일간 인기글 데이터를 불러오는 중 오류 발생:", error);
        setPopularItems([]); // 에러 발생 시 빈 배열 설정
      }
    };

    fetchPopularItems();
  }, []);

  return (
    <div className="mb-10">
      <div className="mb-3.5 flex justify-between">
        <span className="font-pretendard-semibold text-lg text-custom-blue-500">일간 인기 자료글</span>
        <button
          type="button"
          className="font-pretendard-medium cursor-pointer text-sm text-custom-blue-500"
          onClick={() => router.push("/board/document/sub/popular-daily")}
        >
          더 보기 {">"}
        </button>
      </div>
      <DocPopularContainer allPopularItems={popularItems} />
    </div>
  );
}
