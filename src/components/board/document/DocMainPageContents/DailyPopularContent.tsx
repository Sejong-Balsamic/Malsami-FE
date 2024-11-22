import DocPopularContainer from "./DocPopularContainer";
import { useState, useEffect } from "react";
import getDocDailyPopulars from "@/apis/document/docMainPage/getDocDailyPopulars";
import { PopularItem } from "@/types/DocPopularItem.type";

export default function DailyPopularContent() {
  const [popularItems, setPopularItems] = useState<PopularItem[]>([]); // 전체 인기 데이터

  useEffect(() => {
    const fetchPopularItems = async () => {
      try {
        const response = await getDocDailyPopulars(); // API 호출
        const data = response.map((item: any, index: number) => ({
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
        <span className="font-pretendard-semibold text-lg text-custom-blue-500">일간 인기글</span>
        <span className="font-pretendard-medium text-sm text-custom-blue-500">더 보기 {">"}</span>
      </div>
      <DocPopularContainer allPopularItems={popularItems} />
    </div>
  );
}
