"use client";

import React from "react";
import NoticeCardSkeleton from "./NoticeCardSkeleton";

export default function MovingNoticeCardSkeleton() {
  return (
    <div className="-mx-5 overflow-hidden">
      <div className="flex gap-3 px-5 py-3">
        <NoticeCardSkeleton />
        <NoticeCardSkeleton />
        <NoticeCardSkeleton />
      </div>
    </div>
  );
}
