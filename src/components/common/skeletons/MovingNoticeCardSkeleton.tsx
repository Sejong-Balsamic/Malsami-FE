"use client";

import React from "react";
import NoticeCardSkeleton from "./NoticeCardSkeleton";

export default function MovingNoticeCardSkeleton() {
  return (
    <div className="-mx-5 overflow-hidden">
      <div className="my-3 flex gap-3 px-5">
        <NoticeCardSkeleton />
        <NoticeCardSkeleton />
        <NoticeCardSkeleton />
      </div>
    </div>
  );
}
