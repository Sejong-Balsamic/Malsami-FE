import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import { QuestionPost } from "@/types/questionPost.types";
import CategoryCard from "../common/CategoryCard";

interface MovingCardQuestionProps {
  data: QuestionPost[];
}

function MovingCardQuestion({ data = [] }: MovingCardQuestionProps) {
  const colors = ["#03B89E", "#F46B02", "#5ED513"];
  const router = useRouter();

  const slidesPerView = (data?.length || 0) > 1 ? 2 : 1; // 데이터가 10보다 작을 때
  const loopEnabled = (data?.length || 0) > 1;

  const handleCardClick = (postId: string) => {
    if (!postId) {
      console.error("Invalid postId:", postId);
      return;
    }
    console.log("Clicked card postId:", postId);
    router.push(`/board/question/detail/${postId}`);
  };

  return (
    data.length > 0 && (
      <Swiper
        key={`swiper-container-${data.length}`}
        modules={[Autoplay]}
        slidesPerView={slidesPerView}
        spaceBetween={0}
        loop={loopEnabled}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {data.map((document, index) => {
          console.log("Document:", document); // Logging each document to inspect its contents
          return (
            <SwiperSlide key={document.postId || index}>
              <div
                onClick={() => {
                  if (document.postId) {
                    console.log("Valid postId:", document.postId);
                    handleCardClick(document.postId);
                  } else {
                    console.error("Invalid or undefined postId:", document);
                  }
                }}
                onKeyDown={e => e.key === "Enter" && document.postId && handleCardClick(document.postId)}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
              >
                <CategoryCard
                  title={document.title}
                  color={colors[index % colors.length]}
                  subject={document.subject}
                  JiJeongTags={document.JiJeongTags}
                  rewardYeopjeon={document.rewardYeopjeon || 0}
                  likeCount={document.likeCount}
                  commentCount={document.commentCount}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    )
  );
}

export default MovingCardQuestion;
