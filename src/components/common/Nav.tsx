import React from 'react';

function Nav() {
  return (
    <div className="w-full h-[120px] px-36 py-8 flex items-center bg-[#ff0000]/10">
      <div className="relative w-full h-[57px]">
        <div className="absolute w-28 m-auto left-0 top-[13px]">
          <div className="absolute w-28 h-[31px] bg-[#d9d9d9]" />
          <div className="absolute left-[20px] top-[3px] text-black text-xl font-bold font-pretendard">가로 로고</div>
        </div>

        <div className="absolute right-80 top-[16px] text-[#c7c7c7] text-xl font-bold font-pretendard">질문게시판</div>

        <div className="absolute right-52 top-[16px] text-black text-xl font-bold font-pretendard">마이페이지</div>

        <div className="absolute right-0 top-0 w-[162px] h-[57px]">
          <div className="absolute w-[162px] h-[57px] bg-[#f46b02] rounded-xl" />
          <div className="absolute left-[26px] top-[16px] text-white text-xl font-medium font-pretendard">
            지금 질문하기
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
