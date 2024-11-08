"use client";

import DetailPageNav from "@/components/nav/DetailPageNav";
import DocDetail from "@/components/board/document/DocDetail";

export default function Page() {
  return (
    <div className="w-full max-w-[640px] mx-auto">
      <DetailPageNav />
      <DocDetail />
    </div>
  );
}
