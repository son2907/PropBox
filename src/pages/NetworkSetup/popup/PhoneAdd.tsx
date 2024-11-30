import { Box, IconButton, Stack, Typography } from "@mui/material";
import GrayBox from "../../../components/Box/GrayBox";
import { Select } from "../../../components/Select";
import { selectTestData, tableTestData } from "../../../utils/testData";
import useSelect from "../../../hooks/useSelect";
import { IoMdAddCircleOutline } from "react-icons/io";
import IconSquareButton from "../../../components/Button/IconSquareButton";
import { BasicButton, ToggleButton } from "../../../components/Button";
import CheckboxTable from "../../../components/Table/CheckboxTable";
import TableBox from "../../../components/Box/TableBox";
import CenteredBox from "../../../components/Box/CenteredBox";
import { useMultiRowSelection } from "../../../hooks/useMultiRowSelection";
import MultiSelect from "../../../components/Select/MultiSelect";
import { useMultiSelect } from "../../../hooks/useMultiSselect";
import { useState } from "react";
import RowDragTable from "../../../components/Table/RowDragTable";
import { openPopup } from "../../../utils/openPopup";
import PathConstants from "../../../routers/path";
import BasicInput from "../../../components/Input/BasicInput";
import BasicTable from "../../../components/Table/BasicTable";
import { useSingleRowSelection } from "../../../hooks/useSingleRowSelection";
import { RiDeleteBinLine } from "react-icons/ri";
import LabelTypo from "../../../components/Typography/LabelTypo";
import Calendar from "../../../components/Calendar/Calendar";
import useToggleButtton from "../../../hooks/useToggleButton";
import PasswordInput from "../../../components/Input/PasswordInput";
import { BsGear } from "react-icons/bs";

interface Data {
  id: string;
  [key: string]: any;
}

export default function PhoneAdd() {
  const { selectValue: s_0, handleChange: o_0 } = useSelect();

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

  const { selectValue, handleChange } = useSelect();

  //장치구분관리
  const deviceType = {
    url: PathConstants.System.DeviceType,
    windowName: "장치 구분 관리",
    windowFeatures: "width=500,height=800,scrollbars=yes,resizable=yes",
  };

  return (
    <Stack width={"100%"} height={"100%"} bgcolor={"white"} alignItems={"center"} justifyContent={"space-between"} alignContent={"center"}>
      <Stack width={"80%"}>
        <Stack direction={"row"} gap={1} marginTop={1} alignItems={"center"} justifyContent={"space-between"} >
          <Typography>전화번호</Typography>
          <BasicInput sx={{ width: "80%" }}></BasicInput>
        </Stack>
        <Stack direction={"row"} gap={1} marginTop={1} alignItems={"center"} justifyContent={"space-between"}>
          <Typography>내선번호</Typography>
          <BasicInput sx={{ width: "80%" }}></BasicInput>
        </Stack>
        <Stack direction={"row"} gap={1} marginTop={1} alignItems={"center"} justifyContent={"space-between"}>
          <Typography>아이디</Typography>
          <BasicInput sx={{ width: "80%" }}></BasicInput>
        </Stack>
        <Stack direction={"row"} gap={1} marginTop={1} alignItems={"center"} justifyContent={"space-between"}>
          <Typography>비밀번호</Typography>
          <PasswordInput sx={{ width: "80%" }}></PasswordInput>
        </Stack>
        <Stack direction={"row"} gap={1} marginTop={1} alignItems={"center"} justifyContent={"space-between"}>
          <Typography>장치구분</Typography>
          <Stack width={"80%"} direction={"row"} justifyContent={"center"} >
            <Select
              value={selectValue}
              onChange={handleChange}
              selectData={selectTestData}
            />
            <Box marginLeft={1} alignContent={"center"}>
              <IconButton
                onClick={() => {
                  openPopup({
                    url: deviceType.url,
                    windowName: deviceType.windowName,
                    windowFeatures: deviceType.windowFeatures,
                  });
                }}>
                <BsGear size={"24px"} />
              </IconButton>
            </Box>
          </Stack>

        </Stack>
      </Stack>
      <GrayBox width={"100%"}>
        <Box sx={{ marginLeft: "auto" }}>
          <BasicButton >확인</BasicButton>
          <BasicButton >취소</BasicButton>
        </Box>
      </GrayBox>
    </Stack>
  );
}
