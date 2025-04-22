import Image from "next/image";
import SubjectTag from "@/components/common/tags/SubjectTag";
import { getDateDiff } from "@/global/time";

// TODO: 목데이터로 삭제해야 함 + api연동 (type정의필요)
const datas = [
  {
    subject: "기초 3D 그래픽스",
    title: "회계원리 양승희 교수님 과제 1 풀이가 제목이 겁나 길면 어떻게 될지 한번 테스트를 해보겠씁니다",
    content: "과제는 이렇게 푸는 겁니다 ㅋ이렇게 저렇게",
    likeCount: 6,
    commentCount: 14,
    isLiked: true,
    createdDate: "2025-02-20T21:56:24.260298",
  },
  {
    subject: "기초 3D 그래픽스",
    title: "회계원리 양승희 교수님 과제 1 풀이",
    content:
      "과제는 이렇게 푸는 겁니다 ㅋ이렇게 저렇게과제는 이렇게 푸는 겁니다 ㅋ이렇게 저렇게 ㅋ이렇게 저렇게과제는 ㅋ이렇게 저렇게과제는 이렇게 푸는 겁니다 ㅋ이렇게 저렇게 이렇게 푸는 겁니다 ㅋ이렇게 저렇게",
    likeCount: 6,
    commentCount: 143,
    isLiked: true,
    thumbnailUrl:
      "http://suh-project.synology.me/sejong-malsami/thumbnail/THUMBNAIL_스크린샷_2025-01-13_오전_11.42.27_20250113_114250_thumbnail_cdf0482f-6f85-492d-9439-5d1136a054ee.webp",
    createdDate: "2025-01-20T21:56:24.260298",
  },
  {
    subject: "기초 3D 그래픽스",
    title: "회계원리 양승희 교수님 과제 1 풀이",
    content: "과제는 이렇게 푸는 겁니다 ㅋ이렇게 저렇게",
    likeCount: 6,
    commentCount: 14,
    isLiked: false,
    thumbnailUrl:
      "http://suh-project.synology.me/sejong-malsami/thumbnail/THUMBNAIL_스크린샷_2025-01-13_오전_11.42.27_20250113_114250_thumbnail_cdf0482f-6f85-492d-9439-5d1136a054ee.webp",
    createdDate: "2025-02-23T21:56:24.260298",
  },
  {
    subject: "기초 3D 그래픽스",
    title: "회계원리 양승희 교수님 과제 1 풀이가 제목이 겁나 길면 어떻게 될지 한번 테스트를 해보겠씁니다",
    content: "과제는 이렇게 푸는 겁니다 ㅋ이렇게 저렇게",
    likeCount: 6,
    commentCount: 14,
    isLiked: true,
    createdDate: "2025-02-20T21:56:24.260298",
  },
];

export default function CardList() {
  return (
    <div className="w-full divide-y divide-[#EAEAEA] px-5">
      {datas.map(data => (
        <div key={data.createdDate} className="py-5">
          {/* 상단 부분 */}
          <div className="mb-3 flex justify-between">
            <SubjectTag subjectName={data.subject} />
            <span className="text-SUIT_12 font-medium text-[#D1D1D1]">{getDateDiff(data.createdDate)}</span>
          </div>

          {/* 중간 부분. 제목,본문,썸네일 */}
          <div className="flex flex-row justify-between">
            <div>
              <p className="mb-1 line-clamp-1 text-SUIT_14 font-semibold leading-6">{data.title}</p>
              <p className="mb-2.5 line-clamp-2 text-SUIT_14 font-medium text-[#929292]">{data.content}</p>
            </div>
            {/* 썸네일 */}
            {data.thumbnailUrl && (
              <Image
                src={data.thumbnailUrl}
                alt="썸네일"
                width={74}
                height={74}
                className="ml-3 rounded-lg border"
                style={{ maxWidth: "74px", maxHeight: "74px", width: "auto", height: "auto" }}
              />
            )}
          </div>

          {/* 하단 부분 */}
          <div className="flex justify-between">
            {/* 좋아요, 댓글 */}
            <div className="flex items-center text-SUIT_12 font-semibold text-[#C3C3C3]">
              <span className="flex">
                {data.isLiked ? (
                  <Image src="/icons/actions/like-clicked.svg" alt="좋아요" width={16} height={16} />
                ) : (
                  <Image src="/icons/actions/like-unclicked.svg" alt="좋아요" width={16} height={16} />
                )}
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
