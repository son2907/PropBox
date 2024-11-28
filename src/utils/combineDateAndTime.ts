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

  // ISO 8601 형식으로 변환하여 반환
  return combinedDate.toISOString();
}
