import { useRouter } from "next/navigation";
import Image from "next/image";

function DocTierPageNav({ tier }: { tier: string }) {
  const router = useRouter();
  return (
    <nav className="mb-4 flex justify-between px-5 pt-[20px]">
      {/* 뒤로 가기 아이콘 */}
      <button type="button" onClick={() => router.back()}>
        <Image src="/icons/BackIcon.svg" alt="썸네일" width={10} height={20} />
      </button>

      {/* 제목 */}
      <h1 className="font-pretendard-bold text-xl">질문 게시판</h1>
      <span className="font-pretendard-regular text-xs text-custom-blue-500">{tier}</span>

      {/* 검색 아이콘 */}
      <button type="button" onClick={() => router.push("/search")}>
        <Image src="/icons/Search.svg" alt="Search" width={20} height={20} />
      </button>
    </nav>
  );
}

export default DocTierPageNav;
