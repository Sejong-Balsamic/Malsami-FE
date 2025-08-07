/* eslint-disable react/require-default-props */
import React from "react";

interface BellQuestionIconProps {
  isNotificationExist?: boolean;
}

function BellQuestionIcon({ isNotificationExist = false }: BellQuestionIconProps) {
  return (
    <div className="relative flex items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/notificationQuestion.svg" alt="Question bell" width={24} height={24} />
      {isNotificationExist && <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />}
    </div>
  );
}

export default BellQuestionIcon;
