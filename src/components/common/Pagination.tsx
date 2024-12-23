import Image from "next/image";

interface PaginationProps {
  pageNumber: number; // 현재 페이지
  totalPages: number; // 총 페이지 수
  onPageChange: (newPage: number) => void; // 페이지 변경 핸들러
}

export default function Pagination({ pageNumber, totalPages, onPageChange }: PaginationProps) {
  // 한 번에 보여줄 페이지 번호 개수
  const pageSize = 3;

  // 시작 페이지 계산
  const startPage = Math.floor((pageNumber - 1) / pageSize) * pageSize + 1;

  // 끝 페이지 계산
  const endPage = Math.min(startPage + pageSize - 1, totalPages);

  // 페이지 번호 배열 생성
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx);

  return (
    <div className="font-pretendard-semibold flex items-center justify-center gap-4 py-4 text-[13px] text-gray-500">
      {/* 이전 페이지 버튼 */}
      <button type="button" onClick={() => onPageChange(pageNumber - 1)} disabled={pageNumber === 1}>
        <Image
          src={pageNumber === 1 ? "/icons/pagination/BackDisable.svg" : "/icons/pagination/BackAble.svg"}
          alt={pageNumber === 1 ? "이전 비활성화" : "이전"}
          width={7}
          height={14}
        />
      </button>

      {/* 페이지 번호 표시 */}
      {startPage > 1 && (
        <>
          <button
            type="button"
            onClick={() => onPageChange(1)}
            className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-gray-200"
          >
            1
          </button>
          {startPage > 2 && <span className="text-gray-500">...</span>}
        </>
      )}

      {pageNumbers.map(page => (
        <button
          type="button"
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex h-7 w-7 items-center justify-center rounded-full ${
            page === pageNumber ? "bg-custom-blue-500 text-white" : "hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-gray-500">...</span>}
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-gray-200"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* 다음 페이지 버튼 */}
      <button type="button" onClick={() => onPageChange(pageNumber + 1)} disabled={pageNumber === totalPages}>
        <Image
          src={pageNumber === totalPages ? "/icons/pagination/NextDisable.svg" : "/icons/pagination/NextAble.svg"}
          alt={pageNumber === totalPages ? "다음 비활성화" : "다음"}
          width={7}
          height={14}
        />
      </button>
    </div>
  );
}
