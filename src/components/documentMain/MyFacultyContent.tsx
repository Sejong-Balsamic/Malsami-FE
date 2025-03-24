import { useState, useEffect } from "react";
import { CardProps } from "@/types/DocCardProps.type";
import { documentPostApi } from "@/apis/documentPostApi";
import { DocumentCommand } from "@/types/api/requests/documentCommand";
import { useRouter } from "next/navigation";
import MovingCardDocument from "./MovingCardDocument";

export default function MyFacultyContent({ facultys }: { facultys: string[] }) {
  const router = useRouter();
  const [myFacultyItems, setMyFacultyItems] = useState<CardProps[]>([]); // 내 전공관련 자료

  // API 호출로 내 전공 관련 자료 세팅
  useEffect(() => {
    const fetchMyFacultyItems = async () => {
      const command: Partial<DocumentCommand> = {
        faculty: facultys.join(","), // string[]를 단일 string으로 변환 (예: "컴퓨터공학,전자공학")
      };
      try {
        const response = await documentPostApi.filteredDocumentPost(command);
        const content = response.documentPostsPage?.content;
        if (content) {
          const data = content.map((item: any) => ({
            postId: item.documentPostId,
            subject: item.subject || "과목명",
            title: item.title || "타이틀",
          }));
          setMyFacultyItems(data);
        } else {
          console.warn("documentPostsPage.content가 비어 있습니다.");
          setMyFacultyItems([]); // 데이터 없으면 빈 배열
        }
      } catch (error) {
        console.error("내 전공 관련 자료 데이터를 불러오는 중 오류 발생:", error);
        setMyFacultyItems([]); // 에러 시 빈 배열
      }
    };

    if (facultys && facultys.length > 0) fetchMyFacultyItems(); // faculty 값이 있을 경우 API 호출
  }, [facultys]); // facultys가 변경될 때마다 호출

  return (
    <div className="mb-10">
      {/* 콘텐츠 제목 */}
      <div className="mb-3.5 flex items-center justify-between">
        <div>
          <p className="font-pretendard-semibold text-lg text-custom-blue-500">내 전공 관련 자료</p>
        </div>
        <button
          type="button"
          className="font-pretendard-medium cursor-pointer text-sm text-custom-blue-500"
          onClick={() => router.push("/board/document/sub/my-faculty")}
        >
          더 보기 {">"}
        </button>
      </div>
      {/* 콘텐츠 내용 */}
      <div className="flex items-center justify-center">
        <div className="flex w-full min-w-[370px] transition-all duration-300 ease-in-out sm:px-10">
          <MovingCardDocument data={myFacultyItems} />
        </div>
      </div>
    </div>
  );
}
