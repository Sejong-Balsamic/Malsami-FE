import Image from "next/image";
import SubjectTag from "@/components/common/tags/SubjectTag";
import CustomTag from "./tags/CustomTag";

// 카드 항목의 타입 정의
interface CardItem {
  id: number;
  subject: string;
  title: string;
  content: string;
  customTags: string[];
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  type: "document" | "question"; // 타입을 유니언 타입으로 명시적 선언
}

// TODO: 목데이터로 삭제해야 함 + api연동 (type정의필요)
const dats: CardItem[] = [
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
    type: "document", // 자료게시판 타입
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
    type: "document", // 자료게시판 타입
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
    type: "document", // 자료게시판 타입
  },
];

export default function LandingCardList() {
  return (
    <div className="w-full space-y-4">
      {dats.map(data => (
        <div key={data.id} className="rounded-xl border border-[#F1F1F1] bg-white p-5 shadow-md">
          {/* 상단 부분 */}
          <div className="mb-2">
            <SubjectTag subjectName={data.subject} type={data.type} />
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
              {/* 좋아요 - 자료게시판용 파란색 아이콘 사용 */}
              <span className="flex items-center">
                {data.isLiked ? (
                  <Image 
                    src={data.type === "document" ? "/icons/newLikeThumbBlue.svg" : "/icons/newLikeThumbGreen.svg"} 
                    alt="좋아요 됨" 
                    width={14} 
                    height={14} 
                  />
                ) : (
                  <Image 
                    src="/icons/newLikeThumbGray.svg" 
                    alt="좋아요 안됨" 
                    width={14} 
                    height={14} 
                  />
                )}
                <span className="ml-1">{data.likeCount}</span>
              </span>

              {/* 댓글 */}
              <span className="flex items-center">
                <Image 
                  src={data.type === "document" ? "/icons/newChatBubbleBlue.svg" : "/icons/newChatBubbleGreen.svg"} 
                  alt="댓글" 
                  width={14} 
                  height={14} 
                />
                <span className="ml-1">{data.commentCount}</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
