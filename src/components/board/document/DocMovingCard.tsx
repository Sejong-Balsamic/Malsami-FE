interface CardProps {
  color: string; // 배경 색상
  subject: string; // 상단 제목
  title: string; // 하단 내용
}

function DocMovingCard({ color, subject, title }: CardProps) {
  return (
    <div className="h-[130px] w-[163px] rounded-[10px] shadow-md">
      {/* 상단 파일 모양 */}
      <div className="flex h-[60px] items-end rounded-t-[10px] px-3.5 pb-2.5" style={{ backgroundColor: color }}>
        <span className="font-pretendard-semibold line-clamp-2 text-sm leading-tight text-white">{subject}</span>
      </div>

      {/* 하단 내용 영역 */}
      <div className="bg-white px-3.5 py-2">
        <p className="font-pretendard-bold line-clamp-2 text-sm">{title}</p>
      </div>
    </div>
  );
}

export default DocMovingCard;
