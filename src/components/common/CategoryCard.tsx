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
import JiJeongTag from "./tags/JiJeongTag";
import YeopjeonTag from "./tags/YeopjeonTag";
import ImageWrapper from "../board/tags/ImageWrapper";

interface CategoryCardProps {
  title: string;
  color: string;
  subject: string;
  JiJeongTags: string[];
  rewardYeopjeon: number;
  likeCount: number;
  commentCount: number;
}

function CategoryCard({
  title,
  color,
  subject,
  JiJeongTags,
  rewardYeopjeon,
  likeCount,
  commentCount,
}: CategoryCardProps) {
  return (
    <div>
      <div className="w-[166px] h-[166px] flex flex-col m-3">
        {/* 상단 학과 제목 영역 */}
        <div className="h-[52px] rounded-t-[20px] flex items-end px-3.5 pb-2 pt-2" style={{ backgroundColor: color }}>
          <span className="text-white text-sm font-pretendard-semibold leading-tight line-clamp-2">{subject}</span>
        </div>

        {/* 본문 영역 */}
        <div className="px-3.5 pt-2 pb-4 rounded-b-[20px] flex flex-col justify-between bg-white shadow-md shadow-gray h-[114px]">
          {/* 질문 부분, 태그들 부분 */}
          <div className="min-h-[64px] flex flex-col justify-between">
            <div className="text-sm font-pretendard-bold leading-[20px] line-clamp-2 pr-2">{title}</div>
            <div className="flex gap-2 flex-wrap mt-2">
              {JiJeongTags.map(tag => (
                <JiJeongTag key={tag} title={tag} color={color} />
              ))}
            </div>
          </div>

          {/* 엽전, 좋아요, 댓글 부분 */}
          <div className="flex flex-row justify-between text-[#D0D0D0] text-xs font-pretendard-semibold">
            <YeopjeonTag point={rewardYeopjeon} />
            <div>
              <span className="mr-1.5">
                <ImageWrapper src="/icons/LikeIcon.svg" />
                <span className="ml-1 text-xs font-pretendard-medium">{likeCount}</span>
              </span>
              <span>
                <ImageWrapper src="/icons/CommentIcon.svg" />
                <span className=" ml-1 text-xs font-pretendard-medium">{commentCount}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
