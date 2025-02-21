// 오늘 날짜를 YYYY-MM-DD 형식으로 반환하는 함수
const getTodayDate = (): string => {
  const date = new Date();
  const todayDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  return todayDate;
};

export default getTodayDate;
