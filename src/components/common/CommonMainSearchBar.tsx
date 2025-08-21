"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

interface CommonMainSearchBarProps {
  contentType?: "document" | "question";
}

export default function CommonMainSearchBar({ contentType = "document" }: CommonMainSearchBarProps) {
  const router = useRouter();

  const borderColor = contentType === "document" ? "#00D1F2" : "#00E271";

  const handleClick = () => {
    router.push("/search");
  };

  return (
    <div
      onClick={handleClick}
      className="flex h-[52px] w-full cursor-pointer items-center rounded-lg border-2 bg-white px-[18px]"
      style={{ borderColor }}
    >
      <Search size={20} style={{ color: borderColor }} className="mr-3 flex-shrink-0" />
      <span className="text-SUIT_16 font-medium text-ui-muted">과목명, 키워드 등을 입력하세요.</span>
    </div>
  );
}
