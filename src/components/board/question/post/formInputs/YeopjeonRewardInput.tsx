import YeopjeonTag from "../../../tags/YeopjeonTag";

interface YeopjeonRewardProps {
  reward: number;
  onClick: () => void;
}

export default function YeopjeonRewardInput({ reward, onClick }: YeopjeonRewardProps) {
  return (
    <button type="button" className="mb-[26px] flex cursor-pointer items-center" onClick={onClick}>
      <div className="font-pretendard-semibold mr-[14px] text-lg"> 엽전 현상금 {">"}</div>
      <YeopjeonTag point={reward} />
    </button>
  );
}
