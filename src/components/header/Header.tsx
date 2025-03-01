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
}

function Header({
  title = "",
  leftType = LEFT_ITEM.NONE,
  rightType = RIGHT_ITEM.NONE,
  onLeftClick = () => {},
  onRightClick = () => {},
  hasNotification = false,
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

  return (
    <header className="flex h-14 items-center justify-between bg-white px-5 shadow">
      {/* 왼쪽 버튼 */}
      <button type="button" onClick={onLeftClick} className="flex items-center">
        {renderLeftItem()}
      </button>

      {/* 중앙 타이틀 */}
      <div className="text-base font-semibold">{title}</div>

      {/* 오른쪽 버튼 */}
      <button type="button" onClick={onRightClick} className="flex items-center">
        {renderRightItem()}
      </button>
    </header>
  );
}

export default Header;
