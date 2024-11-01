import Image from "next/image";

function QnaPageNav() {
  return (
    <nav className="h-[90px] flex justify-between items-end px-5 mb-4">
      {/* 뒤로 가기 아이콘 */}
      <button type="button">
        <Image src="/icons/BackIcon.svg" alt="썸네일" width={10} height={20} />
      </button>

      {/* 제목 */}
      <h1 className="text-xl font-pretendard-bold">질문 게시판</h1>

      {/* 검색 아이콘 */}
      <button type="button">
        <Image src="/icons/Search.svg" alt="썸네일" width={20} height={20} />
      </button>
    </nav>
  );
}

export default QnaPageNav;
