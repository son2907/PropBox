import { Box, IconButton, Stack, Typography } from "@mui/material";
import GrayBox from "../../../../components/Box/GrayBox";
import { Select } from "../../../../components/Select";
import { selectTestData, tableTestData } from "../../../../utils/testData";
import useSelect from "../../../../hooks/useSelect";
import { IoMdAddCircleOutline } from "react-icons/io";
import IconSquareButton from "../../../../components/Button/IconSquareButton";
import { BasicButton } from "../../../../components/Button";
import CheckboxTable from "../../../../components/Table/CheckboxTable";
import TableBox from "../../../../components/Box/TableBox";
import CenteredBox from "../../../../components/Box/CenteredBox";
import { useMultiRowSelection } from "../../../../hooks/useMultiRowSelection";
import MultiSelect from "../../../../components/Select/MultiSelect";
import { useMultiSelect } from "../../../../hooks/useMultiSselect";
import { useEffect, useState } from "react";
import RowDragTable from "../../../../components/Table/RowDragTable";
import { openPopup } from "../../../../utils/openPopup";
import PathConstants from "../../../../routers/path";
import BasicInput from "../../../../components/Input/BasicInput";
import BasicTable from "../../../../components/Table/BasicTable";
import { useSingleRowSelection } from "../../../../hooks/useSingleRowSelection";
import { RiDeleteBinLine } from "react-icons/ri";
import LabelTypo from "../../../../components/Typography/LabelTypo";
import { getCustomerGroupHeaderList, getCustomerGroupList } from "../../../../api/CustomerManagement";
import { CustomerGroupListHeaderListType } from "../../../../types/CustomerManagement";
interface Data {
  id: string;
  [key: string]: any;
}
export default function GroupManagement() {

  //팝업 페이지에서 id를 가져오려면 window.location.search를 사용하여 파라미터를 파싱
  const queryParams = new URLSearchParams(window.location.search);
  const sptNo = queryParams.get("sptNo");
  const groupNo = queryParams.get("groupNo");
  console.log("sptNo : ", sptNo);

  const { selectListData, selectValue, handleChange } = useSelect(
    selectTestData,
    "value",
    "data"
  );
  const { selectedValues, handleSelectChange } = useMultiSelect<number>();
  const [data, setData] = useState<Data[]>(tableTestData);

  const { selectedRows: s_1, toggleRowsSelection: t_1 } =
    useMultiRowSelection();
  const { selectedRows: s_3, toggleRowsSelection: t_3 } =
    useMultiRowSelection();

  const topicPopupInfo = {
    url: PathConstants.Call.TopicRegistration,
    windowName: "상담 주제 등록",
  };

  const { selectedRow, toggleRowSelection } = useSingleRowSelection(); // 행 단일 선택, 배경색 변함

  const { data: customerGroupListData, refetch: refetchCustomerGroupList } = getCustomerGroupList("3001");
  //const [headerListReqData, setHeaderListReqData] = useState({sptNo: "", groupNo: ""});
  const [headerListReqData, setHeaderListReqData] = useState({ sptNo: "", groupNo: "" });
  const { data: customerGroupHeaderListData, refetch: refetchCustomerGroupHeaderListData } = getCustomerGroupHeaderList(headerListReqData);
  const [customerGroupHeaderList, setCustomerGroupHeaderList] = useState<CustomerGroupListHeaderListType>();

  const [selectGroupName, setSelectGroupName] = useState("");
  const [selectGroupNum, setSelectGroupNum] = useState("")

  useEffect(() => {
    if (sptNo || groupNo) {
      setHeaderListReqData((prev) => ({
        ...prev,
        sptNo: sptNo || "",
        groupNo: groupNo || "",
      }));
    }
  }, [sptNo, groupNo]);

  useEffect(() => {
    setHeaderListReqData((prev) => ({
      ...prev,
      //sptNo: sptNo || "",
      sptNo: "3001",
      groupNo: selectGroupNum,
    }));
    console.log("데이터 확인:", headerListReqData);
  }, [selectGroupName, selectGroupNum]);

  useEffect(() => {
    if (customerGroupHeaderListData?.data.contents) {
      setCustomerGroupHeaderList(customerGroupHeaderListData.data.contents);
    }
  }, [customerGroupHeaderListData]);

  //console.log("데이터 확인:",customerGroupHeaderListData);

  return (
    <Stack width={"100%"} height={"100%"} bgcolor={"white"}>
      <Stack width={"100%"} height={"40%"}>
        <Stack>
          <GrayBox gap={1}>
            <Typography>그룹명</Typography>
            <BasicInput sx={{ minHeight: "24px", width: "20%" }} value={selectGroupName} />
            <BasicButton sx={{ marginLeft: "auto" }} onClick={() => refetchCustomerGroupList()}>새로고침</BasicButton>
            <BasicButton>저장</BasicButton>
          </GrayBox>
        </Stack>
        <Stack overflow={"auto"}>
          <TableBox.Inner>
            <BasicTable data={customerGroupListData?.data.contents || []}>
              <BasicTable.Th>그룹명</BasicTable.Th>
              <BasicTable.Th>삭제</BasicTable.Th>
              <BasicTable.Tbody>
                {(customerGroupListData?.data.contents || []).map((item, index) => {
                  return (
                    <BasicTable.Tr
                      key={index}
                      isClicked={selectGroupNum === item.groupNo}
                      onClick={() => {
                        if (selectGroupNum === item.groupNo) {
                          setSelectGroupNum("");
                          setSelectGroupName("");
                        } else {
                          setSelectGroupNum(item.groupNo);
                          setSelectGroupName(item.groupNm);
                        }
                      }}
                    >
                      <BasicTable.Td>{item.groupNm}</BasicTable.Td>
                      <BasicTable.Td>
                        <IconButton>
                          <RiDeleteBinLine color="#f4475f" />
                        </IconButton>
                      </BasicTable.Td>
                    </BasicTable.Tr>
                  );
                })}
              </BasicTable.Tbody>
            </BasicTable>
          </TableBox.Inner>
        </Stack>

      </Stack>
      <Stack width={"100%"} height={"60%"}>
        <Stack width={"100%"} height={"10%"}>
          <GrayBox justifyContent={"space-between"}>
            <Typography fontWeight="bold">그룹별 고정제목 관리</Typography>
            <Stack direction={"row"} gap={1}>
              <BasicButton>새로고침</BasicButton>
              <BasicButton>저장</BasicButton>
            </Stack>
          </GrayBox>
        </Stack>
        <Stack direction={"row"} width={"100%"} height={"90%"} marginBottom={1}>
          <Stack width={"100%"} height={"100%"}>
            {/* 상담항목 */}
            <GrayBox marginBottom={1}>
              <Stack direction={"row"} justifyContent={"space-between"} marginRight={30} marginLeft={30} width={"100%"}>
              <Typography>고정 제목</Typography>
              <Typography>사용자 제목</Typography>
              </Stack>
            </GrayBox>
            <Stack overflow={"auto"}>
              {customerGroupHeaderList ? (
                Object.keys(customerGroupHeaderList)
                  .filter((key) => key.startsWith("hder")) // hder01~hder10만 필터링
                  .sort() // 순서 정렬
                  .map((key, index) => (
                    <Stack
                      key={index}
                      direction="row"
                      alignItems="center"
                      gap={2}
                      justifyContent={"space-between"}
                      margin={1}
                    >
                      {/* 왼쪽 Typography */}
                      <Stack width="150px" alignItems="center">
                        <Typography>{customerGroupHeaderList[key]}</Typography>
                      </Stack>

                      {/* 오른쪽 Input */}
                      <BasicInput sx={{ minHeight: "40px", width: "500px" }} />
                    </Stack>
                  ))
              ) : (
                <Typography>데이터를 불러오는 중...</Typography>
              )}
            </Stack>
          </Stack>

        </Stack>
      </Stack>
      {/* 고정제목 */}

    </Stack>
  );
}
