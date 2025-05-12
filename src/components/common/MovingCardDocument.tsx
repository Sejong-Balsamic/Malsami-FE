import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import { DocumentPost } from "@/types/api/entities/postgres/documentPost";
import Card from "./Card";

interface MovingCardDocumentProps {
  data: DocumentPost[];
}

function MovingCardDocument({ data = [] }: MovingCardDocumentProps) {
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
        spaceBetween={20}
        loop={loopEnabled}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          580: {
            slidesPerView: 2,
          },
          900: {
            slidesPerView: 3,
          },
        }}
        className="w-full"
      >
        {data.map((documentPost, index) => {
          return (
            <SwiperSlide key={documentPost.documentPostId || index} className="flex items-center justify-center">
              <div
                onClick={() => {
                  if (documentPost.documentPostId) {
                    handleCardClick(documentPost.documentPostId);
                  } else {
                    console.error("Invalid or undefined documentPostId:", documentPost);
                  }
                }}
                onKeyDown={e =>
                  e.key === "Enter" && documentPost.documentPostId && handleCardClick(documentPost.documentPostId)
                }
                className="cursor-pointer"
                role="button"
                tabIndex={0}
              >
                <Card
                  subject={documentPost.subject as string}
                  title={documentPost.title as string}
                  content={documentPost.content as string}
                  customTags={documentPost.customTags}
                  isLiked={documentPost.isLiked || false}
                  likeCount={documentPost.likeCount as number}
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
