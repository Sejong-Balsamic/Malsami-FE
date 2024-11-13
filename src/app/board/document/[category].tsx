// app/board/document/[category].tsx

import { useRouter } from "next/router";
import { useEffect } from "react";

// 각 게시판 컴포넌트를 동적으로 import
import CheonminBoard from "@/components/board/document/categories/CheonminBoard";
import JunginBoard from "@/components/board/document/categories/JunginBoard";
import YangbanBoard from "@/components/board/document/categories/YangbanBoard";
import KingBoard from "@/components/board/document/categories/KingBoard";

// 권한을 체크하는 함수 (예시)
const checkAccessPermission = (category: string) => {
  // 여기에 실제 접근 권한 체크 로직을 작성
  // 예를 들어, 권한이 없을 때는 false를 반환
  return true; // 예시로 항상 true 반환
};

const BoardPage = () => {
  const router = useRouter();
  const { category } = router.query; // URL에서 category 파라미터를 가져옴

  useEffect(() => {
    // 페이지 로드 시 접근 권한을 체크
    if (category && !checkAccessPermission(category as string)) {
      router.push("/access-denied"); // 권한이 없을 때 접근 금지 페이지로 리다이렉트
    }
  }, [category, router]);

  // category에 따라 렌더링할 컴포넌트 결정
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
        return <p>해당 게시판을 찾을 수 없습니다.</p>;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">자료 게시판</h1>
      {renderBoard()}
    </div>
  );
};

export default BoardPage;
