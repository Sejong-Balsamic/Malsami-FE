"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { documentPostApi } from "@/apis/documentPostApi";
import { DocumentPost } from "@/types/api/entities/postgres/documentPost";

export default function HotDocumentsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("주간");
  const [documents, setDocuments] = useState<DocumentPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        if (activeTab === "주간") {
          const response = await documentPostApi.getWeeklyPopularDocumentPost();
          if (response && response.documentRequestPostsPage && response.documentRequestPostsPage.content) {
            setDocuments(response.documentRequestPostsPage.content);
          }
        } else {
          const response = await documentPostApi.getDailyPopularDocumentPost();
          if (response && response.documentRequestPostsPage && response.documentRequestPostsPage.content) {
            setDocuments(response.documentRequestPostsPage.content);
          }
        }
      } catch (error) {
        console.error("인기 자료를 불러오는데 실패했습니다:", error);
        setDocuments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [activeTab]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">HOT 인기자료</h1>

      {/* 주간/일간 탭 */}
      <div className="mb-6 flex space-x-2">
        <button
          type="button"
          onClick={() => setActiveTab("주간")}
          className={`rounded px-4 py-2 ${activeTab === "주간" ? "bg-green-500 text-white" : "bg-gray-200"}`}
        >
          주간
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("일간")}
          className={`rounded px-4 py-2 ${activeTab === "일간" ? "bg-green-500 text-white" : "bg-gray-200"}`}
        >
          일간
        </button>
      </div>

      {/* 로딩 상태 및 데이터 표시 */}
      {loading && (
        <div className="flex justify-center py-8">
          <p>로딩 중...</p>
        </div>
      )}
      {!loading && documents.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* 여기에 문서 카드 컴포넌트를 배치합니다 */}
          <p>인기 자료 목록이 표시됩니다. (상세 UI 구현 필요)</p>
        </div>
      )}
      {!loading && documents.length === 0 && (
        <div className="flex justify-center py-8">
          <p>표시할 인기 자료가 없습니다.</p>
        </div>
      )}

      {/* 뒤로가기 버튼 */}
      <button type="button" onClick={() => router.back()} className="mt-6 rounded bg-gray-200 px-4 py-2">
        뒤로가기
      </button>
    </div>
  );
}
