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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { openPopup } from "../../utils/openPopup";
import BasicInput from "../../components/Input/BasicInput";
import PasswordInput from "../../components/Input/PasswordInput";
import DeleteBtnInput from "../../components/Input/DeleteBtnInput";
import { useAuthStore } from "../../stores/authStore";
import useModal from "../../hooks/useModal";
import { myInfoDetail, myInfoUpdate } from "../../api/myInfo";
import { MyInfoDetailType, MyInfoUpdateType } from "../../types/myInfo";
import { PasswordCheckErrorModal } from "../../components/layout/modal/PasswordCheckErrorModal";
import { UpdateCompletedModal } from "../../components/layout/modal/UpdateCompletedModal";
import { useForm } from "react-hook-form";
import PhoneInput from "../../components/Input/PhoneInput";

interface FormData {
  userID: string;
  password: string;
  passwordCheck: string;
  userName: string;
  phoneNum: string;
  companyName: string;
  rprsntvNm: string;
  adres: string;
  companyNum: string;
}

export default function UserInfoPopup() {

  //api를 호출하기위해 userID 불러오기
  const { loginId } = useAuthStore(["loginId"]);
  const { userNo } = useAuthStore(["userNo"]);

  //모달
  const { openModal, closeModal } = useModal();

  //상세 조회
  const { isSuccess, data } = myInfoDetail();
  //const [myInfoDetailData, setMyInfoDetailData] = useState<MyInfoDetailType>();
  // const [userID, setUserID] = useState("");
  // const [password, setPassword] = useState("");
  // const [passwordCheck, setPasswordCheck] = useState("");
  // const [userName, setUserName] = useState("");
  // const [phoneNum, setPhoneNum] = useState("");
  // const [companyName, setCompanyName] = useState("");
  // const [rprsntvNm, setRprsntvNm] = useState("");
  // const [adres, setadres] = useState("");
  // const [companyNum, setCompanyNum] = useState("");

  //초기값

  const { register, handleSubmit, reset, getValues } = useForm({
    defaultValues: {
      userID: "",
      password: "",
      passwordCheck: "",
      userName: "",
      phoneNum: "",
      companyName: "",
      rprsntvNm: "",
      adres: "",
      companyNum: "",
    },
  });


  const myInfoUpdateAPI = myInfoUpdate();

  // useEffect(() => {
  //   if (data?.data?.contents) {
  //     setMyInfoDetailData(data.data.contents);
  //   }
  // }, [isSuccess, data]);

  useEffect(() => {
    reset({
      userName: data?.data?.contents?.userNm,
      userID: data?.data?.contents?.loginId,
      phoneNum: data?.data?.contents?.mbtlNo,
    })
  }, [data]);

  const onSubmit = useCallback(
    (data: any) => {
      const myInfoReqData: MyInfoUpdateType = {
        userNo: userNo,
        userNm: getValues("userName") || "",
        encptUserNm: "",
        attlistUserNm: "",
        pwdNo: getValues("password"),
        mbtlNo: getValues("phoneNum") || "",
        attlistMbtlNo: "",
        encptMbtlNo: "",
        userId: loginId || "",
      };



      if (!data.password || data.passwordCheck === data.password) {
        console.log("보낼 데이터 확인 : ", myInfoReqData);
        myInfoUpdateAPI.mutate(
          { body: myInfoReqData },
          {
            onSuccess: (response) => {
              if (response.data.message === "SUCCESS") {
                updateCompletedModal();
              }
            }
          }
        )
      } else {
        passwordCheckModal();
      }

    },
    []
  );


  // useEffect(() => {
  //   if (myInfoDetailData) {
  //     setUserID(myInfoDetailData.loginId);
  //     setUserName(myInfoDetailData.userNm);
  //     setPhoneNum(myInfoDetailData.mbtlNo);
  //     setCompanyName(myInfoDetailData.cmpnm);
  //     setRprsntvNm(myInfoDetailData.rprsntvNm);
  //     setCompanyNum(myInfoDetailData.bizrno);
  //     setadres(myInfoDetailData.adres1);
  //   }
  // }, [myInfoDetailData]);

  const Mypagepopup = {
    url: PathConstants.MyPage.UserInfoPopup,
    windowName: "내정보 관리",
  };

  // const handleSubmit = () => {
  //   const myInfoReqData: MyInfoUpdateType = {
  //     userNo: userNo,
  //     userNm: userName,
  //     encptUserNm: "",
  //     attlistUserNm: "",
  //     pwdNo: password,
  //     mbtlNo: phoneNum,
  //     attlistMbtlNo: "",
  //     encptMbtlNo: "",
  //     userId: loginId || "",
  //   };

  //   console.log("데이터 확인:", myInfoReqData);

  //   if (!password || passwordCheck === password) {
  //     myInfoUpdateAPI.mutate(
  //       { body: myInfoReqData },
  //       {
  //         onSuccess: (response) => {
  //           if (response.data.message === "SUCCESS") {
  //             updateCompletedModal();
  //           }
  //         },
  //       }
  //     );
  //   } else {
  //     passwordCheckModal();
  //   }
  // };

  //모달
  const passwordCheckModal = () => {
    openModal(PasswordCheckErrorModal, {
      modalId: "PasswordCheckErrorModal",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => closeModal,
    });
  };

  const updateCompletedModal = () => {
    openModal(UpdateCompletedModal, {
      modalId: "UpdateCompletedModal",
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
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
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
                autoComplete="current-password"
                disabled
                {...register("userID")}
              //error={""}
              />
            </Stack>
            <Stack width={"100%"} gap={1}>
              <Typography fontSize={"19px"}>
                비밀번호
              </Typography>
              <PasswordInput
                sx={{ height: "50px" }}
                fullWidth
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                // placeholder={password ? password : "비밀번호"}
                {...register("password")}
              //error={""}
              />
            </Stack>
            <Stack width={"100%"} gap={1}>
              <Typography fontSize={"19px"}>
                비밀번호 확인
              </Typography>
              <PasswordInput
                sx={{ height: "50px" }}
                fullWidth
                // value={passwordCheck}
                // onChange={(e) => setPasswordCheck(e.target.value)}
                // placeholder={passwordCheck ? passwordCheck : "비밀번호 확인"}
                {...register("passwordCheck")}
              //error={""}
              />
            </Stack>
            <Stack width={"100%"} gap={1}>
              <Typography fontSize={"19px"}>
                이름
              </Typography>
              <BasicInput
                sx={{ height: "50px" }}
                fullWidth
                // value={userName}
                // onChange={(e) => setUserName(e.target.value)}
                // placeholder={userName ? userName : "사용자 이름"}
                {...register("userName")}
              //error={""}
              />
            </Stack>
            <Stack width={"100%"} gap={1}>
              <Typography fontSize={"19px"}>
                전화번호
              </Typography>
              <PhoneInput
                sx={{ height: "50px" }}
                fullWidth
                // value={phoneNum}
                // onChange={(e) => setPhoneNum(e.target.value)}
                // placeholder={phoneNum ? phoneNum : "휴대전화"}
                {...register("phoneNum")}
              //error={""}
              />
            </Stack>
            <Stack width={"100%"} marginTop={1}>
              <Typography fontSize={"30px"} fontWeight={"bold"}>
                회사정보
              </Typography>
            </Stack>
            <Stack width={"100%"} gap={1}>
              <Typography fontSize={"19px"}>
                회사 이름
              </Typography>
              <BasicInput
                sx={{ height: "50px" }}
                fullWidth
                // value={companyName}
                // onChange={(e) => setCompanyName(e.target.value)}
                // placeholder={companyName ? companyName : "회사 이름"}
                {...register("companyName")}
                disabled
              //error={""}
              />
            </Stack>
            <Stack width={"100%"} gap={1}>
              <Typography fontSize={"19px"}>
                사업자 등록번호
              </Typography>
              <BasicInput
                disabled
                sx={{ height: "50px" }}
                fullWidth
                // value={companyNum}
                // onChange={(e) => setCompanyName(e.target.value)}
                // placeholder={companyNum ? companyNum : "사업자 등록번호"}
                {...register("companyNum")}
              //error={""}
              />
            </Stack>
            <Stack width={"100%"} gap={1}>
              <Typography fontSize={"19px"}>
                대표자 이름
              </Typography>
              <BasicInput
                disabled
                sx={{ height: "50px" }}
                fullWidth
                // value={rprsntvNm}
                // onChange={(e) => setCompanyName(e.target.value)}
                // placeholder={rprsntvNm ? rprsntvNm : "대표자 이름"}
                {...register("rprsntvNm")}
              //error={""}

              />
            </Stack>
            <Stack width={"100%"} gap={1}>
              <Typography fontSize={"19px"}>
                사업장 소재지
              </Typography>
              <BasicInput
                disabled
                sx={{ height: "50px" }}
                fullWidth
                // value={adres}
                // onChange={(e) => setCompanyName(e.target.value)}
                // placeholder={adres ? adres : "사업장 소재지"}
                {...register("adres")}
              //error={""}
              />
            </Stack>
          </Stack>
          <Stack direction={"row"} gap={1}>
            <BasicButton sx={{ width: "100%" }} onClick={() => window.close()}>취소</BasicButton>
            <BasicButton
              sx={{ width: "100%" }}
              //onClick={handleSubmit}
              type="submit"
            >확인</BasicButton>
          </Stack>
        </Stack>
      </form>
    </>
  );
}
