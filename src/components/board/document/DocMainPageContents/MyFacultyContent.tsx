import { useState, useEffect } from "react";
import { CardProps } from "@/types/DocCardProps.type";
import getDocMyFaculty from "@/apis/document/docMainPage/getDocMyFaculty";
import MovingCardDocument from "../MovingCardDocument";

export default function MyFacultyContent({ faculty }: { faculty: string }) {
  const [myFacultyItems, setMyFacultyItems] = useState<CardProps[]>([]); // 내 전공관련 자료

  // api호출로 내전공관련자료 세팅
  useEffect(() => {
    const fetchMyFacultyItems = async () => {
      try {
        const response = await getDocMyFaculty({ faculty }); // API 호출
        const data = response.map((item: any) => ({
          postId: item.documentPostId,
          subject: item.subject || "과목명",
          title: item.title || "타이틀",
        }));
        setMyFacultyItems(data);
      } catch (error) {
        console.error("내 전공 관련 자료 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    if (faculty) fetchMyFacultyItems(); // faculty 값이 있을 경우 API 호출
  }, []);

  return (
    <div className="mb-10">
      {/* 콘텐츠 제목 */}
      <div className="mb-3.5 flex items-center justify-between">
        <div>
          <p className="font-pretendard-semibold text-lg text-custom-blue-500">내 전공 관련 자료</p>
          <p className="font-pretendard-semibold text-xs text-[#737373]">{faculty}</p>
        </div>
        <span className="font-pretendard-medium text-sm text-custom-blue-500">더 보기 {">"}</span>
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
