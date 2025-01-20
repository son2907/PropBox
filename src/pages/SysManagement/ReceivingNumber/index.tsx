import { Box, Stack, Typography } from "@mui/material";
import useTabs from "../../../hooks/useTabs";
import GrayBox from "../../../components/Box/GrayBox";
import SearchInput from "../../../components/Input/SearchInput";
import TableBox from "../../../components/Box/TableBox";
import BasicTable from "../../../components/Table/BasicTable";
import { tableTestData } from "../../../utils/testData";
import { useSingleRowSelection } from "../../../hooks/useSingleRowSelection";
import { Pagination } from "../../../components/Pagination";
import { usePagination } from "../../../hooks/usePagination";
import LabelTypo from "../../../components/Typography/LabelTypo";
import BasicInput from "../../../components/Input/BasicInput";
import useSelect from "../../../hooks/useSelect";
import { useEffect, useRef, useState } from "react";
import { Select } from "../../../components/Select";
import { selectTestData } from "../../../utils/testData";
import { BasicButton, ToggleButton } from "../../../components/Button";
import useToggleButtton from "../../../hooks/useToggleButton";
import TextArea from "../../../components/TextArea/TextArea";
import CenteredBox from "../../../components/Box/CenteredBox";
import TableSelect from "../../../components/Select/TableSelect";
import useDidMountEffect from "../../../hooks/useDidMountEffect";
import { useRejectLocalList, useRejectNumber } from "../../../api/rejectNumber";
import { RejectLocalListType, RejectNumberType } from "../../../types/rejectNumber";

