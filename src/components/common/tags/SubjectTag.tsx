type SubjectTagProps = {
  subject: string;
};

function SubjectTag({ subject }: SubjectTagProps) {
  return (
    <span className="line-clamp-1 rounded-sm border border-[#08E4BA] px-2.5 py-1 text-SUIT_12 font-semibold text-[#08E4BA]">
      {subject}
    </span>
  );
}

export default SubjectTag;
