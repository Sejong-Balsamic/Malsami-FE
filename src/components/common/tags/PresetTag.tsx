interface PresetTagProps {
  label?: string;
  title?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

// FIX: 지정태그 디자인 나오면 수정해야함.
function PresetTag({ label, title, style, onClick }: PresetTagProps) {
  const displayLabel = label || title || "";
  return (
    <span
      className="font-pretendard-medium bg-custom-blue-500 mr-1 inline-block cursor-pointer rounded-[33px] px-3 py-1 text-xs text-white"
      style={style}
      onClick={onClick}
      onKeyDown={e => {
        if ((e.key === "Enter" || e.key === " ") && onClick) {
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
    >
      {displayLabel}
    </span>
  );
}

PresetTag.defaultProps = {
  label: "",
  title: "",
  style: {},
  onClick: undefined,
};

export default PresetTag;
