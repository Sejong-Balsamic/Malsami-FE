import ScrollToTopOnLoad from "@/components/common/ScrollToTopOnLoad";
import DocTierPageNav from "@/components/nav/DocTierPageNav";

export default function CheonminBoard() {
  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      <ScrollToTopOnLoad />
      <div className="min-h-screen w-full min-w-[386px] max-w-[640px] bg-white">
        <DocTierPageNav tier="천민 게시판" />
      </div>
    </div>
  );
}
