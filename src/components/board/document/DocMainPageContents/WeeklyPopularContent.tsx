import { useState, useEffect } from "react";
import getDocWeeklyPopulars from "@/apis/document/docMainPage/getDocWeeklyPopulars";
import { PopularItem } from "@/types/DocPopularItem.type";
import DocPopularContainer from "./DocPopularContainer";

export default function WeeklyPopularContent() {
  const [popularItems, setPopularItems] = useState<PopularItem[]>([]); // 전체 인기 데이터

  useEffect(() => {
    const fetchPopularItems = async () => {
      try {
        const response = await getDocWeeklyPopulars(); // API 호출
        const data = response.map((item: any, index: number) => ({
          rank: index + 1,
          subject: item.subject || "과목명",
          title: item.title || "타이틀",
        }));
        setPopularItems(data);
      } catch (error) {
        console.error("주간 인기글 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchPopularItems();
  }, []);
  return (
    <div className="mb-10">
      <div className="mb-3.5 flex justify-between">
        <span className="font-pretendard-semibold text-lg text-custom-blue-500">주간 인기 자료글</span>
        <span className="font-pretendard-medium text-sm text-custom-blue-500">더 보기 {">"}</span>
      </div>
      <DocPopularContainer allPopularItems={popularItems} />
    </div>
  );
}