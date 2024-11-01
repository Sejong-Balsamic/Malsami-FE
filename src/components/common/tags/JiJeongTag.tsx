type JiJeongTagProps = {
  title: string;
  color: string;
};

function JiJeongTag({ title, color }: JiJeongTagProps) {
  return (
    <span className="font-pretendard-medium text-xs" style={{ color }}>
      #{title}
    </span>
  );
}

export default JiJeongTag;
