import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { QuestionPost } from "@/types/questionPost.types";
import CategoryCard from "../common/CategoryCard";

interface MovingCardQuestionProps {
  data: QuestionPost[];
}

function MovingCardQuestion({ data = [] }: MovingCardQuestionProps) {
  // Default to empty array
  const colors = ["#03B89E", "#F46B02", "#5ED513"];

  const slidesPerView = (data?.length || 0) > 1 ? 2 : 1; // 혹시나 데이터가 10보다 작을 때 ...
  const loopEnabled = (data?.length || 0) > 1;

  return (
    data.length > 0 && (
      <Swiper
        key={`swiper-container-${data.length}`} // 키가 없다고 뭐라 함;;
        modules={[Autoplay]}
        slidesPerView={slidesPerView}
        spaceBetween={0}
        loop={loopEnabled}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        {data.map((document, index) => (
          <SwiperSlide key={document.questionPostId || index}>
            <CategoryCard
              title={document.title}
              color={colors[index % colors.length]}
              subject={document.subject}
              JiJeongTags={document.JiJeongTags}
              rewardYeopjeon={document.rewardYeopjeon || 0}
              likeCount={document.likeCount}
              commentCount={document.commentCount}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    )
  );
}

export default MovingCardQuestion;
