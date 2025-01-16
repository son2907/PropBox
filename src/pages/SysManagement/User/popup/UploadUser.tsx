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
import PasswordInput from "../../../../components/Input/PasswordInput";
import { UserSingleDetailType, useUserSingleDetail } from "../../../../api/userSingleDetail";

interface Data {
  id: string;
  [key: string]: any;
}

export default function UserUpload() {

  //팝업 페이지에서 id를 가져오려면 window.location.search를 사용하여 파라미터를 파싱
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  console.log("id : ", id);

  // 사용자 상세 조회
  const { isSuccess, data } = useUserSingleDetail(id);
  const [userSingleDetail, setUserSingleDetail] = useState<UserSingleDetailType>();
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [prefix, setPrefix] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [rmk, setRmk] = useState("");
  const [companyNum, setCompanyNum] = useState("");

  const [isUpdate, setIsUpdate] = useState(false);  //수정을 눌러서 들어온건지 추가를 눌러서 들어온건지 확인 필요
  const {
    selectListData: sd_0,
    selectValue: s_0,
    handleChange: o_0,
  } = useSelect(selectTestData, "value", "data");

  const { selectedValues, handleSelectChange } = useMultiSelect<number>();
  //const [data, setData] = useState<Data[]>(tableTestData);

  const { selectedRows: s_1, toggleRowsSelection: t_1 } =
    useMultiRowSelection();
  const { selectedRows: s_3, toggleRowsSelection: t_3 } =
    useMultiRowSelection();

  const topicPopupInfo = {
    url: PathConstants.Call.TopicRegistration,
    windowName: "사용자 등록 및 수정",
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

  useEffect(() => {
    console.log("data확인", data);
    if (data?.data.contents) {
      setUserSingleDetail(data.data.contents);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (userSingleDetail) {
      setUserID(userSingleDetail.userId);
      setUserName(userSingleDetail.userNm);
      setPhoneNum(userSingleDetail.mbtlNo);
      setPrefix(userSingleDetail.loginIdPrefix);
      setCompanyName(userSingleDetail.encptUserNm);
      setAddress(userSingleDetail.encptUserNm);
      setRmk(userSingleDetail.rmk);
      setCompanyNum(userSingleDetail.encptMbtlNo);
    }
  })

  return (
    <Stack
      width={"100%"}
      height={"100%"}
      bgcolor={"white"}
      alignItems={"center"}
      justifyContent={"space-between"}
      alignContent={"center"}
    >
      <Stack width={"80%"}>
        <Stack
          direction={"row"}
          gap={1}
          marginTop={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>사용자아이디</Typography>
          <BasicInput
            sx={{ width: "80%" }}
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
          ></BasicInput>
        </Stack>
        <Stack
          direction={"row"}
          gap={1}
          marginTop={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>패스워드</Typography>
          <PasswordInput sx={{ width: "80%" }}></PasswordInput>
        </Stack>
        <Stack
          direction={"row"}
          gap={1}
          marginTop={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>패스워드확인</Typography>
          <PasswordInput sx={{ width: "80%" }}></PasswordInput>
        </Stack>
        <Stack
          direction={"row"}
          gap={1}
          marginTop={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>사용자이름</Typography>
          <BasicInput sx={{ width: "80%" }}></BasicInput>
        </Stack>
        <Stack
          direction={"row"}
          gap={1}
          marginTop={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>휴대전화</Typography>
          <BasicInput sx={{ width: "80%" }}></BasicInput>
        </Stack>
        <Stack
          direction={"row"}
          gap={1}
          marginTop={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>구성원 PREFIX</Typography>
          <BasicInput sx={{ width: "80%" }}></BasicInput>
        </Stack>
        <Stack direction={"row"} gap={5} marginTop={1} alignItems={"center"}>
          <Typography>사용여부</Typography>
          <ToggleButton checked={toggle} onChange={setToggle} label="" />
        </Stack>
        <Stack
          direction={"row"}
          gap={1}
          marginTop={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>회사명</Typography>
          <BasicInput sx={{ width: "80%" }}></BasicInput>
        </Stack>
        <Stack
          direction={"row"}
          gap={1}
          marginTop={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>주소</Typography>
          <BasicInput sx={{ width: "80%" }}></BasicInput>
        </Stack>
        <Stack
          direction={"row"}
          gap={1}
          marginTop={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>사업자번호</Typography>
          <BasicInput sx={{ width: "80%" }}></BasicInput>
        </Stack>
        <Stack
          direction={"row"}
          gap={1}
          marginTop={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>비고</Typography>
          <BasicInput sx={{ width: "80%" }}></BasicInput>
        </Stack>
      </Stack>
      <GrayBox width={"100%"} gap={1} justifyContent={"end"}>
        <BasicButton>확인</BasicButton>
        <BasicButton>취소</BasicButton>
      </GrayBox>
    </Stack>
  );
}
