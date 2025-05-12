import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import { QuestionPost } from "@/types/api/entities/postgres/questionPost";
import Card from "./Card";

interface MovingCardQuestionProps {
  data: QuestionPost[];
}

function MovingCardQuestion({ data = [] }: MovingCardQuestionProps) {
  const router = useRouter();

  const slidesPerView = (data?.length || 0) > 1 ? 2 : 1; // 데이터가 10보다 작을 때
  const loopEnabled = (data?.length || 0) > 1;

  const handleCardClick = (postId: string) => {
    if (!postId) {
      console.error("Invalid postId:", postId);
      return;
    }
    router.push(`/board/question/detail/${postId}`);
  };

  return (
    data.length > 0 && (
      <Swiper
        key={`swiper-container-${data.length}`}
        modules={[Autoplay]}
        slidesPerView={slidesPerView}
        spaceBetween={0} // 슬라이드 간 간격 추가
        loop={loopEnabled}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          375: {
            slidesPerView: 1.2, // 약간의 다음 슬라이드가 보이도록 설정
          },
          600: {
            slidesPerView: 2.2, // 약간의 다음 슬라이드가 보이도록 설정
          },
          900: {
            slidesPerView: 3,
          },
        }}
        className="w-full px-4" // 패딩 추가
      >
        {data.map((questionPost, index) => (
          <SwiperSlide
            key={questionPost.questionPostId || questionPost.title || index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%", // 너비 설정
              height: "auto",
            }}
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
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    )
  );
}

export default MovingCardQuestion;
