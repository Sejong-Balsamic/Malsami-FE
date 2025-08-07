interface CateogryTagInputProps {
  tags: string[];
  onOpenModal: () => void;
}

export default function CategoryInput({ tags, onOpenModal }: CateogryTagInputProps) {
  return (
    <button className="mb-[26px] flex flex-col items-start" type="button" onClick={onOpenModal}>
      <div className="mb-3">
        <span className="font-pretendard-semibold mr-1.5 text-lg">카테고리 선택 {">"}</span>
        <span className="font-pretendard-medium text-custom-blue-500 text-lg">(필수)</span>
      </div>
      {/* 태그 리스트 */}
      <div className="flex flex-wrap gap-1.5">
        {tags.map(tag => (
          <span key={tag} className="font-pretendard-bold bg-custom-blue-500 rounded-full px-3 py-1 text-xs text-white">
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}
