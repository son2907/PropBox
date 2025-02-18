import { Box, IconButton, Stack, Typography } from "@mui/material";
import GrayBox from "../../../../components/Box/GrayBox";
import { Select } from "../../../../components/Select";
import { selectTestData, tableTestData } from "../../../../utils/testData";
import useSelect from "../../../../hooks/useSelect";
import { IoMdAddCircleOutline } from "react-icons/io";
import IconSquareButton from "../../../../components/Button/IconSquareButton";
import { BasicButton, ToggleButton } from "../../../../components/Button";
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
import Calendar from "../../../../components/Calendar/Calendar";
import useToggleButtton from "../../../../hooks/useToggleButton";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useAuthStore } from "../../../../stores/authStore";
import { getMemberAuthDetail, getMemberPermissionMenuList, getNonPermissionMuneList, nonPermissionMenuInsert, permissionMenuInsert } from "../../../../api/authManagement";
import { MemberAuthDetailType, MemberPermissionMenuListType, NonPermissionMenuListType } from "../../../../types/authManagement";
import { string } from "yup";

interface Data {
  id: string;
  [key: string]: any;
}

export default function MemberMenuPermission() {
  //팝업 페이지에서 id를 가져오려면 window.location.search를 사용하여 파라미터를 파싱
  const queryParams = new URLSearchParams(window.location.search);
  const userNo = queryParams.get("userNo");
  const sptNo = queryParams.get("sptNo");
  console.log("팝업으로 가져온 데이터 : ", sptNo);

  //api를 호출하기위해 userID 불러오기
  const { loginId } = useAuthStore(["loginId"]);

  //상세 조회
  const [menuListReqData, setMenuListReqData] = useState({userNo : "", sptNo: ""})
  const { isSuccess, data } = getMemberAuthDetail(menuListReqData);
  const [memberAuthDetail, setMemberAuthDetail] = useState<MemberAuthDetailType>();
  const [sptNum, setSptNo] = useState("");
  const [userNm, setUserNm] = useState("");
  const [constntUserNo, setConstntUserNo] = useState("");
  const [userConstntSeCd, setUserConstntSeCd] = useState("");
  const [rspofcCd, setRspofcCd] = useState("");
  const [rspofcNm, setRspofcNm] = useState("");
  const [rmk, setRmk] = useState("");

  //권한 조회
  const { data : permissionMenuList, refetch: refetchPermissionMenuList } = getMemberPermissionMenuList(userNo || "")
  const [permissionMenuListData, setPermissionMenuListData] = useState<MemberPermissionMenuListType[]>([]);

  //미권한 조회
  const { data : nonPermissionMenuList, refetch: refetchNonPermissionMenuList } = getNonPermissionMuneList(sptNo || "");
  const [nonPermissionMenuListData, setNonPermissionMenuListData] = useState<NonPermissionMenuListType[]>([]);

  //권한 -> 미권한
  const nonPermissionInsertAPI = nonPermissionMenuInsert();
  //미권한 -> 권한
  const permissionInsertAPI = permissionMenuInsert();
  
  const {
    selectListData: sd_0,
    selectValue: s_0,
    handleChange: o_0,
  } = useSelect(selectTestData, "value", "data");
  const { selectedValues, handleSelectChange } = useMultiSelect<number>();

  const { selectedRows: s_1, toggleRowsSelection: t_1 } =
    useMultiRowSelection();
  const { selectedRows: s_3, toggleRowsSelection: t_3 } =
    useMultiRowSelection();

  const topicPopupInfo = {
    url: PathConstants.Call.TopicRegistration,
    windowName: "구성원 메뉴 권한 등록 및 수정",
  };

  const { selectedRow, toggleRowSelection } = useSingleRowSelection(); // 행 단일 선택, 배경색 변함

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const { toggle, onChange: setToggle } = useToggleButtton({
    defaultValue: true,
  });

  const { selectListData, selectValue, handleChange } = useSelect(
    selectTestData,
    "value",
    "data"
  );
  //useMultiRowSelection 분리해서 각 테이블에 독립적으로 selectedRows와 toggleRowsSelection을 전달하여 동작이 분리되도록 설정.
  // 권한 메뉴 - 선택 상태 관리
  const {
    selectedRows: authorizedSelectedRows,
    toggleRowsSelection: toggleAuthorizedRowsSelection,
  } = useMultiRowSelection();

  // 미권한 메뉴 - 선택 상태 관리
  const {
    selectedRows: nonPermissionMenuListSelectedRows,
    toggleRowsSelection: togglenonPermissionMenuListRowsSelection,
  } = useMultiRowSelection();

  useEffect(() => {
    setMenuListReqData((prev) => ({
      ...prev,
      userNo : userNo || "",
      sptNo : sptNo || "",
    }))
  },[userNo, sptNo])

  useEffect(() => {
    if (data?.data.contents) {
      setMemberAuthDetail(data.data.contents);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (memberAuthDetail) {
      setSptNo(memberAuthDetail.sptNo);
      setUserNm(memberAuthDetail.userNm);
      setConstntUserNo(memberAuthDetail.constntUserNo);
      setUserConstntSeCd(memberAuthDetail.userConstntSeCd)
      setRspofcCd(memberAuthDetail.rspofcCd)
      setRspofcNm(memberAuthDetail.rspofcNm)
      setRmk(memberAuthDetail.rmk)
    }

  }, [memberAuthDetail]);

  useEffect(() => {
    if(nonPermissionMenuList?.data.contents) {
      setNonPermissionMenuListData(nonPermissionMenuList.data.contents);
    }
  },[nonPermissionMenuList]);

  useEffect(() => {
    if(permissionMenuList?.data.contents) {
      setPermissionMenuListData(permissionMenuList.data.contents)
    }
  },[permissionMenuList])

  //권한 -> 미권한
  const handleNonPermission = () => {
    const slutnIdList = Array.from(authorizedSelectedRows);

    const requestData = {
      sptNo: sptNo || "",
      userNo: userNo || "",
      userId: loginId || "",
      slutnIdList
    };

    console.log("보낼 데이터 확인 : ", requestData);

    nonPermissionInsertAPI.mutate(
      {body : requestData},
      {
        onSuccess: (response) => {
          if (response.data.result === "SUCCESS") {
            console.log("response.data", response.data);
            refetchPermissionMenuList();
            refetchNonPermissionMenuList();
          }
        }
      }
    )

  };

  //미권한 -> 권한
  const handlePermission = () => {
    const constntLisneList = Array.from(nonPermissionMenuListSelectedRows);

    const requestData = {
      sptNo: sptNo || "",
      userNo: userNo || "",
      userId: loginId || "",
      constntLisneList
    };

    //console.log("requestData", requestData);

    permissionInsertAPI.mutate(
      {body : requestData},
      {
        onSuccess: (response) => {
          if (response.data.result === "SUCCESS") {
            console.log("response.data", response.data);
            refetchPermissionMenuList();
            refetchNonPermissionMenuList();
          }
        }
      }
    )
  };
 
  return (
    <Stack
      width={"100%"}
      height={"100%"}
      bgcolor={"white"}
      justifyContent={"space-between"}
    >
      {/* 구성원 정보 */}
      <Stack width={"100%"} height={"100%"} gap={1}>
        <Stack width={"100%"} height={"10%"}>
          <Stack bgcolor={"primary.A100"} direction={"row"} paddingLeft={1}>
            <Stack
              width={"100%"}
              alignItems={"center"}
              borderRight={1}
              borderColor={"primary.100"}
              padding={1}
            >
              <Typography>구성원ID</Typography>
            </Stack>
            <Stack
              width={"100%"}
              alignItems={"center"}
              borderRight={1}
              borderColor={"primary.100"}
              padding={1}
            >
              <Typography>구성원이름</Typography>
            </Stack>
            <Stack
              width={"100%"}
              alignItems={"center"}
              borderRight={1}
              borderColor={"primary.100"}
              padding={1}
            >
              <Typography>구성원직책</Typography>
            </Stack>
          </Stack>
          <Stack bgcolor={"white"} direction={"row"} marginLeft={1}>
            <Stack
              width={"100%"}
              alignItems={"center"}
              padding={1}
              borderRight={1}
              borderColor={"primary.100"}
            >
              <Typography>{userNo}</Typography>
            </Stack>
            <Stack
              width={"100%"}
              alignItems={"center"}
              padding={1}
              borderRight={1}
              borderColor={"primary.100"}
            >
              <Typography>{userNm}</Typography>
            </Stack>
            <Stack
              width={"100%"}
              alignItems={"center"}
              padding={1}
              borderRight={1}
              borderColor={"primary.100"}
            >
              <Typography>{rspofcNm}</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          gap={1} width={"100%"} bgcolor={"white"} direction="row" height={"90%"} // 화면 크기에 맞추기
          overflow="hidden"
        >
          {/* 권한 메뉴 테이블 */}
          <Stack
            width={"50%"}
            height="100%"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <GrayBox style={{ flexShrink: 0, padding: "8px 16px" }}>
              <Typography fontWeight={"bold"}>권한 메뉴</Typography>
            </GrayBox>
            <div style={{ flex: 1, overflow: "auto" }}>
              <TableBox>
                <TableBox.Inner>
                  <CheckboxTable
                    data={permissionMenuList?.data.contents || []}
                    selectedRows={authorizedSelectedRows}
                    toggleRowsSelection={toggleAuthorizedRowsSelection}
                  >
                    <CheckboxTable.Thead>
                      <CheckboxTable.Tr>
                        <CheckboxTable.CheckboxTh keyName="menuId" />
                        <CheckboxTable.Th>솔루션ID</CheckboxTable.Th>
                        <CheckboxTable.Th>솔루션이름</CheckboxTable.Th>
                        <CheckboxTable.Th>메뉴ID</CheckboxTable.Th>
                        <CheckboxTable.Th>메뉴이름</CheckboxTable.Th>
                      </CheckboxTable.Tr>
                    </CheckboxTable.Thead>
                    <CheckboxTable.Tbody>
                      {(permissionMenuList?.data.contents || []).map((item) => (
                        <CheckboxTable.Tr key={item.menuId} id={item.menuId}>
                          <CheckboxTable.CheckboxTd item={item} keyName="menuId" />
                          <CheckboxTable.Td>{item.slutnId}</CheckboxTable.Td>
                          <CheckboxTable.Td>{item.slutnNm}</CheckboxTable.Td>
                          <CheckboxTable.Td>{item.menuId}</CheckboxTable.Td>
                          <CheckboxTable.Td>{item.menuNm}</CheckboxTable.Td>
                        </CheckboxTable.Tr>
                      ))}
                    </CheckboxTable.Tbody>
                  </CheckboxTable>
                </TableBox.Inner>
              </TableBox>
            </div>
          </Stack>
          <Stack
            width={"2%"}
            bgcolor={"white"}
            justifyContent={"space-between"}
          >
            <BasicButton
              sx={{
                backgroundColor: "primary.A100",
                height: "150px",
                width: "100%",
                padding: "0",
                margin: "0",
                minWidth: "unset", // 기본 minWidth 해제
              }}
              onClick={handleNonPermission}
            >
              <BiChevronRight size={"24px"} />
            </BasicButton>
            <BasicButton
              sx={{
                backgroundColor: "primary.A100",
                height: "150px",
                width: "100%",
                padding: "0",
                margin: "0",
                minWidth: "unset", // 기본 minWidth 해제
              }}
              onClick={handlePermission}
            >
              <BiChevronLeft size={"24px"} />
            </BasicButton>
          </Stack>
          {/* 미권한 메뉴 테이블 */}
          <Stack
            width={"50%"}
            height="100%"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <GrayBox style={{ flexShrink: 0, padding: "8px 16px" }}>
              <Typography fontWeight={"bold"}>미권한 메뉴</Typography>
            </GrayBox>
            <div style={{ flex: 1, overflow: "auto" }}>
              <TableBox>
                <TableBox.Inner>
                  <CheckboxTable
                    data={nonPermissionMenuList?.data?.contents || []}
                    selectedRows={nonPermissionMenuListSelectedRows}
                    toggleRowsSelection={togglenonPermissionMenuListRowsSelection}
                  >
                    <CheckboxTable.Thead>
                      <CheckboxTable.Tr>
                        <CheckboxTable.CheckboxTh keyName="menuId" />
                        <CheckboxTable.Th>솔루션ID</CheckboxTable.Th>
                        <CheckboxTable.Th>솔루션이름</CheckboxTable.Th>
                        <CheckboxTable.Th>메뉴ID</CheckboxTable.Th>
                        <CheckboxTable.Th>메뉴이름</CheckboxTable.Th>
                      </CheckboxTable.Tr>
                    </CheckboxTable.Thead>

                    <CheckboxTable.Tbody>
                      {(nonPermissionMenuList?.data?.contents || []).map((item) => (
                        <CheckboxTable.Tr key={item.menuId} id={item.menuId}>
                          <CheckboxTable.CheckboxTd item={item} keyName="menuId" />
                          <CheckboxTable.Td>{item.slutnId}</CheckboxTable.Td>
                          <CheckboxTable.Td>{item.slutnNm}</CheckboxTable.Td>
                          <CheckboxTable.Td>{item.menuId}</CheckboxTable.Td>
                          <CheckboxTable.Td>{item.menuNm}</CheckboxTable.Td>
                        </CheckboxTable.Tr>
                      ))}
                    </CheckboxTable.Tbody>
                  </CheckboxTable>
                </TableBox.Inner>
              </TableBox>
            </div>
          </Stack>
        </Stack>
        <GrayBox
          style={{ flexShrink: 0, padding: "8px 16px" }}
          gap={2}
          justifyContent={"end"}
        >
          <BasicButton onClick={() => window.close()}>저장</BasicButton>
          <BasicButton onClick={() => window.close()}>취소</BasicButton>
        </GrayBox>
      </Stack>
    </Stack>
  );
}
