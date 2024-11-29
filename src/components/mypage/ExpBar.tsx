"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";

interface ExpBarProps {
  value: number; // 상위 컴포넌트에서 전달받을 경험치 값
}

function ExpBar({ value }: ExpBarProps) {
  const [progress, setProgress] = React.useState<number>(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 800);
    return () => clearTimeout(timer);
  }, [value]);

  return <Progress value={progress} className="w-full bg-transparent border-2 border-[#016D5D]" />;
}

export default ExpBar;
