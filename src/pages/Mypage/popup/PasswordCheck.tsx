import { Box, Stack, Typography } from "@mui/material";
import SearchInput from "../../../components/Input/SearchInput";
import { BasicButton } from "../../../components/Button";
import PathConstants from "../../../routers/path";
import PasswordInput from "../../../components/Input/PasswordInput";
import { openPopup } from "../../../utils/openPopup";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../../stores/authStore";
import { passwordCheck } from "../../../api/myInfo";
import useModal from "../../../hooks/useModal";
import { PasswordCheckErrorModal } from "../../../components/Modal/modal/PasswordCheckErrorModal";

export default function PasswordCheck() {
  //모달
  const { openModal, closeModal } = useModal();

  //api를 호출하기위해 userID 불러오기
  const { loginId } = useAuthStore(["loginId"]);
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 관리 - 사용자 검색
  const [searchInput, setSearchInput] = useState(""); // 검색 입력값 상태 관리

  // 메뉴 삭제를 위한 api
  const { mutate: passwordCheckAPI } = passwordCheck();

  const [userCode, setUserCode] = useState("2");

  const handleSearch = () => {
    const passwordCheckData = {
      body: {
        loginId: loginId || "",
        pwdNo: searchInput,
        chkResult: "",
        userConstntSeCd: "",
      },
    };

    console.log("보낼 데이터 확인:", passwordCheckData);

    passwordCheckAPI(passwordCheckData, {
      onSuccess: (response) => {
        console.log("응답데이터 확인 : ", response.data.contents.chkResult);
        //if (response.data.contents.userConstntSeCd === "1002005"
        if (response.data.contents.chkResult === "Y") {
          window.close();
          openPopup({
            url: UserInfoPopup.url,
            windowName: UserInfoPopup.windowName,
            windowFeatures: UserInfoPopup.windowFeatures,
          });
        } else {
          passwordCheckModal();
        }
      },
    });
  };

  //모달
  const passwordCheckModal = () => {
    openModal(PasswordCheckErrorModal, {
      modalId: "PasswordCheckErrorModal",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => closeModal,
    });
  };

  //내정보 관리 팝업 - 사용자 또는 구성원일경우
  const UserInfoPopup = {
    url: PathConstants.MyPage.UserInfoPopup,
    windowName: "내정보 관리",
    //windowFeatures: "width=400,height=1000,scrollbars=yes,resizable=yes",
    windowFeatures: "width=400,height=1020,resizable=yes",
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
      <Stack
        bgcolor={"white"}
        width={"100%"}
        height={"100%"}
        padding={"5%"}
        justifyContent={"space-between"}
      >
        <Stack width={"100%"} height={"28%"} gap={1}>
          <Typography>비밀번호 확인</Typography>
          <PasswordInput
            placeholder="비밀번호를 입력하세요"
            fullWidth
            name="pwdNo"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)} // 검색어 입력값 업데이트
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch(); // 검색 실행 함수 호출
              }
            }}
            //autoComplete="current-password"
            //error={""}
          />
        </Stack>
        <Stack direction={"row"} gap={1}>
          <BasicButton sx={{ width: "100%" }} onClick={() => window.close()}>
            취소
          </BasicButton>
          <BasicButton
            sx={{ width: "100%" }}
            onClick={handleSearch}
            // onClick={() => {
            //   if (userCode == "1") {
            //     openPopup({
            //       url: AdminInfoPopup.url,
            //       windowName: AdminInfoPopup.windowName,
            //       windowFeatures: AdminInfoPopup.windowFeatures,
            //     });
            //   } else {
            //     openPopup({
            //       url: UserInfoPopup.url,
            //       windowName: UserInfoPopup.windowName,
            //       windowFeatures: UserInfoPopup.windowFeatures,
            //     });
            //   }
            // }}
          >
            확인
          </BasicButton>
        </Stack>
      </Stack>
    </>
  );
}
