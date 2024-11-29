import SearchComponent from "@/components/search/SearchComponent";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";

export default function SearchPage() {
  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      <ScrollToTopOnLoad />
      <div className="min-h-screen w-full min-w-[386px] max-w-[640px] bg-white">
        <SearchComponent />
      </div>
    </div>
  );
}
