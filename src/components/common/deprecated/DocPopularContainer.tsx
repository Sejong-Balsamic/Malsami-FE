// 애니메이션 버전

// import { useState, useEffect } from "react";

// interface PopularItem {
//   rank: number;
//   subject: string;
//   title: string;
// }

// interface DocPopularContainerProps {
//   allPopularItems: PopularItem[];
// }

// export default function DocPopularContainer({ allPopularItems }: DocPopularContainerProps) {
//   const [visibleItems, setVisibleItems] = useState<PopularItem[]>([]); // 현재 보이는 5개
//   const [isTransitioning, setIsTransitioning] = useState(false); // 애니메이션 제어

//   useEffect(() => {
//     if (allPopularItems.length > 0) {
//       setVisibleItems(allPopularItems.slice(0, 5)); // 처음 5개 표시
//     }
//   }, [allPopularItems]);

//   useEffect(() => {
//     if (allPopularItems.length > 0) {
//       const interval = setInterval(() => {
//         setIsTransitioning(true); // 애니메이션 시작
//         setTimeout(() => {
//           setVisibleItems(prev => {
//             const nextIndex = (prev[0]?.rank || 0) + 4;
//             console.log(prev[0].rank, nextIndex);
//             return allPopularItems.slice(nextIndex % allPopularItems.length, (nextIndex % allPopularItems.length) + 5);
//           });
//           setIsTransitioning(false); // 애니메이션 종료
//         }, 400);
//       }, 7000);
//       return () => clearInterval(interval); // 컴포넌트 언마운트 시 cleanup
//     }
//   }, [allPopularItems]);

//   return (
//     <div className="w-full overflow-hidden rounded-[14px] px-4 pb-1 pt-5 shadow-[0_4px_8px_0_rgba(0,0,0,0.2)]">
//       <div
//         className={`transform transition-transform duration-500 ${
//           isTransitioning ? "translate-x-[-100%]" : "translate-y-0"
//         }`}
//       >
//         {visibleItems.map(item => (
//           <div key={item.rank} className="mb-4 flex items-center text-sm">
//             {/* 순위 */}
//             <span className="font-pretendard-bold mr-1 flex items-center text-custom-blue-500">
//               <span className="block w-2">{item.rank}</span>
//               <span className="text-xs">위</span>
//             </span>
//             {/* 과목 */}
//             <span className="font-pretendard-medium xs:w-30 min-w-30 mr-4 line-clamp-1 sm:w-40">{item.subject}</span>
//             {/* 질문 */}
//             <span className="font-pretendard-medium flex-1 truncate text-[#737373]">{item.title}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

/* eslint-disable */

import { PopularItem } from "@/types/DocPopularItem.type";
import { useRouter } from "next/navigation";

interface DocPopularContainerProps {
  allPopularItems: PopularItem[];
}

export default function DocPopularContainer({ allPopularItems }: DocPopularContainerProps) {
  const router = useRouter();
  const handleCardClick = (postId: string) => {
    if (!postId) {
      console.error("Invalid postId:", postId);
      return;
    }
    console.log("Clicked card postId:", postId);
    router.push(`/board/document/detail/${postId}`);
  };
  return (
    <div className="w-full overflow-hidden rounded-[14px] px-4 pb-1 pt-5 shadow-[0_4px_8px_0_rgba(0,0,0,0.2)]">
      {allPopularItems.map(item => (
        <div
          key={item.rank}
          className="mb-4 flex cursor-pointer items-center text-sm"
          onClick={() => {
            if (item.postId) {
              handleCardClick(item.postId);
            } else {
              console.error("Invalid or undefined postId:", item.postId);
            }
          }}
        >
          {/* 순위 */}
          <span className="font-pretendard-bold text-custom-blue-500 mr-2 flex items-center">
            <span className="block w-2">{item.rank}</span>
            <span className="text-xs">위</span>
          </span>
          {/* 과목 */}
          <span className="font-pretendard-medium xs:w-30 min-w-30 mr-2 line-clamp-1 sm:w-40">{item.subject}</span>
          {/* 질문 */}
          <span className="font-pretendard-medium flex-1 truncate text-[#737373]">{item.title}</span>
        </div>
      ))}
    </div>
  );
}
