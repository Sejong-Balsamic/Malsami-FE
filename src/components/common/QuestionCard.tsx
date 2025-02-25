// 사용법
// 사용하고 싶은 페이지에서 CategoryCardList컴포넌트 import,
// categoryCardDatas를import 해서 CategoryCardList에 props로 넘겨준다.
// categoryCardDatas는 목데이터이므로, 추후에 api호출을 통해 사용한다.

// 예시
// import CategoryCardList from "@/components/common/CategoryCardList";
// import categoryCardDatas from "@/lib/categoryCardDats";

// const [categoryCardDatass, setCategoryCardDatas] = useState(categoryCardDatas);
// useEffect(() => {
//   setCategoryCardDatas(categoryCardDatas);
// }, []); // eslint에러 때문에 이유없이 사용

// return(<CategoryCardList categoryCardDatas={categoryCardDatass} />)

import React from "react";
import YeopjeonTag from "@/components/common/tags/YeopjeonTag";
import Image from "next/image";
import JiJeongTag from "@/components/deprecated/JiJeongTag";

interface CategoryCardProps {
  title: string;
  color: string;
  subject: string;
  JiJeongTags: string[];
  rewardYeopjeon: number;
  likeCount: number;
  commentCount: number;
}

const tagTranslations: { [key: string]: string } = {
  EXAM_PREPARATION: "시험_대비",
  OUT_OF_CLASS: "수업_외_내용",
  UNKNOWN_CONCEPT: "개념_모름",
  BETTER_SOLUTION: "더_나은_풀이",
  DOCUMENT_REQUEST: "자료_요청",
  STUDY_TIPS: "공부_팁",
  ADVICE_REQUEST: "조언_구함",
};

function QuestionCard({
  title,
  color,
  subject,
  JiJeongTags,
  rewardYeopjeon,
  likeCount,
  commentCount,
}: CategoryCardProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="m-3 flex min-h-[166px] w-[163px] flex-col">
        {/* 상단 학과 제목 영역 */}
        <div className="flex h-[52px] items-end rounded-t-[20px] px-2 pb-2 pt-2" style={{ backgroundColor: color }}>
          <span className="font-pretendard-semibold line-clamp-2 text-sm leading-tight text-white">{subject}</span>
        </div>

        {/* 본문 영역 */}
        <div className="shadow-gray flex min-h-[114px] flex-col justify-between rounded-b-[20px] bg-white px-2 pb-4 pt-2 shadow-md">
          {/* 질문 부분, 태그들 부분 */}
          <div className="flex flex-1 flex-col justify-between">
            <div className="font-pretendard-bold line-clamp-2 pr-2 text-sm leading-[20px]">{title}</div>
            <div className="my-2 flex flex-wrap gap-1">
              {JiJeongTags.map(tag => (
                <JiJeongTag key={tag} title={tagTranslations[tag] ?? tag} color={color} />
              ))}
            </div>
          </div>

          {/* 엽전, 좋아요, 댓글 부분 */}
          <div className="font-pretendard-semibold flex flex-row justify-between text-xs text-[#D0D0D0]">
            <YeopjeonTag point={rewardYeopjeon} />
            <div>
              <span className="mr-1.5">
                <Image src="/icons/LikeIcon.svg" width={14} height={14} alt="LikeIcon" />
                <span className="font-pretendard-medium ml-1 text-xs">{likeCount}</span>
              </span>
              <span>
                <Image src="/icons/CommentIcon.svg" width={14} height={14} alt="CommentIcon" />
                <span className="font-pretendard-medium ml-1 text-xs">{commentCount}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
