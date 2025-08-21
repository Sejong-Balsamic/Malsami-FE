"use client";

import Image from "next/image";
import useCommonToast from "@/global/hook/useCommonToast";
import CommonHeader from "@/components/header/CommonHeader";
import { RIGHT_ITEM } from "@/types/header";

function Page() {
  const { showConfirmToast } = useCommonToast();

  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      <CommonHeader title="세종말싸미 이용규칙" rightType={RIGHT_ITEM.NONE} />
      <Image
        src="/image/PaperBG.png"
        alt="BG"
        width={375}
        height={900}
        className="absolute left-0 top-[64px] z-10 h-full w-full object-cover"
      />
      <div className="relative z-20 flex h-[calc(100vh-64px)] flex-col items-center justify-center gap-[30px]">
        <button
          type="button"
          onClick={() => {
            showConfirmToast("토스트가 많이많이 구워졌어요");
          }}
        >
          <Image
            src="/icons/CheonminIcon.svg"
            alt="icon"
            width={18}
            height={18}
            className="h-[200px] w-[200px] cursor-pointer"
          />
        </button>

        <span className="font-pretendard-bold text-xl">개발 중 ~^^</span>
      </div>
    </div>
  );
}

export default Page;
