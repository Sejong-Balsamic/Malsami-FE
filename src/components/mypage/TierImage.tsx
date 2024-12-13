/* eslint-disable no-dupe-else-if */
import Image from "next/image";

interface InfoProps {
  memberInfo: {
    canAccessCheonmin: boolean;
    canAccessJungin: boolean;
    canAccessYangban: boolean;
    canAccessKing: boolean;
  } | null;
}

function TierImage({ memberInfo }: InfoProps) {
  if (!memberInfo) return null; // memberInfo가 null이면 아무것도 렌더링하지 않음

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
        <Image
          src={tierImage}
          alt={altText}
          width={150}
          height={150}
          className="absolute bottom-[210px] left-[20px] z-0"
        />
      )}
      <div className="absolute h-full w-full flex-col gap-7 rounded-[15px] border-2 border-[#95e4da] bg-white px-[20px] py-[30px]" />
    </div>
  );
}

export default TierImage;
