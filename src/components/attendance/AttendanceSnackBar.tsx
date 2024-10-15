// import { useState } from "react";
// import { useToast } from "@/hooks/use-toast";

// // 오늘 날짜를 YYYY-MM-DD 형식으로 반환하는 함수
// const getTodayDate = (): string => {
//   const date = new Date();
//   const todayDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
//   return todayDate;
// };

// // 나중에 api로 출석체크 해야 함. 수정 필요
// export default function AttendanceSnackBar() {
//   const lastAttendanceDate = sessionStorage.getItem("lastAttendanceDate") || ""; // sessionStorage에 없을 경우 빈 문자열 처리
//   const todayDate = getTodayDate();
//   const isAttendanced = lastAttendanceDate === todayDate;
//   const [isVisible, setIsVisible] = useState<boolean>(!isAttendanced);
//   const { toast } = useToast();

//   const handleCheckAttendance = () => {
//     setIsVisible(false);
//     sessionStorage.setItem("lastAttendanceDate", getTodayDate()); // 현재 날짜를 sessionStorage에 저장
//     toast({
//       description: "출석체크 완료! 10포인트 획득",
//     });
//   };

//   return isVisible ? (
//     <button
//       type="submit"
//       onClick={handleCheckAttendance}
//       className="fixed bottom-5 right-5 bg-custom-orange-300 text-white w-[45px] h-[45px] rounded-full text-sm hover:bg-custom-orange-400"
//     >
//       출석
//       <br />
//       체크
//     </button>
//   ) : null;
// }

// // 처음 코드, 새로고침 할 때 출석체크 표시되는 문제
// // export default function AttendanceSnackBar() {
// //   const [isVisible, setIsVisible] = useState<boolean>(true);
// //   const { toast } = useToast();

// //   const handleCheckAttendance = () => {
// //     setIsVisible(false);
// //     sessionStorage.setItem("lastAttendanceDate", getTodayDate()); // 현재 날짜를 sessionStorage에 저장
// //     toast({
// //       description: "출석체크 완료! 10포인트 획득",
// //     });
// //   };

// //   useEffect(() => {
// //     const lastAttendanceDate = sessionStorage.getItem("lastAttendanceDate");

// //     if (lastAttendanceDate) {
// //       if (lastAttendanceDate === getTodayDate()) {
// //         // 현재 날짜와 비교
// //         setIsVisible(false); // 같으면 이미 출석 체크 함.
// //       }
// //     }
// //   }, []);

// //   return isVisible ? (
// //     <button
// //       type="submit"
// //       onClick={handleCheckAttendance}
// //       className="fixed bottom-5 right-5 bg-custom-orange-300 text-white w-[45px] h-[45px] rounded-full text-sm hover:bg-custom-orange-400"
// //     >
// //       출석
// //       <br />
// //       체크
// //     </button>
// //   ) : null;
// // }
