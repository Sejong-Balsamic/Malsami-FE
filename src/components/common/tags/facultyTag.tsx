type FacultyTagProps = {
  title: string;
};

function FacultyTag({ title }: FacultyTagProps) {
  return (
    <span className="font-pretendard-medium mr-1 inline-block rounded-[33px] bg-custom-green-500 px-2 py-[3px] text-xs text-white">
      {title}
    </span>
  );
}

export default FacultyTag;
