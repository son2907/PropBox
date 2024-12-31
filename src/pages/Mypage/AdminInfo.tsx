import { Box, Stack, Typography } from "@mui/material";
import SearchInput from "../../components/Input/SearchInput";
import { BasicButton, IconButton } from "../../components/Button";
import { IoIosAddCircleOutline } from "react-icons/io";
import TableBox from "../../components/Box/TableBox";
import CheckboxTable from "../../components/Table/CheckboxTable";
import { tableTestData } from "../../utils/testData";
import { RiDeleteBinLine } from "react-icons/ri";
import { useMultiRowSelection } from "../../hooks/useMultiRowSelection";
import PathConstants from "../../routers/path";
import { useRef, useState } from "react";
import { openPopup } from "../../utils/openPopup";
import BasicInput from "../../components/Input/BasicInput";
import PasswordInput from "../../components/Input/PasswordInput";
import DeleteBtnInput from "../../components/Input/DeleteBtnInput";
import { useAuthStore } from "../../stores/authStore";



export default function AdminInfoPopup() {

  //api를 호출하기위해 userID 불러오기
  const { loginId } = useAuthStore(["loginId"]);

  const [userCode, setUserCode] = useState("1");

  const Mypagepopup = {
    url: PathConstants.MyPage.AdminInfoPopup,
    windowName: "내정보 관리",
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      //handleSubmit(onSubmit)();
      console.log("입력완!!");
    }
  };

  return (
    <>
      <Stack bgcolor={"white"} width={"100%"} height={"100%"} padding={"5%"} justifyContent={"space-between"}>
        <Stack padding={1} width={"100%"} height={"100%"} gap={1}>
          <Stack width={"100%"} gap={1}>
            <Typography fontSize={"19px"}>
              아이디
            </Typography>
            <BasicInput
              sx={{ height: "50px" }}
              placeholder="아이디 입력"
              fullWidth
              onKeyDown={handleKeyDown}
              name="pwdNo"
              autoComplete="current-password"
            //error={""}
            />
          </Stack>
          <Stack width={"100%"} gap={1}>
            <Typography fontSize={"19px"}>
              비밀번호
            </Typography>
            <PasswordInput
              sx={{ height: "50px" }}
              placeholder="비밀번호를 입력하세요"
              fullWidth
              onKeyDown={handleKeyDown}
              name="pwdNo"
              autoComplete="current-password"
            //error={""}
            />
          </Stack>
          <Stack width={"100%"} gap={1}>
            <Typography fontSize={"19px"}>
              비밀번호 확인
            </Typography>
            <PasswordInput
              sx={{ height: "50px" }}
              placeholder="비밀번호를 입력하세요"
              fullWidth
              onKeyDown={handleKeyDown}
              name="pwdNo"
              autoComplete="current-password"
            //error={""}
            />
          </Stack>
        </Stack>
        <Stack direction={"row"} gap={1}>
          <BasicButton sx={{ width: "100%" }}>취소</BasicButton>
          <BasicButton
            sx={{ width: "100%" }}
          >확인</BasicButton>
        </Stack>
      </Stack>
    </>
  );
}
