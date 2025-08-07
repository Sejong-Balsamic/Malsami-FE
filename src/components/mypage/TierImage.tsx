/* eslint-disable no-dupe-else-if */
import Image from "next/image";
import { MemberDto } from "@/types/api/responses/memberDto";

function TierImage({ memberInfo }: { memberInfo: MemberDto | null }) {
  if (!memberInfo) return null;

  let tierImage = "";
  let altText = "";

  if (
    memberInfo.canAccessCheonmin ||
    (!memberInfo.canAccessCheonmin &&
      !memberInfo.canAccessJungin &&
      !memberInfo.canAccessYangban &&
      !memberInfo.canAccessKing)
  ) {
    tierImage = "/image/tier/Cheonmin.svg";
    altText = "Cheonmin";
  } else if (memberInfo.canAccessCheonmin && memberInfo.canAccessJungin && !memberInfo.canAccessYangban) {
    tierImage = "/image/tier/Jungin.svg";
    altText = "Jungin";
  } else if (
    memberInfo.canAccessCheonmin &&
    memberInfo.canAccessJungin &&
    memberInfo.canAccessYangban &&
    !memberInfo.canAccessKing
  ) {
    tierImage = "/image/tier/Yangban.svg";
    altText = "Yangban";
  } else if (
    memberInfo.canAccessCheonmin &&
    memberInfo.canAccessJungin &&
    memberInfo.canAccessYangban &&
    memberInfo.canAccessKing
  ) {
    tierImage = "/image/tier/King.svg";
    altText = "King";
  }

  return (
    <div>
      {tierImage && (
        <Image src={tierImage} alt={altText} width={150} height={150} className="absolute top-[-130px] z-0" />
      )}
      <div className="absolute h-full w-full flex-col gap-7 rounded-[15px] bg-white px-[20px] py-[30px]" />
    </div>
  );
}

export default TierImage;
