type JiJeongTagProps = {
  tag: string;
};

function DocJiJeongTag({ tag }: JiJeongTagProps) {
  return <span className="font-pretendard-medium mr-5 text-xs text-custom-blue-500">#{tag}</span>;
}

export default DocJiJeongTag;
