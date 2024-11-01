import { useState, useEffect } from "react";
import Image from "next/image";
import ToggleSwitch from "./ToggleSwitch";

// api 연동해 isChaeTak 변경되면 api 호출하는 코드 짜야 함
function FilterControlBar() {
  const [isChaeTak, setIsChaeTak] = useState<boolean>(false);

  const toggleSwitch = () => setIsChaeTak(!isChaeTak);

  // isChaeTak의 값이 변경될 때마다 콘솔에 출력
  useEffect(() => {
    console.log("isChaeTak:", isChaeTak);
  }, [isChaeTak]);

  return (
    <div className="px-5 py-4 flex justify-end">
      <ToggleSwitch isChaeTak={isChaeTak} toggleSwitch={toggleSwitch} />
      <span className="mr-2.5 text-xs font-pretendard-semibold text-[#737373]">채택됨</span>
      <Image
        src="/icons/FilterIcon.svg" // 이미지 경로
        alt="filter"
        width={16}
        height={16}
      />
    </div>
  );
}

export default FilterControlBar;
