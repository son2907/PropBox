import { Box, IconButton, Pagination, Stack, Typography } from "@mui/material";
import GroupInfo from "../../CustomerManagement/Registration/GroupInfo";
import GrayBox from "../../../components/Box/GrayBox";
import SearchInput from "../../../components/Input/SearchInput";
import { BasicButton } from "../../../components/Button";
import LabelTypo from "../../../components/Typography/LabelTypo";
import BasicInput from "../../../components/Input/BasicInput";
import { Select } from "../../../components/Select";
import { selectTestData, tableTestData } from "../../../utils/testData";
import useSelect from "../../../hooks/useSelect";
import CustomerInfo from "../../CustomerManagement/Registration/CustomerInfo";
import { useState } from "react";
import PathConstants from "../../../routers/path";
import { openPopup } from "../../../utils/openPopup";
import TableBox from "../../../components/Box/TableBox";
import BasicTable from "../../../components/Table/BasicTable";
import { useSingleRowSelection } from "../../../hooks/useSingleRowSelection";
import { usePagination } from "../../../hooks/usePagination";
import TableSelect from "../../../components/Select/TableSelect";
import { RiDeleteBinLine } from "react-icons/ri";
import CheckboxTable from "../../../components/Table/CheckboxTable";
import { useMultiRowSelection } from "../../../hooks/useMultiRowSelection";
import { BiChevronLeft } from "react-icons/bi";
import Calendar from "../../../components/Calendar/Calendar";
import SelectInput from "@mui/material/Select/SelectInput";

