export const getFormatTime = (timestamp: number): string => {
  const date = new Date(timestamp);

  const hours = String(date.getHours()).padStart(2, "0"); // 시
  const minutes = String(date.getMinutes()).padStart(2, "0"); // 분
  const seconds = String(date.getSeconds()).padStart(2, "0"); // 초

  return `${hours}:${minutes}:${seconds}`;
};
