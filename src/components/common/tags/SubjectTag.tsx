interface SubjectTagProps {
  subjectName: string;
  // eslint-disable-next-line react/require-default-props
  type?: "document" | "question"; // 자료게시판 또는 질문게시판 타입
}

function SubjectTag({ subjectName, type = "question" }: SubjectTagProps) {
  // 텍스트가 너무 길면 줄임표 처리
  const displayName = subjectName.length > 10 ? `${subjectName.slice(0, 10)}..` : subjectName;

  // 이미지와 동일하게 밝은 파란색으로 수정
  return (
    <span
      className="inline-block w-fit overflow-hidden text-ellipsis whitespace-nowrap rounded-md bg-[#E8FBFF] px-3 py-1 text-SUIT_12 font-bold text-[#00C4DF]"
    >
      {displayName}
    </span>
  );
}

export default SubjectTag;