export default function LocalmemberManagement() {
  const { selectListData, selectValue, handleChange } = useSelect(
    selectTestData,
    "value",
    "data"
  );
  const [selectedAge, setSelectedAge] = useState<number | null>(null);

  //useMultiRowSelection 분리해서 각 테이블에 독립적으로 selectedRows와 toggleRowsSelection을 전달하여 동작이 분리되도록 설정.
  // 사용자 리스트 - 선택 상태 관리
  const {
    selectedRow: userSelectedRow,
    toggleRowSelection: toggleUserRowSelection,
  } = useSingleRowSelection();

  // 현장 리스트 - 선택 상태 관리
  const {
    selectedRow: localSelectedRow,
    toggleRowSelection: toggleLocalRowSelection,
  } = useSingleRowSelection();

  // 현장 허가 솔루션 - 선택 상태 관리
  const {
    selectedRows: localUseSelectedRows,
    toggleRowsSelection: toggleLocalUseRowsSelection,
  } = useMultiRowSelection();

  // 현장 미허가 솔루션 - 선택 상태 관리
  const {
    selectedRows: localUnuseSelectedRows,
    toggleRowsSelection: toggleLocalUnuseRowsSelection,
  } = useMultiRowSelection();

  // usePagination에
  const { currentPage, onChangePage } = usePagination();

  //현장 추가 팝업
  const localRegistration = {
    url: PathConstants.System.LocalRegistration,
    windowName: "현장 등록 및 수정",
    windowFeatures: "width=500,height=500,scrollbars=yes,resizable=yes",
  };

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const { selectValue: s_1, handleChange: o_1 } = useSelect(
    selectTestData,
    "value",
    "data"
  );

  return (
    <>
      {/* 사용자 리스트 테이블 - 상단 테이블 */}
      <Stack width={"100%"} height={"100%"} gap={1} marginBottom={1}>
        <GrayBox gap={2} width={"100%"}>
          <SearchInput placeholder="사용자이름 검색" />
          <SearchInput placeholder="현장 검색" />
        </GrayBox>
        <Stack width={"100%"} spacing={1} height={"100%"}>
          <Stack direction={"row"} height={"50%"}>
            {/* 사용자 정보 리스트 */}
            <Stack bgcolor={"white"} marginLeft={1} width={"30%"}>
              <TableBox>
                <TableBox.Inner>
                  <BasicTable data={tableTestData}>
                    <BasicTable.Th>사용자ID</BasicTable.Th>
                    <BasicTable.Th>사용자이름</BasicTable.Th>
                    <BasicTable.Tbody>
                      {tableTestData.map((item, index) => {
                        return (
                          <BasicTable.Tr
                            key={index}
                            isClicked={userSelectedRow.has(item.id)}
                            onClick={() => toggleUserRowSelection(item.id)}
                          >
                            <BasicTable.Td>{item.phone}</BasicTable.Td>
                            <BasicTable.Td>{item.name}</BasicTable.Td>
                          </BasicTable.Tr>
                        );
                      })}
                    </BasicTable.Tbody>
                  </BasicTable>
                </TableBox.Inner>
              </TableBox>
            </Stack>
            <Stack bgcolor={"white"} marginLeft={1} width={"70%"}>
              <TableBox>
                <TableBox.Inner>
                  <BasicTable data={tableTestData}>
                    <BasicTable.Th>현장번호</BasicTable.Th>
                    <BasicTable.Th>현장이름</BasicTable.Th>
                    <BasicTable.Th>사용기간</BasicTable.Th>
                    <BasicTable.Tbody>
                      {tableTestData.map((item, index) => {
                        return (
                          <BasicTable.Tr
                            key={index}
                            isClicked={localSelectedRow.has(item.id)}
                            onClick={() => toggleLocalRowSelection(item.id)}
                          >
                            <BasicTable.Td>{item.phone}</BasicTable.Td>
                            <BasicTable.Td>{item.name}</BasicTable.Td>
                            <BasicTable.Td>{item.hireDate}</BasicTable.Td>
                          </BasicTable.Tr>
                        );
                      })}
                    </BasicTable.Tbody>
                  </BasicTable>
                </TableBox.Inner>
              </TableBox>
            </Stack>
          </Stack>

          <Stack
            gap={1}
            width={"100%"}
            bgcolor={"white"}
            direction="row"
            height={"45%"} // 화면 크기에 맞추기
            overflow="hidden"
          >
            {/* 사용자 허가 솔루션 테이블 */}
            <Stack
              width={"70%"}
              height="100%"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <GrayBox style={{ flexShrink: 0, padding: "8px 16px" }}>
                <Typography fontWeight={"bold"}>현장 구성원</Typography>
              </GrayBox>
              <div style={{ flex: 1, overflow: "auto" }}>
                <TableBox>
                  <TableBox.Inner>
                    <CheckboxTable
                      data={tableTestData}
                      selectedRows={localUseSelectedRows}
                      toggleRowsSelection={toggleLocalUseRowsSelection}
                    >
                      <CheckboxTable.Thead>
                        <CheckboxTable.Tr>
                          <CheckboxTable.CheckboxTh keyName="id" />
                          <CheckboxTable.Th>구성원ID</CheckboxTable.Th>
                          <CheckboxTable.Th>구성원이름</CheckboxTable.Th>
                          <CheckboxTable.Th>직책</CheckboxTable.Th>
                        </CheckboxTable.Tr>
                      </CheckboxTable.Thead>
                      <CheckboxTable.Tbody>
                        {tableTestData.map((item) => (
                          <CheckboxTable.Tr key={item.id} id={item.id}>
                            <CheckboxTable.CheckboxTd
                              item={item}
                              keyName="id"
                            />
                            <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.phone}</CheckboxTable.Td>
                            <CheckboxTable.Td>
                              <Select
                                sx={{ width: "200px" }}
                                selectData={selectTestData}
                                value={s_1}
                                onChange={o_1}
                              />
                            </CheckboxTable.Td>
                          </CheckboxTable.Tr>
                        ))}
                      </CheckboxTable.Tbody>
                    </CheckboxTable>
                  </TableBox.Inner>
                </TableBox>
              </div>
              <GrayBox style={{ flexShrink: 0, padding: "8px 16px" }}>
                <BasicButton sx={{ marginLeft: "auto" }}>새로고침</BasicButton>
              </GrayBox>
            </Stack>
            <Stack
              width={"3%"}
              bgcolor={"white"}
              justifyContent={"space-between"}
              justifyItems={"center"}
            >
              <BasicButton
                sx={{
                  backgroundColor: "primary.A100",
                  height: "200px",
                  width: "5px",
                }}
              >
                <BiChevronLeft size={"24px"} />
              </BasicButton>
              <BasicButton
                sx={{
                  backgroundColor: "primary.A100",
                  height: "200px",
                  width: "5px",
                }}
              >
                <BiChevronLeft size={"24px"} />
              </BasicButton>
            </Stack>
            {/* 사용자 미허가 솔루션 테이블 */}
            <Stack
              width={"30%"}
              height="100%"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <GrayBox style={{ flexShrink: 0, padding: "8px 16px" }}>
                <Typography fontWeight={"bold"}>구성원</Typography>
              </GrayBox>
              <div style={{ flex: 1, overflow: "auto" }}>
                <TableBox>
                  <TableBox.Inner>
                    <CheckboxTable
                      data={tableTestData}
                      selectedRows={localUnuseSelectedRows}
                      toggleRowsSelection={toggleLocalUnuseRowsSelection}
                    >
                      <CheckboxTable.Thead>
                        <CheckboxTable.Tr>
                          <CheckboxTable.CheckboxTh keyName="id" />
                          <CheckboxTable.Th>구성원ID</CheckboxTable.Th>
                          <CheckboxTable.Th>구성원이름</CheckboxTable.Th>
                        </CheckboxTable.Tr>
                      </CheckboxTable.Thead>

                      <CheckboxTable.Tbody>
                        {tableTestData.map((item) => (
                          <CheckboxTable.Tr key={item.id} id={item.id}>
                            <CheckboxTable.CheckboxTd
                              item={item}
                              keyName="id"
                            />
                            <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.phone}</CheckboxTable.Td>
                          </CheckboxTable.Tr>
                        ))}
                      </CheckboxTable.Tbody>
                    </CheckboxTable>
                  </TableBox.Inner>
                </TableBox>
              </div>
              <GrayBox style={{ flexShrink: 0, padding: "8px 16px" }}>
                <BasicButton sx={{ marginLeft: "auto" }}>새로고침</BasicButton>
              </GrayBox>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
