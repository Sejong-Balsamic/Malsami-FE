import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import QuestionCard from "@/components/common/QuestionCard";
import { QuestionPost } from "@/types/api/entities/postgres/questionPost";
import { QuestionPresetTag } from "@/types/api/constants/questionPresetTag";

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
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1, // 화면 가로 사이즈가 375px 미만일 경우
          },
          375: {
            slidesPerView: 2, // 기본값
          },
          600: {
            slidesPerView: 3, // 화면 가로 사이즈가 475px 이상일 경우
          },
        }}
        className="w-full"
      >
        {data.map((questionPost, index) => {
          return (
            <SwiperSlide
              key={questionPost.questionPostId || questionPost.title || index}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "auto", // 슬라이드 높이 자동
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
                <QuestionCard
                  title={questionPost.title as string}
                  color={colors[index % colors.length]}
                  subject={questionPost.subject as string}
                  questionPresetTags={questionPost.questionPresetTags as QuestionPresetTag[]}
                  rewardYeopjeon={questionPost.rewardYeopjeon || 0}
                  likeCount={questionPost.likeCount as number}
                  commentCount={questionPost.commentCount as number}
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
