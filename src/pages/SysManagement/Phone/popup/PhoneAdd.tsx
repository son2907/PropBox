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
import { useCallback, useEffect, useState } from "react";
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
import { BsGear } from "react-icons/bs";
import useModal from "../../../../hooks/useModal";
import { useForm } from "react-hook-form";
import { getDeviceSection, insertPhone } from "../../../../api/networkSetup";
import PhoneInput from "../../../../components/Input/PhoneInput";
import { DeviceSectionListType, InsertPhone } from "../../../../types/networkSetup";
import { useAuthStore } from "../../../../stores/authStore";
import { EmptyDataModal } from "../../../../components/layout/modal/EmptyDataModal";
import { InsertCompletedModal } from "../../../../components/layout/modal/InsertCompletedModal";

interface Data {
  id: string;
  [key: string]: any;
}

export default function PhoneAdd() {

  const { loginId } = useAuthStore(["loginId"]);

  //모달
  const { openModal, closeModal } = useModal();

  //초기값
  const { register, handleSubmit, reset, getValues } = useForm({
    defaultValues: {
      telno: "",
      commnSeNo: "",
      lxtnNo: "",
      id: "",
      pwdNo: "",
      rmk: "",
    }
  });

  //전화기 추가 api
  const insertPhoneAPI = insertPhone();

  //장치구분
  const { data: deviceSection, refetch: refetchDeviceSection } = getDeviceSection();
  const [deviceSectionData, setDeviceSection] = useState<DeviceSectionListType[]>([]);
  const [deviceSectionDataKey, setDeviceSectionDataKey] = useState("");
  const [deviceSectionDataValue, setDeviceSectionDataValue] = useState("");

  const { selectListData, selectValue, handleChange } = useSelect(
    deviceSectionData,
    "commnSeNo",
    "commnSeNm"
  );

  const { selectedValues, handleSelectChange } = useMultiSelect<number>();
  const [data, setData] = useState<Data[]>(tableTestData);

  const { selectedRows: s_1, toggleRowsSelection: t_1 } =
    useMultiRowSelection();
  const { selectedRows: s_3, toggleRowsSelection: t_3 } =
    useMultiRowSelection();

  const localRegistration = {
    url: PathConstants.System.LocalRegistration,
    windowName: "전화기 추가",
  };

  const { selectedRow, toggleRowSelection } = useSingleRowSelection(); // 행 단일 선택, 배경색 변함

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const { toggle, onChange: setToggle } = useToggleButtton({
    defaultValue: true,
  });



  //장치구분관리
  const deviceType = {
    url: PathConstants.System.DeviceType,
    windowName: "장치 구분 관리",
    windowFeatures: "width=500,height=800,scrollbars=yes,resizable=yes",
  };

  useEffect(() => {
    if (deviceSection?.data?.contents) {
      setDeviceSection(deviceSection.data.contents);
    }
  }, [deviceSection]);

  //전화기 추가
  const onSubmit = useCallback(
    (data: any) => {
      const phoneInsertReqData: InsertPhone = {
        telno: getValues("telno") || "",
        commnSeNo: deviceSectionDataKey || "",
        lxtnNo: getValues("lxtnNo") || "",
        id: getValues("id") || "",
        pwdNo: getValues("pwdNo") || "",
        rmk: getValues("rmk") || "",
        userId: loginId || ""
      };

      if (!data.telno || !deviceSectionDataKey || !data.lxtnNo || !data.id || !data.pwdNo) {
        emptyDataModal();
      } else {
        console.log("보낼 데이터 확인 : ", phoneInsertReqData);

        insertPhoneAPI.mutate(
          { body: phoneInsertReqData },
          {
            onSuccess: (response) => {
              if (response.data.message === "SUCCESS") {
                insertCompletedModal();
              }
            }
          }
        )
      }
    }, []
  );

  //모달
  const emptyDataModal = () => {
    openModal(EmptyDataModal, {
      modalId: "EmptyDataModal",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => closeModal,
    });
  };

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
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
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
            <Typography>전화번호</Typography>
            <PhoneInput
              sx={{ width: "80%" }}
              placeholder={"전화번호 입력"}
              {...register("telno")}
            />
          </Stack>
          <Stack
            direction={"row"}
            gap={1}
            marginTop={1}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography>내선번호</Typography>
            <BasicInput
              sx={{ width: "80%" }}
              placeholder={"내선번호 입력"}
              {...register("lxtnNo")}
            />
          </Stack>
          <Stack
            direction={"row"}
            gap={1}
            marginTop={1}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography>아이디</Typography>
            <BasicInput
              sx={{ width: "80%" }}
              placeholder={"아이디 입력"}
              {...register("id")}
            />
          </Stack>
          <Stack
            direction={"row"}
            gap={1}
            marginTop={1}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography>비밀번호</Typography>
            <BasicInput
              sx={{ width: "80%" }}
              placeholder={"비밀번호 입력"}
              {...register("pwdNo")}
            />
          </Stack>
          <Stack
            direction={"row"}
            gap={1}
            marginTop={1}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography>장치구분</Typography>
            <Stack width={"80%"} direction={"row"} justifyContent={"center"}>
              <Select
                value={selectValue} // 선택한 값 유지
                onChange={(e) => {
                  const newValue = e.target.value; // 선택된 값 (commnSeNm)
                  const selectedOption = deviceSectionData.find(
                    (item) => item.commnSeNm === newValue
                  );

                  if (selectedOption) {
                    console.log("구분값 변경:", selectedOption.commnSeNm);
                    console.log(`구분값 키 변경: ${selectedOption.commnSeNo}`); // cd 콘솔 출력
                    setDeviceSectionDataKey(selectedOption.commnSeNo);
                    setDeviceSectionDataValue(selectedOption.commnSeNm);
                    handleChange(e); // selectValue를 업데이트
                  }
                }}
                selectData={deviceSectionData.map((item) => ({
                  value: item.commnSeNm,
                  data: item.commnSeNm,
                }))}
              />
              <Box marginLeft={1} alignContent={"center"}>
                <IconButton
                  onClick={() => {
                    openPopup({
                      url: deviceType.url,
                      windowName: deviceType.windowName,
                      windowFeatures: deviceType.windowFeatures,
                    });
                  }}
                >
                  <BsGear size={"24px"} />
                </IconButton>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <GrayBox width={"100%"} marginTop={1} gap={1} justifyContent={"end"}>
          <BasicButton type="submit">확인</BasicButton>
          <BasicButton>취소</BasicButton>
        </GrayBox>
      </Stack>
    </form>
  );
}
