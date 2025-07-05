interface SubjectTagProps {
  subjectName: string;
  // eslint-disable-next-line react/require-default-props
  type?: "document" | "question"; // 자료게시판 또는 질문게시판 타입
}

function SubjectTag({ subjectName, type = "question" }: SubjectTagProps) {
  // 텍스트가 너무 길면 줄임표 처리
  const displayName = subjectName.length > 10 ? `${subjectName.slice(0, 10)}..` : subjectName;

  // 게시판 타입에 따라 색상 설정
  const getTagStyle = () => {
    if (type === "document") {
      // 자료게시판 - 파란색 테마
      return "bg-[#00D1F2] text-white";
    } else {
      // 질문게시판 - 연두색 테마
      return "bg-[#00E8BB] text-white";
    }
  };

  return (
    <span
      className={`inline-flex justify-center items-center gap-[10px] overflow-hidden text-ellipsis whitespace-nowrap rounded-[4px] px-[6px] py-[4px] text-SUIT_12 font-bold ${getTagStyle()}`}
    >
      {displayName}
    </span>
  );
}

export default SubjectTag;
