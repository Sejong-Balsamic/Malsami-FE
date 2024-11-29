import MyPageNav from "@/components/nav/MyPageDetailNav";
import Image from "next/image";

function Page() {
  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      <MyPageNav title="내가 작성한 댓글" />
      <Image
        src="/image/PaperBG.png"
        alt="BG"
        width={375}
        height={900}
        className="absolute left-0 top-[64px] z-10 h-full w-full object-cover"
      />
      <div className="relative z-20 flex h-[calc(100vh-64px)] flex-col items-center justify-center gap-[30px]">
        <Image src="/icons/CheonminIcon.svg" alt="icon" width={18} height={18} className="h-[200px] w-[200px]" />
        <span className="font-pretendard-bold text-xl">개발 중 ~^^</span>
      </div>
    </div>
  );
}

export default Page;
