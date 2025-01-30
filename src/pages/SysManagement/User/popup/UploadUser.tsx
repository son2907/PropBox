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
import useModal from "../../../../hooks/useModal";
import { ConfirmDeleteModal } from "../../../../components/layout/modal/ConfirmDeleteModal";
import { deleteUser, insertUser, useUserDetail } from "../../../../api/userList";
import { DeleteCompletedModal } from "../../../../components/layout/modal/DeleteCompletedModal";
import { UserDetailType, UserInsertType } from "../../../../types/userList";
import { PasswordCheckErrorModal } from "../../../../components/layout/modal/PasswordCheckErrorModal";
import { InsertCompletedModal } from "../../../../components/layout/modal/InsertCompletedModal";

interface Data {
  id: string;
  [key: string]: any;
}

export default function UserUpload() {

  //팝업 페이지에서 id를 가져오려면 window.location.search를 사용하여 파라미터를 파싱
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  //console.log("id : ", id);

  //모달
  const { openModal, closeModal } = useModal();

  //사용자 추가
  const userInsertAPI = insertUser();

  // 사용자 상세 조회
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [prefix, setPrefix] = useState("");
  const [isUse, setIsUse] = useState(true);
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

  const topicPopupInfo = {
    url: PathConstants.Call.TopicRegistration,
    windowName: "사용자 등록 및 수정",
  };

  const { toggle, onChange: setToggle } = useToggleButtton({
    defaultValue: true,
  });

  const { selectListData, selectValue, handleChange } = useSelect(
    selectTestData,
    "value",
    "data"
  );

  //const { mutate: userInsertAPI } = insertUser({ body: userInsertData })

  const handleSubmit = () => {

    const userInsertData: UserInsertType = {
      user: {
        userNo: "", // 사용자 번호 (비워두거나 기본값)
        userNm: userName, // 사용자 이름 (입력받은 값)
        loginId: userID, // 로그인 ID (입력받은 값)
        constntUserNo: "0", // 담당자 번호 (필요시 입력)
        userConstntSeCd: "1002010", // 사용자 구분 코드
        loginIdPrefix: prefix, // 구성원 PREFIX
        encptUserNm: "", // 암호화된 사용자 이름 (필요한 경우)
        attlistUserNm: "", // 첨부 사용자 이름 (필요한 경우)
        pwdNo: password, // 비밀번호 (입력받은 값)
        mbtlNo: phoneNum, // 휴대전화 번호 (입력받은 값)
        attlistMbtlNo: "", // 첨부된 휴대전화 번호 (필요한 경우)
        encptMbtlNo: "", // 암호화된 휴대전화 번호 (필요한 경우)
        advrtsAgreYn: "", // 광고 동의 여부 (기본값 또는 입력받은 값)
        advrtsAgreDttm: new Date().toISOString(), // 광고 동의 일시
        delYn: "N", // 삭제 여부 (기본값 N)
        rmk: rmk, // 비고 (입력받은 값)
        userId: userID, // 사용자 ID (생성 시 서버에서 처리 가능)
      },
      cmpny: {
        userNo: "", // 사용자 번호 (서버 처리)
        cmpnm: companyName, // 회사 이름 (입력받은 값)
        bizrno: companyNum, // 사업자 번호 (입력받은 값)
        rprsntvNm: "", // 대표자 이름 (필요한 경우)
        adres1: address, // 주소 1 (입력받은 값)
        adres2: "", // 주소 2 (필요한 경우)
        reprsntTelno: "", // 대표 전화 번호 (필요한 경우)
        fxnum: "", // 팩스 번호 (필요한 경우)
        rmk: rmk, // 비고 (입력받은 값)
        useYn: isUse ? "Y" : "N", // 사용 여부 (입력받은 값)
        userId: "", // 사용자 ID (서버 처리 가능)
      },
    };

    if(password == passwordCheck) {
      console.log("데이터 확인좀 : ",userInsertData);
      userInsertAPI.mutate(
        {body: userInsertData},
        {
          onSuccess: (response) => {
            if(response.data.message === "SUCCESS") {
              console.log("response.data", response.data);
              insertCompletedModal();
            }
          }
        }
      )
    } else {
      passwordCheckModal()
    }
  };

  const passwordCheckModal = () => {
    openModal(PasswordCheckErrorModal, {
      modalId : "passwordcheck",
      stack: false,  //단일 모달 모드
      onClose: () => closeModal,
      onSubmit: () => closeModal
    })
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
          <Typography>사용자아이디</Typography>
          <BasicInput
            sx={{ width: "80%" }}
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            placeholder={"사용자 아이디"}
          ></BasicInput>
        </Stack>
        <Stack
          direction={"row"}
          gap={1}
          marginTop={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>비밀번호</Typography>
          <PasswordInput
            sx={{ width: "80%" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"비밀번호"}
          />
        </Stack>
        <Stack
          direction={"row"}
          gap={1}
          marginTop={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>비밀번호 확인</Typography>
          <PasswordInput
            sx={{ width: "80%" }}
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            placeholder={"비밀번호 확인"}
          />
        </Stack>
        <Stack
          direction={"row"}
          gap={1}
          marginTop={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>사용자이름</Typography>
          <BasicInput
            sx={{ width: "80%" }}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder={"사용자 이름"}
          />
        </Stack>
        <Stack
          direction={"row"}
          gap={1}
          marginTop={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>휴대전화</Typography>
          <BasicInput
            sx={{ width: "80%" }}
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
            placeholder={"휴대전화"}
          ></BasicInput>
        </Stack>
        <Stack
          direction={"row"}
          gap={1}
          marginTop={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>구성원 PREFIX</Typography>
          <BasicInput
            sx={{ width: "80%" }}
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            placeholder={"구성원 PREFIX"}
          ></BasicInput>
        </Stack>
        <Stack direction={"row"} gap={5} marginTop={1} alignItems={"center"}>
          <Typography>사용여부</Typography>
          <ToggleButton
            checked={isUse}
            onChange={(e) => {
              const newValue = e.target.checked; // Toggle 버튼의 변경된 값
              setIsUse(newValue); // solutionIsUes 상태 업데이트
              console.log("solutionIsUes 값 변경:", newValue); // 콘솔 출력
            }}
            label="" />
        </Stack>
        <Stack
          direction={"row"}
          gap={1}
          marginTop={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>회사 이름</Typography>
          <BasicInput
            sx={{ width: "80%" }}
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder={"회사 이름"}
          ></BasicInput>
        </Stack>
        <Stack
          direction={"row"}
          gap={1}
          marginTop={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>주소</Typography>
          <BasicInput
            sx={{ width: "80%" }}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={"주소"}
          ></BasicInput>
        </Stack>
        <Stack
          direction={"row"}
          gap={1}
          marginTop={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>사업자번호</Typography>
          <BasicInput
            sx={{ width: "80%" }}
            value={companyNum}
            onChange={(e) => setCompanyNum(e.target.value)}
            placeholder={"사업자번호"}
          ></BasicInput>
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
        <BasicButton onClick={handleSubmit}>확인</BasicButton>
        <BasicButton onClick={() => window.close()}>취소</BasicButton>
      </GrayBox>
    </Stack>
  );
}
