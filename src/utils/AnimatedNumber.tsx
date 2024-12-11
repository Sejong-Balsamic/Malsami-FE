import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  target: number; // 최종 목표 숫자
}

function AnimatedNumber({ target }: AnimatedNumberProps) {
  const [current, setCurrent] = useState(0);
  const duration = 500;
  useEffect(() => {
    const increment = target / (duration / 10); // 10ms마다 증가할 값
    const interval = setInterval(() => {
      setCurrent(prev => {
        const next = prev + increment;
        if (next >= target) {
          clearInterval(interval);
          return target; // 목표 값에 도달하면 정지
        }
        return next;
      });
    }, 10); // 10ms 간격으로 업데이트

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, [target, duration]);

  return <span>{Math.round(current)}%</span>; // 숫자를 반올림하여 표시
}

export default AnimatedNumber;
