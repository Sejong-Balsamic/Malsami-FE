import Image from "next/image";
import { MemberDto } from "@/types/api/responses/memberDto"; // 경로 확인 필요

function MemberSummary({ memberInfo }: { memberInfo: MemberDto | null }) {
  return (
    <div className="flex">
      <div className="float-right pb-2.5 pt-8">
        <div className="flex w-full pb-2.5">
          <div className="flex flex-col items-end">
            <div className="flex items-end gap-1.5">
              <span className="font-suit-semibold text-SUIT_18">{memberInfo?.member?.studentName || "사용자"}</span>
              <span className="font-suit-medium text-SUIT_14">@{memberInfo?.member?.uuidNickname || "아이디"}</span>
            </div>
            <div>
              <span className="font-suit-medium text-SUIT_14 text-ui-body-soft">
                {memberInfo?.member?.studentId} | {memberInfo?.member?.major}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="flex h-7 items-center justify-between gap-2 rounded-full border-2 border-mypage-teal-light bg-white px-3"
          >
            <Image src="/icons/Yeopjeon.svg" alt="Yeopjeon" width={16} height={16} className="h-4 w-4" />
            <span className="font-suit-semibold text-SUIT_14 text-legacy-teal">
              {memberInfo?.yeopjeon?.yeopjeon || "0"}
            </span>
            <Image src="/icons/Move.svg" alt="Move" width={6} height={12} className="h-3 w-1.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MemberSummary;
