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
import { useAuthStore } from "../../../../stores/authStore";
import { nonPermissionMenuInsert, permissionRevoke } from "../../../../api/authManagement";
import { PermissionRevokeType } from "../../../../types/authManagement";
import useModal from "../../../../hooks/useModal";
import { RevokeCompletedModal } from "../../../../components/layout/modal/RevokeCompletedModal";
import { EmptyDataModal } from "../../../../components/layout/modal/EmptyDataModal";
import { EmptySelectModal } from "../../../../components/layout/modal/EmptySelectModal";

interface Data {
  id: string;
  [key: string]: any;
}

export default function PermissionRevoke() {
  // 팝업 페이지에서 파라미터 파싱
  const queryParams = new URLSearchParams(window.location.search);
  const userNo = queryParams.get("userNo");
  const sptNo = queryParams.get("sptNo");
  const slutnIdParam = queryParams.get("slutnId");

  // slutnId 문자열을 배열로 변환
  const slutnIds = slutnIdParam ? slutnIdParam.split(',') : [];

  console.log("팝업으로 가져온 데이터:", { userNo, sptNo, slutnIds });

  //api를 호출하기위해 userID 불러오기
  const { loginId } = useAuthStore(["loginId"]);

  //권한 회수
  const permissionReovekAPI = permissionRevoke();

    //모달
    const { openModal, closeModal } = useModal();

  const {
    selectListData: sd_0,
    selectValue: s_0,
    handleChange: o_0,
  } = useSelect(selectTestData, "value", "data");

  const { selectedValues, handleSelectChange } = useMultiSelect<number>();
  const [revokeReason, setRevokeReason] = useState("");

  const topicPopupInfo = {
    url: PathConstants.Call.TopicRegistration,
    windowName: "현장 등록 및 수정",
  };

  //회수 사유 api 데이터 전달
  const handleRevoke = () => {
    const requestData: PermissionRevokeType = {
      sptNo: sptNo || "",
      userNo: userNo || "",
      resn: revokeReason,
      userId: loginId || "",
      slutnIdList: slutnIds.map((id) => ({ slutnId: id })) // 변환된 배열
    };

    console.log("보낼 데이터 확인좀: ", requestData);

    if (revokeReason !== "") {
      permissionReovekAPI.mutate(
        { body: requestData },
        {
          onSuccess: (response) => {
            if(response.data.message === "SUCCESS") {
              console.log("response.data", response.data);
              revokeCompletedModal();
            }
          }
        }
      )
    } else {
      emptyDataModal();
    }
  };


  const revokeCompletedModal = () => {
    openModal(RevokeCompletedModal, {
      modalId: "RevokeCompletedModal",
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

  const emptyDataModal = () => {
    openModal(EmptyDataModal, {
      modalId: "EmptyDataModal",
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
          <BasicInput sx={{ width: "80%" }} value={loginId} disabled></BasicInput>
        </Stack>
        <Stack
          direction={"row"}
          gap={1}
          marginTop={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>회수사유</Typography>
          <BasicInput
            sx={{ width: "80%", height: "100px" }}
            value={revokeReason}
            onChange={(e) => setRevokeReason(e.target.value)}
            placeholder={"회수사유"}
          ></BasicInput>
        </Stack>
      </Stack>
      <GrayBox width={"100%"}>
        <Box sx={{ marginLeft: "auto" }}>
          <BasicButton onClick={handleRevoke}>저장</BasicButton>
        </Box>
      </GrayBox>
    </Stack>
  );
}
