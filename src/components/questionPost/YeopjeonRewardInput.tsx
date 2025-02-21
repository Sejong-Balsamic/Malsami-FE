import YeopjeonTag from "@/components/common/tags/YeopjeonTag";

interface YeopjeonRewardProps {
  reward: number;
  onClick: () => void;
}

export default function YeopjeonRewardInput({ reward, onClick }: YeopjeonRewardProps) {
  return (
    <button type="button" className="mb-[26px] cursor-pointer" onClick={onClick}>
      <div className="font-pretendard-semibold mb-2.5 text-lg"> 엽전 현상금 {">"}</div>
      <div className="flex items-start">{reward !== 0 && <YeopjeonTag point={reward} />}</div>
    </button>
  );
}
