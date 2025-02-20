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
import { BiChevronLeft } from "react-icons/bi";
import SearchInput from "../../../../components/Input/SearchInput";
import { useAuthStore } from "../../../../stores/authStore";
import {
  getMemberAuthDetail,
  permissionMenuCopy,
  permissionMenuCopyList,
} from "../../../../api/authManagement";
import {
  MemberAuthDetailType,
  PermissionMenuListType,
} from "../../../../types/authManagement";
import { useMemberPositionList } from "../../../../api/localManagement";
import { MemberPositionType } from "../../../../types/localManagementType";
import useModal from "../../../../hooks/useModal";
import { BasicCompletedModl } from "../../../../components/Modal/modal/BasicCompletedModl";
import { InsertCompletedModal } from "../../../../components/Modal/modal/InsertCompletedModal";

interface Data {
  id: string;
  [key: string]: any;
}

export default function MenuPermissionCopy() {
  //팝업 페이지에서 id를 가져오려면 window.location.search를 사용하여 파라미터를 파싱
  const queryParams = new URLSearchParams(window.location.search);
  const userNo = queryParams.get("userNo");
  const sptNo = queryParams.get("sptNo");
  console.log("팝업으로 가져온 데이터 : ", sptNo);

  //api를 호출하기위해 userID 불러오기
  const { loginId } = useAuthStore(["loginId"]);

  //모달
  const { openModal, closeModal } = useModal();

  //권한 복사
  const permissionMenuCopyAPI = permissionMenuCopy();

  //상세 조회
  const [menuListReqData, setMenuListReqData] = useState({
    userNo: "",
    sptNo: "",
  });
  const { isSuccess, data } = getMemberAuthDetail(menuListReqData);
  const [memberAuthDetail, setMemberAuthDetail] =
    useState<MemberAuthDetailType>();
  const [sptNum, setSptNo] = useState("");
  const [userNm, setUserNm] = useState("");
  const [constntUserNo, setConstntUserNo] = useState("");
  const [userConstntSeCd, setUserConstntSeCd] = useState("");
  const [rspofcCd, setRspofcCd] = useState("");
  const [rspofcNm, setRspofcNm] = useState("");
  const [rmk, setRmk] = useState("");

  //구성원 직책 리스트
  const { data: memberPositionListData, isSuccess: isMemberPositionListData } =
    useMemberPositionList("1004000");
  const [memberPositionList, setMemberPositionList] = useState<
    MemberPositionType[]
  >([]);
  const [memberPositionKey, setMemberPositionKey] = useState("");
  const [memberPositionValue, setMemberPositionValue] = useState("");

  useEffect(() => {
    if (memberPositionListData?.data.contents) {
      setMemberPositionList(memberPositionListData.data.contents);
    }
  }, [memberPositionListData]);

  const { selectListData, selectValue, handleChange } = useSelect(
    memberPositionList,
    "cd",
    "cdNm"
  );

  //목록
  const [menuSearchInput, setMenuSearchInput] = useState("");
  const [menuCopyListReqData, setMenuCopyListReqData] = useState({
    sptNo: "",
    userNo: "",
    userNm: "",
    rspofcCd: "",
  });
  const { data: menuCopyList, refetch: refetchMenuCopyList } =
    permissionMenuCopyList(menuCopyListReqData);
  const [menuCopyListData, setMenuCopyListData] = useState<
    PermissionMenuListType[]
  >([]);

  const { selectedValues, handleSelectChange } = useMultiSelect<number>();

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

  //useMultiRowSelection 분리해서 각 테이블에 독립적으로 selectedRows와 toggleRowsSelection을 전달하여 동작이 분리되도록 설정.
  // 권한 메뉴 - 선택 상태 관리
  const {
    selectedRows: authorizedSelectedRows,
    toggleRowsSelection: toggleAuthorizedRowsSelection,
  } = useMultiRowSelection();

  useEffect(() => {
    setMenuListReqData((prev) => ({
      ...prev,
      userNo: userNo || "",
      sptNo: sptNo || "",
    }));
  }, [userNo, sptNo]);

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
      setUserConstntSeCd(memberAuthDetail.userConstntSeCd);
      setRspofcCd(memberAuthDetail.rspofcCd);
      setRspofcNm(memberAuthDetail.rspofcNm);
      setRmk(memberAuthDetail.rmk);
    }
  }, [memberAuthDetail]);

  useEffect(() => {
    setMenuCopyListReqData((prev) => ({
      ...prev,
      sptNo: sptNo || "",
      userNo: userNo || "",
      userNm: menuSearchInput || "",
      rspofcCd: memberPositionKey,
    }));
  }, [memberPositionKey, memberPositionValue]);

  const handleLocalSearch = () => {
    setMenuCopyListReqData((prev) => ({
      ...prev,
      sptNo: sptNo || "",
      userNo: userNo || "",
      userNm: menuSearchInput || "",
      rspofcCd: memberPositionKey,
    }));
  };

  useEffect(() => {
    if (menuCopyList?.data?.contents) {
      setMenuCopyListData(menuCopyList.data.contents);
    }
  }, [menuCopyList]);

  //권한 복사
  const handlePermissionCopy = () => {
    const userList = Array.from(authorizedSelectedRows);

    const requestData = {
      sptNo: sptNo || "",
      userId: loginId || "",
      userNo: userNo || "",
      userList,
    };

    //console.log("requestData", requestData);

    permissionMenuCopyAPI.mutate(
      { body: requestData },
      {
        onSuccess: (response) => {
          if (response.data.result === "SUCCESS") {
            console.log("response.data", response.data);
            completeModal();
          }
        },
      }
    );
  };

  const completeModal = () => {
    openModal(InsertCompletedModal, {
      modalId: "emptySelectModal",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        window.close();
        if (window.opener) {
          window.opener.location.reload();
        }
      },
    });
  };

  return (
    <Stack
      width={"100%"}
      height={"100%"}
      bgcolor={"white"}
      justifyContent={"space-between"}
    >
      {/* 구성원 정보 */}
      <Stack height={"92%"}>
        <Stack>
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
          marginTop={0.2}
          gap={1}
          width={"100%"}
          bgcolor={"white"}
          direction="row"
          height={"100%"} // 화면 크기에 맞추기
          overflow="hidden"
        >
          {/* 권한 메뉴 테이블 */}
          <Stack
            width={"100%"}
            height="100%"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <GrayBox gap={1}>
              <Select
                value={selectValue} // 선택한 값 유지
                onChange={(e) => {
                  const newValue = e.target.value; // 선택된 값 (cdNm)
                  const selectedOption = memberPositionList.find(
                    (item) => item.cdNm === newValue
                  );

                  if (selectedOption) {
                    console.log("직책변경:", selectedOption.cdNm);
                    console.log(`직책 키 변경: ${selectedOption.cd}`); // cd 콘솔 출력
                    setMemberPositionKey(selectedOption.cd);
                    setMemberPositionValue(selectedOption.cdNm);
                    handleChange(e); // selectValue를 업데이트
                  }
                }}
                selectData={memberPositionList.map((item) => ({
                  value: item.cdNm,
                  data: item.cdNm,
                }))}
                sx={{ width: "204px" }}
              />
              <SearchInput
                placeholder="구성원이름 검색"
                value={menuSearchInput}
                onChange={(e) => setMenuSearchInput(e.target.value)} // 검색어 입력값 업데이트
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleLocalSearch(); // 검색 실행 함수 호출
                  }
                }}
              />
            </GrayBox>
            <TableBox>
              <TableBox.Inner>
                <CheckboxTable
                  data={menuCopyList?.data.contents || []}
                  selectedRows={authorizedSelectedRows}
                  toggleRowsSelection={toggleAuthorizedRowsSelection}
                >
                  <CheckboxTable.Thead>
                    <CheckboxTable.Tr>
                      <CheckboxTable.CheckboxTh keyName="userNo" />
                      <CheckboxTable.Th>구성원번호</CheckboxTable.Th>
                      <CheckboxTable.Th>구성원이름</CheckboxTable.Th>
                      <CheckboxTable.Th>직책</CheckboxTable.Th>
                    </CheckboxTable.Tr>
                  </CheckboxTable.Thead>
                  <CheckboxTable.Tbody>
                    {(menuCopyList?.data.contents || []).map((item) => (
                      <CheckboxTable.Tr key={item.userNo} id={item.userNo}>
                        <CheckboxTable.CheckboxTd
                          item={item}
                          keyName="userNo"
                        />
                        <CheckboxTable.Td>{item.userNo}</CheckboxTable.Td>
                        <CheckboxTable.Td>{item.userNm}</CheckboxTable.Td>
                        <CheckboxTable.Td>{item.rspofcNm}</CheckboxTable.Td>
                      </CheckboxTable.Tr>
                    ))}
                  </CheckboxTable.Tbody>
                </CheckboxTable>
              </TableBox.Inner>
            </TableBox>
          </Stack>
        </Stack>
      </Stack>
      <GrayBox gap={2} justifyContent={"end"}>
        <BasicButton onClick={handlePermissionCopy}>권한복사</BasicButton>
        <BasicButton>취소</BasicButton>
      </GrayBox>
    </Stack>
  );
}
