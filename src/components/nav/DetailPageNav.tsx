import { usePathname } from "next/navigation";
import Image from "next/image";

function DetailPageNav() {
  const pathname = usePathname();

  return (
    <nav className="mb-4 flex h-[90px] items-end justify-between px-5">
      {/* 뒤로 가기 아이콘 */}
      <button type="button">
        <Image src="/icons/BackIcon.svg" alt="썸네일" width={10} height={20} />
      </button>

      {/* 제목과 양반등급 표시 */}
      <div className="flex flex-col items-center">
        {pathname === "/board/document/detail" ? (
          <>
            <h1 className="font-pretendard-bold text-xl">자료게시판</h1>
            <div className="text-[#f46b01] font-pretendard-medium text-xs mt-1">양반등급</div>
          </>
        ) : (
          <h1 className="font-pretendard-bold text-xl">질문게시판</h1>
        )}
      </div>

      {/* 좌우 여백 맞추기 */}
      <div className="w-2.5 h-2.5 bg-white rounded-full" />
    </nav>
  );
}

export default DetailPageNav;
