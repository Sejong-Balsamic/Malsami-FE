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
        {/* 자료게시판 탭 */}
        <button
          type="button"
          className={`relative w-full py-2 pb-4 ${
            activeTab === "자료게시판"
              ? "text-SUIT_18 font-semibold text-document-main"
              : "text-SUIT_16 font-medium text-ui-muted"
          }`}
          onClick={() => onTabChange("자료게시판")}
        >
          자료
          {/* 밑줄 영역 */}
          <span className="absolute bottom-0 left-0 h-1 w-full">
            {/* 회색 2px 기준선 (항상 표시) */}
            <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 transform rounded-[2px] bg-ui-border" />
            {/* 활성 탭 컬러 4px 바 */}
            {activeTab === "자료게시판" && (
              <span className="absolute bottom-0 left-0 h-1 w-full rounded-[2px] bg-document-main" />
            )}
          </span>
        </button>
        {/* 질문게시판 탭 */}
        <button
          type="button"
          className={`relative w-full py-2 ${
            activeTab === "질문게시판"
              ? "text-SUIT_18 font-semibold text-question-main"
              : "text-SUIT_16 font-medium text-ui-muted"
          }`}
          onClick={() => onTabChange("질문게시판")}
        >
          질문
          {/* 밑줄 영역 */}
          <span className="absolute bottom-0 left-0 h-[4px] w-full">
            {/* 회색 2px 기준선 */}
            <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 transform rounded-[2px] bg-ui-border" />
            {/* 활성 탭 컬러 4px 바 */}
            {activeTab === "질문게시판" && (
              <span className="absolute bottom-0 left-0 h-[4px] w-full rounded-[2px] bg-question-main" />
            )}
          </span>
        </button>
      </div>
    </div>
  );
}

export default SearchBoardTab;
