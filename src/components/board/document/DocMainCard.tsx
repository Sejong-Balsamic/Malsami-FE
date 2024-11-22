import { CardProps } from "@/types/DocCardProps.type";

function DocMainCard({ color, subject, title }: CardProps) {
  return (
    <div className="border-b-gray flex h-[130px] w-[163px] flex-col overflow-visible rounded-[16px] border-b-[1px] shadow-lg">
      {/* 상단 파일 모양 */}
      <div className="flex h-[60px] items-end rounded-t-[16px] px-3.5 pb-2.5" style={{ backgroundColor: color }}>
        <span className="font-pretendard-semibold line-clamp-2 text-sm leading-tight text-white">{subject}</span>
      </div>

      {/* 하단 내용 영역 */}
      <div className="flex-1 rounded-b-[16px] bg-white px-3.5 py-2 shadow-md">
        <p className="font-pretendard-bold line-clamp-2 text-sm">{title}</p>
      </div>
    </div>
  );
}

export default DocMainCard;
