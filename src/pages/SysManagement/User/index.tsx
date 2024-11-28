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
import { BiChevronLeft } from "react-icons/bi"

export default function Registration() {
  const { selectValue, handleChange } = useSelect();

  const [selectedAge, setSelectedAge] = useState<number | null>(null);

  //useMultiRowSelection 분리해서 각 테이블에 독립적으로 selectedRows와 toggleRowsSelection을 전달하여 동작이 분리되도록 설정.
  // 사용자 허가 솔루션 - 선택 상태 관리
  const {
    selectedRows: authorizedSelectedRows,
    toggleRowsSelection: toggleAuthorizedRowsSelection,
  } = useMultiRowSelection();

  // 사용자 미허가 솔루션 - 선택 상태 관리
  const {
    selectedRows: unauthorizedSelectedRows,
    toggleRowsSelection: toggleUnauthorizedRowsSelection,
  } = useMultiRowSelection();

  const { selectedRow, toggleRowSelection } = useSingleRowSelection(); // 행 단일 선택, 배경색 변함 

  // usePagination에
  const { currentPage, onChangePage } = usePagination();

  //사용자 추가 팝업
  const uploadUser = {
    url: PathConstants.System.UserUpload,
    windowName: "고객엑셀등록",
    windowFeatures: "width=500,height=500,scrollbars=yes,resizable=yes",
  };

  return (
    <>
      {/* 사용자 리스트 테이블 - 상단 테이블 */}
      <Stack width={"100%"} height={"100%"} gap={1} marginBottom={1}>
        <GrayBox gap={2} justifyContent="space-between">
          <Stack direction="row" gap={1}>
            <SearchInput placeholder="사용자이름 검색" />
          </Stack>
          <Stack direction="row" gap={1}>
            <BasicButton
              onClick={() => {
                openPopup({
                  url: uploadUser.url,
                  windowName: uploadUser.windowName,
                  windowFeatures: uploadUser.windowFeatures,
                });
              }}
            >사용자추가</BasicButton>
          </Stack>
        </GrayBox>
        <Stack width={"100%"} spacing={1} height={"100%"}>
          {/* 사용자 정보 리스트 */}
          <Stack bgcolor={"white"} marginLeft={1} width={"100%"} height={"50%"}>
            <TableBox>
              <TableBox.Inner>
                <BasicTable data={tableTestData}>
                  <BasicTable.Th>사용자ID</BasicTable.Th>
                  <BasicTable.Th>사용자이름</BasicTable.Th>
                  <BasicTable.Th>휴대전화</BasicTable.Th>
                  <BasicTable.Th>PREFIX</BasicTable.Th>
                  <BasicTable.Th>회사이름</BasicTable.Th>
                  <BasicTable.Th>사업자번호</BasicTable.Th>
                  <BasicTable.Th>사용여부</BasicTable.Th>
                  <BasicTable.Th>삭제</BasicTable.Th>
                  <BasicTable.Th>수정</BasicTable.Th>
                  <BasicTable.Tbody>
                    {tableTestData.map((item, index) => {
                      return (
                        <BasicTable.Tr
                          key={index}
                          isClicked={selectedRow.has(item.id)}
                          onClick={() => toggleRowSelection(item.id)}
                        >
                          <BasicTable.Td>{item.phone}</BasicTable.Td>
                          <BasicTable.Td>{item.name}</BasicTable.Td>
                          <BasicTable.Td>{item.age}</BasicTable.Td>
                          <BasicTable.Td>{item.job}</BasicTable.Td>
                          <BasicTable.Td>{item.job}</BasicTable.Td>
                          <BasicTable.Td>{item.job}</BasicTable.Td>
                          <BasicTable.Td>{item.job}</BasicTable.Td>
                          <BasicTable.Td>
                            <IconButton>
                              <RiDeleteBinLine color="#f4475f" />
                            </IconButton>
                          </BasicTable.Td>
                          <BasicTable.Td>
                            <BasicButton
                              onClick={() => {
                                openPopup({
                                  url: uploadUser.url,
                                  windowName: uploadUser.windowName,
                                  windowFeatures: uploadUser.windowFeatures,
                                });
                              }}
                            >수정</BasicButton>
                          </BasicTable.Td>
                        </BasicTable.Tr>
                      );
                    })}
                  </BasicTable.Tbody>
                </BasicTable>
              </TableBox.Inner>
            </TableBox>
          </Stack>
          <Stack
            gap={1}
            width={"100%"}
            bgcolor={"white"}
            direction="row"
            height={"45%"} // 화면 크기에 맞추기
            overflow="hidden">
            {/* 사용자 허가 솔루션 테이블 */}
            <Stack
              width={"70%"}
              height="100%"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <GrayBox style={{ flexShrink: 0, padding: "8px 16px" }}>
                <Typography fontWeight={"bold"}>사용자 허가 솔루션</Typography>
              </GrayBox>
              <div style={{ flex: 1, overflow: "auto" }}>
                <TableBox>
                  <TableBox.Inner>
                    <CheckboxTable
                      data={tableTestData}
                      selectedRows={authorizedSelectedRows}
                      toggleRowsSelection={toggleAuthorizedRowsSelection}
                    >
                      <CheckboxTable.Thead>
                        <CheckboxTable.Tr>
                          <CheckboxTable.CheckboxTh />
                          <CheckboxTable.Th>솔루션ID</CheckboxTable.Th>
                          <CheckboxTable.Th>솔루션명</CheckboxTable.Th>
                          <CheckboxTable.Th>구분</CheckboxTable.Th>
                          <CheckboxTable.Th colSpan={3}>
                            라이선스
                          </CheckboxTable.Th>
                        </CheckboxTable.Tr>
                        <CheckboxTable.Tr>
                          <CheckboxTable.Th> </CheckboxTable.Th>
                          <CheckboxTable.Th> </CheckboxTable.Th>
                          <CheckboxTable.Th> </CheckboxTable.Th>
                          <CheckboxTable.Th> </CheckboxTable.Th>
                          <CheckboxTable.Th>전체</CheckboxTable.Th>
                          <CheckboxTable.Th>사용</CheckboxTable.Th>
                          <CheckboxTable.Th>잔여</CheckboxTable.Th>
                        </CheckboxTable.Tr>
                      </CheckboxTable.Thead>
                      <CheckboxTable.Tbody>
                        {tableTestData.map((item) => (
                          <CheckboxTable.Tr key={item.id} id={item.id}>
                            <CheckboxTable.CheckboxTd item={item} />
                            <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.phone}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.job}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.address}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.age}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.age}</CheckboxTable.Td>
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
            <Stack width={"3%"} bgcolor={"white"} justifyContent={"space-between"} justifyItems={"center"}>
              <BasicButton sx={{ backgroundColor: "primary.A100", height: "200px", width: "5px" }}>
                <BiChevronLeft size={"24px"} />
              </BasicButton>
              <BasicButton sx={{ backgroundColor: "primary.A100", height: "200px", width: "5px" }}>
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
                <Typography fontWeight={"bold"}>사용자 미허가 솔루션</Typography>
              </GrayBox>
              <div style={{ flex: 1, overflow: "auto" }}>
                <TableBox>
                  <TableBox.Inner>
                    <CheckboxTable
                      data={tableTestData}
                      selectedRows={unauthorizedSelectedRows}
                      toggleRowsSelection={toggleUnauthorizedRowsSelection}
                    >
                      <CheckboxTable.Thead>
                        <CheckboxTable.Tr>
                          <CheckboxTable.CheckboxTh />
                          <CheckboxTable.Th>솔루션ID</CheckboxTable.Th>
                          <CheckboxTable.Th>솔루션이름</CheckboxTable.Th>
                          <CheckboxTable.Th >구분</CheckboxTable.Th>
                        </CheckboxTable.Tr>
                      </CheckboxTable.Thead>

                      <CheckboxTable.Tbody>
                        {tableTestData.map((item) => (
                          <CheckboxTable.Tr key={item.id} id={item.id}>
                            <CheckboxTable.CheckboxTd item={item} />
                            <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.phone}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.job}</CheckboxTable.Td>
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
