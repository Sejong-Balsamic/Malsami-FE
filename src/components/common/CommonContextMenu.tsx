"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface CommonContextMenuProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement>;
  onReport: () => void;
  onBlock: () => void;
}

export default function CommonContextMenu({ isOpen, onClose, triggerRef, onReport, onBlock }: CommonContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, showAbove: false });

  // 메뉴 위치 계산
  useEffect(() => {
    if (!isOpen || !triggerRef.current || !menuRef.current) {
      return undefined;
    }

    const calculatePosition = () => {
      if (!triggerRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const menuHeight = 88; // 고정 높이
      const menuWidth = 157; // 고정 너비
      const { innerHeight: viewportHeight, innerWidth: viewportWidth } = window;

      // 화면 아래쪽에 공간이 충분한지 확인
      const spaceBelow = viewportHeight - triggerRect.bottom;
      const showAbove = spaceBelow < menuHeight + 10; // 10px 마진

      // 위치 계산 (12px 간격) - fixed 포지션이므로 scrollY 추가 안 함
      const top = showAbove
        ? triggerRect.top - menuHeight - 12 // 위쪽에 표시
        : triggerRect.bottom + 12; // 아래쪽에 표시 (12px 간격)

      // 좌측 정렬 (트리거 버튼의 오른쪽 끝에서 메뉴의 오른쪽 끝을 맞춤)
      let left = triggerRect.right - menuWidth;

      // 화면 왼쪽 벗어남 방지
      if (left < 10) {
        left = 10;
      }

      // 화면 오른쪽 벗어남 방지
      if (left + menuWidth > viewportWidth - 10) {
        left = viewportWidth - menuWidth - 10;
      }

      setPosition({ top, left, showAbove });
    };

    calculatePosition();

    // 스크롤 시 위치 재계산
    const handleScroll = () => {
      calculatePosition();
    };

    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", calculatePosition);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", calculatePosition);
    };
  }, [isOpen, triggerRef]);

  // 외부 클릭 감지
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const handleReportClick = () => {
    onReport();
    onClose();
  };

  const handleBlockClick = () => {
    onBlock();
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="fixed z-50"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <div
        className={`h-[88px] w-[157px] rounded-[8px] bg-white shadow-[2px_2px_10px_0_rgba(0,0,0,0.10)] duration-200 animate-in fade-in-0 zoom-in-95 ${
          position.showAbove ? "slide-in-from-bottom-2" : "slide-in-from-top-2"
        }`}
      >
        {/* 신고 메뉴 */}
        <div
          role="button"
          tabIndex={0}
          className="flex h-[44px] cursor-pointer items-center rounded-t-[8px] px-4 hover:bg-gray-50"
          onClick={handleReportClick}
          onKeyDown={e => e.key === "Enter" && handleReportClick()}
        >
          {/* 신고 아이콘 (20x20) */}
          <Image src="/icons/reportContextMenu.svg" alt="신고" width={20} height={20} className="flex-shrink-0" />
          {/* 신고 텍스트 - 8px gap */}
          <span className="ml-2 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-SUIT_14 font-medium text-black">
            신고
          </span>
          {/* 오른쪽 화살표 (16x16) - 오른쪽에서 12px */}
          <Image
            src="/icons/rightContextMenuGray.svg"
            alt="arrow"
            width={16}
            height={16}
            className="mr-[-4px] flex-shrink-0"
          />
        </div>

        {/* 차단 메뉴 */}
        <div
          role="button"
          tabIndex={0}
          className="flex h-[44px] cursor-pointer items-center rounded-b-[8px] px-4 hover:bg-gray-50"
          onClick={handleBlockClick}
          onKeyDown={e => e.key === "Enter" && handleBlockClick()}
        >
          {/* 차단 아이콘 (20x20) */}
          <Image src="/icons/blockContextMenu.svg" alt="차단" width={20} height={20} className="flex-shrink-0" />
          {/* 차단 텍스트 - 8px gap */}
          <span className="ml-2 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-SUIT_14 font-medium text-black">
            차단
          </span>
        </div>
      </div>
    </div>
  );
}
