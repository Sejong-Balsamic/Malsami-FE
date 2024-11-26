// /* eslint-disable */

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
//   // const [currentIndex, setCurrentIndex] = useState(0); // 현재 시작 인덱스
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
//           // setCurrentIndex(prev => {
//           //   const nextIndex = (prev + 5) % allPopularItems.length; // 다음 인덱스 계산
//           //   setVisibleItems(allPopularItems.slice(nextIndex, nextIndex + 5)); // 다음 5개 설정
//           //   return nextIndex;
//           // });
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
//             <span className="font-pretendard-bold mr-[18px] flex w-8 text-custom-blue-500">
//               <span className="block w-3">{item.rank}</span>
//               <span className="ml-1">위</span>
//             </span>
//             {/* 과목 */}
//             <span className="font-pretendard-medium xs:w-20 mr-4 line-clamp-1 min-w-20 sm:w-40">{item.subject}</span>
//             {/* 질문 */}
//             <span className="font-pretendard-medium flex-1 truncate text-[#737373]">{item.title}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

/* eslint-disable */

import { useState, useEffect } from "react";

interface PopularItem {
  rank: number;
  subject: string;
  title: string;
}

interface DocPopularContainerProps {
  allPopularItems: PopularItem[];
}

export default function DocPopularContainer({ allPopularItems }: DocPopularContainerProps) {
  const [visibleItems, setVisibleItems] = useState<PopularItem[]>([]); // 현재 보이는 5개
  // const [currentIndex, setCurrentIndex] = useState(0); // 현재 시작 인덱스
  const [isTransitioning, setIsTransitioning] = useState(false); // 애니메이션 제어

  useEffect(() => {
    if (allPopularItems.length > 0) {
      setVisibleItems(allPopularItems.slice(0, 5)); // 처음 5개 표시
    }
  }, [allPopularItems]);

  useEffect(() => {
    if (allPopularItems.length > 0) {
      const interval = setInterval(() => {
        setIsTransitioning(true); // 애니메이션 시작
        setTimeout(() => {
          // setCurrentIndex(prev => {
          //   const nextIndex = (prev + 5) % allPopularItems.length; // 다음 인덱스 계산
          //   setVisibleItems(allPopularItems.slice(nextIndex, nextIndex + 5)); // 다음 5개 설정
          //   return nextIndex;
          // });
          setVisibleItems(prev => {
            const nextIndex = (prev[0]?.rank || 0) + 4;
            console.log(prev[0].rank, nextIndex);
            return allPopularItems.slice(nextIndex % allPopularItems.length, (nextIndex % allPopularItems.length) + 5);
          });
          setIsTransitioning(false); // 애니메이션 종료
        }, 400);
      }, 7000);
      return () => clearInterval(interval); // 컴포넌트 언마운트 시 cleanup
    }
  }, [allPopularItems]);

  return (
    <div className="w-full overflow-hidden rounded-[14px] px-4 pb-1 pt-5 shadow-[0_4px_8px_0_rgba(0,0,0,0.2)]">
      <div
        className={`transform transition-transform duration-500 ${
          isTransitioning ? "translate-x-[-100%]" : "translate-y-0"
        }`}
      >
        {visibleItems.map(item => (
          <div key={item.rank} className="mb-4 flex items-center text-sm">
            {/* 순위 */}
            <span className="font-pretendard-bold mr-1 flex text-custom-blue-500">
              <span className="block w-3">{item.rank}</span>
              <span className="text-[10px]">위</span>
            </span>
            {/* 과목 */}
            <span className="font-pretendard-medium xs:w-30 min-w-30 mr-4 line-clamp-1 sm:w-40">{item.subject}</span>
            {/* 질문 */}
            <span className="font-pretendard-medium flex-1 truncate text-[#737373]">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
