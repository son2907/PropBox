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
import { customerGroupDelete, customerGroupInsert, getCustomerGroupHeaderList, getCustomerGroupList } from "../../../../api/CustomerManagement";
import { CustomerGroupListHeaderListType } from "../../../../types/CustomerManagement";
import { useSptStore } from "../../../../stores/sptStore";
import useModal from "../../../../hooks/useModal";
import { ConfirmDeleteModal } from "../../../../components/Modal/modal/ConfirmDeleteModal";
interface Data {
  id: string;
  [key: string]: any;
}
export default function GroupManagement() {

  //팝업 페이지에서 id를 가져오려면 window.location.search를 사용하여 파라미터를 파싱
  // const queryParams = new URLSearchParams(window.location.search);
  // const sptNo = queryParams.get("sptNo");
  // const groupNo = queryParams.get("groupNo");
  // console.log("sptNo : ", sptNo);

  const { openModal, closeModal } = useModal();

  //api를 호출하기위해 sptNo 불러오기
  const { sptNo } = useSptStore();

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

  const { data: customerGroupListData, refetch: refetchCustomerGroupList } = getCustomerGroupList(sptNo);
  //const [headerListReqData, setHeaderListReqData] = useState({sptNo: "", groupNo: ""});
  const [headerListReqData, setHeaderListReqData] = useState({ sptNo: sptNo, groupNo: "" });
  const { data: customerGroupHeaderListData, refetch: refetchCustomerGroupHeaderListData } = getCustomerGroupHeaderList(headerListReqData);
  const [customerGroupHeaderList, setCustomerGroupHeaderList] = useState<CustomerGroupListHeaderListType>();

  const [selectGroupName, setSelectGroupName] = useState("");
  const [selectGroupNum, setSelectGroupNum] = useState("");
  const [groupName, setGroupName] = useState("");

  const customerGroupInsertUpdateAPI = customerGroupInsert();  //고객 그룹명 추가 및 수정
  const [deleteGroupReqData, setDeleteGroupReqData] = useState({ sptNo: sptNo, groupNo: selectGroupNum });
  const { mutate: customerGroupDeleteAPI } = customerGroupDelete();

  useEffect(() => {
    if (sptNo || selectGroupNum) {
      setHeaderListReqData((prev) => ({
        ...prev,
        sptNo: sptNo || "",
        groupNo: selectGroupNum || "",
      }));
    }
  }, [sptNo, selectGroupNum]);

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

  //그룹 추가 수정
  const handleGroupText = () => {
    const requestData = {
      sptNo: sptNo || "",
      groupNo: selectGroupNum,
      groupNm: selectGroupName,
      hder01: "",
      hder02: "",
      hder03: "",
      hder04: "",
      hder05: "",
      hder06: "",
      hder07: "",
      hder08: "",
      hder09: "",
      hder10: "",
    };

    console.log("데이터 확인", requestData);

    customerGroupInsertUpdateAPI.mutate(
      { body: requestData },
      {
        onSuccess: (response) => {
          if (response.data.result === "SUCCESS") {
            console.log("response.data", response.data);
            refetchCustomerGroupList();
          }
        }
      }
    )
  };

  const handleGroupDelete = (sptNo: string, groupNo: string) => {
    const reqData = { sptNo, groupNo };


    customerGroupDeleteAPI(reqData, {
      onSuccess: (response) => {
        if (response.data.result === "SUCCESS") {
          console.log("response.data", response.data);
          refetchCustomerGroupList(); // 성공 시 목록 새로고침
        }
      },
      onError: (error) => {
        console.error("그룹 삭제 실패:", error);
      }
    });
  };

  const confirmDeleteModal = (sptNo: string, groupNo: string) => {
    openModal(ConfirmDeleteModal, {
      modalId: "Delete",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        handleGroupDelete(sptNo, groupNo); // 저장된 userSelectRow를 사용하여 삭제
      },
    });
  };

  return (
    <Stack width={"100%"} height={"100%"} bgcolor={"white"}>
      <Stack width={"100%"} height={"40%"}>
        <Stack>
          <GrayBox gap={1}>
            <Typography>그룹명</Typography>
            <BasicInput
              sx={{ minHeight: "24px", width: "20%" }}
              value={selectGroupName}
              onChange={(e) => setSelectGroupName(e.target.value)}
            />
            <BasicButton sx={{ marginLeft: "auto" }} onClick={() => window.location.reload()}>새로고침</BasicButton>
            <BasicButton onClick={handleGroupText}>저장</BasicButton>
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
                        <IconButton onClick={() => confirmDeleteModal(sptNo, item.groupNo)}>
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
              {customerGroupHeaderList
                ? Object.keys(customerGroupHeaderList)
                  .filter((key) => key.startsWith("hder")) // hder01~hder10만 필터링
                  .sort() // 순서 정렬
                  .map((key, index) => {
                    const label = customerGroupHeaderList[key] || `기본정보${index + 1}`; // 값이 없으면 기본정보로 설정
                    return (
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
                          <Typography>{label}</Typography>
                        </Stack>

                        {/* 오른쪽 Input */}
                        <BasicInput sx={{ minHeight: "40px", width: "500px" }} />
                      </Stack>
                    );
                  })
                : Array.from({ length: 10 }, (_, i) => `기본정보${i + 1}`).map((label, index) => (
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
                      <Typography>{label}</Typography>
                    </Stack>

                    {/* 오른쪽 Input */}
                    <BasicInput sx={{ minHeight: "40px", width: "500px" }} />
                  </Stack>
                ))}
            </Stack>
          </Stack>

        </Stack>
      </Stack>
      {/* 고정제목 */}

    </Stack>
  );
}
