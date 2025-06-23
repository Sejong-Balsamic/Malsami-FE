"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Write from "@/../public/icons/write.svg";

interface UploadDocFABProps {
  isFABVisible: boolean;
}

function UploadDocumentFAB({ isFABVisible }: UploadDocFABProps) {
  const router = useRouter();

  const handleDocumentClick = () => {
    if (isFABVisible) {
      router.push("/board/document/post");
    }
  };

  return (
    <div
      className={`fixed bottom-[70px] right-[10px] z-[70] transform transition-all duration-500 ${
        isFABVisible ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-0 opacity-0"
      }`}
    >
      <button type="button" onClick={handleDocumentClick} disabled={!isFABVisible} className="relative">
        <Write />
      </button>
    </div>
  );
}

export default UploadDocumentFAB;
