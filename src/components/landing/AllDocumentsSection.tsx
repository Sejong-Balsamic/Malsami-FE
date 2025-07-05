"use client";

import React, { useState, useEffect } from "react";
import LandingCardList from "@/components/common/LandingCardList";
import LandingSectionBase from "./LandingSectionBase";

interface AllDocumentsSectionProps {
  onViewAll: () => void;
}

export default function AllDocumentsSection({ onViewAll }: AllDocumentsSectionProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 실제 API 호출로 대체될 부분
    const fetchData = async () => {
      try {
        // TODO: 실제 API 호출
        // await documentApi.getDocuments();
        await new Promise(resolve => {
          setTimeout(resolve, 1000);
        }); // 임시 로딩 시뮬레이션
      } catch (error) {
        // 에러 처리
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <LandingSectionBase
      title="전체 자료 게시판"
      iconSrc="/icons/openFileFolder.svg"
      iconAlt="자료"
      onViewAll={onViewAll}
      isLoading={isLoading}
    >
      <LandingCardList />
    </LandingSectionBase>
  );
}
