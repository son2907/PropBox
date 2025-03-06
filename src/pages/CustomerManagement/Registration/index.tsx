import { Box, Stack, Typography } from "@mui/material";
import GroupInfo from "./GroupInfo";
import GrayBox from "../../../components/Box/GrayBox";
import SearchInput from "../../../components/Input/SearchInput";
import { BasicButton } from "../../../components/Button";
import LabelTypo from "../../../components/Typography/LabelTypo";
import BasicInput from "../../../components/Input/BasicInput";
import { Select } from "../../../components/Select";
import { selectTestData } from "../../../utils/testData";
import useSelect from "../../../hooks/useSelect";
import CustomerInfo from "./CustomerInfo";
import { useState } from "react";
import PathConstants from "../../../routers/path";
import { openPopup } from "../../../utils/openPopup";
import TableBox from "../../../components/Box/TableBox";
import BasicTable from "../../../components/Table/BasicTable";
import { tableTestData } from "../../../utils/testData";
import { useSingleRowSelection } from "../../../hooks/useSingleRowSelection";
import { Pagination } from "../../../components/Pagination";
import { usePagination } from "../../../hooks/usePagination";
import TableSelect from "../../../components/Select/TableSelect";
import { useTableSelect } from "../../../hooks/useTableSelect";
import CheckboxTable from "../../../components/Table/CheckboxTable";
import { useMultiRowSelection } from "../../../hooks/useMultiRowSelection";

