import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import { CardProps } from "@/types/DocCardProps.type";
import DocMainCard from "./DocMainCard";

interface MovingCardQuestionProps {
  data: CardProps[];
}

function MovingCardDocument({ data = [] }: MovingCardQuestionProps) {
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
    router.push(`/board/document/detail/${postId}`);
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
          375: {
            slidesPerView: 2, // 화면 너비가 375px 이상일 때 카드 2개
            spaceBetween: 0, // 간격 15px
          },
          640: {
            slidesPerView: 3, // 화면 너비가 640px 이상일 때 카드 3개
            spaceBetween: 20, // 간격 20px
          },
        }}
        style={{
          width: "100%",
        }}
      >
        {data.map((document, index) => {
          return (
            <SwiperSlide
              key={document.title || index}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "auto", // 슬라이드 높이 자동
              }}
            >
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
                <DocMainCard title={document.title} color={colors[index % colors.length]} subject={document.subject} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    )
  );
}

export default MovingCardDocument;
