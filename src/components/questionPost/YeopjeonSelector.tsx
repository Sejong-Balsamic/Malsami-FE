// TODO: 엽전 최대 개수로 최대 제한 추가
import Image from "next/image";

interface YeopjeonSelectorProps {
  value: number; // 현상금 값
  onChange: (val: number) => void; // 값 변경 콜백
}

export default function YeopjeonSelector({ value, onChange }: YeopjeonSelectorProps) {
  const clamp = (v: number) => (v < 0 ? 0 : v);

  // 입력 변경
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    onChange(raw === "" ? 0 : clamp(Number(raw)));
  };

  const increase = () => onChange(clamp(Number(value) + 1));
  const decrease = () => onChange(clamp(Number(value) - 1));

  const isZero = Number(value) === 0;

  return (
    <div>
      <h2 className="font-suit-medium mb-3 text-base">엽전 현상금</h2>
      <div className="flex items-center justify-center gap-4">
        {/* - 버튼 */}
        <button type="button" onClick={decrease} disabled={isZero} aria-label="감소">
          <div className="flex h-6 w-6 items-center justify-center">
            <Image
              src="/icons/interface-remove-circle--delete-add-circle-subtract-button-buttons-remove--Streamline-Core.svg"
              alt="minus"
              width={20}
              height={20}
            />
          </div>
        </button>

        {/* 입력칸 */}
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="0"
          value={Number(value) === 0 ? "" : Number(value)}
          onChange={handleInputChange}
          className={`border-ui-divider focus:border-question-main h-[50px] w-[106px] rounded-[8px] border-2 px-4 text-center text-sm font-semibold focus:outline-none ${isZero ? "text-gray-400" : "text-black"}`}
        />

        {/* + 버튼 */}
        <button type="button" onClick={increase} aria-label="증가">
          <div className="flex h-6 w-6 items-center justify-center">
            <Image
              src="/icons/interface-add-circle--button-remove-cross-add-buttons-plus-circle--Streamline-Core.svg"
              alt="plus"
              width={20}
              height={20}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
