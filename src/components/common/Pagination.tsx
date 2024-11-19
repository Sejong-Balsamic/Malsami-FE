interface PaginationProps {
  pageNumber: number; // 현재 페이지
  totalPages: number; // 총 페이지 수
  onPageChange: (newPage: number) => void; // 페이지 변경 핸들러
}

export default function Pagination({ pageNumber, totalPages, onPageChange }: PaginationProps) {
  // 한 번에 보여줄 페이지 번호 개수
  const pageSize = 5;

  // 시작 페이지 계산
  const startPage = Math.floor((pageNumber - 1) / pageSize) * pageSize + 1;

  // 끝 페이지 계산
  const endPage = Math.min(startPage + pageSize - 1, totalPages);

  // 페이지 번호 배열 생성
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx);

  return (
    <div className="mb-8 mt-4 flex items-center justify-between px-[20px]">
      {/* 이전 버튼 */}
      <button
        type="button"
        onClick={() => onPageChange(pageNumber - 1)} // 사용자 기준 -1
        disabled={pageNumber === 1}
        className="mx-1 rounded-s-full bg-gray-500 px-2 py-1 text-white disabled:opacity-50"
      >
        이전
      </button>

      <div className="flex gap-x-1">
        {/* 페이지 번호 */}
        {pageNumbers.map(page => (
          <button
            type="button"
            key={page}
            onClick={() => onPageChange(page)} // 사용자 기준으로 페이지 번호를 전달
            className={`mx-1 rounded-full px-3 py-1 ${
              page === pageNumber ? "bg-custom-blue-500 text-white" : "bg-gray-200 text-black"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* 다음 버튼 */}
      <button
        type="button"
        onClick={() => onPageChange(pageNumber + 1)} // 사용자 기준 +1
        disabled={pageNumber === totalPages}
        className="mx-1 rounded-e-full bg-gray-500 px-2 py-1 text-white disabled:opacity-50"
      >
        다음
      </button>
    </div>
  );
}
