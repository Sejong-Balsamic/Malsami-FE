"use client";

import BottomSheet from "@/components/common/BottomSheet"; // 경로 확인 필요
import { Button } from "@/components/shadcn/button";
import { Filter } from "lucide-react"; // 필터 아이콘 (lucide-react 설치 필요)
import { useState } from "react";

export default function FilterPage() {
  const [isOpen, setIsOpen] = useState(false); // Bottom Sheet 상태

  const handleReset = () => {
    console.log("필터 초기화");
  };

  const handleConfirm = () => {
    console.log("필터 확인");
  };

  return (
    <div className="p-4">
      <h1>필터 페이지</h1>
      {/* 아이콘 클릭으로 Bottom Sheet 열기 */}
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full p-2 hover:bg-blue-100"
        onClick={() => setIsOpen(true)}
        aria-label="필터 열기" // 접근성
      >
        <Filter className="h-6 w-6 text-blue-500" /> {/* 아이콘 크기와 색상 조정 */}
      </Button>
      {/* Bottom Sheet 컴포넌트 호출 */}
      <BottomSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen} // Sheet 상태 변경 콜백
        onReset={handleReset}
        onConfirm={handleConfirm}
      >
        {/* 나중에 동적으로 내용 추가 가능 */}
      </BottomSheet>
    </div>
  );
}
