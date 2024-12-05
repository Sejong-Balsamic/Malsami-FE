"use client";

import { useState, useEffect } from "react";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setDocMyFacultyFilterOptions } from "@/store/docFilterOptions/docMyFacultyFilterOptionsSlice";
import { DocFilterOptions } from "@/types/DocFilterOptions";
import DocTierPageNav from "@/components/nav/DocTierPageNav";
import getMyShortInfo from "@/apis/document/getMyShortInfo";
import DocFilterControlBar from "@/components/board/document/DocFilterControlBar";
import getFilteringDocs from "@/apis/document/getFilteringDocs";
import { DocCardProps } from "@/types/docCard.type";
import DocCard from "@/components/board/document/DocCard";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function DocMyFacultyPage() {
  const [facultys, setFacultys] = useState<string[]>([]);
  const dispatch = useDispatch();
  const docMyFacultyFilterOptions = useSelector(
    (state: RootState) => state.docMyFacultyFilterOptions.docMyFacultyFilterOptions,
  ); // Redux에서 가져오기
  const [docCards, setDocCards] = useState<DocCardProps[]>([]); // API 결과값 저장
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리

  const handleFilterChange = (newFilterOptions: DocFilterOptions) => {
    dispatch(setDocMyFacultyFilterOptions(newFilterOptions)); // Redux에 업데이트
  };

  const fetchDocs = async () => {
    const params = {
      documentTypes: docMyFacultyFilterOptions.tags,
      sortType: docMyFacultyFilterOptions.sortOption,
      facultys,
      pageNumber: 0, // 기본 페이지 번호
      pageSize: 12, // 페이지 크기
    };

    setIsLoading(true);
    try {
      const response = await getFilteringDocs(params);
      console.log(response);
      setDocCards(response);
    } catch (error) {
      console.error("문서 필터링 목록을 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, [docMyFacultyFilterOptions]);

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const response = await getMyShortInfo();
        setFacultys(response.member.faculties);
      } catch (error) {
        console.error("내 정보 데이터를 불러오는 중 오류 발생:", error);
      }
    };
    fetchMyInfo();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <ScrollToTopOnLoad />
      <DocTierPageNav subTitle="내 전공 관련 자료" />
      <div className="min-h-screen w-full min-w-[386px] max-w-[640px] bg-white">
        <DocFilterControlBar filterOptions={docMyFacultyFilterOptions} onFilterChange={handleFilterChange} />
        <div className="h-0.5 bg-[#EEEEEE]" />
        <div className="p-5">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            docCards.map((card: DocCardProps) => (
              <DocCard
                key={card.documentPostId}
                documentPostId={card.documentPostId}
                subject={card.subject || "과목명"}
                title={card.title || "타이틀"}
                content={card.content || "내용이 없습니다."}
                documentTypes={card.documentTypes}
                createdDate={card.createdDate || ""}
                thumbnailUrl={card.thumbnailUrl || ""}
                viewCount={card.viewCount || 0}
                likeCount={card.likeCount || 0}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
