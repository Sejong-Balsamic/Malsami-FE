import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import CategoryCard from "@/components/common/CategoryCard";

interface QnaMovingCardProps {
  unansweredQNAs: {
    questionPostId: string;
    title: string;
    subject: string;
    questionPresetTags: string[];
    rewardYeopjeon: number;
    likeCount: number;
    commentCount: number;
  }[];
}

function QnaMovingCard({ unansweredQNAs }: QnaMovingCardProps) {
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={2}
      spaceBetween={0}
      loop
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
    >
      {unansweredQNAs.map((category, index) => {
        let color;
        if (index % 3 === 0) color = "#F46B02";
        else if (index % 3 === 1) color = "#03B89E";
        else color = "#5ED513";

        return (
          <SwiperSlide key={`${category.questionPostId}`}>
            <CategoryCard
              title={category.title}
              color={color}
              subject={category.subject}
              JiJeongTags={category.questionPresetTags}
              rewardYeopjeon={category.rewardYeopjeon}
              likeCount={category.likeCount}
              commentCount={category.commentCount}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default QnaMovingCard;
