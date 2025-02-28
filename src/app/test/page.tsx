"use client";

import BottomSheet, { BottomSheetTrigger } from "@/components/common/BottomSheet";

export default function FilterPage() {
  const handleBottomSheetReset = () => {
    console.log("필터 초기화");
  };

  const handleBottomSheetConfirm = () => {
    console.log("필터 확인");
  };

  return (
    <div className="bg-white p-4">
      <h1>필터 페이지</h1>

      {/* Bottom Sheet 컴포넌트 호출 */}
      <BottomSheet onReset={handleBottomSheetReset} onConfirm={handleBottomSheetConfirm} trigger={BottomSheetTrigger}>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div> <div>asdf</div>
        <div>asdf</div> <div>asdf</div>
        <div>asdf</div> <div>asdf</div>
        <div>asdf</div> <div>asdf</div>
        <div>asdf</div> <div>asdf</div>
        <div>asdf</div> <div>asdf</div>
        <div>asdf</div> <div>asdf</div>
        <div>asdf</div> <div>asdf</div>
        <div>asdf</div> <div>asdf</div>
        <div>asdf</div> <div>asdf</div>
        <div>asdf</div> <div>asdf</div>
        <div>asdf</div> <div>asdf</div>
        <div>asdf</div>
      </BottomSheet>
    </div>
  );
}
