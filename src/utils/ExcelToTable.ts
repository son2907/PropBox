import * as XLSX from "xlsx";

// input type=file의 onChange에 직접 연결해서 사용할 것
export const ExcelToTable = (e: React.ChangeEvent<HTMLInputElement>) => {
  return new Promise<{ headers: string[]; dataWithId: any[] }>(
    (resolve, reject) => {
      const file = e.target.files?.[0];
      if (!file) return reject("No file selected");

      const reader = new FileReader();

      reader.onload = (event) => {
        if (!event.target?.result) return reject("Failed to read file");

        const data = new Uint8Array(event.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<any[]>(worksheet, {
          header: 1,
        });

        const headers = jsonData[0];
        const dataWithId = jsonData.slice(1).map((row, index) => ({
          id: index + 1,
          ...headers.reduce((acc: any, header: string, i: number) => {
            acc[header] = row[i] || "";
            return acc;
          }, {}),
        }));

        resolve({ headers, dataWithId });
      };

      reader.onerror = () => reject("Error reading file");
      reader.readAsArrayBuffer(file);
    }
  );
};
