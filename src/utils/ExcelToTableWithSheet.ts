import * as XLSX from "xlsx";

export const ExcelToTableWithSheet = (
  file: File, // 파일을 직접 인자로 받음
  sheetName: string | null = null,
  callback: (result: {
    sheetNames: string[];
    headers: string[];
    dataWithId: any[];
  }) => void,
  errorCallback: (error: string) => void
): void => {
  if (!file) return errorCallback("No file selected");

  const reader = new FileReader();

  reader.onload = (event) => {
    if (!event.target?.result) return errorCallback("파일을 읽지 못했습니다.");

    const data = new Uint8Array(event.target.result as ArrayBuffer);
    const workbook = XLSX.read(data, { type: "array" });

    const sheetNames = workbook.SheetNames;
    const targetSheet = sheetName || sheetNames[0];
    const worksheet = workbook.Sheets[targetSheet];

    const jsonData = XLSX.utils.sheet_to_json<any[]>(worksheet, {
      header: 1,
    });
    const headers = jsonData[0];

    const dataWithId = jsonData.slice(1).map((row, index) => {
      const rowData = { id: index + 1 }; // id를 먼저 추가
      headers.forEach((header, i) => {
        rowData[header] = row[i] || ""; // 헤더와 값 매핑
      });
      return rowData;
    });

    callback({ sheetNames, headers, dataWithId });
  };

  reader.onerror = () => errorCallback("파일 읽기 중 에러가 발생했습니다.");
  reader.readAsArrayBuffer(file);
};
