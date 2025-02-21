interface SubjectTagProps {
  subject: string;
}

// eslint-disable-next-line react/function-component-definition
const SubjectTag: React.FC<SubjectTagProps> = ({ subject }) => {
  return <div className="rounded-[10px] bg-[#F5F5F5] px-2 py-1 text-sm text-[#666666]">{subject}</div>;
};

export default SubjectTag;
