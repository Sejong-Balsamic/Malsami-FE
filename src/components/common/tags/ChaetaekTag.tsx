"use client";

/**
 * 채택 태그 컴포넌트
 * 질문이 채택된 상태일 때 표시되는 태그
 */
export default function ChaetaekTag() {
  return (
    <div className="inline-flex items-center justify-center gap-[10px] rounded-[4px] bg-tag-accept px-[6px] py-[4px]">
      <span className="overflow-hidden text-ellipsis text-[12px] font-bold leading-[100%] text-[#FFFFFF]">채택</span>
    </div>
  );
}
