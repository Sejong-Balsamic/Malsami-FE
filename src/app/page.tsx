"use client";

import React from "react";
import { refreshAccessToken } from "@/apis/auth/refresh";
import Nav from "@/components/common/Nav";
import FabButton from "@/components/common/FAB";
import Image from "next/image";

const handleBtnClick = () => {
  refreshAccessToken()
    .then(token => console.log("Token refreshed:", token))
    .catch(error => console.error("Failed to refresh token:", error));
};

function Page() {
  return (
    <div className="flex justify-center bg-gray-100">
      <div className="w-full max-w-[640px] h-[2847px] bg-white relative mx-auto">
        <div className="flex justify-center">
          <Nav />
        </div>
        <div className="w-full max-w-[640px] h-[1000px]">
          <Image
            src="/landing/LandingBackgroundImage.png"
            alt="배경"
            width={640}
            height={824}
            className="w-full max-w-[640px] h-auto"
            priority
          />
        </div>
        <div className="w-full h-[905.33px] top-[68px] absolute">
          <Image
            src="/landing/book/BookB1.png"
            alt="book"
            width={270}
            height={210.12}
            className="absolute w-[270px] h-auto top-[12px]"
          />

          <Image
            src="/landing/book/BookB2.png"
            alt="book"
            width={258}
            height={215.94}
            className="absolute w-[258px] h-auto right-[5px] top-[110px]"
          />

          <Image
            src="/landing/book/BookB3.png"
            alt="book"
            width={286}
            height={183.34}
            className="absolute w-[286px] h-auto left-[20px] top-[300px]"
          />

          <Image
            src="/landing/book/BookB4.png"
            alt="book"
            width={365}
            height={277.62}
            className="absolute w-[365px] h-auto right-[5px] top-[500px]"
          />
        </div>

        <div className="w-full h-[905.33px] top-[68px] absolute">
          <Image
            src="/landing/book/BookS1.png"
            alt="book"
            width={69}
            height={210.12}
            className="absolute w-[69px] h-auto right-[60px] top-[14px]"
          />

          <Image
            src="/landing/book/BookS2.png"
            alt="book"
            width={132}
            height={215.94}
            className="absolute w-[132px] h-auto right-[10px] top-[500px]"
          />

          <Image
            src="/landing/book/BookS3.png"
            alt="book"
            width={102}
            height={183.34}
            className="absolute w-[102px] h-auto left-[28px] top-[600px]"
          />
        </div>

        <div className="font-pretendard-bold">
          sejong-malsami
          <br />
          home page
        </div>
        <button type="button" className="bg-gray-400 rounded-lg" onClick={handleBtnClick}>
          refreshAccessTokenButton
        </button>
        <div className="fixed bottom-5 right-5">
          <FabButton />
        </div>
      </div>
    </div>
  );
}

export default Page;
