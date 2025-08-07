const getDateDiff = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval}년 전`;

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval}개월 전`;

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval}일 전`;

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval}시간 전`;

  interval = Math.round(seconds / 60);
  if (interval >= 1) return `${interval}분 전`;

  return "방금 전";
};

// 오늘 날짜를 YYYY-MM-DD 형식으로 반환하는 함수
const getTodayDate = (): string => {
  const date = new Date();
  const todayDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  return todayDate;
};

// 날짜를 "MM/DD HH:mm" 형식으로 반환하는 함수
const formatDateTime = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const MM = String(date.getMonth() + 1).padStart(2, "0");
  const DD = String(date.getDate()).padStart(2, "0");
  const HH = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${MM}/${DD} ${HH}:${mm}`;
};

export { getDateDiff, getTodayDate, formatDateTime };
