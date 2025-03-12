import { Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import GrayBox from "../../../../components/Box/GrayBox";
import { BasicButton } from "../../../../components/Button";
import useSelect from "../../../../hooks/useSelect";
import { Select } from "../../../../components/Select";
import TableBox from "../../../../components/Box/TableBox";
import RowDragTable from "../../../../components/Table/RowDragTable";
import { useMultiRowSelection } from "../../../../hooks/useMultiRowSelection";
import CheckboxTable from "../../../../components/Table/CheckboxTable";
import { ExcelToTableWithSheet } from "../../../../utils/ExcelToTableWithSheet";
import { filterDataByValues } from "../../../../utils/filterDataByValues";
import useModal from "../../../../hooks/useModal";
import { ConfirmMultipleDeletionModal } from "../../../../components/Modal/modal/ConfirmMultipleDeletionModal";

export default function RegistrationExel() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [tableHeader, setTableHeader] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [sheetNames, setSheetNames] = useState<any>([]);

  const {
    selectListData: sd_0,
    selectValue: s_0,
    handleChange: o_0,
  } = useSelect(sheetNames, "sheetName", "sheetName");

  const { selectedRows, toggleRowsSelection, resetSelectedRows } =
    useMultiRowSelection();
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    setTableData((prevData) =>
      prevData.map((row) => {
        const newRow = { id: row.id }; // 기존 id 유지
        tableHeader.forEach(({ content }) => {
          newRow[content] = row[content];
        });
        return newRow;
      })
    );
  }, [tableHeader]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      ExcelToTableWithSheet(
        file,
        null,
        ({ sheetNames, headers, dataWithId }) => {
          const sheets = sheetNames.map((item) => ({
            id: item,
            sheetName: item,
          }));
          setSheetNames(sheets);

          const result = headers.map((content) => ({
            id: content,
            content: content,
          }));
          setTableHeader(result);
          setTableData(dataWithId);
          event.preventDefault();
          event.stopPropagation();
        },
        (error) => {
          console.error("엑셀 업로드 중 오류가 발생하였습니다.", error);
        }
      );
    }
  };

  const onClickDelete = () => {
    openModal(ConfirmMultipleDeletionModal, {
      itemCount: selectedRows.size,
      modalId: "deleteMsg",
      stack: true, //단일 모달 모드
      onClose: () => closeModal,
      onSubmit: () => {
        const selectedTableData = filterDataByValues({
          data: tableData,
          key: "id",
          values: Array.from(selectedRows),
        });
        const filteredTableData = tableData.filter(
          (item) =>
            !new Set(selectedTableData.map((item) => item.id)).has(item.id)
        );
        setTableData(filteredTableData);
        resetSelectedRows();
      },
    });
  };

  useEffect(() => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;
    ExcelToTableWithSheet(
      file,
      s_0,
      ({ headers, dataWithId }) => {
        const result = headers.map((content) => ({
          id: content,
          content: content,
        }));
        setTableHeader(result);
        setTableData(dataWithId);
      },
      (error) => {
        console.error("엑셀 업로드 중 오류가 발생하였습니다.", error);
      }
    );
  }, [s_0]);

  console.log("tableData:", tableData);

  return (
    <Stack width={"100%"} height={"100%"}>
      <GrayBox gap={1}>
        <input
          type="file"
          accept=".xlsx, .xls"
          style={{ display: "none" }}
          id="upload-file"
          ref={fileInputRef}
          onChange={handleFileChange}
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
          찾아보기
        </BasicButton>
        <Select
          selectData={sd_0}
          value={s_0}
          onChange={o_0}
          sx={{ width: "250px" }}
        />
        <BasicButton sx={{ marginLeft: "auto" }} onClick={onClickDelete}>
          삭제
        </BasicButton>
        <BasicButton>저장</BasicButton>
      </GrayBox>

      <TableBox gap={1} padding={1}>
        <TableBox.Inner width="30%">
          <RowDragTable
            keyName="id"
            checkbox={false}
            data={tableHeader}
            setData={setTableHeader}
          >
            <RowDragTable.Th>엑셀항목</RowDragTable.Th>
            <RowDragTable.Th>칼럼위치</RowDragTable.Th>

            <RowDragTable.Tbody>
              {tableHeader.map((item, index) => (
                <RowDragTable.Tr key={item.id} id={item.id}>
                  <RowDragTable.Td>{item.content}</RowDragTable.Td>
                  <RowDragTable.Td>{index + 1}</RowDragTable.Td>
                </RowDragTable.Tr>
              ))}
            </RowDragTable.Tbody>
          </RowDragTable>
        </TableBox.Inner>
        <Stack width={"70%"} height={"100%"}>
          <TableBox.Inner>
            <CheckboxTable
              data={tableData}
              selectedRows={selectedRows}
              toggleRowsSelection={toggleRowsSelection}
            >
              <CheckboxTable.Thead>
                <CheckboxTable.Tr>
                  <CheckboxTable.CheckboxTh keyName="id" />
                  {tableHeader.map((item, index) => {
                    return (
                      <CheckboxTable.Th key={index}>
                        {item.content}
                      </CheckboxTable.Th>
                    );
                  })}
                </CheckboxTable.Tr>
              </CheckboxTable.Thead>
              <CheckboxTable.Tbody>
                {tableData.map((row, rowIndex) => {
                  console.log(row.id);
                  return (
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
                  );
                })}
              </CheckboxTable.Tbody>
            </CheckboxTable>
          </TableBox.Inner>
          <GrayBox justifyContent={"flex-end"}>
            <Typography>전체 : {tableData.length}</Typography>
          </GrayBox>
        </Stack>
      </TableBox>
    </Stack>
  );
}
