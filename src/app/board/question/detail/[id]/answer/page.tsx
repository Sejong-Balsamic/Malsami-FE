"use client";

import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import AnswerPageNav from "@/components/nav/AnswerPageNav";

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-[640px]" style={{ height: "943px" }}>
      <ScrollToTopOnLoad />
      <AnswerPageNav />

    </div>
  );
}
