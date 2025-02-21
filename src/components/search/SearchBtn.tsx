import Image from "next/image";

export default function SearchBtn({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex items-center">
      <Image
        src="/icons/SearchIcon.svg"
        alt="검색"
        width={20}
        height={20}
        onClick={onClick}
        className="mr-[10px] flex-shrink-0 cursor-pointer"
      />
    </div>
  );
}
