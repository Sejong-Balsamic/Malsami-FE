"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

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
        <Image src="/icons/WriteDocument.svg" alt="WriteDocument" width={56} height={56} />
      </button>
    </div>
  );
}

export default UploadDocumentFAB;
