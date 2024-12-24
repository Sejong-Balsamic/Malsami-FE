// import React from "react";
// import Image from "next/image";

// interface FlyingBooksProps {
//   scrollY: number;
// }
// function FlyingBooks({ scrollY }: FlyingBooksProps) {
//   return (
//     <>
//       {/* 첫 번째 레이어 */}
//       <div className="absolute top-[68px] z-20 h-[905.33px] w-full">
//         <Image
//           src="/landing/book/BookB1.png"
//           alt="book"
//           width={270}
//           height={210.12}
//           className="absolute h-auto w-[270px]"
//           style={{ top: `${Math.min(12 + scrollY * 0.6, 900)}px` }}
//         />
//         <Image
//           src="/landing/book/BookB2.png"
//           alt="book"
//           width={258}
//           height={215.94}
//           className="absolute h-auto w-[258px]"
//           style={{ top: `${Math.min(110 + scrollY * 0.6)}px`, right: "5px" }}
//         />
//         <Image
//           src="/landing/book/BookB3.png"
//           alt="book"
//           width={286}
//           height={183.34}
//           className="absolute h-auto w-[262px]"
//           style={{ top: `${Math.min(400 + scrollY * 0.4)}px`, left: "20px" }}
//         />
//         <Image
//           src="/landing/book/BookB4.png"
//           alt="book"
//           width={365}
//           height={277.62}
//           className="absolute h-auto w-[365px]"
//           style={{ top: `${Math.min(480 + scrollY * 0.5)}px`, right: "5px" }}
//         />
//       </div>
//       {/* 두 번째 레이어 */}
//       <div className="absolute top-[68px] z-10 h-[905.33px] w-full">
//         <Image
//           src="/landing/book/BookB5.png"
//           alt="book"
//           width={365}
//           height={432}
//           className="absolute h-auto w-[232px]"
//           style={{ top: `${Math.min(900 + scrollY * 0.2)}px`, right: "28px" }}
//         />
//         <Image
//           src="/landing/book/BookB6.png"
//           alt="book"
//           width={230}
//           height={432}
//           className="absolute h-auto w-[230px]"
//           style={{ top: `${Math.min(1200 + scrollY * 0.2)}px`, right: "20px" }}
//         />
//         <Image
//           src="/landing/book/BookB7.png"
//           alt="book"
//           width={230}
//           height={432}
//           className="absolute h-auto w-[320px]"
//           style={{ top: `${Math.min(1380 + scrollY * 0.2)}px`, left: "0px" }}
//         />
//         <Image
//           src="/landing/book/BookB8.png"
//           alt="book"
//           width={236}
//           height={432}
//           className="absolute h-auto w-[236px]"
//           style={{ top: `${Math.min(1580 + scrollY * 0.2)}px`, right: "32px" }}
//         />
//       </div>
//       {/* 세 번째 레이어 */}
//       <div className="absolute top-[68px] z-0 h-[905.33px] w-full">
//         <Image
//           src="/landing/book/BookS1.png"
//           alt="book"
//           width={69}
//           height={210.12}
//           className="absolute h-auto w-[114px]"
//           style={{ top: `${Math.min(14 + scrollY * 0.5)}px`, right: "24px" }}
//         />
//         <Image
//           src="/landing/book/BookS2.png"
//           alt="book"
//           width={132}
//           height={215.94}
//           className="absolute h-auto w-[114px]"
//           style={{ top: `${Math.min(376 + scrollY * 0.4)}px`, left: "16px" }}
//         />
//         <Image
//           src="/landing/book/BookS3.png"
//           alt="book"
//           width={102}
//           height={183.34}
//           className="absolute h-auto w-[114px]"
//           style={{ top: `${Math.min(415 + scrollY * 0.4)}px`, right: "4px" }}
//         />
//         <Image
//           src="/landing/book/BookS4.png"
//           alt="book"
//           width={102}
//           height={183.34}
//           className="absolute h-auto w-[112px]"
//           style={{ top: `${Math.min(510 + scrollY * 0.3)}px`, right: "36px" }}
//         />
//         <Image
//           src="/landing/book/BookS5.png"
//           alt="book"
//           width={102}
//           height={183.34}
//           className="absolute h-auto w-[114px]"
//           style={{ top: `${Math.min(696 + scrollY * 0.5)}px`, left: "28px" }}
//         />
//         <Image
//           src="/landing/book/BookS6.png"
//           alt="book"
//           width={102}
//           height={183.34}
//           className="absolute h-auto w-[114px]"
//           style={{ top: `${Math.min(840 + scrollY * 0.4)}px`, left: "2px" }}
//         />
//         <Image
//           src="/landing/book/BookS7.png"
//           alt="book"
//           width={102}
//           height={183.34}
//           className="absolute h-auto w-[110px]"
//           style={{ top: `${Math.min(1110 + scrollY * 0.4)}px`, left: "36px" }}
//         />
//         <Image
//           src="/landing/book/BookS8.png"
//           alt="book"
//           width={102}
//           height={183.34}
//           className="absolute h-auto w-[110px]"
//           style={{ top: `${Math.min(1410 + scrollY * 0.5)}px`, right: "50px" }}
//         />
//         <Image
//           src="/landing/book/BookS9.png"
//           alt="book"
//           width={102}
//           height={183.34}
//           className="absolute h-auto w-[94px]"
//           style={{ top: `${Math.min(1746 + scrollY * 0.4)}px`, left: "36px" }}
//         />
//         <Image
//           src="/landing/book/BookS10.png"
//           alt="book"
//           width={102}
//           height={183.34}
//           className="absolute h-auto w-[108px]"
//           style={{ top: `${Math.min(1780 + scrollY * 0.5)}px`, right: "36px" }}
//         />
//         <Image
//           src="/landing/book/BookS11.png"
//           alt="book"
//           width={102}
//           height={183.34}
//           className="absolute h-auto w-[66px]"
//           style={{ top: `${Math.min(1944 + scrollY * 0.5)}px`, left: "110px" }}
//         />
//       </div>
//     </>
//   );
// }
// export default FlyingBooks;

