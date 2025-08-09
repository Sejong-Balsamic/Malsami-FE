"use client";

/**
 * 채택 태그 컴포넌트
 * 질문이 채택된 상태일 때 표시되는 태그
 */
export default function ChaetaekTag() {
  return (
    <div className="inline-flex items-center justify-center gap-2 rounded-sm bg-tag-accept px-2 py-1">
      <span className="overflow-hidden text-ellipsis text-xs font-bold leading-none text-white">채택</span>
    </div>
  );
}
