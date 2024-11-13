import SearchComponent from "@/components/search/SearchComponent";
import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";

export default function SearchPage() {
  return (
    <div>
      <ScrollToTopOnLoad />
      <SearchComponent />
    </div>
  );
}
