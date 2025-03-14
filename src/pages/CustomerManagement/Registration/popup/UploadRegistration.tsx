import { Box, Stack } from "@mui/material";
import GrayBox from "../../../../components/Box/GrayBox";
import { BasicButton } from "../../../../components/Button";
import TableBox from "../../../../components/Box/TableBox";
import { tableTestData } from "../../../../utils/testData";
import { useMultiRowSelection } from "../../../../hooks/useMultiRowSelection";
import RowDragTable from "../../../../components/Table/RowDragTable";
import { useEffect, useRef, useState } from "react";
import CheckboxTable from "../../../../components/Table/CheckboxTable";
import SearchResult from "../../../../components/Table/SearchResult";
import { ExcelToTable } from "../../../../utils/ExcelToTable";
import useModal from "../../../../hooks/useModal";
import { ConfirmMultipleDeletionModal } from "../../../../components/Modal/modal/ConfirmMultipleDeletionModal";
import { filterDataByValues } from "../../../../utils/filterDataByValues";

interface Data {
  id: string;
  [key: string]: any;
}

//고객 정보 엑셀 업로드드
export default function UploadRegistration() {

  //고정 헤더 정리
  const [tableHeaderData, setTableHeaderData] = useState([
    {
      id: "1",
      header: "고객이름",
    },
    {
      id: "2",
      header: "휴대전화",
    },
    {
      id: "3",
      header: "일반전화",
    },
    {
      id: "4",
      header: "고객정보",
    },
    {
      id: "5",
      header: "주소",
    },
    {
      id: "6",
      header: "기본정보1",
    },
    {
      id: "7",
      header: "기본정보2",
    },
    {
      id: "8",
      header: "기본정보3",
    },
    {
      id: "9",
      header: "기본정보4",
    },
    {
      id: "10",
      header: "기본정보5",
    },
    {
      id: "11",
      header: "기본정보6",
    },
    {
      id: "12",
      header: "기본정보7",
    },
    {
      id: "13",
      header: "기본정보8",
    },
    {
      id: "14",
      header: "기본정보9",
    },
    {
      id: "15",
      header: "기본정보10",
    },
  ]);

  const { openModal, closeModal } = useModal();

  const {
    selectedRows: ts_1,
    toggleRowsSelection: tt_1,
    resetSelectedRows,
  } = useMultiRowSelection();

  //구분이 기본일 경우 
  const [data, setData] = useState<Data[]>(tableTestData);
  const { selectedRows: s_2, toggleRowsSelection: t_2 } = useMultiRowSelection(); // CheckboxTable

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tableHeader, setTableHeader] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any>([]);

  //업로드하기
  const onClickUpload = () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    const body = {
      testDataList: tableData.map(({ id, ...rest }) => ({
        id,
        testData: tableHeader.map((header) => rest[header] || ""), // 헤더 순서대로 데이터 정렬
      })),
    };

    console.log("엑셀데이터좀 보자", body);
    console.log(tableData)
  };

  //선택한 열 제거
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
    <Stack width={"100%"} height={"100%"} padding={1} bgcolor={"white"} gap={1}>
      <GrayBox justifyContent={"space-between"}>
        <Stack direction={"row"} gap={1}>
          <input
            type="file"
            accept=".xlsx, .xls"
            style={{ display: "none" }}
            id="upload-file"
            ref={fileInputRef} // ref 연결
            // onChange={async (e) => {
            //   try {
            //     const { headers, dataWithId } = await ExcelToTable(e);
            //     setTableHeader(headers);
            //     setTableData(dataWithId);
            //   } catch (error) {
            //     console.error(error);
            //   }
            // }}
            onChange={async (e) => {
              try {
                const { headers, dataWithId } = await ExcelToTable(e);

                // 엑셀 헤더 순서를 유지하면서 설정
                setTableHeader(headers);

                // headers에 맞게 data 정렬
                const orderedData = dataWithId.map((row) => {
                  const orderedRow = { id: row.id }; // ID 유지
                  headers.forEach((header) => {
                    orderedRow[header] = row[header] || ""; // 값이 없으면 빈 값 설정
                  });
                  return orderedRow;
                });

                setTableData(orderedData);
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
          >찾아보기</BasicButton>
          <BasicButton onClick={onClickDelete}>삭제</BasicButton>
        </Stack>
        <BasicButton onClick={onClickUpload}>저장</BasicButton>
      </GrayBox>
      <TableBox gap={1} width={"100%"}>
        <Stack width={"30%"}>
          <TableBox.Inner>
            <RowDragTable
              keyName="id"
              data={tableHeaderData.map((item) => ({
                ...item,
                id: item.id
              }))}
              setData={setTableHeaderData}
              checkbox={false}
            >
              <RowDragTable.Th>엑셀 항목</RowDragTable.Th>
              <RowDragTable.Th>Position</RowDragTable.Th>
              <RowDragTable.Tbody>
                {tableHeaderData.length > 0
                  ? tableHeaderData.map((item, index) => (
                    <RowDragTable.Tr key={index} id={item.id}>
                      <RowDragTable.Td>{item.header}</RowDragTable.Td>
                      <RowDragTable.Td>{index + 1}</RowDragTable.Td>
                    </RowDragTable.Tr>
                  ))
                  : []}
              </RowDragTable.Tbody>
            </RowDragTable>
          </TableBox.Inner>
        </Stack>
        <Stack width={"70%"}>
          <TableBox.Inner width="100%">
            <CheckboxTable
              data={tableData}
              selectedRows={ts_1}
              toggleRowsSelection={tt_1}
            >
              <CheckboxTable.Thead>
                <CheckboxTable.Tr>
                  <CheckboxTable.CheckboxTh keyName="id" />
                  {tableHeaderData.map((item) => (
                    <CheckboxTable.Th key={item.id} style={{ minWidth: "150px" }}>
                      {item.header}
                    </CheckboxTable.Th>
                  ))}
                </CheckboxTable.Tr>
              </CheckboxTable.Thead>

              <CheckboxTable.Tbody>
                {tableData.map((row, rowIndex) => (
                  <CheckboxTable.Tr key={rowIndex} id={row.id}>
                    <CheckboxTable.CheckboxTd item={row} keyName="id" />
                    {tableHeaderData.map((headerItem, cellIndex) => (
                      <CheckboxTable.Td key={cellIndex}>
                        {row[headerItem.header] || ""}
                      </CheckboxTable.Td>
                    ))}
                  </CheckboxTable.Tr>
                ))}
              </CheckboxTable.Tbody>
            </CheckboxTable>
          </TableBox.Inner>
          <SearchResult total={tableData.length} />
        </Stack>
      </TableBox>
    </Stack>
  );
}
