"use client";

import MyPageNav from "@/components/nav/MyPageDetailNav";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { ToastAction, ToastIcon } from "@/components/ui/toast";

function Page() {
  const { toast } = useToast();

  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      <MyPageNav title="공지사항" />

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
            toast({
              icon: <ToastIcon color="blue" />,
              title: "토스트가 많이많이 구워졌어요",
              action: (
                <ToastAction color="blue" altText="확인">
                  확인
                </ToastAction>
              ),
            });
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
