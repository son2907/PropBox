export function combineDateAndTime(date: Date, selectedTime: number): string {
  // 선택된 시간에서 시, 분, 초를 추출
  const time = new Date(selectedTime);

  // 날짜의 연, 월, 일 값을 사용하여 새로운 Date 객체 생성
  const combinedDate = new Date(date);
  combinedDate.setHours(time.getHours());
  combinedDate.setMinutes(time.getMinutes());
  combinedDate.setSeconds(time.getSeconds());

  // 한국 시간으로 변환 (UTC +9)
  combinedDate.setHours(combinedDate.getHours() + 9);

  // YYYY-MM-DD HH:MM:SS 형식으로 변환
  const year = combinedDate.getFullYear();
  const month = String(combinedDate.getMonth() + 1).padStart(2, "0");
  const day = String(combinedDate.getDate()).padStart(2, "0");
  const hours = String(combinedDate.getHours()).padStart(2, "0");
  const minutes = String(combinedDate.getMinutes()).padStart(2, "0");
  const seconds = String(combinedDate.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
