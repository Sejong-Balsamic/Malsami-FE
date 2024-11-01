import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import categoryCardDatas from "@/lib/categoryCardDats";
import CategoryCard from "../common/CategoryCard";

function MovingCard() {
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
      {categoryCardDatas.map(category => (
        <SwiperSlide key={category.postId}>
          <CategoryCard
            title={category.title}
            color={category.color}
            subject={category.subject}
            JiJeongTags={category.JiJeongTags}
            rewardYeopjeon={category.rewardYeopjeon}
            likeCount={category.likeCount}
            commentCount={category.commentCount}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MovingCard;
