function SearchBoardTab({
  activeTab,
  onTabChange,
}: {
  activeTab: "자료게시판" | "질문게시판";
  onTabChange: (tab: "자료게시판" | "질문게시판") => void;
}) {
  return (
    <div className="flex flex-col bg-white">
      <div className="flex justify-between">
        {" "}
        {/* 자료게시판 탭 */}
        <button
          type="button"
          className={`w-full py-2 text-lg ${
            activeTab === "자료게시판"
              ? "font-pretendard-semibold border-b-2 border-custom-blue-500 text-black"
              : "font-pretendard-medium border-b-2 border-[#EAEAEA] text-[#ABABAB]"
          }`}
          onClick={() => onTabChange("자료게시판")}
        >
          자료게시판
        </button>
        {/* 질문게시판 탭 */}
        <button
          type="button"
          className={`w-full py-2 text-lg ${
            activeTab === "질문게시판"
              ? "font-pretendard-semibold border-b-2 border-custom-blue-500 text-black"
              : "font-pretendard-medium border-b-2 border-[#EAEAEA] text-[#ABABAB]"
          }`}
          onClick={() => onTabChange("질문게시판")}
        >
          질문게시판
        </button>
      </div>
    </div>
  );
}

export default SearchBoardTab;
