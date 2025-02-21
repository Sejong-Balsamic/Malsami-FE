interface SubjectTagProps {
  subject: string;
}

const SubjectTag: React.FC<SubjectTagProps> = ({ subject }) => {
  return <div className="rounded-[10px] bg-[#F5F5F5] px-2 py-1 text-sm text-[#666666]">{subject}</div>;
};

export default SubjectTag;
