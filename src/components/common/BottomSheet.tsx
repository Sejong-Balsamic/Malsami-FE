import * as React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerTrigger,
} from "@/components/shadcn/drawer";
import { Button } from "@/components/shadcn/button";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "@/global/store/bottomSheetSlice";
import { RootState } from "@/global/store";
import IconWrapper21x21 from "./IconWrapper21x21";

interface BottomSheetProps {
  onReset: () => void; // 초기화버튼 함수
  onConfirm: () => void; // 확인버튼 함수
  children: React.ReactNode; // 메인컨텐츠
  trigger: React.ReactNode; // BottomSheet 열 트리거 (버튼, 아이콘 등등 사용하고 싶은 곳에서 커스텀하기)
}

// BottomSheet 열 트리거 (버튼, 아이콘 등등 사용하고 싶은 곳에서 커스텀하기)
export const BottomSheetTrigger = (
  // eslint-disable-next-line
  <button type="button" className="bg-white p-[14px] shadow-left-custom hover:bg-gray-100">
    <IconWrapper21x21 src="/icons/actions/filter-right.svg" />
  </button>
);

export default function BottomSheet({ onReset, onConfirm, children: mainContent, trigger }: BottomSheetProps) {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.bottomSheet.isOpen);

  // 초기화 함수
  const handleReset = () => onReset();
  // 바텀시트 닫는 함수
  const handleClose = () => dispatch(setIsOpen(false));
  // 확인 함수: 확인 후 닫기
  const handleConfirm = () => {
    onConfirm();
    dispatch(setIsOpen(false)); // 확인 후 닫기
  };

  return (
    <Drawer open={isOpen} onOpenChange={open => dispatch(setIsOpen(open))}>
      {/* BottomSheet 열 트리거. props로 전달받아 UI에 보여줌 */}
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}

      <DrawerContent className="mx-auto flex max-h-[80vh] w-full max-w-[640px] flex-col rounded-t-[30px] p-0">
        {/* 헤더: 필터링, X버튼 */}
        <DrawerHeader className="sticky top-0 flex flex-row items-center justify-between rounded-t-[30px] border-b-2 border-[#F3F3F3] px-[30px] pb-[26px] pt-[10px]">
          <DrawerTitle className="text-SUIT_18 font-semibold">필터링</DrawerTitle>
          <DrawerClose onClick={handleClose}>
            <IconWrapper21x21 src="/icons/actions/x-lg.svg" />
          </DrawerClose>
        </DrawerHeader>

        {/* 메인내용: props로 동적으로 전달받음 */}
        <div className="overflow-y-auto px-[30px] pt-[26px]">{mainContent}</div>

        {/* 하단: 초기화 버튼, 확인 버튼 */}
        {/* TODO: 피그마의 버튼으로 바꾸어야 함 */}
        <div className="sticky bottom-0 flex justify-between p-6">
          <Button variant="outline" className="rounded-full bg-gray-200 px-4 py-2 text-black" onClick={handleReset}>
            초기화
          </Button>
          <Button className="rounded-full bg-green-500 px-4 py-2 text-white" onClick={handleConfirm}>
            확인
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
