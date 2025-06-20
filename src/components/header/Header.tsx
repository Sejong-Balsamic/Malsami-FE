// src/components/nav/Header.tsx

import React from "react";
import { LEFT_ITEM, LeftItemType, RIGHT_ITEM, RightItemType } from "@/types/header";
import BackIcon from "@/components/icons/BackIcon";
import LogoIcon from "@/components/icons/LogoIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import MenuIcon from "@/components/icons/MenuIcon";
import BellIcon from "@/components/icons/BellIcon";

interface HeaderProps {
  // eslint-disable-next-line react/require-default-props
  title?: string;
  // eslint-disable-next-line react/require-default-props
  leftType?: LeftItemType;
  // eslint-disable-next-line react/require-default-props
  rightType?: RightItemType;
  // eslint-disable-next-line react/require-default-props
  onLeftClick?: () => void;
  // eslint-disable-next-line react/require-default-props
  onRightClick?: () => void;
  // eslint-disable-next-line react/require-default-props
  hasNotification?: boolean;
  // eslint-disable-next-line react/require-default-props
  isFixed?: boolean; // 고정 헤더 여부
}

function Header({
  title = "",
  leftType = LEFT_ITEM.NONE,
  rightType = RIGHT_ITEM.NONE,
  onLeftClick = () => {},
  onRightClick = () => {},
  hasNotification = false,
  isFixed = false,
}: HeaderProps) {
  // 왼쪽 아이콘 결정
  const renderLeftItem = () => {
    switch (leftType) {
      case LEFT_ITEM.BACK:
        return <BackIcon />;
      case LEFT_ITEM.LOGO:
        return <LogoIcon />;
      default:
        return null;
    }
  };

  // 오른쪽 아이콘 결정
  const renderRightItem = () => {
    switch (rightType) {
      case RIGHT_ITEM.BELL:
        return <BellIcon isNotificationExist={hasNotification} />;
      case RIGHT_ITEM.CLOSE:
        return <CloseIcon />;
      case RIGHT_ITEM.MENU:
        return <MenuIcon />;
      default:
        return null;
    }
  };

  const headerClasses = isFixed
    ? "fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[640px] z-50 flex h-16 items-center justify-between bg-white px-5 shadow-md"
    : "flex h-16 items-center justify-between bg-white px-5 shadow-md";

  return (
    <header className={headerClasses}>
      {/* 왼쪽 영역 */}
      <div className="flex items-center">
        {leftType === LEFT_ITEM.LOGO ? (
          <button type="button" onClick={onLeftClick} className="flex items-center rounded-lg p-1 hover:bg-gray-100">
            <LogoIcon />
            <span className="font-tuesday-younah ml-1 text-3xl text-gray-800">세종말싸미</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onLeftClick}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
          >
            {renderLeftItem()}
          </button>
        )}
      </div>

      {/* 중앙 타이틀 */}
      <div className="text-SUIT_18 font-semibold text-gray-800">{title}</div>

      {/* 오른쪽 버튼 */}
      <button
        type="button"
        onClick={onRightClick}
        className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
      >
        {renderRightItem()}
      </button>
    </header>
  );
}

export default Header;
