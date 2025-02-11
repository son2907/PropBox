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
import { useState } from "react";
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
import useModal from "../../../../hooks/useModal";
import { localInsert } from "../../../../api/localManagement";
import { LocalInsertType } from "../../../../types/localManagementType";
import { useAuthStore } from "../../../../stores/authStore";
import { InsertCompletedModal } from "../../../../components/layout/modal/InsertCompletedModal";

interface Data {
  id: string;
  [key: string]: any;
}

interface FormData {
  localId: string;
  localName: string;
  startDate: string;
  endDate: string;
  isUse: string;
  rmk: string;
  progrsSeCd: string,
}

//현장등록
export default function LocalRegistration() {

  //팝업 페이지에서 id를 가져오려면 window.location.search를 사용하여 파라미터를 파싱
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  console.log("id : ", id);

  //api를 호출하기위해 userID 불러오기
  const { loginId } = useAuthStore(["loginId"]);
  const { userNm } = useAuthStore(["userNm"]);

  // 현장 추가
  const [localId, setLocalId] = useState("");
  const [localCode, setLocalCode] = useState("");
  const [localName, setLocalName] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date());  //시작일
  const [endDate, setEndDate] = useState<Date>(new Date());  //종료일
  const [isUse, setIsUse] = useState(true);
  const [progrsSeCd, setProgrsSeCd] = useState("");
  const [rmk, setRmk] = useState("");



  //모달
  const { openModal, closeModal } = useModal();

  const selectData = [
    { value: "1003005", data: "진행" },
    { value: "1003099", data: "종료" },
  ];

  const {
    selectListData: sd_1,
    selectValue: s_1,
    handleChange: o_1,
  } = useSelect(selectData, "value", "data");

  const { selectedValues, handleSelectChange } = useMultiSelect<number>();
  const [data, setData] = useState<Data[]>(tableTestData);

  //현장 추가
  const insertLocalAPI = localInsert();


  const localRegistration = {
    url: PathConstants.System.LocalRegistration,
    windowName: "현장 등록 및 수정",
  };

  const { selectedRow, toggleRowSelection } = useSingleRowSelection(); // 행 단일 선택, 배경색 변함

  //날짜 형식 재정의
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };


  const { toggle, onChange: setToggle } = useToggleButtton({
    defaultValue: true,
  });

  const { selectListData, selectValue, handleChange } = useSelect(
    selectTestData,
    "value",
    "data"
  );

  const handleIsUseChange = (value) => {
    // setLocalListReqData((prev) => ({
    //   ...prev,
    //   progrsSeCd: value, // 선택한 값으로 isUse 업데이트
    // }));
    setProgrsSeCd(value);
    console.log("선택값은? :", value)
  };

  //현장 추가를 위한 데이터
  const handleInsert = () => {

    //api 호출시 전달할 데이터
    const localInsertData: LocalInsertType = {
      sptNo: localId,
      userNo: id || "",
      sptNm: localName,
      progrsSeCd: progrsSeCd,
      useYn: isUse ? "Y" : "N",
      cntrctBgnde: formatDate(startDate),
      cntrctEndde: formatDate(endDate),
      rmk: rmk,
      storeCd: localCode,
      userId: loginId || "",
    };

    if (localName) {
      console.log("전달 데이터 확인", localInsertData);
      insertLocalAPI.mutate(
        { body: localInsertData },
        {
          onSuccess: (response) => {
            if (response.data.message === "SUCCESS") {
              console.log("response.data", response.data);
              insertCompletedModal();
            }
          }
        }
      )
    }
  };

  // 추가 완료 모달
  const insertCompletedModal = () => {
    openModal(InsertCompletedModal, {
      modalId: "InsertCompletedModal",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        window.close();
        // 이전 창 새로 고침
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
          <Typography>현장아이디</Typography>
          <BasicInput
            sx={{ width: "80%" }}
            value={localId}
            onChange={(e) => setLocalId(e.target.value)}
            placeholder={"현장아이디"}
          />
        </Stack>
        <Stack
          direction={"row"}
          gap={1}
          marginTop={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>현장상점코드</Typography>
          <BasicInput
            sx={{ width: "80%" }}
            value={localCode}
            onChange={(e) => setLocalCode(e.target.value)}
            placeholder={"현장상점코드"}
          />
        </Stack>
        <Stack
          direction={"row"}
          gap={1}
          marginTop={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>현장이름</Typography>
          <BasicInput
            sx={{ width: "80%" }}
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            placeholder={"현장이름"}
          ></BasicInput>
        </Stack>
        <Stack
          direction={"row"}
          gap={1}
          marginTop={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>사용시기</Typography>
          <Box width={"80%"}>
            <Calendar selectedDate={startDate} setSelectedDate={setStartDate} />
          </Box>
        </Stack>
        <Stack
          direction={"row"}
          gap={1}
          marginTop={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>사용종료</Typography>
          <Box width={"80%"}>
            <Calendar selectedDate={endDate} setSelectedDate={setEndDate} />
          </Box>
        </Stack>
        <Stack direction={"row"} gap={5} marginTop={1} alignItems={"center"}>
          <Typography>사용여부</Typography>
          <ToggleButton
            checked={isUse}
            onChange={(e) => {
              const newValue = e.target.checked; // Toggle 버튼의 변경된 값
              setIsUse(newValue); // solutionIsUes 상태 업데이트
              console.log("IsUes 값 변경:", newValue); // 콘솔 출력
            }}
            label=""
          />
        </Stack>
        <Stack
          direction={"row"}
          gap={1}
          marginTop={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>구분</Typography>
          <Box width={"80%"}>
            <Select
              value={s_1}
              onChange={(event) => {
                const selectedValue = event.target.value;
                o_1(event); // 기존의 handleChange 호출
                console.log("구분선택 값:", selectedValue);
                handleIsUseChange(selectedValue); // isUse 값 업데이트
              }}
              selectData={sd_1}
              sx={{ width: "204px" }}
              placeholder="종료 구분 선택"
              defaultValue={""}
            />
          </Box>
        </Stack>
        <Stack
          direction={"row"}
          gap={1}
          marginTop={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>비고</Typography>
          <BasicInput
            sx={{ width: "80%" }}
            value={rmk}
            onChange={(e) => setRmk(e.target.value)}
            placeholder={"비고"}
          ></BasicInput>
        </Stack>
      </Stack>
      <GrayBox width={"100%"} gap={1} justifyContent={"end"}>
        <BasicButton onClick={handleInsert}>확인</BasicButton>
        <BasicButton>취소</BasicButton>
      </GrayBox>
    </Stack>
  );
}
