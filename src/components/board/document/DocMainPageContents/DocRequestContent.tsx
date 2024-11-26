import { useState, useEffect } from "react";
import { CardProps } from "@/types/DocCardProps.type";
import getDocRequest from "@/apis/document/docMainPage/getDocRequest";
import MovingCardDocument from "../MovingCardDocument";

export default function DocRequestContent() {
  const [docRequestItems, setDocRequestItems] = useState<CardProps[]>([]); // 자료요청 카드들

  // api호출로 자료요청 카드 세팅
  useEffect(() => {
    const fetchDocRequestItems = async () => {
      try {
        const response = await getDocRequest(); // API 호출
        console.log("asdf: ", response);
        const data = response.map((item: any) => ({
          postId: item.documentPostId,
          subject: item.subject || "과목명",
          title: item.title || "타이틀",
        }));
        setDocRequestItems(data);
      } catch (error) {
        console.error("자료요청 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchDocRequestItems();
  }, []);

  return (
    <div>
      {/* 콘텐츠 제목 */}
      <div className="mb-3.5 flex justify-between">
        <span className="font-pretendard-semibold text-lg text-custom-blue-500">자료 요청</span>
        <span className="font-pretendard-medium text-sm text-custom-blue-500">더 보기 {">"}</span>
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
