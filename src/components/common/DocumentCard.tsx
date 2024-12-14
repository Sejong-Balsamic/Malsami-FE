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
import ImageWrapper from "../board/tags/ImageWrapper";

interface CategoryCardProps {
  title: string;
  color: string;
  subject: string;
  likeCount: number;
  commentCount: number;
}

function CategoryCard({ title, color, subject, likeCount, commentCount }: CategoryCardProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="m-3 flex h-[166px] w-full flex-col">
        {/* 상단 학과 제목 영역 */}
        <div className="flex h-[52px] items-end rounded-t-[20px] px-3.5 pb-2 pt-2" style={{ backgroundColor: color }}>
          <span className="font-pretendard-semibold line-clamp-2 text-sm leading-tight text-white">{subject}</span>
        </div>

        {/* 본문 영역 */}
        <div className="shadow-gray flex h-[114px] flex-col justify-between rounded-b-[20px] bg-white px-3.5 pb-4 pt-2 shadow-md">
          {/* 질문 부분, 태그들 부분 */}
          <div className="flex min-h-[64px] flex-col justify-between">
            <div className="font-pretendard-bold line-clamp-2 pr-2 text-sm leading-[20px]">{title}</div>
          </div>

          {/* 좋아요, 댓글 부분 */}
          <div className="font-pretendard-semibold flex flex-row justify-end text-xs text-[#D0D0D0]">
            <div>
              <span className="mr-1.5">
                <ImageWrapper src="/icons/LikeIcon.svg" />
                <span className="font-pretendard-medium ml-1 text-xs">{likeCount}</span>
              </span>
              <span>
                <ImageWrapper src="/icons/CommentIcon.svg" />
                <span className="font-pretendard-medium ml-1 text-xs">{commentCount}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;