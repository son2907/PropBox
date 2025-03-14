import { Box, Pagination, Stack } from "@mui/material";
import useTabs from "../../../hooks/useTabs";
import TabPanel from "../../../components/Tab/TabPanel";
import BasicTable from "../../../components/Table/BasicTable";
import { tableTestData } from "../../../utils/testData";
import TableBox from "../../../components/Box/TableBox";
import { useSingleRowSelection } from "../../../hooks/useSingleRowSelection";
import { usePagination } from "../../../hooks/usePagination";
import TableSelect from "../../../components/Select/TableSelect";
import CheckboxTable from "../../../components/Table/CheckboxTable";
import GrayBox from "../../../components/Box/GrayBox";
import { useEffect, useState } from "react";
import { useTableSelect } from "../../../hooks/useTableSelect";
import { getCustomerGroupList } from "../../../api/CustomerManagement";

interface Data {
  id: string;
  [key: string]: any;
}

interface GroupInfoProps {
  onSelect: (age: number | null) => void; // 선택된 age를 상위 컴포넌트로 전달하는 콜백
}

export default function GroupInfo({ onSelect }: GroupInfoProps) {
  //팝업 페이지에서 id를 가져오려면 window.location.search를 사용하여 파라미터를 파싱
  const queryParams = new URLSearchParams(window.location.search);
  const sptNo = queryParams.get("sptNo");
  console.log("팝업으로 가져온 데이터 : ", sptNo);

  const { value, handleChange: tabChange } = useTabs(0);

  const { selectedRow, toggleRowSelection } = useSingleRowSelection(); // 행 단일 선택, 배경색 변함

  // usePagination에
  const { currentPage, onChangePage } = usePagination();

  //임시이기때문에 item.age의 값을 선택시 테이블 변경되도록 함...
  useEffect(() => {
    console.log("Selected Row IDs:", Array.from(selectedRow)); // 선택된 Row ID 확인

    if (selectedRow.size > 0) {
      selectedRow.forEach((id) => {
        const selectedItem = tableTestData.find((item) => item.id === id);
        if (selectedItem) {
          console.log("Selected Item:", selectedItem); // 선택된 아이템 전체 정보
          console.log("Selected Age:", selectedItem.age); // 선택된 아이템의 age
        } else {
          console.log("No matching item found for ID:", id); // 매칭 실패
        }
      });
    } else {
      console.log("No rows selected");
    }
  }, [selectedRow]); // selectedRow 변경 시 실행

  const { countValues, selectValue, handleChange } = useTableSelect();

  const [selectGropNum, setSelectGroupNum] = useState("");
  const [selectGropNm, setSelectGroupNm] = useState("");
  const [groupHeaderListReqData, setGroupHeaderListReqData] = useState({ sptNo: "", groupNo: "" });
  //const { data: customerGroupList, refetch: refetchCustomerGroupList } = getCustomerGroupList(sptNo || "");
  const { data: customerGroupList, refetch: refetchCustomerGroupList } = getCustomerGroupList("3001");

  useEffect(() => {
    setGroupHeaderListReqData((prev) => ({
      ...prev,
      sptNo: sptNo || "",
      groupNo: ""
    }))
  }, [sptNo]);

  useEffect(() => {
    console.log("데이터 확인",customerGroupList?.data.contents);
  },[customerGroupList])

  return (
    <>
      <TabPanel value={value} index={0}>
        <TableBox>
          <TableBox.Inner>
            <Box
              sx={{
                width: "100%",
                height: "calc(100vh - 280px)",
                overflow: "auto",
                marginBottom: 1,
                flexGrow: 1,
              }}
            >
              <BasicTable data={tableTestData}>
                <BasicTable.Th>구분</BasicTable.Th>
                <BasicTable.Th>그룹명칭</BasicTable.Th>
                <BasicTable.Th>등록건수</BasicTable.Th>
                <BasicTable.Tbody>
                  {tableTestData.map((item, index) => {
                    return (
                      <BasicTable.Tr
                        key={index}
                        isClicked={selectGropNum === item.id}
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
            </Box>
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
          </TableBox.Inner>
        </TableBox>
      </TabPanel>
    </>
  );
}
