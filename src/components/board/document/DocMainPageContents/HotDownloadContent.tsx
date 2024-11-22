import { useState, useEffect } from "react";
import { CardProps } from "@/types/DocCardProps.type";
import getDocHotDownload from "@/apis/document/docMainPage/getDocHotDownload";
import MovingCardDocument from "../MovingCardDocument";

export default function HotDownloadContent() {
  const [hotDownloadItems, setHotDownloadItems] = useState<CardProps[]>([]); // 핫 다운로드

  // api호출로 내전공관련자료 세팅
  useEffect(() => {
    const fetchHotDownloadItems = async () => {
      try {
        const response = await getDocHotDownload(); // API 호출
        const data = response.map((item: any) => ({
          postId: item.documentPostId,
          subject: item.subject || "과목명",
          title: item.title || "타이틀",
        }));
        setHotDownloadItems(data);
      } catch (error) {
        console.error("Hot download 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchHotDownloadItems();
  }, []);

  return (
    <div className="mb-10">
      {/* 콘텐츠 제목 */}
      <div className="mb-3.5 flex justify-between">
        <span className="font-pretendard-semibold text-lg text-custom-blue-500">HOT 다운로드</span>
        <span className="font-pretendard-medium text-sm text-custom-blue-500">더 보기 {">"}</span>
      </div>
      {/* 콘텐츠 내용 */}
      <div className="flex items-center justify-center">
        <div className="flex w-full min-w-[370px] transition-all duration-300 ease-in-out sm:px-10">
          <MovingCardDocument data={hotDownloadItems} />
        </div>
      </div>
    </div>
  );
}
