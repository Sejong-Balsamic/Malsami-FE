"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

function DocMainPageNav() {
  const router = useRouter();
  return (
    <nav className="mb-4 flex items-end justify-between px-5 pt-[20px]">
      {/* 뒤로 가기 아이콘 */}
      <button type="button">
        <Image src="/icons/BackIcon.svg" alt="썸네일" width={10} height={20} />
      </button>

      {/* 제목 */}
      <h1 className="font-pretendard-bold text-xl">자료 게시판</h1>

      {/* 검색 아이콘 */}
      <button type="button" onClick={() => router.push("/search")}>
        <Image src="/icons/Search.svg" alt="Search" width={20} height={20} />
      </button>
    </nav>
  );
}

export default DocMainPageNav;
