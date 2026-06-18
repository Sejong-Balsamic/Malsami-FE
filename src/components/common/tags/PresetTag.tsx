interface PresetTagProps {
  label?: string;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

// FIX: 지정태그 디자인 나오면 수정해야함.
function PresetTag({ label, title, className, style, onClick }: PresetTagProps) {
  const displayLabel = label || title || "";
  return (
    <span
      className={`font-suit-medium bg-custom-blue-500 mr-1 inline-block cursor-pointer rounded-full px-3 py-1 text-xs text-white ${className ?? ""}`}
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
  className: "",
  style: {},
  onClick: undefined,
};

export default PresetTag;
