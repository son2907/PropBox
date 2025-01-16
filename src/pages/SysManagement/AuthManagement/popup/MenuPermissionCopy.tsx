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
import { BiChevronLeft } from "react-icons/bi";
import SearchInput from "../../../../components/Input/SearchInput";

interface Data {
  id: string;
  [key: string]: any;
}

export default function MenuPermissionCopy() {
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

  const topicPopupInfo = {
    url: PathConstants.Call.TopicRegistration,
    windowName: "구성원 메뉴 권한 등록 및 수정",
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

  //useMultiRowSelection 분리해서 각 테이블에 독립적으로 selectedRows와 toggleRowsSelection을 전달하여 동작이 분리되도록 설정.
  // 권한 메뉴 - 선택 상태 관리
  const {
    selectedRows: authorizedSelectedRows,
    toggleRowsSelection: toggleAuthorizedRowsSelection,
  } = useMultiRowSelection();

  return (
    <Stack
      width={"100%"}
      height={"100%"}
      bgcolor={"white"}
      justifyContent={"space-between"}
    >
      {/* 구성원 정보 */}
      <Stack height={"92%"}>
        <Stack>
          <Stack bgcolor={"primary.A100"} direction={"row"} paddingLeft={1}>
            <Stack
              width={"100%"}
              alignItems={"center"}
              borderRight={1}
              borderColor={"primary.100"}
              padding={1}
            >
              <Typography>구성원ID</Typography>
            </Stack>
            <Stack
              width={"100%"}
              alignItems={"center"}
              borderRight={1}
              borderColor={"primary.100"}
              padding={1}
            >
              <Typography>구성원ID</Typography>
            </Stack>
            <Stack
              width={"100%"}
              alignItems={"center"}
              borderRight={1}
              borderColor={"primary.100"}
              padding={1}
            >
              <Typography>구성원ID</Typography>
            </Stack>
          </Stack>
          <Stack bgcolor={"white"} direction={"row"} marginLeft={1}>
            <Stack
              width={"100%"}
              alignItems={"center"}
              padding={1}
              borderRight={1}
              borderColor={"primary.100"}
            >
              <Typography>{"구성원"}</Typography>
            </Stack>
            <Stack
              width={"100%"}
              alignItems={"center"}
              padding={1}
              borderRight={1}
              borderColor={"primary.100"}
            >
              <Typography>{"구성원"}</Typography>
            </Stack>
            <Stack
              width={"100%"}
              alignItems={"center"}
              padding={1}
              borderRight={1}
              borderColor={"primary.100"}
            >
              <Typography>{"구성원"}</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          marginTop={0.2}
          gap={1}
          width={"100%"}
          bgcolor={"white"}
          direction="row"
          height={"100%"} // 화면 크기에 맞추기
          overflow="hidden"
        >
          {/* 권한 메뉴 테이블 */}
          <Stack
            width={"100%"}
            height="100%"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <GrayBox gap={1}>
              <Select
                value={selectValue}
                onChange={handleChange}
                selectData={selectTestData}
                sx={{ width: "204px" }}
              />
              <SearchInput placeholder="구성원이름 검색" />
            </GrayBox>
            <TableBox>
              <TableBox.Inner>
                <CheckboxTable
                  data={tableTestData}
                  selectedRows={authorizedSelectedRows}
                  toggleRowsSelection={toggleAuthorizedRowsSelection}
                >
                  <CheckboxTable.Thead>
                    <CheckboxTable.Tr>
                      <CheckboxTable.CheckboxTh keyName="id" />
                      <CheckboxTable.Th>솔루션ID</CheckboxTable.Th>
                      <CheckboxTable.Th>솔루션이름</CheckboxTable.Th>
                      <CheckboxTable.Th>메뉴ID</CheckboxTable.Th>
                      <CheckboxTable.Th>메뉴이름</CheckboxTable.Th>
                    </CheckboxTable.Tr>
                  </CheckboxTable.Thead>
                  <CheckboxTable.Tbody>
                    {tableTestData.map((item) => (
                      <CheckboxTable.Tr key={item.id} id={item.id}>
                        <CheckboxTable.CheckboxTd item={item} keyName="id" />
                        <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                        <CheckboxTable.Td>{item.phone}</CheckboxTable.Td>
                        <CheckboxTable.Td>{item.job}</CheckboxTable.Td>
                        <CheckboxTable.Td>{item.address}</CheckboxTable.Td>
                      </CheckboxTable.Tr>
                    ))}
                  </CheckboxTable.Tbody>
                </CheckboxTable>
              </TableBox.Inner>
            </TableBox>
          </Stack>
        </Stack>
      </Stack>
      <GrayBox gap={2} justifyContent={"end"}>
        <BasicButton>권한복사</BasicButton>
        <BasicButton>취소</BasicButton>
      </GrayBox>
    </Stack>
  );
}
