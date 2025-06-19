import { useState, useEffect } from "react";
import { documentPostApi } from "@/apis/documentPostApi";
import { DocumentCommand } from "@/types/api/requests/documentCommand";
import { DocumentPost } from "@/types/api/entities/postgres/documentPost";
import { useRouter } from "next/navigation";
import MovingCardDocument from "@/components/common/MovingCardDocument";

export default function MyFacultySection({ facultys }: { facultys: string[] }) {
  const router = useRouter();
  const [myFacultyItems, setMyFacultyItems] = useState<DocumentPost[]>([]); // 내 전공관련 자료
  const [isLoading, setIsLoading] = useState(false);

  // API 호출로 내 전공 관련 자료 세팅
  useEffect(() => {
    const fetchMyFacultyItems = async () => {
      if (!facultys || facultys.length === 0) {
        setMyFacultyItems([]);
        return;
      }

      setIsLoading(true);
      const command: Partial<DocumentCommand> = {
        faculty: facultys.join(","), // string[]를 단일 string으로 변환 (예: "컴퓨터공학,전자공학")
        pageSize: 10, // 표시할 개수 제한
      };

      try {
        const response = await documentPostApi.filteredDocumentPost(command);
        const content = response.documentPostsPage?.content || [];
        setMyFacultyItems(content);
      } catch (error) {
        console.error("내 전공 관련 자료 데이터를 불러오는 중 오류 발생:", error);
        setMyFacultyItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyFacultyItems();
  }, [facultys]); // facultys가 변경될 때마다 호출

  // 콘텐츠 내용 렌더링 함수
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-[200px] items-center justify-center">
          <div className="text-gray-500">로딩 중...</div>
        </div>
      );
    }

    if (myFacultyItems.length > 0) {
      return <MovingCardDocument data={myFacultyItems} />;
    }

    return (
      <div className="flex h-[200px] items-center justify-center">
        <div className="text-gray-500">내 전공 관련 자료가 없습니다.</div>
      </div>
    );
  };

  return (
    <div>
      {/* 콘텐츠 제목 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-SUIT_16 font-medium">🎓 내 전공 관련 자료</h2>
        </div>
        <button
          type="button"
          className="text-SUIT_14 font-medium text-[#A7A7A7]"
          onClick={() => router.push("/board/document/sub/my-faculty")}
        >
          전체보기
        </button>
      </div>

      {/* 콘텐츠 내용 */}
      {renderContent()}
    </div>
  );
}
