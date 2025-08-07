import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import { QuestionPost } from "@/types/api/entities/postgres/questionPost";
import Card from "./Card";

interface MovingCardQuestionProps {
  data: QuestionPost[];
}

function MovingCardQuestion({ data = [] }: MovingCardQuestionProps) {
  const router = useRouter();
  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  const slidesPerView = (data?.length || 0) > 1 ? 2 : 1; // 데이터가 10보다 작을 때

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
        spaceBetween={20}
        loop={data.length >= 2}
        autoplay={
          screenWidth >= 580
            ? {
                delay: 5000,
                disableOnInteraction: false,
              }
            : false
        }
        breakpoints={{
          0: {
            slidesPerView: 1.3,
          },
          580: {
            slidesPerView: 2,
          },
        }}
        className="w-full"
      >
        {data.map((questionPost, index) => (
          <SwiperSlide
            key={questionPost.questionPostId || questionPost.title || index}
            className="flex items-center justify-center p-1"
          >
            <div
              onClick={() => {
                if (questionPost.questionPostId) {
                  handleCardClick(questionPost.questionPostId);
                } else {
                  console.error("Invalid or undefined postId:", questionPost);
                }
              }}
              onKeyDown={e =>
                e.key === "Enter" && questionPost.questionPostId && handleCardClick(questionPost.questionPostId)
              }
              className="cursor-pointer"
              role="button"
              tabIndex={0}
            >
              <Card
                subject={questionPost.subject as string}
                title={questionPost.title as string}
                content={questionPost.content as string}
                customTags={questionPost.customTags}
                isLiked={questionPost.isLiked || false}
                likeCount={questionPost.likeCount as number}
                answerCount={questionPost.answerCount as number}
                type="question"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    )
  );
}

export default MovingCardQuestion;
