import React from 'react';

function NavigationButton() {
  return (
    <div className="w-[102px] h-[47px] relative">
      <div className="w-[47px] h-[47px] left-[55px] top-0 absolute">
        <div className="w-[47px] h-[47px] left-0 top-0 absolute bg-[#d9d8d8] rounded-full" />
        <div className="w-3 h-[19px] left-[16px] top-[12px] absolute text-[#707070] text-xl font-normal font-Pretendard">
          오
        </div>
      </div>

      <div className="w-[47px] h-[47px] left-0 top-0 absolute">
        <div className="w-[47px] h-[47px] left-[47px] top-[47px] absolute origin-top-left -rotate-180 bg-[#e7e7e7] rounded-full" />
        <div className="w-3 h-[19px] left-[16px] top-[12px] absolute text-[#707070] text-xl font-normal font-Pretendard">
          왼
        </div>
      </div>
    </div>
  );
}

export default NavigationButton;
