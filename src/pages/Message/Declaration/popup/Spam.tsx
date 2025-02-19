import { Stack, Typography } from "@mui/material";
import GrayBox from "../../../../components/Box/GrayBox";
import { BasicButton } from "../../../../components/Button";
import { Select } from "../../../../components/Select";
import useSelect from "../../../../hooks/useSelect";
import TableBox from "../../../../components/Box/TableBox";
import { useMultiRowSelection } from "../../../../hooks/useMultiRowSelection";
import CheckboxTable from "../../../../components/Table/CheckboxTable";
import { useGetKccGroupList, useKccExcelUpload } from "../../../../api/kcc";
import HardcodingBasicTable from "../../../../components/Table/HardcodingBasicTable";
import { ExcelToTable } from "../../../../utils/excelToTable";
import { useRef, useState } from "react";
import { filterDataByValues } from "../../../../utils/filterDataByValues";
import { useApiRes } from "../../../../utils/useApiRes";
import useModal from "../../../../hooks/useModal";
import { BasicCompletedModl } from "../../../../components/layout/modal/BasicCompletedModl";
import { ConfirmMultipleDeletionModal } from "../../../../components/layout/modal/ConfirmMultipleDeletionModal";

export default function Spam() {
  const {
    selectedRows: ts_1,
    toggleRowsSelection: tt_1,
    resetSelectedRows,
  } = useMultiRowSelection();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tableHeader, setTableHeader] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);

  const { data: groupList } = useGetKccGroupList(); // 그룹 목록

  const {
    selectListData: sd_0,
    selectValue: s_0,
    handleChange: o_0,
  } = useSelect(groupList?.data.contents, "groupNo", "groupNm");

  const { mutate: uploadExcel } = useKccExcelUpload();
  const checkApiFail = useApiRes();
  const { openModal, closeModal } = useModal();

  const onClickUpload = () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;
    uploadExcel(
      {
        requestData: {
          groupNo: s_0,
          mbtlNoPos: 1,
          file: file,
        },
      },
      {
        onSuccess: (res) => {
          console.log("업로드 결과:", res);
          const result = checkApiFail(res);
          if (result.data.message === "SUCCESS") {
            console.log("업로드 성공:", res);
            openModal(BasicCompletedModl, {
              modalId: "excelComplete",
              stack: false,
              onClose: () => closeModal,
            });
          }
        },
      }
    );
  };

  const onClickDelete = () => {
    openModal(ConfirmMultipleDeletionModal, {
      itemCount: ts_1.size,
      modalId: "deleteMsg",
      stack: false, //단일 모달 모드
      onClose: () => closeModal,
      onSubmit: () => {
        const selectedTableData = filterDataByValues({
          data: tableData,
          key: "id",
          values: Array.from(ts_1),
        });
        const filteredTableData = tableData.filter(
          (item) =>
            !new Set(selectedTableData.map((item) => item.id)).has(item.id)
        ); // 전체 배열에서 선택한 아이템 제거
        setTableData(filteredTableData);
      },
    });
  };

  return (
    <Stack width={"100%"} height={"100%"}>
      <GrayBox gap={1}>
        <input
          type="file"
          accept=".xlsx, .xls"
          style={{ display: "none" }}
          id="upload-file"
          ref={fileInputRef} // ref 연결
          onChange={async (e) => {
            try {
              const { headers, dataWithId } = await ExcelToTable(e);
              setTableHeader(headers);
              setTableData(dataWithId);
            } catch (error) {
              console.error(error);
            }
          }}
        />
        <BasicButton
          onClick={() => {
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
              setTableHeader([]);
              setTableData([]);
              resetSelectedRows();
            }
            fileInputRef.current?.click();
          }}
        >
          엑셀불러오기
        </BasicButton>
        <BasicButton sx={{ marginRight: "auto" }} onClick={onClickDelete}>
          삭제
        </BasicButton>

        <Select
          selectData={sd_0}
          value={s_0}
          onChange={o_0}
          sx={{ width: "200px" }}
        />
        <BasicButton onClick={onClickUpload}>저장</BasicButton>
      </GrayBox>
      <TableBox gap={1}>
        <TableBox.Inner width={"40%"} minWidth={"100px"}>
          <HardcodingBasicTable>
            <HardcodingBasicTable.Th>엑셀항목</HardcodingBasicTable.Th>
            <HardcodingBasicTable.Th>칼럼위치</HardcodingBasicTable.Th>

            <HardcodingBasicTable.Tbody>
              <HardcodingBasicTable.Tr>
                <HardcodingBasicTable.Td>스팸</HardcodingBasicTable.Td>
                <HardcodingBasicTable.Td>1</HardcodingBasicTable.Td>
              </HardcodingBasicTable.Tr>
            </HardcodingBasicTable.Tbody>
          </HardcodingBasicTable>
        </TableBox.Inner>
        <Stack width={"60%"} height={"100%"}>
          <TableBox.Inner minWidth={"200px"}>
            <CheckboxTable
              data={tableData}
              selectedRows={ts_1}
              toggleRowsSelection={tt_1}
            >
              <CheckboxTable.Thead>
                <CheckboxTable.Tr>
                  <CheckboxTable.CheckboxTh keyName="id" />
                  {tableHeader.map((item, index) => {
                    return (
                      <CheckboxTable.Th key={index}>{item}</CheckboxTable.Th>
                    );
                  })}
                </CheckboxTable.Tr>
              </CheckboxTable.Thead>
              <CheckboxTable.Tbody>
                {tableData.map((row, rowIndex) => (
                  <CheckboxTable.Tr key={rowIndex} id={row.id}>
                    <CheckboxTable.CheckboxTd item={row} keyName="id" />
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
          <GrayBox>
            <Typography>전체:{tableData.length}</Typography>
          </GrayBox>
        </Stack>
      </TableBox>
    </Stack>
  );
}
