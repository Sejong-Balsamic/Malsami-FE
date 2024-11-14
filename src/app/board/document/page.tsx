"use client";

import DocumentPageNav from "@/components/nav/DocumentPageNav";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import DocBoardContent from "@/components/board/document/DocBoardContent";

export default function DocumentBoardPage() {
  return (
    <div className="bg-gray-white">
      <ScrollToTopOnLoad />
      <DocumentPageNav />
      <DocBoardContent />
    </div>
  );
}
