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

export default function CustomerData({ reigister, tableData }) {
  const { selectedRows, toggleRowsSelection } = useMultiRowSelection();

  const popupInfo = {
    url: PathConstants.Call.CreateConsultation,
    windowName: "상담생성",
    windowFeatures: "width=1066,height=1000,scrollbars=yes,resizable=yes",
  };

  const { mutate: downloadExcel } = useDataManageExcelDownload();

  // 엑셀 다운로드
  const onExcelDownload = () => {
    const newData = tableData.data.map(({ idx, ...rest }) => rest);
    downloadExcel({ body: newData });
  };

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
        <BasicButton>숨기기</BasicButton>
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
                        .map(([_, value], index) => {
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
