import Image from "next/image";

export default function SearchClearBtn({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="ml-2.5 flex-shrink-0">
      <Image src="/icons/CloseIcon.svg" alt="삭제" width={18} height={18} />
    </button>
  );
}
