import { Stack } from "@mui/material";
import useTabs from "../../../hooks/useTabs";
import GrayBox from "../../../components/Box/GrayBox";
import SearchInput from "../../../components/Input/SearchInput";
import TableBox from "../../../components/Box/TableBox";
import BasicTable from "../../../components/Table/BasicTable";
import { tableTestData } from "../../../utils/testData";
import { useSingleRowSelection } from "../../../hooks/useSingleRowSelection";
import { Pagination } from "../../../components/Pagination";
import { usePagination } from "../../../hooks/usePagination";
import React, { useEffect, useState } from "react";
import CenteredBox from "../../../components/Box/CenteredBox";
import TableSelect from "../../../components/Select/TableSelect";
import useDidMountEffect from "../../../hooks/useDidMountEffect";
import { useAuthCodeList } from "../../../api/authCode";
import { AuthCodeListType } from "../../../types/authCode";
import { useTableSelect } from "../../../hooks/useTableSelect";

export default function AuthCode() {
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 관리
  const [searchInput, setSearchInput] = useState(""); // 검색 입력값 상태 관리

  const { countValues, selectValue, handleChange } = useTableSelect();

  const { selectedRow, toggleRowSelection } = useSingleRowSelection();

  const [currentPage, setCurrentPage] = React.useState(1);

  const onChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
    console.log(`현재 페이지: ${newPage}`); // 콘솔에 현재 페이지 출력
  };

  //인증번호 목록 조회
  const [authCodeReqData, setAuthCodeReqData] = useState({
    cid: searchQuery,
    page: currentPage,
    limit: selectValue,
  });
  const { data: authCodeListData, isSuccess: isAuthCodeListData } = useAuthCodeList(authCodeReqData);
  const [authCodeList, setAuthCodeList] = useState<AuthCodeListType[]>([]);

  const handleSearch = () => {
    setSearchQuery(searchInput); // 검색어 업데이트
    //console.log("검색 실행:", searchQuery);
    // 검색 로직 추가 (API 호출)
  };

  useEffect(() => {
    setAuthCodeReqData((prev) => ({
      ...prev,
      cid: searchQuery,
    }));
  }, [searchQuery]);
  useEffect(() => {
    if (authCodeListData?.data.contents) {
      setAuthCodeList(authCodeListData.data.contents);
    }
  }, [authCodeListData]);

  return (
    <>
      <Stack width={"100%"} height={"100%"} gap={1}>
        <GrayBox width={"100%"}>
          <SearchInput
            placeholder="발신전화번호 검색"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)} // 검색어 입력값 업데이트
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch(); // 검색 실행 함수 호출
              }
            }}
          ></SearchInput>
        </GrayBox>
        <Stack width={"100%"} height={"95%"} gap={1} overflow={"auto"}>
          <TableBox.Inner>
            <BasicTable data={authCodeListData?.data.contents || []}>
              <BasicTable.Th>발신전화번호</BasicTable.Th>
              <BasicTable.Th>인증번호</BasicTable.Th>
              <BasicTable.Th>요청일시</BasicTable.Th>
              <BasicTable.Tbody>
                {(authCodeListData?.data.contents || []).map((item, index) => {
                  return (
                    <BasicTable.Tr
                      key={index}
                      isClicked={selectedRow.has(item.cid)}
                      onClick={() => toggleRowSelection(item.cid)}
                    >
                      <BasicTable.Td>{item.cid}</BasicTable.Td>
                      <BasicTable.Td>{item.eno}</BasicTable.Td>
                      <BasicTable.Td>{item.regDtm}</BasicTable.Td>
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
            <Pagination
              count={authCodeListData?.data.totalPage || 1}
              page={currentPage}
              onChange={onChangePage}
            />
            <TableSelect
              total={authCodeListData?.data.totalCnt || 10}
              countValues={countValues}
              selectValue={selectValue}
              handleChange={handleChange}
            />
          </CenteredBox>
        </Stack>
      </Stack>
    </>
  );
}
