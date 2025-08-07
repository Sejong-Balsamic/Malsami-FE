import CommonSearchBar from "@/components/search/CommonSearchBar";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import CommonHeader from "@/components/header/CommonHeader";
import { RIGHT_ITEM } from "@/types/header";

export default function SearchPage() {
  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      <ScrollToTopOnLoad />
      <div className="min-h-screen w-full min-w-[386px] max-w-[640px] bg-white">
        <CommonHeader title="검색" rightType={RIGHT_ITEM.NONE} />
        <div className="mb-1" />
        <div className="px-2">
          <CommonSearchBar />
        </div>
      </div>
    </div>
  );
}
