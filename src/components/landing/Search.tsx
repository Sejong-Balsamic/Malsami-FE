import React from 'react';

function Search() {
  return (
    <div className="w-full h-[356px] px-4 py-12 self-stretch flex-col justify-center inline-flex">
      <div className="w-[80%] py-12 inline-flex flex-col gap-12 m-auto">
        <div className="w-full">
          <span className="text-black text-[40px] font-extrabold font-pretendard">김성림님</span>
          <span className="text-black text-[40px] font-semibold font-pretendard">
            , 안녕하세요
            <br />
            학습 자료를 찾고, 업로드해보세요!
          </span>
        </div>
        <div className="w-full h-12 relative">
          <div className="absolute w-full h-[52px] bg-gray-50 rounded-[13px]">
            <div className="absolute left-[21px] top-[7px] text-black text-[32px] font-normal font-pretendard">🔍</div>
            <div className="absolute left-[85px] top-[11px] text-[#aaaaaa] text-2xl font-medium font-pretendard">
              학습자료 검색하기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
