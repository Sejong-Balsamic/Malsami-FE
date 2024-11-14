"use client";

import DetailPageNav from "@/components/nav/DetailPageNav";
import QnaDetail from "@/components/board/question/QnaDetail";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-[640px]" style={{ height: "943px" }}>
      <ScrollToTopOnLoad />
      <DetailPageNav />
      <QnaDetail />
    </div>
  );
}
