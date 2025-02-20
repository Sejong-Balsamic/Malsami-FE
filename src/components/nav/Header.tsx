// src/components/common/Header.tsx
import React from "react";

import { LEFT_ITEM, HeaderLeftItemType, RIGHT_ITEM, HeaderRightItemType } from "@/types/header";
import BackIcon from "@/components/icons/BackIcon";
import LogoIcon from "@/components/icons/LogoIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import MenuIcon from "@/components/icons/MenuIcon";
import BellIcon from "@/components/icons/BellIcon";

interface HeaderProps {
  // eslint-disable-next-line react/no-unused-prop-types
  title?: string;
  leftType?: HeaderLeftItemType;
  rightType?: HeaderRightItemType;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  hasNotification?: boolean; // 벨 아이콘에 알림 여부
}

// eslint-disable-next-line react/function-component-definition
const Header: React.FC<HeaderProps> = ({ leftType, rightType, onLeftClick, onRightClick, hasNotification }) => {
  const renderLeftItem = () => {
    switch (leftType) {
      case LEFT_ITEM.BACK:
        return <BackIcon />;
      case LEFT_ITEM.LOGO:
        return <LogoIcon />;
      case LEFT_ITEM.NONE:
      default:
        return null;
    }
  };

  const renderRightItem = () => {
    switch (rightType) {
      case RIGHT_ITEM.BELL:
        // BellIcon을 사용하여 hasNotification 값에 따라 아이콘을 분류해서 보여줌
        return <BellIcon hasNotification={hasNotification} />;
      case RIGHT_ITEM.CLOSE:
        return <CloseIcon />;
      case RIGHT_ITEM.MENU:
        return <MenuIcon />;
      case RIGHT_ITEM.NONE:
      default:
        return null;
    }
  };

  return (
    <header className="flex h-14 items-center justify-between bg-white px-5 shadow">
      <button type="button" onClick={onLeftClick} className="flex items-center">
        {renderLeftItem()}
      </button>
      <button type="button" onClick={onRightClick} className="flex items-center">
        {renderRightItem()}
      </button>
    </header>
  );
};

Header.defaultProps = {
  title: "",
  leftType: LEFT_ITEM.NONE,
  rightType: RIGHT_ITEM.NONE,
  onLeftClick: () => {},
  onRightClick: () => {},
  hasNotification: false,
};

export default Header;
