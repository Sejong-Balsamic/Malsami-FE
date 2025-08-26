"use client";

import SearchBar from "@/components/common/SearchBar";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import CommonHeader from "@/components/header/CommonHeader";
import { RIGHT_ITEM } from "@/types/header";
import { useRouter } from "next/navigation";

export default function SearchPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      <ScrollToTopOnLoad />
      <div className="min-h-screen w-full min-w-[386px] max-w-[640px] bg-white">
        <CommonHeader title="검색" rightType={RIGHT_ITEM.NONE} />
        <div className="mb-1" />
        <div className="px-2">
          <SearchBar
            variant="default"
            borderColor="rgb(0, 232, 187)"
            placeholder="검색어를 입력하세요"
            showLoginCheck
            onSearch={query => {
              if (query.trim()) {
                router.push(`/search/${encodeURIComponent(query)}`);
              }
            }}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
