interface JiJeongTagProps {
  label?: string;
  title?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

// FIX: 지정태그 디자인 나오면 수정해야함.
function JiJeongTag({ label, title, style, onClick }: JiJeongTagProps) {
  const displayLabel = label || title || "";
  return (
    <span
      className="font-pretendard-medium mr-1 inline-block cursor-pointer rounded-[33px] bg-custom-blue-500 px-3 py-1 text-xs text-white"
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

JiJeongTag.defaultProps = {
  label: "",
  title: "",
  style: {},
  onClick: undefined,
};

export default JiJeongTag;
