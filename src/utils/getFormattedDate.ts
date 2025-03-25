export function getFormattedDate(date?: Date | undefined) {
  const today = date ?? new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 0부터 시작하므로 +1
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}

export function getFormattedDateTime(date?: Date | undefined) {
  const today = date ?? new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(today.getDate()).padStart(2, "0");
  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  const seconds = String(today.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
