import { usePathname } from "next/navigation";
import Image from "next/image";

function DetailPageNav() {
  const pathname = usePathname();

  return (
    <nav className="flex h-[80px] items-end justify-between px-5">
      {/* 뒤로 가기 아이콘 */}
      <button type="button" className="mb-[34px] flex">
        <Image src="/icons/BackIcon.svg" alt="썸네일" width={10} height={20} />
      </button>

      {/* 제목과 양반등급 표시 */}
      <div className="flex flex-col items-center">
        {pathname === "/board/document/detail" ? (
          <>
            <h1 className="font-pretendard-bold text-xl">자료게시판</h1>
            <div className="font-pretendard-medium mb-[10px] mt-1 text-xs text-[#f46b01]">양반등급</div>
          </>
        ) : (
          <h1 className="font-pretendard-bold text-xl">질문게시판</h1>
        )}
      </div>

      {/* 좌우 여백 맞추기 */}
      <div className="h-2.5 w-2.5 rounded-full bg-white" />
    </nav>
  );
}

export default DetailPageNav;
