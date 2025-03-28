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
import { useRef, useState } from "react";
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
import { getDeviceSection, getDeviceSectionDetail, insertDeviceSection, updateDeviceSection } from "../../../../api/networkSetup";
import { useAuthStore } from "../../../../stores/authStore";
import useModal from "../../../../hooks/useModal";
import { FailModal } from "../../../../components/Modal/modal/FailModal";
import { DetailDeviceSectionType } from "../../../../types/networkSetup";

interface Data {
  id: string;
  [key: string]: any;
}

//장치구분 목록록
export default function DeviceType() {
  const { openModal, closeModal } = useModal(); //모달
  const { data: deviceSection, refetch: refetchDeviceSection } = getDeviceSection();
  const [selectCommnseNo, setSelectCommnseNo] = useState("");
  const { data: deviceSectionDetailData, refetch: refetchDeviceSectionDetail } = getDeviceSectionDetail(selectCommnseNo);
  const { mutate: insertDeviceSectionAPI } = insertDeviceSection();  //통신장치 등록
  const { mutate: updateDeviceSectionAPI } = updateDeviceSection(); //통신장치 수정
  const [deviceSectionDetail, setDeviceSectionDetail] = useState<DetailDeviceSectionType>();

  const { loginId } = useAuthStore(["loginId"]);
  const [commnSeNm, setCommnSeNm] = useState("");
  const [host, setHost] = useState("");
  const [useYn, setUseYn] = useState(true);

  const {
    selectListData: sd_0,
    selectValue: s_0,
    handleChange: o_0,
  } = useSelect(selectTestData, "value", "data");

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

  const { selectListData, selectValue, handleChange } = useSelect(
    selectTestData,
    "value",
    "data"
  );

  // Basicinput에 연결할 ref, 값은 bRef1.current?.value 에 들어있습니다.
  const bRef1 = useRef<HTMLInputElement>(null); //
  const bRef2 = useRef<HTMLInputElement>(null); // HTMLInputElement로 타입 지정

  //장치구분 추가
  const handleAddDeviceSection = () => {
    const insertDeviceSectionReqData = {
      body: {
        commnSeNm: commnSeNm,
        host: host,
        useYn: useYn === true ? "Y" : "N",
        rmk: "",
        userId: loginId,
      }
    };

    console.log("insertDeviceSectionReqData", insertDeviceSectionReqData);

    insertDeviceSectionAPI(insertDeviceSectionReqData, {
      onSuccess: (response) => {
        if (response.data.result === "SUCCESS") {
          refetchDeviceSection();
        }
      },
      onError: (error) => {
        console.error("삭제 실패:", error);
        openModal(FailModal, {
          modalId: "apiFail",
          stack: false,
          onClose: () => closeModal,
        });
      },
    })
  }

  return (
    <Stack
      width={"100%"}
      height={"100%"}
      bgcolor={"white"}
      justifyContent={"space-between"}
    >
      <Stack height={"100%"} gap={2}>
        <TableBox height="75%">
          <TableBox.Inner>
            <BasicTable data={deviceSection?.data.contents || []}>
              <BasicTable.Th>장치구분이름</BasicTable.Th>
              <BasicTable.Th>호스트</BasicTable.Th>
              <BasicTable.Th>사용여부</BasicTable.Th>
              <BasicTable.Th>삭제</BasicTable.Th>
              <BasicTable.Tbody>
                {(deviceSection?.data.contents || []).map((item, index) => {
                  return (
                    <BasicTable.Tr
                      key={index}
                      isClicked={selectCommnseNo === item.commnSeNo}
                      onClick={() => {
                        if(selectCommnseNo === item.commnSeNo) {
                          setSelectCommnseNo("");
                        } else {
                          setSelectCommnseNo(item.commnSeNo);
                        }
                      }}
                    >
                      <BasicTable.Td style={{ whiteSpace: "nowrap", maxWidth: "100%", padding: "4px 8px", lineHeight: "1.2" }}>{item.commnSeNm}</BasicTable.Td>
                      <BasicTable.Td style={{ whiteSpace: "nowrap", maxWidth: "100%", padding: "4px 8px", lineHeight: "1.2" }}>{item.host}</BasicTable.Td>
                      <BasicTable.Td style={{ textAlign: "center", whiteSpace: "nowrap", maxWidth: "100%", padding: "4px 8px", lineHeight: "1.2" }}>{item.useYn}</BasicTable.Td>
                      <BasicTable.Td style={{ display: "flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap", maxWidth: "100%", padding: "4px 8px", lineHeight: "1.2" }}>
                        <IconButton color="error" onClick={() => {}}>
                          <RiDeleteBinLine />
                        </IconButton>
                      </BasicTable.Td>
                    </BasicTable.Tr>
                  );
                })}
              </BasicTable.Tbody>
            </BasicTable>
          </TableBox.Inner>
        </TableBox>
        <GrayBox height={"25%"}>
          <Stack gap={1} width={"100%"}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography>장치구분이름</Typography>
              <BasicInput ref={bRef1} sx={{ width: "80%" }} />
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography>호스트</Typography>
              <BasicInput ref={bRef2} sx={{ width: "80%" }} />
            </Stack>
            <Stack direction={"row"} alignItems={"center"} gap={8}>
              <Typography>사용여부</Typography>
              <ToggleButton
                checked={useYn}
                onChange={(e) => {
                  const newValue = e.target.checked;
                  setUseYn(newValue);
                }}
                label="" />
            </Stack>
            <Stack
              gap={1}
              width={"100%"}
              direction={"row"}
              justifyContent={"end"}
            >
              <BasicButton>추가</BasicButton>
              <BasicButton>저장</BasicButton>
            </Stack>
          </Stack>
        </GrayBox>
      </Stack>
    </Stack>
  );
}
