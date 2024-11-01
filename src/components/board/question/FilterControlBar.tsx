import Image from "next/image";

function FilterControlBar() {
  return (
    <div className="px-5 py-4 flex justify-end">
      <div>안녕</div>
      <Image
        src="/icons/FilterIcon.png" // 이미지 경로
        alt="filter"
        width={24}
        height={16}
      />
    </div>
  );
}

export default FilterControlBar;
