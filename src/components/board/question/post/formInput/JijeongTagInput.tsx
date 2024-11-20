interface JiJeongTagInputProps {
  tags: string[];
  onOpenModal: () => void;
}

export default function JiJeongTagInput({ tags, onOpenModal }: JiJeongTagInputProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      className="mb-[26px] flex cursor-pointer items-center"
      onClick={onOpenModal}
      onKeyDown={e => e.key === "Enter" && onOpenModal()}
    >
      <span className="font-pretendard-semibold mr-[14px] text-lg">정적 태그 {">"}</span>
      <div className="flex flex-wrap gap-1.5">
        {tags.map(tag => (
          <span key={tag} className="font-pretendard-bold rounded-full bg-custom-blue-500 px-3 py-1 text-xs text-white">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
