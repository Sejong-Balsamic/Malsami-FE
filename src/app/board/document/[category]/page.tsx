"use client";

import { useEffect } from "react";
import CheonminBoard from "@/components/board/document/categories/CheonminBoard";
import JunginBoard from "@/components/board/document/categories/JunginBoard";
import YangbanBoard from "@/components/board/document/categories/YangbanBoard";
import KingBoard from "@/components/board/document/categories/KingBoard";
import { notFound } from "next/navigation";

const allowedCategories = ["cheonmin", "jungin", "yangban", "king"];

// 접근 권한 확인하는 함수. url로 접근 시
const checkAccessPermission = (category: string) => {
  return allowedCategories.includes(category); // 고쳐야 함.
};

// 동적라우팅
function BoardPage({ params }: { params: { category: string } }) {
  const { category } = params;

  // 허용된 카테고리가 아니면 notFound 페이지로 리다이렉트
  if (!allowedCategories.includes(category)) {
    notFound();
  }

  // 사용자가 권한이 없으면 자료 페이지로 리다이렉트
  useEffect(() => {
    if (!checkAccessPermission(category)) {
      alert("접근 권한이 없습니다");
      window.location.href = "/board/document";
    }
  }, []);

  const renderBoard = () => {
    switch (category) {
      case "cheonmin":
        return <CheonminBoard />;
      case "jungin":
        return <JunginBoard />;
      case "yangban":
        return <YangbanBoard />;
      case "king":
        return <KingBoard />;
      default:
        return <p>해당 게시판을 찾을 수 없습니다.</p>; // 기본 반환 값 추가
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">자료 게시판</h1>
      {category ? renderBoard() : <p>로딩 중...</p>}
    </div>
  );
}

export default BoardPage;
