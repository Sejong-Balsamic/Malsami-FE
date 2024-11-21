function SubjectTag({ subject }: { subject: string }) {
  return (
    <span className="font-pretendard-bold mb-2.5 line-clamp-1 w-fit rounded-[33px] bg-custom-blue-500 px-3 py-1 text-xs text-white">
      {subject}
    </span>
  );
}

export default SubjectTag;
