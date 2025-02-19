import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExcelUploadTable: React.FC = () => {
  const [tableData, setTableData] = useState<any[][]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      if (!event.target?.result) return;

      const data = new Uint8Array(event.target.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<any[]>(worksheet, {
        header: 1,
      });

      setTableData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <h2>Excel 파일 업로드 및 테이블 변환</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {tableData.length > 0 && (
        <table cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              {tableData[0]?.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExcelUploadTable;
