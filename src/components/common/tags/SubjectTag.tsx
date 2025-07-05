interface SubjectTagProps {
  subjectName: string;
  // eslint-disable-next-line react/require-default-props
  type?: "document" | "question"; // 자료게시판 또는 질문게시판 타입
}

function SubjectTag({ subjectName, type = "question" }: SubjectTagProps) {
  // 텍스트가 너무 길면 줄임표 처리
  const displayName = subjectName.length > 10 ? `${subjectName.slice(0, 10)}..` : subjectName;

  // 게시판 타입에 따라 색상 설정
  const tagColor = type === "document" ? "#00D1F2" : "#00E271";

  return (
    <span
      className="inline-flex items-center justify-center gap-[10px] rounded-[4px] px-[6px] py-[4px] text-[12px] font-bold leading-[12px] text-white"
      style={{ backgroundColor: tagColor }}
    >
      {displayName}
    </span>
  );
}

export default SubjectTag;