export default function ReceivingNumber() {

  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 관리
  const [searchInput, setSearchInput] = useState(""); // 검색 입력값 상태 관리

  //현장 목록 조회
  const [localListReqData, setLocalListReqData] = useState({ userNm: "", page: "0", limit: "20" });
  const { data: localListData, isSuccess: isLocalListData } = useRejectLocalList(localListReqData);
  const [localList, setLocalList] = useState<RejectLocalListType[]>([]);
  const [selectLocalNo, setSelectLocalNo] = useState("");

  //수신거부 목록 조회
  const [rejectNumReqData, setRejectNumReqData] = useState({ sptNo: "", page: "0", limit: "20" });
  const {data: rejectNumberList, isSuccess:isRejectNumberList} = useRejectNumber(rejectNumReqData);
  const [rejectNumList, setRejectNumList] = useState<RejectNumberType[]>([]);

  const { selectedRow, toggleRowSelection } = useSingleRowSelection();

  const { currentPage, onChangePage } = usePagination();

  const { selectListData, selectValue, handleChange } = useSelect(
    selectTestData,
    "value",
    "data"
  );

  const [selectedAge, setSelectedAge] = useState<number | null>(null);

  // 이 ref를 통해 textArea에 입력된 값에 접근할 수 있음
  const tRef1 = useRef<HTMLTextAreaElement>(null); // textArea에 연결해 줄 ref

  // 토글에 쓰이는거, defaultValue로 초기 클릭 여부 선택 가능
  const { toggle: receive, onChange: receiveToggle } = useToggleButtton({
    defaultValue: true,
  });

  useDidMountEffect(() => {
    if (searchQuery) {
      setLocalListReqData((prev) => ({
        ...prev,
        userNm: searchQuery
      }))
    }
  }, [searchQuery]);
  useDidMountEffect(()=>{
    if(localListData?.data.contents) {
      setLocalList(localListData.data.contents);
    }
  },[localListData]);
  useEffect(() => {
    if (selectLocalNo !== "") {
      // selectUserNo가 변경될 때 localListReqData를 업데이트하고 useLocalList 호출 트리거
      setRejectNumReqData((prev) => ({
        ...prev,
        sptNo: selectLocalNo, // selectUserNo 값을 userNo에 반영
      }));
    } else return;
  }, [selectLocalNo]);
  useDidMountEffect(() => {
    if(rejectNumberList?.data.contents) {
      setRejectNumList(rejectNumberList.data.contents);
    }
  },[rejectNumberList])

  const handleSearch = () => {
    setSearchQuery(searchInput); // 검색어 업데이트
    //console.log("검색 실행:", searchQuery);
    // 검색 로직 추가 (API 호출)
  };

  return (
    <>
      <Stack width={"100%"} height={"100%"} gap={1}>
        <GrayBox>
          <SearchInput
            placeholder="현장 이름 검색"
            onChange={(e) => setSearchInput(e.target.value)} // 검색어 입력값 업데이트
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch(); // 검색 실행 함수 호출
              }
            }}
          ></SearchInput>
        </GrayBox>
        <TableBox gap={1}>
          <Stack width={"20%"} height={"100%"}>
            <TableBox.Inner>
              <BasicTable data={localList}>
                <BasicTable.Th>현장번호</BasicTable.Th>
                <BasicTable.Th>현장명</BasicTable.Th>
                <BasicTable.Tbody>
                  {localList.map((item, index) => {
                    return (
                      <BasicTable.Tr
                        key={index}
                        isClicked={selectLocalNo === item.sptNo}
                          onClick={() => {
                            if (selectLocalNo === item.sptNo) {
                              setSelectLocalNo("");
                            } else {
                              setSelectLocalNo(item.sptNo);
                            }
                          }}
                      >
                        <BasicTable.Td>{item.sptNo}</BasicTable.Td>
                        <BasicTable.Td>{item.sptNm}</BasicTable.Td>
                      </BasicTable.Tr>
                    );
                  })}
                </BasicTable.Tbody>
              </BasicTable>
            </TableBox.Inner>
          </Stack>
          <Stack width={"60%"} height={"100%"} gap={1}>
            <TableBox.Inner>
              <BasicTable data={rejectNumList}>
                <BasicTable.Th>수신거부번호</BasicTable.Th>
                <BasicTable.Th>070번호</BasicTable.Th>
                <BasicTable.Th>수신거부코드</BasicTable.Th>
                <BasicTable.Th>사용여부</BasicTable.Th>
                <BasicTable.Th>비고</BasicTable.Th>

                <BasicTable.Tbody>
                  {rejectNumList.map((item, index) => {
                    return (
                      <BasicTable.Tr
                        key={index}
                        isClicked={selectedRow.has(item.rejectNo)}
                        onClick={() => toggleRowSelection(item.rejectNo)}
                      >
                        <BasicTable.Td>{item.rejectNo}</BasicTable.Td>
                        <BasicTable.Td>{item.tel070No}</BasicTable.Td>
                        <BasicTable.Td>{item.rejectCd}</BasicTable.Td>
                        <BasicTable.Td>{item.useYn}</BasicTable.Td>
                        <BasicTable.Td>{item.rmk}</BasicTable.Td>
                      </BasicTable.Tr>
                    );
                  })}
                </BasicTable.Tbody>
              </BasicTable>
            </TableBox.Inner>
            <CenteredBox
              gap={3}
              marginBottom={1}
              marginRight={2}
              justifyContent={"space-between"}
            >
              <Pagination count={25} page={currentPage} onChange={onChangePage} />
              <TableSelect total={100} />
            </CenteredBox>
          </Stack>
          <Stack width={"20%"} height={"100%"} overflow={"auto"}>
            <Stack width={"100%"} height={"100%"} gap={1}>
              <Stack
                width={"100%"}
                marginTop={2}
                marginBottom={2}
              >
                <Typography
                  color="primary.dark"
                  fontWeight={"bold"}
                  fontSize={"22px"}
                >
                  상세정보
                </Typography>
              </Stack>
              <Stack
                width={"100%"}
                overflow={"auto"}
                gap={1}
                paddingBottom={1}
              >
                <Stack gap={1}>
                  <Typography>수신거부 번호</Typography>
                  <BasicInput
                    placeholder="수신거부 번호"
                    sx={{ width: "100%", height: "40px" }}
                  ></BasicInput>
                </Stack>
              </Stack>
              <Stack
                width={"100%"}
                overflow={"auto"}
                gap={1}
                paddingBottom={1}
              >
                <Stack gap={1}>
                  <Typography>070 번호</Typography>
                  <BasicInput
                    placeholder="070 번호"
                    sx={{ width: "100%", height: "40px" }}
                  ></BasicInput>
                </Stack>
              </Stack>
              <Stack
                width={"100%"}
                overflow={"auto"}
                gap={1}
                paddingBottom={1}
              >
                <Stack gap={1}>
                  <Typography>사용여부</Typography>
                  <ToggleButton
                    checked={receive}
                    onChange={receiveToggle}
                    label=""
                  />
                </Stack>
              </Stack>
              <Stack
                width={"100%"}
                overflow={"auto"}
                gap={1}
                paddingBottom={1}
              >
                <Stack gap={1}>
                  <Typography>비고</Typography>
                  <TextArea
                    height="100px"
                    resize="none"
                    ref={tRef1}
                    placeholder=""
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </TableBox>
      </Stack>
    </>
  );
}
