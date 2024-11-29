import { Box, Stack } from "@mui/material";
import useTabs from "../../../hooks/useTabs";
import GrayBox from "../../../components/Box/GrayBox";
import SearchInput from "../../../components/Input/SearchInput";
import { BasicButton, IconButton } from "../../../components/Button";
import TableBox from "../../../components/Box/TableBox";
import BasicTable from "../../../components/Table/BasicTable";
import { useSingleRowSelection } from "../../../hooks/useSingleRowSelection";
import { useMultiRowSelection } from "../../../hooks/useMultiRowSelection";
import { tableTestData, selectTestData } from "../../../utils/testData";
import SearchResult from "../../../components/Table/SearchResult";
import { Select } from "../../../components/Select";
import useSelect from "../../../hooks/useSelect";
import Calendar from "../../../components/Calendar/Calendar";
import { useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { FaArrowDown } from "react-icons/fa6";
import CheckboxTable from "../../../components/Table/CheckboxTable";
import { BiChevronLeft } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import PathConstants from "../../../routers/path";
import { openPopup } from "../../../utils/openPopup";

export default function PhoneManagement() {

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

  // 회사 리스트 - 선택 상태 관리
  const {
    selectedRow: companySelectedRow,
    toggleRowSelection: toggleCompanyRowSelection,
  } = useSingleRowSelection();

  // 현장 허가 솔루션 - 선택 상태 관리
  const {
    selectedRows: useSelectedRows,
    toggleRowsSelection: toggleUseRowsSelection,
  } = useMultiRowSelection();

  // 현장 미허가 솔루션 - 선택 상태 관리
  const {
    selectedRows: localUnuseSelectedRows,
    toggleRowsSelection: toggleLocalUnuseRowsSelection,
  } = useMultiRowSelection();

  const { selectValue, handleChange } = useSelect()

  const [date, setDate] = useState<Date>(new Date());

  //   수신동의 고객 select
  const { selectValue: s_1, handleChange: o_1 } = useSelect();

  //전화기 추가 팝업
  const phoneAddPopup = {
    url: PathConstants.System.PhoneAdd,
    windowName: "전화기 추가",
    windowFeatures: "width=500,height=500,scrollbars=yes,resizable=yes",
  };

  return (
    <>
      <Stack width={"100%"} height={"100%"} marginBottom={1}>
        <GrayBox gap={2} justifyContent={"space-between"}>
          <SearchInput></SearchInput>
          <BasicButton
            onClick={() => {
              openPopup({
                url: phoneAddPopup.url,
                windowName: phoneAddPopup.windowName,
                windowFeatures: phoneAddPopup.windowFeatures,
              });
            }}
          >전화기추가</BasicButton>
        </GrayBox>
        <Stack height={"100%"} direction={"row"}>
          {/* 사용자 및 회사 정보 */}
          <Stack width={"20%"} overflow={"auto"} height={"96%"}>
            <TableBox>
              <TableBox.Inner>
                <BasicTable data={tableTestData}>
                  <BasicTable.Th>사용자ID</BasicTable.Th>
                  <BasicTable.Th>회사이름</BasicTable.Th>
                  <BasicTable.Th>등록일자</BasicTable.Th>
                  <BasicTable.Th>전화기수</BasicTable.Th>
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
                          <BasicTable.Td>{item.hireDate}</BasicTable.Td>
                          <BasicTable.Td>{item.age}</BasicTable.Td>
                        </BasicTable.Tr>
                      );
                    })}
                  </BasicTable.Tbody>
                </BasicTable>
              </TableBox.Inner>
            </TableBox>
            <SearchResult total={100} />
          </Stack>
          {/* 회사 및 현장 정보 */}
          <Stack width={"20%"} padding={1} height={"96%"}>
            <Stack height={"50%"} gap={1}>
              <Stack width={"50%"}>
                <SearchInput placeholder="회사이름 검색"></SearchInput>
              </Stack>
              <TableBox>
                <TableBox.Inner>
                  <BasicTable data={tableTestData}>
                    <BasicTable.Th>회사이름</BasicTable.Th>
                    <BasicTable.Th>현장이름</BasicTable.Th>
                    <BasicTable.Th>전화기수</BasicTable.Th>
                    <BasicTable.Tbody>
                      {tableTestData.map((item, index) => {
                        return (
                          <BasicTable.Tr
                            key={index}
                            isClicked={localSelectedRow.has(item.id)}
                            onClick={() => toggleLocalRowSelection(item.id)}
                          >
                            <BasicTable.Td>{item.name}</BasicTable.Td>
                            <BasicTable.Td>{item.hireDate}</BasicTable.Td>
                            <BasicTable.Td>{item.age}</BasicTable.Td>
                          </BasicTable.Tr>
                        );
                      })}
                    </BasicTable.Tbody>
                  </BasicTable>
                </TableBox.Inner>
              </TableBox>
            </Stack>
            <Stack height={"50%"} gap={1} marginBottom={1}>
              <Stack width={"50%"}>
                <SearchInput placeholder="회사이름 검색"></SearchInput>
              </Stack>
              <TableBox>
                <TableBox.Inner>
                  <BasicTable data={tableTestData}>
                    <BasicTable.Th>회사이름</BasicTable.Th>
                    <BasicTable.Th>현장이름</BasicTable.Th>
                    <BasicTable.Th>구성원이름</BasicTable.Th>
                    <BasicTable.Tbody>
                      {tableTestData.map((item, index) => {
                        return (
                          <BasicTable.Tr
                            key={index}
                            isClicked={companySelectedRow.has(item.id)}
                            onClick={() => toggleCompanyRowSelection(item.id)}
                          >
                            <BasicTable.Td>{item.name}</BasicTable.Td>
                            <BasicTable.Td>{item.hireDate}</BasicTable.Td>
                            <BasicTable.Td>{item.age}</BasicTable.Td>
                          </BasicTable.Tr>
                        );
                      })}
                    </BasicTable.Tbody>
                  </BasicTable>
                </TableBox.Inner>
              </TableBox>
            </Stack>
          </Stack>
          {/* 전화기 리스트 */}
          <Stack height={"96%"} width={"100%"} direction={"row"} gap={1} sx={{ minWidth: '800px', overflowX: 'auto' }}>
            <Stack width={"30%"} justifyContent={"start"} overflow={"hidden"}>
              <GrayBox>
                <Stack gap={1} direction={"row"}>
                  <Box width={"200px"}><Calendar selectedDate={date} setSelectedDate={setDate} /></Box>
                  <BasicButton>
                    <MdArrowBackIos />
                    이전
                  </BasicButton>
                  <BasicButton>
                    <MdArrowForwardIos />
                    이후
                  </BasicButton>
                  <BasicButton>
                    <FaArrowDown />
                    오늘
                  </BasicButton>
                </Stack>
              </GrayBox>
              <Box overflow={"auto"}>
                <TableBox>
                  <TableBox.Inner>
                    <CheckboxTable
                      data={tableTestData}
                      selectedRows={useSelectedRows}
                      toggleRowsSelection={toggleUseRowsSelection}
                    >
                      <CheckboxTable.Thead>
                        <CheckboxTable.Tr>
                          <CheckboxTable.CheckboxTh />
                          <CheckboxTable.Th>구분</CheckboxTable.Th>
                          <CheckboxTable.Th>전화번호</CheckboxTable.Th>
                          <CheckboxTable.Th >시작일</CheckboxTable.Th>
                          <CheckboxTable.Th >종료일</CheckboxTable.Th>
                          <CheckboxTable.Th >삭제</CheckboxTable.Th>
                        </CheckboxTable.Tr>
                      </CheckboxTable.Thead>

                      <CheckboxTable.Tbody>
                        {tableTestData.map((item) => (
                          <CheckboxTable.Tr key={item.id} id={item.id}>
                            <CheckboxTable.CheckboxTd item={item} />
                            <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.phone}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.job}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.job}</CheckboxTable.Td>
                            <CheckboxTable.Td>
                              <IconButton color="error">
                                <RiDeleteBinLine />
                              </IconButton>
                            </CheckboxTable.Td>

                          </CheckboxTable.Tr>
                        ))}
                      </CheckboxTable.Tbody>
                    </CheckboxTable>
                  </TableBox.Inner>
                </TableBox>
              </Box>
              <SearchResult total={100} />
            </Stack>
            <Stack width={"3%"} bgcolor={"white"} justifyContent={"space-between"} justifyItems={"center"}>
              <BasicButton sx={{ backgroundColor: "primary.A100", height: "200px", width: "5px" }}>
                <BiChevronLeft size={"24px"} />
              </BasicButton>
              <BasicButton sx={{ backgroundColor: "primary.A100", height: "200px", width: "5px" }}>
                <BiChevronLeft size={"24px"} />
              </BasicButton>
            </Stack>
            <Stack width={"30%"} justifyContent={"start"} overflow={"hidden"} marginLeft={1}>
              <GrayBox>
                <Stack gap={1} direction={"row"}>
                  <Select
                    sx={{ width: "200px" }}
                    selectData={selectTestData}
                    value={s_1}
                    onChange={o_1}
                  />
                  <SearchInput></SearchInput>
                </Stack>
              </GrayBox>
              <Box overflow={"auto"}>
                <TableBox>
                  <TableBox.Inner>
                    <CheckboxTable
                      data={tableTestData}
                      selectedRows={useSelectedRows}
                      toggleRowsSelection={toggleUseRowsSelection}
                    >
                      <CheckboxTable.Thead>
                        <CheckboxTable.Tr>
                          <CheckboxTable.CheckboxTh />
                          <CheckboxTable.Th>구분</CheckboxTable.Th>
                          <CheckboxTable.Th>전화번호</CheckboxTable.Th>
                          <CheckboxTable.Th >할당여부</CheckboxTable.Th>
                          <CheckboxTable.Th >할당된현장명</CheckboxTable.Th>
                        </CheckboxTable.Tr>
                      </CheckboxTable.Thead>

                      <CheckboxTable.Tbody>
                        {tableTestData.map((item) => (
                          <CheckboxTable.Tr key={item.id} id={item.id}>
                            <CheckboxTable.CheckboxTd item={item} />
                            <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.phone}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.job}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.job}</CheckboxTable.Td>
                          </CheckboxTable.Tr>
                        ))}
                      </CheckboxTable.Tbody>
                    </CheckboxTable>
                  </TableBox.Inner>
                </TableBox>
              </Box>
              <SearchResult total={100} />
            </Stack>
            <Stack width={"30%"} overflow={"hidden"} height={"100%"} >
              <GrayBox>
                <Stack gap={1} direction={"row"}>
                  <Box width={"200px"}><Calendar selectedDate={date} setSelectedDate={setDate} /></Box>
                  <BasicButton>
                    <MdArrowBackIos />
                    이전
                  </BasicButton>
                  <BasicButton>
                    <MdArrowForwardIos />
                    이후
                  </BasicButton>
                  <BasicButton>
                    <FaArrowDown />
                    오늘
                  </BasicButton>
                </Stack>
              </GrayBox>
              <Box overflow={"auto"}>
                <TableBox>
                  <TableBox.Inner>
                    <BasicTable data={tableTestData}>
                      <BasicTable.Th>구분</BasicTable.Th>
                      <BasicTable.Th>전화번호</BasicTable.Th>
                      <BasicTable.Th>시작일</BasicTable.Th>
                      <BasicTable.Th>종료일</BasicTable.Th>
                      <BasicTable.Th>삭제</BasicTable.Th>
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
                              <BasicTable.Td>{item.hireDate}</BasicTable.Td>
                              <BasicTable.Td>{item.age}</BasicTable.Td>
                              <BasicTable.Td>
                                <IconButton color="error">
                                  <RiDeleteBinLine />
                                </IconButton>
                              </BasicTable.Td>
                            </BasicTable.Tr>
                          );
                        })}
                      </BasicTable.Tbody>
                    </BasicTable>
                  </TableBox.Inner>
                </TableBox>
              </Box>
            </Stack>
            <Stack width={"3%"} bgcolor={"white"} justifyContent={"space-between"} justifyItems={"center"}>
              <BasicButton sx={{ backgroundColor: "primary.A100", height: "200px", width: "5px" }}>
                <BiChevronLeft size={"24px"} />
              </BasicButton>
              <BasicButton sx={{ backgroundColor: "primary.A100", height: "200px", width: "5px" }}>
                <BiChevronLeft size={"24px"} />
              </BasicButton>
            </Stack>
            <Stack width={"30%"} overflow={"hidden"} height={"100%"} marginLeft={1}>
              <Stack gap={1} direction={"row"}>
                <Select
                  sx={{ width: "200px" }}
                  selectData={selectTestData}
                  value={s_1}
                  onChange={o_1}
                />
                <SearchInput></SearchInput>
              </Stack>
              <Box overflow={"auto"}>
                <TableBox>
                  <TableBox.Inner>
                    <BasicTable data={tableTestData}>
                      <BasicTable.Th>구분</BasicTable.Th>
                      <BasicTable.Th>전화번호</BasicTable.Th>
                      <BasicTable.Th>할당여부</BasicTable.Th>
                      <BasicTable.Th>할당된현장이름</BasicTable.Th>
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
                              <BasicTable.Td>{item.hireDate}</BasicTable.Td>
                              <BasicTable.Td>{item.age}</BasicTable.Td>
                            </BasicTable.Tr>
                          );
                        })}
                      </BasicTable.Tbody>
                    </BasicTable>
                  </TableBox.Inner>
                </TableBox>
              </Box>

              <SearchResult total={100} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
