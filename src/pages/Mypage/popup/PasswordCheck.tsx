import { Box, Stack, Typography } from "@mui/material";
import SearchInput from "../../../components/Input/SearchInput";
import { BasicButton } from "../../../components/Button";
import PathConstants from "../../../routers/path";
import PasswordInput from "../../../components/Input/PasswordInput";
import { openPopup } from "../../../utils/openPopup";
import { useState } from "react";

export default function PasswordCheck() {

  const [userCode, setUserCode] = useState("2");

  const passwordCheck = {
    url: PathConstants.MyPage.PasswordCheck,
    windowName: "passwordCheck",
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      //handleSubmit(onSubmit)();
      console.log("비밀번호입력함!");
    }
  };

  //내정보 관리 팝업 - 사용자 또는 구성원일경우
  const UserInfoPopup = {
    url: PathConstants.MyPage.UserInfoPopup,
    windowName: "내정보 관리",
    //windowFeatures: "width=400,height=1000,scrollbars=yes,resizable=yes",
    windowFeatures: "width=400,height=830,resizable=yes",
  };

  //내정보 관리 팝업 - 시스템 관리자
  const AdminInfoPopup = {
    url: PathConstants.MyPage.AdminInfoPopup,
    windowName: "내정보 관리",
    //windowFeatures: "width=400,height=1000,scrollbars=yes,resizable=yes",
    windowFeatures: "width=400,height=400,resizable=yes",
  };

  return (
    <>
      <Stack bgcolor={"white"} width={"100%"} height={"100%"} padding={"5%"} justifyContent={"space-between"}>
        <Stack width={"100%"} height={"28%"} gap={1}>
          <Typography>
            비밀번호 확인
          </Typography>
          <PasswordInput
            placeholder="비밀번호를 입력하세요"
            fullWidth
            onKeyDown={handleKeyDown}
            name="pwdNo"
            autoComplete="current-password"
          //error={""}
          />
        </Stack>
        <Stack direction={"row"} gap={1}>
          <BasicButton sx={{width:"100%"}}>취소</BasicButton>
          <BasicButton
           sx={{width:"100%"}} 
           onClick={() => {
            if(userCode == "1") {
              openPopup({
                url: AdminInfoPopup.url,
                windowName: AdminInfoPopup.windowName,
                windowFeatures: AdminInfoPopup.windowFeatures,
              });
            } else {
              openPopup({
                url: UserInfoPopup.url,
                windowName: UserInfoPopup.windowName,
                windowFeatures: UserInfoPopup.windowFeatures,
              });
            }
          }}
           >확인</BasicButton>
        </Stack>
      </Stack>
    </>
  );
}
