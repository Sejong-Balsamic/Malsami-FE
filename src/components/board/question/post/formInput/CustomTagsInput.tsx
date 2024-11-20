interface CustomTagsProps {
  tags: string[];
  tagInput: string;
  onTagChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTagKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onRemoveTag: (tag: string) => void;
}

export default function CustomTagsInput({ tags, tagInput, onTagChange, onTagKeyDown, onRemoveTag }: CustomTagsProps) {
  return (
    <label htmlFor="customTags" className="mb-[26px] block">
      <span className="font-pretendard-semibold mr-1.5 text-lg"> 커스텀 태그</span>
      <span className="font-pretendard-medium text-base text-[#F46B01]"> 10자 이하, 4개 이하</span>
      <div className="mb-4 mt-1 flex flex-wrap gap-1.5">
        {tags.map(tag => (
          <span
            key={tag}
            className="font-pretendard-bold flex items-center rounded-full bg-[#5ED513] px-3 text-xs text-white"
          >
            {tag}
            <button type="button" onClick={() => onRemoveTag(tag)} className="ml-2 text-base font-bold text-white">
              &times;
            </button>
          </span>
        ))}
      </div>
      <div className="relative">
        <input
          type="text"
          name="customTags"
          placeholder="Tab,Enter로 구분해 태그를 입력해주세요."
          value={tagInput}
          onChange={onTagChange}
          onKeyDown={onTagKeyDown}
          maxLength={10}
          className="w-full rounded-[8px] border-2 border-[#BDBDBD] px-4 py-2 text-base placeholder:text-sm"
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 transform text-sm text-gray-500">
          {tagInput.length} /10자
        </span>
      </div>
    </label>
  );
}
