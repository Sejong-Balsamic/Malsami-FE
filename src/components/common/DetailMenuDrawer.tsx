"use client";

import React, { useState } from "react";
import { Drawer, DrawerContent } from "@/components/shadcn/drawer";
// eslint-disable-next-line import/no-extraneous-dependencies
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import { Button } from "@/components/shadcn/button";

interface DetailMenuDrawerProps {
  // eslint-disable-next-line react/require-default-props
  onShare?: () => void; // 공유하기 기능 (옵셔널)
  // eslint-disable-next-line react/require-default-props
  onBlock?: () => void; // 차단하기 기능 (옵셔널)
  // eslint-disable-next-line react/require-default-props
  onReport?: () => void; // 신고하기 기능 (옵셔널)
}

// eslint-disable-next-line react/function-component-definition
const DetailMenuDrawer: React.FC<DetailMenuDrawerProps> = ({ onShare, onBlock, onReport }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(prev => !prev);

  return (
    <>
      {/* CommonHeader의 onRightClick에 연결하기 위해 toggleDrawer를 외부로 노출 */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
      <div onClick={toggleDrawer} style={{ display: "none" }} /> {/* 더미 요소로 트리거 역할 */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <VisuallyHidden>
            <h1>Options</h1>
            <p>차피 안 보이는 부분</p>
          </VisuallyHidden>
          <div className="flex flex-col pb-[30px]">
            <Button
              variant="ghost"
              className="font-pretendard-semibold gap-[10px] text-[16px] text-[#f46b02]"
              onClick={onShare}
            >
              <Image src="/icons/Share.svg" alt="share" width={12} height={15} />
              공유하기
            </Button>
            <Button
              variant="ghost"
              className="font-pretendard-semibold gap-[10px] text-[16px] text-[#f46b02]"
              onClick={onBlock}
            >
              <Image src="/icons/Block.svg" alt="block" width={12} height={12} />
              차단하기
            </Button>
            <Button
              variant="ghost"
              className="font-pretendard-semibold gap-[10px] text-[16px] text-[#f46b02]"
              onClick={onReport}
            >
              <Image src="/icons/Report.svg" alt="report" width={12} height={12} />
              신고하기
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DetailMenuDrawer;

// toggleDrawer 함수를 외부에서 호출할 수 있도록 별도 export
export const useDetailMenuDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen(prev => !prev);
  return { toggleDrawer, isDrawerOpen };
};
