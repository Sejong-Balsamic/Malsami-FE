type FacultyTagProps = {
  title: string;
  onClick?: () => void; // 클릭 이벤트 추가
};

function FacultyTag({ title, onClick }: FacultyTagProps) {
  return (
    <span
      onClick={onClick}
      onKeyDown={e => {
        if ((e.key === "Enter" || e.key === " ") && onClick) {
          onClick();
        }
      }}
      tabIndex={0} // 키보드 포커스를 가능하게 만듦
      role="button" // 접근성을 위해 버튼 역할 추가
      className="font-pretendard-medium mr-1 inline-block cursor-pointer rounded-[33px] bg-custom-green-500 px-3 py-1 text-xs text-white"
    >
      {title}
    </span>
  );
}

FacultyTag.defaultProps = {
  onClick: undefined, // 기본값으로 undefined 설정
};

export default FacultyTag;
