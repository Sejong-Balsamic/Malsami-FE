import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import CategoryCard from "@/components/common/QuestionCard";

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
  const router = useRouter();

  const handleCardClick = (postId: string) => {
    if (!postId) {
      console.error("Invalid postId:", postId);
      return;
    }
    console.log("Clicked card postId:", postId);
    router.push(`/board/question/detail/${postId}`);
  };

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
            <div
              onClick={() => {
                if (category.questionPostId) {
                  console.log("Valid postId:", category.questionPostId);
                  handleCardClick(category.questionPostId);
                } else {
                  console.error("Invalid or undefined postId:", category);
                }
              }}
              onKeyDown={e => e.key === "Enter" && category.questionPostId && handleCardClick(category.questionPostId)}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
            >
              <CategoryCard
                title={category.title}
                color={color}
                subject={category.subject}
                JiJeongTags={category.questionPresetTags}
                rewardYeopjeon={category.rewardYeopjeon}
                likeCount={category.likeCount}
                commentCount={category.commentCount}
              />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default QnaMovingCard;
