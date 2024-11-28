import { PopularItem } from "@/types/DocPopularItem.type";
import { useState, useEffect } from "react";
import getDocDailyPopulars from "@/apis/document/docMainPage/getDocDailyPopulars";
import { useRouter } from "next/navigation";
import DocPopularContainer from "./DocPopularContainer";

export default function DailyPopularContent() {
  const router = useRouter();
  const [popularItems, setPopularItems] = useState<PopularItem[]>([]); // 전체 인기 데이터

  useEffect(() => {
    const fetchPopularItems = async () => {
      try {
        const response = await getDocDailyPopulars(); // API 호출
        const data = response.slice(0, 5).map((item: any, index: number) => ({
          rank: index + 1,
          subject: item.subject || "과목명",
          title: item.title || "타이틀",
        }));
        setPopularItems(data);
      } catch (error) {
        console.error("일간 인기글 데이터를 불러오는 중 오류 발생:", error);
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
