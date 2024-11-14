"use client";

import DetailPageNav from "@/components/nav/DetailPageNav";
import QnaDetail from "@/components/board/question/QnaDetail";

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-[640px] bg-pink" style={{ height: "943px" }}>
      <DetailPageNav />
      <QnaDetail />
    </div>
  );
}
