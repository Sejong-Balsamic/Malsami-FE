import Image from "next/image";
import SubjectTag from "@/components/common/tags/SubjectTag";
import CustomTag from "./tags/CustomTag";

// TODO: 목데이터로 삭제해야 함 + api연동 (type정의필요)
const dats = [
  {
    id: 1,
    subject: "과학사",
    title: "분량이 개-많은 과학사가 꼴교양이 된 이유 3줄요약 해드림",
    content:
      "1. 중간고사를 안 본다: 중간고사에 시험이 많은 학과는 이게 진짜 큰 메리트 2. 교양이 나온다: 분량이 많긴 하지만 교양에 포함",
    customTags: ["커스텀 태그", "커스텀 태그"],
    likeCount: 11,
    commentCount: 5,
    isLiked: true,
  },
  {
    id: 2,
    subject: "생명의미시적세계",
    title: "생미시는 그렇게 분량이 많은데 요약을 아무도 안 파나?",
    content: "하셨죠? 네, 제가 팝니다.",
    customTags: ["커스텀 태그"],
    likeCount: 11,
    commentCount: 5,
    isLiked: false,
  },
  {
    id: 3,
    subject: "과학사",
    title: "분량이 개-많은 과학사가 꼴교양이 된 이유 3줄요약 해드림",
    content:
      "1. 중간고사를 안 본다: 중간고사에 시험이 많은 학과는 이게 진짜 큰 메리트 2. 교양이 나온다: 분량이 많긴 하지만 교양에 포함",
    customTags: ["커스텀 태그", "커스텀 태그"],
    likeCount: 11,
    commentCount: 5,
    isLiked: true,
  },
];

export default function LandingCardList() {
  return (
    <div className="w-full space-y-4">
      {dats.map(data => (
        <div key={data.id} className="rounded-xl border border-[#F1F1F1] bg-white p-5 shadow-md">
          {/* 상단 부분 */}
          <div className="mb-2">
            <SubjectTag subjectName={data.subject} />
          </div>

          {/* 게시물 제목 */}
          <h3 className="mb-1 text-SUIT_16 font-bold leading-tight">{data.title}</h3>

          {/* 게시물 내용 */}
          <p className="mb-4 line-clamp-2 text-SUIT_16 font-medium text-[#676767]">{data.content}</p>

          {/* 하단 부분 */}
          <div className="flex items-center justify-between">
            {/* 커스텀 태그 */}
            <div className="flex flex-wrap gap-2">
              {data.customTags.map(customTag => (
                <CustomTag key={customTag} tagName={customTag} />
              ))}
            </div>

            {/* 좋아요 및 댓글 */}
            <div className="flex items-center gap-3 text-SUIT_14 font-medium text-[#929292]">
              {/* 좋아요 */}
              <span className="flex items-center">
                {data.isLiked ? (
                  <Image src="/icons/newLikeThumb.svg" alt="좋아요 됨" width={16} height={16} />
                ) : (
                  <Image src="/icons/actions/hand-thumbs-up.svg" alt="좋아요 안됨" width={16} height={16} />
                )}
                <span className="ml-1">{data.likeCount}</span>
              </span>

              {/* 댓글 */}
              <span className="flex items-center">
                <Image src="/icons/CommentIcon.svg" alt="댓글" width={16} height={16} />
                <span className="ml-1">{data.commentCount}</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
