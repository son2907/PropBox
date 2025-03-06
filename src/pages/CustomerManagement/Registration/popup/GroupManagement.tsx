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

  const { data: customerGroupListData, refetch: CustomerGroupList } = getCustomerGroupList("3001");
  //const [headerListReqData, setHeaderListReqData] = useState({sptNo: "", groupNo: ""});
  const [headerListReqData, setHeaderListReqData] = useState({ sptNo: "", groupNo: "" });
  const { data: customerGroupHeaderListData, refetch: refetchCustomerGroupHeaderListData } = getCustomerGroupHeaderList(headerListReqData);
  const [customerGroupHeaderList, setCustomerGroupHeaderList] = useState<CustomerGroupListHeaderListType[]>([]);

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
    console.log("데이터 확인:", selectGroupName);
    setHeaderListReqData((prev) => ({
      ...prev,
      //sptNo: sptNo || "",
      sptNo: "3001",
      groupNo: selectGroupNum,
    }));
  }, [selectGroupName, selectGroupNum]);

  useEffect(() => {
    if(customerGroupHeaderListData?.data.contents) {
      setCustomerGroupHeaderList(customerGroupHeaderListData.data.contents);
    }
  },[customerGroupHeaderListData])

  //console.log("데이터 확인:",customerGroupHeaderListData);

  return (
    <Stack width={"100%"} height={"100%"} bgcolor={"white"}>
      <GrayBox gap={1}>
        <Typography>그룹명</Typography>
        <BasicInput sx={{ minHeight: "24px", width: "20%" }} value={selectGroupName} />
        <BasicButton sx={{ marginLeft: "auto" }}>새로고침</BasicButton>
        <BasicButton>저장</BasicButton>
      </GrayBox>
      <TableBox>
        <TableBox.Inner>
          <Box
            sx={{
              width: "100%",
              height: "50%",
              marginBottom: 1,
              flexGrow: 1,
            }}
          >
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
          </Box>
        </TableBox.Inner>
      </TableBox>
      {/* 고정제목 */}
      <GrayBox justifyContent={"space-between"}>
        <Typography fontWeight="bold">그룹별 고정제목 관리</Typography>
        <Stack direction={"row"} gap={1}>
          <BasicButton>새로고침</BasicButton>
          <BasicButton>저장</BasicButton>
        </Stack>
      </GrayBox>
      <Stack direction={"row"} width={"100%"} height={"100%"} marginBottom={1}>
        <Stack width={"100%"} gap={1}>
          {/* 상담항목 */}
          <GrayBox marginBottom={1}>
            <Typography>고정 제목</Typography>
          </GrayBox>
          <Stack
            width={"50%"}
            alignItems="center"
            justifyContent={"center"}
            pr={2}
            height={"48px"}
          >
            <Typography>{}</Typography>
          </Stack>
          <Stack
            width={"50%"}
            alignItems="center"
            justifyContent={"center"}
            pr={2}
            height={"48px"}
          >
            <Typography>기본정보2</Typography>
          </Stack>
          <Stack
            width={"50%"}
            alignItems="center"
            justifyContent={"center"}
            pr={2}
            height={"48px"}
          >
            <Typography>기본정보3</Typography>
          </Stack>
          <Stack
            width={"50%"}
            alignItems="center"
            justifyContent={"center"}
            pr={2}
            height={"48px"}
          >
            <Typography>기본정보4</Typography>
          </Stack>
          <Stack
            width={"50%"}
            alignItems="center"
            justifyContent={"center"}
            pr={2}
            height={"48px"}
          >
            <Typography>기본정보5</Typography>
          </Stack>
          <Stack
            width={"50%"}
            alignItems="center"
            justifyContent={"center"}
            pr={2}
            height={"48px"}
          >
            <Typography>기본정보6</Typography>
          </Stack>
          <Stack
            width={"50%"}
            alignItems="center"
            justifyContent={"center"}
            pr={2}
            height={"48px"}
          >
            <Typography>기본정보7</Typography>
          </Stack>
          <Stack
            width={"50%"}
            alignItems="center"
            justifyContent={"center"}
            pr={2}
            height={"48px"}
          >
            <Typography>기본정보8</Typography>
          </Stack>
          <Stack
            width={"50%"}
            alignItems="center"
            justifyContent={"center"}
            pr={2}
            height={"48px"}
          >
            <Typography>기본정보9</Typography>
          </Stack>
          <Stack
            width={"50%"}
            alignItems="center"
            justifyContent={"center"}
            pr={2}
            height={"48px"}
          >
            <Typography>기본정보10</Typography>
          </Stack>
        </Stack>
        <Stack width={"100%"} alignItems="flex-start" gap={1}>
          {/* 상담항목 */}
          <GrayBox marginBottom={1}>
            <Typography>사용자 제목</Typography>
          </GrayBox>
          <Box>
            <BasicInput sx={{ minHeight: "24px", width: "500px" }} />
          </Box>
          <Box>
            <BasicInput sx={{ minHeight: "24px", width: "500px" }} />
          </Box>
          <Box>
            <BasicInput sx={{ minHeight: "24px", width: "500px" }} />
          </Box>
          <Box>
            <BasicInput sx={{ minHeight: "24px", width: "500px" }} />
          </Box>
          <Box>
            <BasicInput sx={{ minHeight: "24px", width: "500px" }} />
          </Box>

          <Box>
            <BasicInput sx={{ minHeight: "24px", width: "500px" }} />
          </Box>
          <Box>
            <BasicInput sx={{ minHeight: "24px", width: "500px" }} />
          </Box>
          <Box>
            <BasicInput sx={{ minHeight: "24px", width: "500px" }} />
          </Box>
          <Box>
            <BasicInput sx={{ minHeight: "24px", width: "500px" }} />
          </Box>
          <Box>
            <BasicInput sx={{ minHeight: "24px", width: "500px" }} />
          </Box>
          <Box>
            <BasicInput sx={{ minHeight: "24px", width: "500px" }} />
          </Box>
          <Box>
            <BasicInput sx={{ minHeight: "24px", width: "500px" }} />
          </Box>
          <Box>
            <BasicInput sx={{ minHeight: "24px", width: "500px" }} />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}
