/* eslint-disable */

import * as React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/shadcn/sheet"; // shadcn/ui Sheet 경로에 맞게 조정
import { Button } from "@/components/shadcn/button"; // shadcn/ui Button 사용 (필요 시 추가)

interface BottomSheetProps {
  isOpen: boolean; // Sheet 열림 상태 (page.tsx에서 관리)
  setIsOpen: (open: boolean) => void; // Sheet 상태 변경 콜백
  onReset?: () => void; // 초기화 함수 (선택적)
  onConfirm?: () => void; // 확인 함수 (선택적)
  children?: React.ReactNode; // 내용 (동적으로 props로 전달)
}

export default function BottomSheet({ isOpen, setIsOpen, onReset, onConfirm, children }: BottomSheetProps) {
  const handleReset = () => {
    onReset?.(); // 초기화 함수 호출
  };

  const handleConfirm = () => {
    onConfirm?.(); // 확인 함수 호출
    setIsOpen(false); // 확인 후 닫기
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="bottom" className="flex max-h-[90vh] flex-col p-0">
        {/* 1. 헤더: 고정 (필터링과 X 버튼) */}
        <SheetHeader className="sticky top-0 flex flex-row items-center justify-between border-b-2 border-[#F3F3F3] p-[30px]">
          <SheetTitle className="text-lg font-bold">필터링</SheetTitle>
          <SheetClose className="flex text-gray-500">
            <span>X</span>
          </SheetClose>
        </SheetHeader>
        {/* 2. 내용: props로 동적으로 전달받음, 유연한 높이로 조정 */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
        {/* 3. 초기화 버튼 & 4. 확인 버튼 */}
        <div className="sticky bottom-0 flex justify-between border-t p-4">
          <Button variant="outline" className="rounded-full bg-gray-200 px-4 py-2 text-black" onClick={handleReset}>
            초기화
          </Button>
          <Button className="rounded-full bg-green-500 px-4 py-2 text-white" onClick={handleConfirm}>
            확인
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
