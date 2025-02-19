import React, { useState } from "react";
import * as XLSX from "xlsx";
import TableBox from "../../../components/Box/TableBox";
import CheckboxTable from "../../../components/Table/CheckboxTable";
import { useMultiRowSelection } from "../../../hooks/useMultiRowSelection";
import { filterDataByValues } from "../../../utils/filterDataByValues";

const ExcelUploadTable: React.FC = () => {
  const [tableHeader, setTableHeader] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);

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

      const headers = jsonData[0];
      const dataWithId = jsonData.slice(1).map((row, index) => ({
        id: index + 1,
        ...headers.reduce((acc: any, header: string, i: number) => {
          acc[header] = row[i] || "";
          return acc;
        }, {}),
      }));

      setTableHeader(headers);
      setTableData(dataWithId);
    };

    reader.readAsArrayBuffer(file);
  };
  const { selectedRows, toggleRowsSelection } = useMultiRowSelection();

  const data = filterDataByValues({
    data: tableData,
    key: "id",
    values: Array.from(selectedRows),
  });
  console.log("선택한 행:", data);

  return (
    <div>
      <h2>Excel 파일 업로드 및 테이블 변환</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {tableData.length > 0 && (
        <TableBox>
          <TableBox.Inner>
            <CheckboxTable
              data={tableData}
              selectedRows={selectedRows}
              toggleRowsSelection={toggleRowsSelection}
            >
              <CheckboxTable.Thead>
                <CheckboxTable.Tr>
                  <CheckboxTable.CheckboxTh keyName="id" />
                  {tableHeader.map((item) => {
                    return <CheckboxTable.Th>{item}</CheckboxTable.Th>;
                  })}
                </CheckboxTable.Tr>
              </CheckboxTable.Thead>
              <CheckboxTable.Tbody>
                {tableData.map((row, rowIndex) => (
                  <CheckboxTable.Tr key={rowIndex} id={row.id}>
                    <CheckboxTable.Td>
                      <CheckboxTable.CheckboxTd item={row} keyName="id" />
                    </CheckboxTable.Td>
                    {Object.keys(row)
                      .filter((key) => key !== "id")
                      .map((key, cellIndex) => (
                        <CheckboxTable.Td key={cellIndex}>
                          {row[key]}
                        </CheckboxTable.Td>
                      ))}
                  </CheckboxTable.Tr>
                ))}
              </CheckboxTable.Tbody>
            </CheckboxTable>
          </TableBox.Inner>
        </TableBox>
      )}
    </div>
  );
};

export default ExcelUploadTable;
