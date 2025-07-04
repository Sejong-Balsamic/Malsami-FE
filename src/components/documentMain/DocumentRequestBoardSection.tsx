"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LandingSectionBase from "@/components/landing/LandingSectionBase";
import LandingCardList from "@/components/common/LandingCardList";
import { documentPostApi } from "@/apis/documentPostApi";
import { DocumentCommand } from "@/types/api/requests/documentCommand";

export default function DocumentRequestBoardSection() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDocumentRequests = async () => {
      setIsLoading(true);
      const command: Partial<DocumentCommand> = {
        pageSize: 10, // 표시할 개수 제한
      };

      try {
        // 자료 요청 API 호출 (현재는 일반 API로 대체)
        await documentPostApi.filteredDocumentPost(command);
        // API 호출 후 로딩 상태 변경
        await new Promise(resolve => {
          setTimeout(resolve, 500);
        });
      } catch (error) {
        console.error("자료 요청 데이터를 불러오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocumentRequests();
  }, []);

  const handleViewAll = () => {
    router.push("/board/document/sub/request");
  };

  return (
    <LandingSectionBase
      title="자료 요청 게시판"
      iconSrc="/icons/fire.svg"
      iconAlt="자료 요청"
      onViewAll={handleViewAll}
      isLoading={isLoading}
    >
      <LandingCardList />
    </LandingSectionBase>
  );
}
