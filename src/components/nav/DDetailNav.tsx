import { useRouter } from "next/navigation";
import Image from "next/image";
import { Drawer, DrawerContent, DrawerTitle, DrawerDescription, DrawerTrigger } from "@/components/ui/drawer";
// eslint-disable-next-line import/no-extraneous-dependencies
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DocumentData } from "@/types/DocumentDetailData";
import { Button } from "../ui/button";

const tierMapping: { [key: string]: string } = {
  CHUNMIN: "천민",
  JUNGIN: "중인",
  YANGBAN: "양반",
  KING: "왕",
};

// 영어 티어를 한국어로 변환하는 함수
const getKoreanTier = (englishTier: string): string => {
  return tierMapping[englishTier] || englishTier; // 매핑되지 않은 경우 원래의 태그 반환
};

function DetailPageNav({ documentData }: { documentData: DocumentData }) {
  const router = useRouter();

  return (
    <nav className="flex h-[64px] items-end justify-between border-b-2 border-[#eaeaea] px-5">
      {/* 뒤로 가기 아이콘 */}
      <button type="button" className="flex" onClick={() => router.back()}>
        <Image src="/icons/BackIcon.svg" alt="back" width={10} height={20} className="mb-[20px]" />
      </button>
      {/* 제목과 양반등급 표시 */}
      <div className="my-auto flex flex-col items-center">
        <h1 className="font-pretendard-bold text-[20px]">자료 게시판</h1>
        <span className="font-pretendard-medium text-[12px] text-[#09bba2]">
          {getKoreanTier(documentData.documentPost.postTier)}등급
        </span>
      </div>
      {/* 옵션 아이콘 */}
      <Drawer>
        <DrawerTrigger asChild>
          <button type="button" className="flex">
            <Image src="/icons/Option.svg" alt="option" width={4} height={20} className="mb-[20px]" />
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <VisuallyHidden>
            <DrawerTitle>Options</DrawerTitle>
            <DrawerDescription>차피 안 보이는 부분</DrawerDescription>
          </VisuallyHidden>
          <div className="flex flex-col pb-[30px]">
            <Button variant="ghost" className="font-pretendard-semibold gap-[10px] text-[16px] text-[#f46b02]">
              <Image src="/icons/Share.svg" alt="option" width={12} height={15} />
              공유하기
            </Button>
            <Button variant="ghost" className="font-pretendard-semibold gap-[10px] text-[16px] text-[#f46b02]">
              <Image src="/icons/Block.svg" alt="option" width={12} height={12} />
              차단하기
            </Button>
            <Button variant="ghost" className="font-pretendard-semibold gap-[10px] text-[16px] text-[#f46b02]">
              <Image src="/icons/Report.svg" alt="option" width={12} height={12} />
              신고하기
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </nav>
  );
}

export default DetailPageNav;
