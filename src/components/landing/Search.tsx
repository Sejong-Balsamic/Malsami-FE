import React from 'react';

function Search() {
  return (
    <div className="self-stretch grow shrink basis-0 px-[159px] py-[52px] bg-[#ff0000]/0 flex-col justify-center items-center gap-[50px] inline-flex">
      <div className="w-[917px]">
        <span className="text-black text-[40px] font-extrabold font-['Pretendard']">김성림님</span>
        <span className="text-black text-[40px] font-semibold font-['Pretendard']">
          , 안녕하세요
          <br />
          학습 자료를 찾고, 업로드해보세요!
        </span>
      </div>
      <div className="w-[872px] h-[52px] relative">
        <div className="absolute w-[872px] h-[52px] bg-gray-50 rounded-[13px]" />
        <div className="absolute left-[85px] top-[11px] text-[#aaaaaa] text-2xl font-medium font-['Pretendard']">
          학습자료 검색하기
        </div>
        <div className="absolute left-[21px] top-[7px] text-black text-[32px] font-normal font-['SF Pro Display']">
          􀊫
        </div>
      </div>
    </div>
  );
}

export default Search;
