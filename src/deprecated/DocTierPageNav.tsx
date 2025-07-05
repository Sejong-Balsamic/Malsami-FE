import { useRouter } from "next/navigation";
import Image from "next/image";

function DocTierPageNav({ subTitle }: { subTitle: string }) {
  const router = useRouter();
  return (
    <div className="w-full min-w-[386px] max-w-[640px] bg-white">
      <div className="flex justify-between px-5 pb-2 pt-5">
        {/* 뒤로 가기 아이콘 */}
        <button type="button" onClick={() => router.back()}>
          <Image src="/icons/BackIcon.svg" alt="썸네일" width={10} height={20} />
        </button>

        {/* 제목 */}
        <div className="text-center">
          <h1 className="font-pretendard-bold text-xl">자료 게시판</h1>
          <span className="font-pretendard-regular text-custom-blue-500 text-xs">{subTitle}</span>
        </div>

        {/* 검색 아이콘 */}
        <button type="button" onClick={() => router.push("/search")}>
          <Image src="/icons/SearchIcon.svg" alt="Search" width={20} height={20} />
        </button>
      </div>
      <div className="w- h-0.5 bg-[#EAEAEA]" />
    </div>
  );
}

export default DocTierPageNav;