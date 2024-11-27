import { useRouter } from "next/navigation";
import Image from "next/image";

interface DocPostNavProps {
  onSave: () => void; // 임시저장 함수
}

function DocPostNav({ onSave }: DocPostNavProps) {
  const router = useRouter();
  return (
    <div className="w-full min-w-[386px] max-w-[640px] bg-white">
      <div className="relative flex items-center justify-between p-5">
        {/* 뒤로 가기 아이콘 */}
        <button type="button" onClick={() => router.back()}>
          <Image src="/icons/BackIcon.svg" alt="썸네일" width={10} height={20} />
        </button>

        {/* 제목 */}
        <h1 className="font-pretendard-bold absolute left-1/2 -translate-x-1/2 transform text-xl">자료 게시판</h1>

        {/* 임시저장 */}
        <button
          type="button"
          onClick={onSave} // 부모에서 전달된 저장 함수 호출
          className="font-pretendard-medium text-[15px] text-[#9B9B9B]"
        >
          임시저장
        </button>
      </div>
      <div className="w- h-0.5 bg-[#EAEAEA]" />
    </div>
  );
}

export default DocPostNav;
