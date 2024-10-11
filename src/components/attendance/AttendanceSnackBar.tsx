import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AttendanceSnackBar() {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const { toast } = useToast();

  const handleCheckAttendance = () => {
    setIsVisible(false);
    sessionStorage.setItem("lastAttendance", new Date().toString()); // 출석 시간 저장
    toast({
      description: "출석체크 완료! 10포인트 획득",
    });
  };

  useEffect(() => {
    const lastAttendance = sessionStorage.getItem("lastAttendance");
    if (lastAttendance) {
      const lastTime = new Date(lastAttendance).getTime();
      const nowTime = new Date().getTime();

      // 24시간 체크
      if (nowTime - lastTime < 24 * 60 * 60 * 1000) {
        setIsVisible(false); // 24시간이 지나지 않았으면 숨김
      }
    }
  }, []);

  return isVisible ? (
    <button
      type="submit"
      onClick={handleCheckAttendance}
      className="fixed bottom-5 right-5 bg-custom-orange-300 text-white w-[45px] h-[45px] rounded-full text-sm hover:bg-custom-orange-400"
    >
      출석
      <br />
      체크
    </button>
  ) : null;
}
