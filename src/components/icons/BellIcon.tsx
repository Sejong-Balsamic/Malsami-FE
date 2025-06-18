import React from "react";

interface BellIconProps {
  // eslint-disable-next-line react/require-default-props
  isNotificationExist?: boolean;
}

// eslint-disable-next-line react/function-component-definition
const BellIcon: React.FC<BellIconProps> = ({ isNotificationExist = false }) => {
  return (
    <div className="flex items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        /* 알림 존재시 빨간점포함된 알림아이콘 표시 */
        src={isNotificationExist ? "/icons/bell-red-dot.svg" : "/icons/bell.svg"}
        alt="Bell Icon"
        width={24}
        height={24}
      />
    </div>
  );
};

export default BellIcon;
