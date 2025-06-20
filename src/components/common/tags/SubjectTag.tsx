type SubjectTagProps = {
  subjectName: string;
};

function SubjectTag({ subjectName }: SubjectTagProps) {
  // 텍스트가 너무 길면 줄임표 처리
  const displayName = subjectName.length > 8 ? `${subjectName.slice(0, 8)}..` : subjectName;

  return (
    <span className="inline-block w-fit max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap rounded-sm border border-[#08E4BA] px-2.5 py-1 text-SUIT_12 font-semibold text-[#08E4BA]">
      {displayName}
    </span>
  );
}

export default SubjectTag;