import React, { useState, useEffect } from "react";
import Image from "next/image";
import LandingEasterEgg from "../easterEgg/LandingEasterEgg";

interface FlyingBooksProps {
  scrollY: number;
  studentName: string;
}
function FlyingBooks({ scrollY, studentName }: FlyingBooksProps) {
  const [clickCount, setClickCount] = useState(0); // 클릭 횟수
  const [isEasterEggActive, setIsEasterEggActive] = useState(false); // 이스터 에그 활성화 상태

  const handleBookClick = () => {
    if (studentName !== "종이") {
      setClickCount(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (clickCount === 5) {
      // 5번 클릭 시 이스터 에그 활성화
      setIsEasterEggActive(true);
      setClickCount(0); // 클릭 횟수 초기화
    }

    const resetTimer = setTimeout(() => {
      setClickCount(0); // 2초 안에 5번 클릭하지 않으면 초기화
    }, 2000);

    return () => clearTimeout(resetTimer);
  }, [clickCount]);
  return (
    <>
      {/* 첫 번째 레이어 */}
      <div className="absolute top-[68px] z-20 h-[905.33px] w-full">
        <Image
          src="/landing/book/BookB1.png"
          alt="book"
          width={270}
          height={210.12}
          className="absolute h-auto w-[270px]"
          style={{ top: `${Math.min(12 + scrollY * 0.6, 900)}px` }}
        />
        <Image
          src="/landing/book/BookB2.png"
          alt="book"
          width={258}
          height={215.94}
          className="absolute h-auto w-[258px]"
          style={{ top: `${Math.min(110 + scrollY * 0.6)}px`, right: "5px" }}
          onClick={handleBookClick}
        />
        <Image
          src="/landing/book/BookB3.png"
          alt="book"
          width={286}
          height={183.34}
          className="absolute h-auto w-[262px]"
          style={{ top: `${Math.min(400 + scrollY * 0.4)}px`, left: "20px" }}
        />
        <Image
          src="/landing/book/BookB4.png"
          alt="book"
          width={365}
          height={277.62}
          className="absolute h-auto w-[365px]"
          style={{ top: `${Math.min(480 + scrollY * 0.5)}px`, right: "5px" }}
        />
      </div>
      {/* 두 번째 레이어 */}
      <div className="absolute top-[68px] z-10 h-[905.33px] w-full">
        <Image
          src="/landing/book/BookB5.png"
          alt="book"
          width={365}
          height={432}
          className="absolute h-auto w-[232px]"
          style={{ top: `${Math.min(900 + scrollY * 0.2)}px`, right: "28px" }}
        />
        <Image
          src="/landing/book/BookB6.png"
          alt="book"
          width={230}
          height={432}
          className="absolute h-auto w-[230px]"
          style={{ top: `${Math.min(1200 + scrollY * 0.2)}px`, right: "20px" }}
        />
        <Image
          src="/landing/book/BookB7.png"
          alt="book"
          width={230}
          height={432}
          className="absolute h-auto w-[320px]"
          style={{ top: `${Math.min(1380 + scrollY * 0.2)}px`, left: "0px" }}
        />
        <Image
          src="/landing/book/BookB8.png"
          alt="book"
          width={236}
          height={432}
          className="absolute h-auto w-[236px]"
          style={{ top: `${Math.min(1580 + scrollY * 0.2)}px`, right: "32px" }}
        />
      </div>
      {/* 세 번째 레이어 */}
      <div className="absolute top-[68px] z-0 h-[905.33px] w-full">
        <Image
          src="/landing/book/BookS1.png"
          alt="book"
          width={69}
          height={210.12}
          className="absolute h-auto w-[114px]"
          style={{ top: `${Math.min(14 + scrollY * 0.5)}px`, right: "24px" }}
        />
        <Image
          src="/landing/book/BookS2.png"
          alt="book"
          width={132}
          height={215.94}
          className="absolute h-auto w-[114px]"
          style={{ top: `${Math.min(376 + scrollY * 0.4)}px`, left: "16px" }}
        />
        <Image
          src="/landing/book/BookS3.png"
          alt="book"
          width={102}
          height={183.34}
          className="absolute h-auto w-[114px]"
          style={{ top: `${Math.min(415 + scrollY * 0.4)}px`, right: "4px" }}
        />
        <Image
          src="/landing/book/BookS4.png"
          alt="book"
          width={102}
          height={183.34}
          className="absolute h-auto w-[112px]"
          style={{ top: `${Math.min(510 + scrollY * 0.3)}px`, right: "36px" }}
        />
        <Image
          src="/landing/book/BookS5.png"
          alt="book"
          width={102}
          height={183.34}
          className="absolute h-auto w-[114px]"
          style={{ top: `${Math.min(696 + scrollY * 0.5)}px`, left: "28px" }}
        />
        <Image
          src="/landing/book/BookS6.png"
          alt="book"
          width={102}
          height={183.34}
          className="absolute h-auto w-[114px]"
          style={{ top: `${Math.min(840 + scrollY * 0.4)}px`, left: "2px" }}
        />
        <Image
          src="/landing/book/BookS7.png"
          alt="book"
          width={102}
          height={183.34}
          className="absolute h-auto w-[110px]"
          style={{ top: `${Math.min(1110 + scrollY * 0.4)}px`, left: "36px" }}
        />
        <Image
          src="/landing/book/BookS8.png"
          alt="book"
          width={102}
          height={183.34}
          className="absolute h-auto w-[110px]"
          style={{ top: `${Math.min(1410 + scrollY * 0.5)}px`, right: "50px" }}
        />
        <Image
          src="/landing/book/BookS9.png"
          alt="book"
          width={102}
          height={183.34}
          className="absolute h-auto w-[94px]"
          style={{ top: `${Math.min(1746 + scrollY * 0.4)}px`, left: "36px" }}
        />
        <Image
          src="/landing/book/BookS10.png"
          alt="book"
          width={102}
          height={183.34}
          className="absolute h-auto w-[108px]"
          style={{ top: `${Math.min(1780 + scrollY * 0.5)}px`, right: "36px" }}
        />
        <Image
          src="/landing/book/BookS11.png"
          alt="book"
          width={102}
          height={183.34}
          className="absolute h-auto w-[66px]"
          style={{ top: `${Math.min(1944 + scrollY * 0.5)}px`, left: "110px" }}
        />
      </div>
      {/* 이스터 에그 컴포넌트 */}
      <LandingEasterEgg
        isActive={isEasterEggActive}
        onClose={() => setIsEasterEggActive(false)} // 닫기 버튼 동작
      />
    </>
  );
}
export default FlyingBooks;