export default function Registration() {

  const [num, setNum] = useState("");

  const { selectListData, selectValue, handleChange } = useSelect(
    selectTestData,
    "value",
    "data"
  );
  const [selectedAge, setSelectedAge] = useState<number | null>(null);

  const { selectedRow, toggleRowSelection } = useSingleRowSelection(); // 행 단일 선택, 배경색 변함

  // usePagination에
  const { currentPage, onChangePage } = usePagination();
  const { countValues, selectValue: s_1, handleChange: h_1 } = useTableSelect();

  const { selectedRows, toggleRowsSelection } = useMultiRowSelection(); // 체크박스는 보통 여러개가 가능하므로 useMultiRowSelection 권장

  //엑셀업로드 팝업 오픈
  const uploadRegistration = {
    url: PathConstants.Customer.RegistrationUpload,
    windowName: "고객엑셀등록",
    windowFeatures: "width=1200,height=500,scrollbars=yes,resizable=yes",
  };

  //고객 그룹관리 팝업 오픈
  const GroupManagement = {
    url: PathConstants.Customer.CustomerGroupManagement,
    windowName: "고객그룹관리",
    windowFeatures: "width=1066,height=1000,scrollbars=yes,resizable=yes",
  };

  return (
    <>
      <Stack width={"100%"} height={"100%"} gap={1} marginBottom={1}>
        <TableBox gap={1}>
          <Stack width={"80%"} height={"100%"} gap={1}>
            <GrayBox gap={2} justifyContent="space-between">
              <Stack direction="row" gap={1}>
                <SearchInput />
                <BasicButton sx={{ color: "root.mainBlue", border: 1 }}>
                  SMS 전송
                </BasicButton>
              </Stack>
              <Stack direction="row" gap={1}>
                <BasicButton
                  onClick={() => {
                    openPopup({
                      url: GroupManagement.url,
                      windowName: GroupManagement.windowName,
                      windowFeatures: GroupManagement.windowFeatures,
                    });
                  }}
                >
                  그룹관리
                </BasicButton>
                <BasicButton
                  onClick={() => {
                    openPopup({
                      url: uploadRegistration.url,
                      windowName: uploadRegistration.windowName,
                      windowFeatures: uploadRegistration.windowFeatures,
                    });
                  }}
                >
                  엑셀등록
                </BasicButton>
              </Stack>
              <Stack direction="row" gap={1}>
                <BasicButton>엑셀저장</BasicButton>
              </Stack>
            </GrayBox>
            <TableBox gap={1} width={"100%"} height={"95%"}>
              <Stack width={"30%"} height={"100%"} gap={1}>
                <TableBox.Inner>
                  <BasicTable data={tableTestData}>
                    <BasicTable.Th>구분</BasicTable.Th>
                    <BasicTable.Th>그룹명칭</BasicTable.Th>
                    <BasicTable.Th>등록건수</BasicTable.Th>
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
                          </BasicTable.Tr>
                        );
                      })}
                    </BasicTable.Tbody>
                  </BasicTable>
                </TableBox.Inner>
                <GrayBox gap={1} justifyContent={"space-between"}>
                  <Pagination
                    count={5}
                    page={currentPage}
                    onChange={onChangePage}
                  />
                  <TableSelect
                    total={100}
                    countValues={countValues}
                    selectValue={s_1}
                    handleChange={h_1}
                  />
                </GrayBox>
              </Stack>
              <Stack width={"70%"} height={"100%"} gap={1}>
                {num === "1" ? (
                  <>
                    <TableBox.Inner>
                      <CheckboxTable
                        data={tableTestData}
                        selectedRows={selectedRows}
                        toggleRowsSelection={toggleRowsSelection}
                      >
                        <CheckboxTable.Thead>
                          <CheckboxTable.Tr>
                            <CheckboxTable.CheckboxTh keyName="id" />
                            <CheckboxTable.Th>이름</CheckboxTable.Th>
                            <CheckboxTable.Th>휴대전화</CheckboxTable.Th>
                            <CheckboxTable.Th>일반전화</CheckboxTable.Th>
                            <CheckboxTable.Th>고객정보</CheckboxTable.Th>
                            <CheckboxTable.Th>주소</CheckboxTable.Th>
                            <CheckboxTable.Th>등록일자</CheckboxTable.Th>
                          </CheckboxTable.Tr>
                        </CheckboxTable.Thead>

                        <CheckboxTable.Tbody>
                          {tableTestData.map((item) => (
                            <CheckboxTable.Tr key={item.id} id={item.id}>
                              <CheckboxTable.CheckboxTd item={item} keyName="id" />
                              <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.phone}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.phone}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.job}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.address}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.phone}</CheckboxTable.Td>
                            </CheckboxTable.Tr>
                          ))}
                        </CheckboxTable.Tbody>
                      </CheckboxTable>
                    </TableBox.Inner>
                    <GrayBox gap={1} justifyContent={"space-between"}>
                      <Pagination
                        count={25}
                        page={currentPage}
                        onChange={onChangePage}
                      />
                      <TableSelect
                        total={100}
                        countValues={countValues}
                        selectValue={selectValue}
                        handleChange={handleChange}
                      />
                    </GrayBox>
                  </>
                ) : (
                  <>
                    <TableBox.Inner>
                      <CheckboxTable
                        data={tableTestData}
                        selectedRows={selectedRows}
                        toggleRowsSelection={toggleRowsSelection}
                      >
                        <CheckboxTable.Thead>
                          <CheckboxTable.Tr>
                            <CheckboxTable.CheckboxTh keyName="id" />
                            <CheckboxTable.Th>이름</CheckboxTable.Th>
                            <CheckboxTable.Th>휴대전화</CheckboxTable.Th>
                            <CheckboxTable.Th>일반전화</CheckboxTable.Th>
                            <CheckboxTable.Th>고객정보</CheckboxTable.Th>
                            <CheckboxTable.Th>주소</CheckboxTable.Th>
                            <CheckboxTable.Th>등록일자</CheckboxTable.Th>
                            <CheckboxTable.Th>기본정보1</CheckboxTable.Th>
                            <CheckboxTable.Th>기본정보2</CheckboxTable.Th>
                            <CheckboxTable.Th>기본정보3</CheckboxTable.Th>
                            <CheckboxTable.Th>기본정보4</CheckboxTable.Th>
                            <CheckboxTable.Th>기본정보5</CheckboxTable.Th>
                            <CheckboxTable.Th>기본정보6</CheckboxTable.Th>
                            <CheckboxTable.Th>기본정보7</CheckboxTable.Th>
                            <CheckboxTable.Th>기본정보8</CheckboxTable.Th>
                            <CheckboxTable.Th>기본정보9</CheckboxTable.Th>
                            <CheckboxTable.Th>기본정보10</CheckboxTable.Th>
                          </CheckboxTable.Tr>
                        </CheckboxTable.Thead>

                        <CheckboxTable.Tbody>
                          {tableTestData.map((item) => (
                            <CheckboxTable.Tr key={item.id} id={item.id}>
                              <CheckboxTable.CheckboxTd item={item} keyName="id" />
                              <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.phone}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.phone}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.job}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.address}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.phone}</CheckboxTable.Td>
                              <CheckboxTable.Td>{"기본정보1"}</CheckboxTable.Td>
                              <CheckboxTable.Td>{"기본정보2"}</CheckboxTable.Td>
                              <CheckboxTable.Td>{"기본정보3"}</CheckboxTable.Td>
                              <CheckboxTable.Td>{"기본정보4"}</CheckboxTable.Td>
                              <CheckboxTable.Td>{"기본정보5"}</CheckboxTable.Td>
                              <CheckboxTable.Td>{"기본정보6"}</CheckboxTable.Td>
                              <CheckboxTable.Td>{"기본정보7"}</CheckboxTable.Td>
                              <CheckboxTable.Td>{"기본정보8"}</CheckboxTable.Td>
                              <CheckboxTable.Td>{"기본정보9"}</CheckboxTable.Td>
                              <CheckboxTable.Td>{"기본정보10"}</CheckboxTable.Td>
                            </CheckboxTable.Tr>
                          ))}
                        </CheckboxTable.Tbody>
                      </CheckboxTable>
                    </TableBox.Inner>
                    <GrayBox gap={1} justifyContent={"space-between"}>
                      <Pagination
                        count={25}
                        page={currentPage}
                        onChange={onChangePage}
                      />
                      <TableSelect
                        total={100}
                        countValues={countValues}
                        selectValue={selectValue}
                        handleChange={handleChange}
                      />
                    </GrayBox>
                  </>
                )}
              </Stack>
            </TableBox>
          </Stack>
          <Stack width={"20%"} height={"100%"} gap={1}>
            <GrayBox>
              <Typography fontSize={"20px"} fontWeight="bold">
                고객 정보
              </Typography>
            </GrayBox>
            <GrayBox
              flexDirection={"column"}
              width={"100%"}
              height={"100%"}
              gap={1}
              overflow="auto"
              alignItems="start"
            >
              <Box
                display="flex"
                flexDirection="column" // 세로 방향 설정
                flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                gap={1}
              >
                <LabelTypo width={"100%"}>고객이름</LabelTypo>
                {/* height: 24px */}
                <BasicInput sx={{ minHeight: "24px", width: "60%" }} />
              </Box>
              <Box
                display="flex"
                flexDirection="column" // 세로 방향 설정
                flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                gap={1}
              >
                <LabelTypo width={"100%"}>휴대전화</LabelTypo>
                {/* height: 24px */}
                <BasicInput sx={{ minHeight: "24px", width: "60%" }} />
              </Box>
              <Box
                display="flex"
                flexDirection="column" // 세로 방향 설정
                flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                gap={1}
              >
                <LabelTypo width={"100%"}>일반전화</LabelTypo>
                {/* height: 24px */}
                <BasicInput sx={{ minHeight: "24px", width: "60%" }} />
              </Box>
              <Box
                display="flex"
                flexDirection="column" // 세로 방향 설정
                flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                gap={1}
              >
                <LabelTypo width={"100%"}>고객정보</LabelTypo>
                {/* height: 24px */}
                <BasicInput sx={{ minHeight: "24px", width: "100%" }} />
              </Box>
              <Box
                display="flex"
                flexDirection="column" // 세로 방향 설정
                flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                gap={1}
              >
                <LabelTypo width={"100%"}>주소</LabelTypo>
                {/* height: 24px */}
                <BasicInput sx={{ minHeight: "24px", width: "100%" }} />
              </Box>
              <Box
                display="flex"
                flexDirection="column" // 세로 방향 설정
                flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                gap={1}
              >
                <LabelTypo width={"100%"}>관리지역</LabelTypo>
                {/* height: 24px */}
                <Select
                  value={selectValue}
                  onChange={handleChange}
                  selectData={selectListData}
                  sx={{ width: "80%" }}
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column" // 세로 방향 설정
                flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                gap={1}
              >
                <LabelTypo width={"100%"}>호응도</LabelTypo>
                {/* height: 24px */}
                <BasicInput sx={{ minHeight: "24px", width: "60%" }} />
              </Box>
              <Box
                display="flex"
                flexDirection="column" // 세로 방향 설정
                flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                gap={1}
              >
                <LabelTypo width={"100%"}>희망평형</LabelTypo>
                {/* height: 24px */}
                <BasicInput sx={{ minHeight: "24px", width: "60%" }} />
              </Box>
              <Box
                display="flex"
                flexDirection="column" // 세로 방향 설정
                flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                gap={1}
              >
                <LabelTypo width={"100%"}>특기사항</LabelTypo>
                {/* height: 24px */}
                <BasicInput sx={{ minHeight: "24px", width: "100%" }} />
              </Box>

              {Array.from({ length: 40 }).map((_, index) => (
                <Box
                  key={index}
                  display="flex"
                  flexDirection="column" // 세로 방향 설정
                  flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                  justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                  width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                  gap={1}
                >
                  <LabelTypo>기본정보</LabelTypo>
                  {/* height: 24px */}
                  <BasicInput sx={{ minHeight: "24px" }} />
                </Box>
              ))}
            </GrayBox>
          </Stack>
        </TableBox>
      </Stack>
    </>
  );
}
