interface StudyYearInputProps {
  year: number | null;
  onOpenModal: () => void;
}

export default function StudyYearInput({ year, onOpenModal }: StudyYearInputProps) {
  return (
    <button className="mb-[26px] flex flex-col items-start" type="button" onClick={onOpenModal}>
      <div className="mb-3">
        <span className="font-pretendard-semibold mr-1.5 text-lg">수강년도 {">"}</span>
      </div>
      <span className="font-pretendard-bold rounded-full bg-custom-blue-500 px-3 py-1 text-xs text-white">{year}</span>
    </button>
  );
}
