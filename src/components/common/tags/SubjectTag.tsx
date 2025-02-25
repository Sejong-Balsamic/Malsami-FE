type SubjectTagProps = {
  subjectName: string;
};

function SubjectTag({ subjectName: subject }: SubjectTagProps) {
  return (
    <span className="line-clamp-1 w-fit rounded-sm border border-[#08E4BA] px-2.5 py-1 text-SUIT_12 font-semibold text-[#08E4BA]">
      {subject}
    </span>
  );
}

export default SubjectTag;
