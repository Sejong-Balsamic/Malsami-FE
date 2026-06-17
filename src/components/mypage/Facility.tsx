import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import WarningAlertModal from "@/components/common/modal/WarningAlertModal";
import useLogout from "@/global/hook/useLogout";

const SECTION_BORDER = "border-b border-ui-divider";
const ROW_PADDING = "p-[24px]";
const ROW_GAP = "gap-6";
const TITLE_FONT = "text-SUIT_16 font-medium";

function Facility() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleLogout = useLogout();

  const handleLogoutClick = async () => {
    setIsModalOpen(false);
    await handleLogout();
  };

  return (
    <div className="flex flex-col">
      <div className={`grid w-full grid-cols-1 ${ROW_GAP} ${SECTION_BORDER} ${ROW_PADDING}`}>
        {/* 로그아웃 */}
        <button onClick={() => setIsModalOpen(true)} type="button" className="flex w-full items-center justify-between">
          <span className={TITLE_FONT}>로그아웃</span>
          <Image src="/icons/Move.svg" alt="move" width={7} height={14} className="h-[14px] w-[7px]" />
        </button>
        {/* 회원 탈퇴 */}
        <button
          onClick={() => router.push("/mypage/withdraw")}
          type="button"
          className="flex w-full items-center justify-between"
        >
          <span className={TITLE_FONT}>회원탈퇴</span>
          <Image src="/icons/Move.svg" alt="move" width={7} height={14} className="h-[14px] w-[7px]" />
        </button>
        <button
          onClick={() => router.push("/mypage/policy")}
          type="button"
          className="flex w-full items-center justify-between"
        >
          <span className="font-pretendard-semibold text-[18px]">개인정보 처리방침</span>
          <Image src="/icons/mypage/Move_gray.svg" alt="YeopJeon" width={7} height={14} className="h-[14px] w-[7px]" />
        </button>
      </div>
      <div className={`grid w-full grid-cols-1 ${ROW_GAP} ${SECTION_BORDER} ${ROW_PADDING}`}>
        <button onClick={() => router.push("/help")} type="button" className="flex w-full items-center justify-between">
          <span className={TITLE_FONT}>세종말싸미 이용도우미</span>
          <Image src="/icons/mypage/Move_gray.svg" alt="YeopJeon" width={7} height={14} className="h-[14px] w-[7px]" />
        </button>
        <button
          onClick={() => router.push("/mypage/rule")}
          type="button"
          className="flex w-full items-center justify-between"
        >
          <span className="font-pretendard-semibold text-[18px]">이용규칙</span>
          <Image src="/icons/mypage/Move_gray.svg" alt="YeopJeon" width={7} height={14} className="h-[14px] w-[7px]" />
        </button>
      </div>
      <div className={`grid w-full grid-cols-1 ${SECTION_BORDER} ${ROW_PADDING}`}>
        <button
          onClick={() => router.push("/notice")}
          type="button"
          className="flex w-full items-center justify-between"
        >
          <span className="font-pretendard-semibold text-[18px]">공지사항</span>
          <Image src="/icons/mypage/Move_gray.svg" alt="YeopJeon" width={7} height={14} className="h-[14px] w-[7px]" />
        </button>
      </div>

      {/* 로그아웃 경고 모달 */}
      <WarningAlertModal
        isOpen={isModalOpen}
        title="로그아웃"
        message="정말 로그아웃하시겠습니까?"
        confirmLabel="확인"
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleLogoutClick}
      />
    </div>
  );
}

export default Facility;
