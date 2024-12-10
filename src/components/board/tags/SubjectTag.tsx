function SubjectTag({ subject }: { subject: string }) {
  return (
    <span className="font-pretendard-bold line-clamp-1 inline-flex items-center justify-center rounded-[33px] bg-custom-blue-500 px-3 py-1 text-xs text-white">
      {subject}
    </span>
  );
}

export default SubjectTag;
