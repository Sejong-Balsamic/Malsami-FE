import Image from "next/image";
import SubjectTag from "./tags/SubjectTag";
import CustomTag from "./tags/CustomTag";

// TODO: 목데이터로 삭제해야 함 + api연동
const dats = [
  {
    id: 1,
    subject: "기초 3D 그래픽스",
    title: "회계원리 양승희 교수님 과제 1 풀이가 제목이 겁나 길면 어떻게 될지 한번 테스트를 해보겠씁니다",
    content: "과제는 이렇게 푸는 겁니다 ㅋ이렇게 저렇게",
    customTags: ["커스텀태그", "커스텀태그"],
    likeCount: 6,
    commentCount: 14,
  },
  {
    id: 2,
    subject: "기초 3D 그래픽스",
    title: "회계원리 양승희 교수님 과제 1 풀이",
    content: "과제는 이렇게 푸는 겁니다 ㅋ이렇게 저렇게과제는 이렇게 푸는 겁니다 ㅋ이렇게 저렇게",
    customTags: ["커스텀태그", "커스텀태그"],
    likeCount: 6,
    commentCount: 143,
  },
  {
    id: 3,
    subject: "기초 3D 그래픽스",
    title: "회계원리 양승희 교수님 과제 1 풀이",
    content: "과제는 이렇게 푸는 겁니다 ㅋ이렇게 저렇게",
    customTags: ["커스텀태그", "커스텀태그"],
    likeCount: 6,
    commentCount: 14,
  },
];

export default function CardList() {
  return (
    <div className="w-full divide-y divide-[#EAEAEA] rounded-[22px] border border-[#F1F1F1] bg-white px-6 shadow-lg shadow-gray-200">
      {dats.map(data => (
        <div key={data.id} className="py-5">
          {/* 상단 부분 */}
          <SubjectTag subject={data.subject} />
          <p className="mb-3 mt-4 line-clamp-1 text-SUIT_16 font-bold leading-6">{data.title}</p>
          <p className="mb-6 line-clamp-1 text-SUIT_16 font-medium text-[#676767]">{data.content}</p>

          {/* 하단 부분 */}
          <div className="flex justify-between">
            {/* 커스텀 태그 */}
            <div className="flex gap-1">
              {data.customTags.map(customTag => (
                <CustomTag key={customTag} tagName={customTag} />
              ))}
            </div>
            {/* 좋아요, 댓글 */}
            <div className="flex items-center text-SUIT_14 font-medium text-[#929292]">
              <span className="flex">
                <Image src="/icons/actions/like-uncliked.svg" alt="좋아요" width={16} height={16} />
                <span className="ml-1">{data.likeCount}</span>
              </span>
              <span className="ml-2 flex items-center">
                <Image src="/icons/actions/comment.svg" alt="댓글" width={16} height={16} />
                <span className="ml-1">{data.commentCount}</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
