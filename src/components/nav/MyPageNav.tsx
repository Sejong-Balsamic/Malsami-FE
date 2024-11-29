"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

function MyPageNav() {
  const router = useRouter();
  return (
    <nav className="flex h-[64px] items-end justify-between border-b-2 border-[#eaeaea] px-5">
      {/* 뒤로 가기 아이콘 */}
      <button type="button" className="flex" onClick={() => router.back()}>
        <Image src="/icons/BackIcon.svg" alt="back" width={10} height={20} className="mb-[20px]" />
      </button>
      {/* 제목 */}
      <h1 className="font-pretendard-bold my-auto text-xl">마이페이지</h1>
      {/* 옵션 아이콘 */}
      <button type="button" className="flex">
        <Image src="/icons/Option.svg" alt="option" width={4} height={20} className="mb-[20px]" />
      </button>
    </nav>
  );
}

export default MyPageNav;
