import React from 'react';
import NavigationButton from './NavigationButton';

function HotQuestion() {
  return (
    <div className="relative w-full h-[720px] mx-auto">
      <div className="absolute w-[433px] h-[88px] left-[417px] top-[43px]">
        <div className="absolute left-0 top-[59px] text-black text-2xl font-medium font-pretendard">
          세종말싸미에서 오늘의 인기질문을 만나보세요
        </div>
        <div className="absolute left-[66px] top-0 text-black text-4xl font-bold font-pretendard">
          <span className="font-semibold">🔥</span> HOT! 인기질문
        </div>
      </div>

      {/* 카드 섹션 */}
      <div className="absolute w-[1255.70px] h-[395px] left-[113px] top-[183px] grid grid-cols-4 gap-[20px]">
        {/* 카드 1 */}
        <div className="relative w-[291px] h-[390px] shadow-lg bg-white rounded-[23px]">
          <div className="absolute left-[34px] top-[39px] w-[121px] h-[32.78px] bg-black rounded-lg">
            <div className="absolute left-[10px] top-[6.78px] text-white text-sm font-medium font-pretendard">과목</div>
          </div>
          <div className="absolute left-[34px] top-[86.48px] text-[28px] font-bold text-black font-pretendard">
            질문 제목
          </div>
          <div className="absolute left-[34px] top-[184.83px] space-y-2 text-sm text-[#b3b3b3] font-semibold font-pretendard">
            <div>#해시태그1 #해시태그2 #해시태그3</div>
          </div>
          <div className="absolute left-[25px] top-[256.04px] flex justify-center items-center gap-[22px]">
            <div className="opacity-90 text-[#636363] text-[32px] font-bold font-pretendard">20위</div>
          </div>
          <img
            className="absolute w-20 h-20 left-[176px] top-[252px]"
            src="https://via.placeholder.com/80x80"
            alt="thumbnail"
          />
        </div>

        {/* 카드 2 */}
        <div className="relative w-[290.98px] h-[390px] shadow-lg bg-white rounded-[23px]">
          <div className="absolute left-[34px] top-[38px] w-[121px] h-[29px] bg-[#f4710d] rounded-lg">
            <div className="absolute left-[10px] top-[6px] text-white text-sm font-medium font-pretendard">과목</div>
          </div>
          <div className="absolute left-[34px] top-[80px] text-[28px] font-bold text-black font-pretendard">
            질문 제목
          </div>
          <div className="absolute left-[34px] top-[184.83px] space-y-2 text-sm text-[#b3b3b3] font-semibold font-pretendard">
            <div>#해시태그1 #해시태그2 #해시태그3</div>
          </div>
          <div className="absolute left-[34px] top-[260px] text-[#636262] text-[32px] font-bold font-pretendard">
            12위
          </div>
          <img
            className="absolute w-20 h-20 left-[176px] top-[252px]"
            src="https://via.placeholder.com/80x80"
            alt="thumbnail"
          />
        </div>

        {/* 카드 3 */}
        <div className="relative w-[290.98px] h-[390px] shadow-lg bg-white rounded-[23px]">
          <div className="absolute left-[34px] top-[38px] w-[121px] h-[29px] bg-[#68d723] rounded-lg">
            <div className="absolute left-[10px] top-[6px] text-white text-sm font-medium font-pretendard">과목</div>
          </div>
          <div className="absolute left-[34px] top-[81px] text-[28px] font-bold text-black font-pretendard">
            질문 제목
          </div>
          <div className="absolute left-[34px] top-[184.83px] space-y-2 text-sm text-[#b3b3b3] font-semibold font-pretendard">
            <div>#해시태그1 #해시태그2 #해시태그3</div>
          </div>
          <div className="absolute left-[34px] top-[255px] text-[#636262] text-[32px] font-bold font-pretendard">
            7위
          </div>
          <img
            className="absolute w-20 h-20 left-[176px] top-[252px]"
            src="https://via.placeholder.com/80x80"
            alt="thumbnail"
          />
        </div>

        {/* 카드 4 */}
        <div className="relative w-[292.70px] h-[390px] shadow-lg bg-white rounded-[23px]">
          <div className="absolute left-[44px] top-[37.78px] w-[121px] h-[28.83px] bg-[#09bba2] rounded-lg">
            <div className="absolute left-[10px] top-[5.96px] text-white text-sm font-medium font-pretendard">과목</div>
          </div>
          <div className="absolute left-[44px] top-[79.53px] text-[28px] font-bold text-black font-pretendard">
            질문 제목
          </div>
          <div className="absolute left-[34px] top-[184.83px] space-y-2 text-sm text-[#b3b3b3] font-semibold font-pretendard">
            <div>#해시태그1 #해시태그2 #해시태그3</div>
          </div>
          <div className="absolute left-[44px] top-[249px] flex justify-center items-center gap-3">
            <div className="text-[#636262] text-[32px] font-bold font-pretendard">3위</div>
            <div className="w-[18px] h-[5px] bg-[#34c759]" />
          </div>
          <img
            className="absolute w-20 h-20 left-[176px] top-[252px]"
            src="https://via.placeholder.com/80x80"
            alt="thumbnail"
          />
        </div>
      </div>

      <div className="absolute left-[119px] top-[621px] flex space-x-4">
        <NavigationButton />
      </div>
    </div>
  );
}

export default HotQuestion;
