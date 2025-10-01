import Image from "next/image";
import { getDateDiff } from "@/global/time";
import { DocCardProps } from "@/types/docCard.type";

// 태그 번역 정의
const tagTranslations: { [key: string]: string } = {
  DOCUMENT: "강의 자료",
  PAST_EXAM: "과제 기출",
  SOLUTION: "해설",
};

/**
 * 자료게시판 카드 컴포넌트
 *
 * @param subject - 과목명
 * @param documentPostId - 자료 게시글 ID
 * @param title - 제목
 * @param content - 내용
 * @param documentTypes - 자료 유형 태그
 * @param createdDate - 생성일
 * @param thumbnailUrl - 섬네일 URL
 * @param viewCount - 조회수
 * @param likeCount - 좋아요 수
 */
export default function DocumentCard({
  subject,
  title,
  content,
  documentTypes,
  createdDate,
  thumbnailUrl,
  viewCount,
  likeCount,
}: DocCardProps) {
  // 이미지가 있는지 확인
  const isImageExist = thumbnailUrl && thumbnailUrl.trim() !== "";
  const imageUrl = thumbnailUrl || "";

  // 태그 텍스트 구하기
  const getTagText = (type: string) => {
    return tagTranslations[type] || type;
  };

  // 이미지가 없는 경우의 레이아웃
  if (!isImageExist) {
    return (
      <div className="w-full bg-white">
        {/* 상단: 태그들과 시간 */}
        <div className="flex items-start justify-between">
          {/* 태그 영역 */}
          <div className="flex items-center gap-1">
            {/* 과목명 태그 */}
            <div className="inline-flex items-center justify-center rounded bg-document-main px-1.5 py-1">
              <span className="max-w-[120px] truncate text-SUIT_12 font-medium text-white">
                {subject || "과목 없음"}
              </span>
            </div>

            {/* 자료 타입 태그 */}
            {documentTypes && documentTypes.length > 0 && (
              <div className="inline-flex items-center justify-center rounded bg-ui-tag-bg px-1.5 py-1">
                <span className="max-w-[120px] truncate text-SUIT_12 font-medium text-ui-tag-text">
                  {getTagText(documentTypes[0])}
                </span>
              </div>
            )}
          </div>

          {/* 시간 */}
          <div className="text-SUIT_12 font-medium text-ui-muted">{getDateDiff(createdDate || "")}</div>
        </div>

        {/* 8px 여백 */}
        <div className="h-2" />

        {/* 제목 */}
        <h3 className="truncate text-SUIT_14 font-medium text-black">{title}</h3>

        {/* 4px 여백 */}
        <div className="h-1" />

        {/* 본문 - 2줄까지 표시 */}
        <p className="line-clamp-2 text-SUIT_14 font-medium text-ui-body">{content}</p>

        {/* 12px 여백 */}
        <div className="h-3" />

        {/* 하단: 좋아요와 조회수 */}
        <div className="flex items-center">
          {/* 좋아요 */}
          <div className="flex items-center">
            <Image src="/icons/newLikeThumbGray.svg" alt="좋아요" width={14} height={14} />
            <span className="ml-1 text-SUIT_12 font-medium text-ui-muted">{likeCount || 0}</span>
          </div>

          {/* 조회수 */}
          <div className="ml-4 flex items-center">
            <Image src="/icons/eyeball.svg" alt="조회수" width={14} height={14} />
            <span className="ml-1 text-SUIT_12 font-medium text-ui-muted">{viewCount || 0}</span>
          </div>
        </div>
      </div>
    );
  }

  // 이미지가 있는 경우의 레이아웃
  return (
    <div className="min-h-[120px] w-full bg-white">
      {/* 상단: 태그들과 시간 */}
      <div className="flex items-start justify-between">
        {/* 태그 영역 */}
        <div className="flex items-center gap-1">
          {/* 과목명 태그 */}
          <div className="inline-flex items-center justify-center rounded bg-document-main px-1.5 py-1">
            <span className="max-w-[120px] truncate text-SUIT_12 font-medium text-white">{subject || "과목 없음"}</span>
          </div>

          {/* 자료 타입 태그 */}
          {documentTypes && documentTypes.length > 0 && (
            <div className="inline-flex items-center justify-center rounded bg-ui-tag-bg px-1.5 py-1">
              <span className="max-w-[120px] truncate text-SUIT_12 font-medium text-ui-tag-text">
                {getTagText(documentTypes[0])}
              </span>
            </div>
          )}
        </div>

        {/* 시간 */}
        <div className="text-SUIT_12 font-medium text-ui-muted">{getDateDiff(createdDate || "")}</div>
      </div>

      {/* 8px 여백 (이미지 있을 때) */}
      <div className="h-2" />

      {/* 메인 컨텐츠 영역 - 이미지와 텍스트 */}
      <div className="flex items-start gap-3">
        {/* 왼쪽: 텍스트 영역 - 나머지 모든 공간 차지 */}
        <div className="min-w-0 flex-1">
          {/* 제목 */}
          <h3 className="truncate text-SUIT_14 font-medium text-black">{title}</h3>

          {/* 8px 여백 */}
          <div className="h-2" />

          {/* 본문 - 2줄까지 표시, 동적 너비 */}
          <p className="line-clamp-2 text-SUIT_14 font-medium text-ui-body">{content}</p>
        </div>

        {/* 오른쪽: 이미지 - 고정 크기 (반응형) */}
        <div className="flex-shrink-0">
          <div className="h-[4.375rem] w-[4.375rem] overflow-hidden rounded-lg bg-ui-image-bg">
            <Image
              src={imageUrl}
              alt="자료 이미지"
              width={70}
              height={70}
              className="h-full w-full object-cover"
              onError={e => {
                // 이미지 로드 실패 시 기본 배경색 유지
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>
      </div>

      {/* 8px 여백 (카드 아래에서) */}
      <div className="h-2" />

      {/* 하단: 좋아요와 조회수 */}
      <div className="flex items-center">
        {/* 좋아요 */}
        <div className="flex items-center">
          <Image src="/icons/newLikeThumbGray.svg" alt="좋아요" width={14} height={14} />
          <span className="ml-1 text-SUIT_12 font-medium text-ui-muted">{likeCount || 0}</span>
        </div>

        {/* 조회수 */}
        <div className="ml-4 flex items-center">
          <Image src="/icons/eyeball.svg" alt="조회수" width={14} height={14} />
          <span className="ml-1 text-SUIT_12 font-medium text-ui-muted">{viewCount || 0}</span>
        </div>
      </div>
    </div>
  );
}
