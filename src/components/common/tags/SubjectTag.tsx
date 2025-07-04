interface SubjectTagProps {
  subjectName: string;
  // eslint-disable-next-line react/require-default-props
  type?: "document" | "question"; // 자료게시판 또는 질문게시판 타입
}

function SubjectTag({ subjectName, type = "question" }: SubjectTagProps) {
  // 텍스트가 너무 길면 줄임표 처리
  const displayName = subjectName.length > 8 ? `${subjectName.slice(0, 8)}..` : subjectName;

  // 태그 타입에 따라 색상 설정
  const tagColor = type === "document" ? "#00D1F2" : "#08E4BA";

  return (
    <span
      className="inline-block w-fit max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap rounded-sm border px-2.5 py-1 text-SUIT_12 font-semibold"
      style={{ borderColor: tagColor, color: tagColor }}
    >
      {displayName}
    </span>
  );
}

export default SubjectTag;
