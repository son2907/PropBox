import { Stack, Typography } from "@mui/material";
import GrayBox from "../../../components/Box/GrayBox";
import { Select } from "../../../components/Select";
import SearchInput from "../../../components/Input/SearchInput";
import { BasicButton } from "../../../components/Button";
import CheckboxTable from "../../../components/Table/CheckboxTable";
import TableBox from "../../../components/Box/TableBox";
import { useMultiRowSelection } from "../../../hooks/useMultiRowSelection";
import { openPopup } from "../../../utils/openPopup";
import PathConstants from "../../../routers/path";
import { useDataManageExcelDownload } from "../../../api/dataManage";
import { filterDataByValues } from "../../../utils/filterDataByValues";
import { useEffect } from "react";

export default function ConsultationData({
  register,
  cnsltListData,
  cnsltSelectValue,
  cnsltHandleChange,
  tableData,
  setTableData,
}: {
  register: any;
  cnsltListData: any;
  cnsltSelectValue: any;
  cnsltHandleChange: any;
  tableData: any;
  setTableData: any;
}) {
  const { selectedRows, toggleRowsSelection, resetSelectedRows } =
    useMultiRowSelection();

  const uploadInfo = {
    url: PathConstants.Call.UploadConsultation,
    windowName: "상담등록",
    windowFeatures: "width=1200,height=500,scrollbars=yes,resizable=yes",
  };

  const { mutate: downloadExcel } = useDataManageExcelDownload();

  // 엑셀 다운로드
  const onExcelDownload = () => {
    const newData = tableData.data.map(({ idx, ...rest }) => rest);
    downloadExcel({ body: newData });
  };

  // 숨기기
  const onDelete = () => {
    const data = filterDataByValues({
      data: tableData.data,
      key: "idx",
      values: Array.from(selectedRows),
    });

    //tableData.data에서 data에 있는 내용을 삭제
    const result = tableData.data.filter((item) => {
      return !data.some((d) => d.idx === item.idx);
    });

    setTableData({ ...tableData, data: result });
  };

  useEffect(() => {
    resetSelectedRows();
  }, [tableData]);

  return (
    <Stack width={"100%"} height={"100%"} gap={1}>
      <GrayBox gap={1}>
        <Select
          sx={{ width: "150px" }}
          selectData={cnsltListData}
          value={cnsltSelectValue}
          onChange={cnsltHandleChange}
          placeholder="검색 항목 선택"
        />
        <SearchInput {...register("searchKeyword")} />
        <BasicButton
          sx={{ marginLeft: "auto" }}
          onClick={() => {
            openPopup({
              url: uploadInfo.url,
              windowName: uploadInfo.windowName,
              windowFeatures: uploadInfo.windowFeatures,
            });
          }}
        >
          <Typography>엑셀업로드</Typography>
        </BasicButton>
        <BasicButton onClick={onExcelDownload}>
          <Typography>엑셀 다운로드</Typography>
        </BasicButton>
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
                      <CheckboxTable.Th key={header}>{header}</CheckboxTable.Th>
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
                        .map(([, value], index) => (
                          <CheckboxTable.Td key={index}>
                            {String(value)}
                          </CheckboxTable.Td>
                        ))}
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
