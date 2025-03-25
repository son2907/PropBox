import { Stack } from "@mui/material";
import GrayBox from "../../../components/Box/GrayBox";
import SearchInput from "../../../components/Input/SearchInput";
import { BasicButton } from "../../../components/Button";
import TableBox from "../../../components/Box/TableBox";
import CheckboxTable from "../../../components/Table/CheckboxTable";
import { useMultiRowSelection } from "../../../hooks/useMultiRowSelection";
import { openPopup } from "../../../utils/openPopup";
import PathConstants from "../../../routers/path";
import { useDataManageExcelDownload } from "../../../api/dataManage";
import { useEffect } from "react";
import { filterDataByValues } from "../../../utils/filterDataByValues";

export default function CustomerData({
  reigister,
  tableData,
  setTableData,
}: {
  reigister: any;
  tableData: any;
  setTableData: any;
}) {
  const { selectedRows, toggleRowsSelection, resetSelectedRows } = useMultiRowSelection();

  const popupInfo = {
    url: PathConstants.Call.CreateConsultation,
    windowName: "상담생성",
    windowFeatures: "width=1066,height=1000,scrollbars=yes,resizable=yes",
  };

  const { mutate: downloadExcel } = useDataManageExcelDownload();

  // 엑셀 다운로드
  const onExcelDownload = () => {
    const idxRemove = tableData.headers.filter((key) => key !== "idx");
    const headerObj = idxRemove.reduce((acc, cur) => {
      acc[cur] = cur;
      return acc;
    }, {});

    const newData = tableData.data.map(({ idx, ...rest }) => rest);
    newData.unshift(headerObj);
    //console.log("확인:", { body: newData });
    downloadExcel({ body: newData });
  };

  // 숨기기
  const onDelete = () => {
    console.log("삭제 대상:", Array.from(selectedRows));
    const data = filterDataByValues({
      data: tableData.data,
      key: "idx",
      values: Array.from(selectedRows),
    });
    
    //tableData.data에서 data에 있는 내용을 삭제
    const result = tableData.data.filter((item) => {
      return !data.some((d) => d.idx === item.idx);
    });
    console.log("삭제 후 데이터:", result);
    setTableData({ ...tableData, data: result });
  };

  useEffect(() => {
    resetSelectedRows();
  }, [tableData]);

  useEffect(() => {
    console.log("선택된 행:", selectedRows);
  }, [selectedRows]);
  

  return (
    <Stack width={"100%"} height={"100%"} gap={1}>
      <GrayBox gap={1}>
        <SearchInput {...reigister("searchKeywordCust")} />
        <BasicButton
          sx={{ marginLeft: "auto" }}
          onClick={() => {
            openPopup({
              url: popupInfo.url,
              windowName: popupInfo.windowName,
              windowFeatures: popupInfo.windowFeatures,
            });
          }}
        >
          상담생성
        </BasicButton>
        <BasicButton onClick={onExcelDownload}>엑셀 다운로드</BasicButton>
        <BasicButton onClick={onDelete}>숨기기</BasicButton>
      </GrayBox>
      <TableBox>
        <TableBox.Inner>
          {tableData?.data ? (
            <CheckboxTable
              data={tableData?.data}
              selectedRows={selectedRows}
              toggleRowsSelection={toggleRowsSelection}

            >
              <CheckboxTable.Thead>
                <CheckboxTable.Tr>
                  <CheckboxTable.CheckboxTh keyName="idx" />
                  {tableData?.headers?.map((header) =>
                    header === "idx" ? null : (
                      <CheckboxTable.Th style={{ whiteSpace: "nowrap", maxWidth: "100%" }} key={header}>{header}</CheckboxTable.Th>
                    )
                  )}
                </CheckboxTable.Tr>
              </CheckboxTable.Thead>
              <CheckboxTable.Tbody>
                {tableData?.data?.map((row, rowIndex) => {
                  return (
                    <CheckboxTable.Tr key={rowIndex}>
                      <CheckboxTable.CheckboxTd item={row} keyName="idx" />
                      {Object.entries(row)
                        .filter(([key]) => key !== "idx")
                        .map(([, value], index) => {
                          return (
                            <CheckboxTable.Td style={{ whiteSpace: "nowrap", maxWidth: "100%" }} key={index}>
                              {String(value)}
                            </CheckboxTable.Td>
                          );
                        })}
                    </CheckboxTable.Tr>
                  );
                })}
              </CheckboxTable.Tbody>
            </CheckboxTable>
          ) : (
            <></>
          )}
        </TableBox.Inner>
      </TableBox>
    </Stack>
  );
}
