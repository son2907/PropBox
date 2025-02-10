import { getFormattedDate } from "./getFormattedDate";

export default function DownloadExcel({
  response,
  filename = `${getFormattedDate(new Date())}.xlsx`,
}) {
  // Blob을 이용해 다운로드 링크 생성
  const blob = new Blob([response.data], {
    type: response.headers["content-type"],
  });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", filename); // 동적으로 파일명 설정
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
