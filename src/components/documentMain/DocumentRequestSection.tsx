import { useState, useEffect } from "react";
import { documentPostApi } from "@/apis/documentPostApi";
import { DocumentCommand } from "@/types/api/requests/documentCommand";
import { DocumentPost } from "@/types/api/entities/postgres/documentPost";
import { useRouter } from "next/navigation";
import MovingCardDocument from "@/components/common/MovingCardDocument";

export default function DocumentRequestSection() {
  const router = useRouter();
  const [docRequestItems, setDocRequestItems] = useState<DocumentPost[]>([]); // 자료요청 카드들
  const [isLoading, setIsLoading] = useState(false);

  // API 호출로 자료요청 카드 세팅
  useEffect(() => {
    const fetchDocRequestItems = async () => {
      setIsLoading(true);
      const command: Partial<DocumentCommand> = {
        pageSize: 10, // 표시할 개수 제한
      };

      try {
        // 실제 자료요청 API로 수정 필요 (현재는 일반 자료 API 사용)
        const response = await documentPostApi.filteredDocumentPost(command);
        const content = response.documentPostsPage?.content || [];
        setDocRequestItems(content);
      } catch (error) {
        console.error("자료요청 데이터를 불러오는 중 오류 발생:", error);
        setDocRequestItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocRequestItems();
  }, []);

  // 데이터가 없고 로딩도 아닐 때는 섹션을 숨김
  if (!isLoading && docRequestItems.length === 0) {
    return null;
  }

  return (
    <div>
      {/* 콘텐츠 제목 */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-SUIT_18 font-medium">자료 요청</h2>
        </div>
        <button
          type="button"
          className="text-SUIT_14 font-medium text-[#A7A7A7]"
          onClick={() => router.push("/board/document/sub/request")}
        >
          전체보기
        </button>
      </div>

      {/* 콘텐츠 내용 */}
      {isLoading ? (
        <div className="flex h-[200px] items-center justify-center">
          <div className="text-gray-500">로딩 중...</div>
        </div>
      ) : (
        <MovingCardDocument data={docRequestItems} />
      )}
    </div>
  );
}
