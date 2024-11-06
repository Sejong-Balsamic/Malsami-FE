import CategoryCard from "./CategoryCard";

type CategoryCardListProps = {
  categoryCardDatas: {
    postId: number;
    title: string;
    color: string;
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
      {categoryCardDatas.map(category => (
        <CategoryCard
          key={category.postId}
          title={category.title}
          color={category.color}
          subject={category.subject}
          JiJeongTags={category.JiJeongTags}
          rewardYeopjeon={category.rewardYeopjeon}
          likeCount={category.likeCount}
          commentCount={category.commentCount}
        />
      ))}
    </div>
  );
}
