import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import { DocumentPost } from "@/types/documentPost.types";
import CategoryCard from "@/components/common/DocumentCard";

interface MovingCardDocumentProps {
  data: DocumentPost[];
}

function MovingCardDocument({ data = [] }: MovingCardDocumentProps) {
  const colors = ["#03B89E", "#F46B02", "#5ED513"];
  const router = useRouter();

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
        slidesPerView={2} // 기본값
        spaceBetween={0}
        loop={loopEnabled}
        autoplay={{
          delay: 2500,
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
        {data.map((document, index) => {
          return (
            <SwiperSlide key={document.postId || index} className="flex items-center justify-center">
              <div
                onClick={() => {
                  if (document.postId) {
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

export default MovingCardDocument;
