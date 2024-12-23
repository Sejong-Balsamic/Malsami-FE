import QuestionCard from "./QuestionCard";

type CategoryCardListProps = {
  categoryCardDatas: {
    postId: number;
    title: string;
    subject: string;
    JiJeongTags: string[];
    rewardYeopjeon: number;
    likeCount: number;
    commentCount: number;
  }[];
};

export default function CategoryCardList({ categoryCardDatas }: CategoryCardListProps) {
  return (
    <div className="flex flex-row">
      {categoryCardDatas.map((category, index) => {
        // Index에 따른 색상 지정
        let color;
        if (index % 3 === 0) color = "#F46B02";
        else if (index % 3 === 1) color = "#03B89E";
        else color = "#5ED513";

        return (
          <QuestionCard
            key={category.postId}
            title={category.title}
            color={color} // 계산된 색상 전달
            subject={category.subject}
            JiJeongTags={category.JiJeongTags}
            rewardYeopjeon={category.rewardYeopjeon}
            likeCount={category.likeCount}
            commentCount={category.commentCount}
          />
        );
      })}
    </div>
  );
}
