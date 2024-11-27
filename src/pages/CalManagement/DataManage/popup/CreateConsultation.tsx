import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import GrayBox from "../../../../components/Box/GrayBox";
import { Select } from "../../../../components/Select";
import { selectTestData, tableTestData } from "../../../../utils/testData";
import useSelect from "../../../../hooks/useSelect";
import { IoMdAddCircleOutline } from "react-icons/io";
import IconSquareButton from "../../../../components/Button/IconSquareButton";
import { BasicButton } from "../../../../components/Button";
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
import { useRadioGroup } from "../../../../hooks/useRadioGroup";
interface Data {
  id: string;
  [key: string]: any;
}
export default function CreateConsultation() {
  const { selectValue: s_0, handleChange: o_0 } = useSelect();

  const { selectedValues, handleSelectChange } = useMultiSelect<number>();
  const [data, setData] = useState<Data[]>(tableTestData);

  const { selectedRows: s_1, toggleRowsSelection: t_1 } =
    useMultiRowSelection();
  const { selectedRows: s_3, toggleRowsSelection: t_3 } =
    useMultiRowSelection();

  const topicPopupInfo = {
    url: PathConstants.Call.TopicRegistration,
    windowName: "상담 주제 등록",
  };
  const { selectedValue: radioValue, handleRadioChange: setRadioValue } =
    useRadioGroup(""); // 초기값은 빈 문자열

  const { selectedValue: radioValue2, handleRadioChange: setRadioValue2 } =
    useRadioGroup(""); // 초기값은 빈 문자열

  return (
    <Stack width={"100%"} height={"100%"} bgcolor={"white"} gap={1}>
      <GrayBox gap={1}>
        <Typography>상담주제</Typography>
        <Select
          selectData={selectTestData}
          value={s_0}
          onChange={o_0}
          placeholder="1차 아웃바운드"
          sx={{ width: "200px" }}
        />
        <IconSquareButton
          onClick={() => {
            openPopup({
              url: topicPopupInfo.url,
              windowName: topicPopupInfo.windowName,
            });
          }}
        >
          <IoMdAddCircleOutline color="#6AA5FE" />
        </IconSquareButton>

        <Typography marginLeft={"auto"}>상담사</Typography>
        <MultiSelect
          selectData={selectTestData}
          value={selectedValues}
          onChange={handleSelectChange}
          placeholder="상담원"
          sx={{ width: "200px" }}
        />
        <BasicButton sx={{ marginLeft: "auto" }}>선택자료 삭제</BasicButton>
        <BasicButton>상담 대기 고객 생성</BasicButton>
      </GrayBox>

      <TableBox>
        <TableBox.Inner>
          <CheckboxTable
            data={tableTestData}
            selectedRows={s_1}
            toggleRowsSelection={t_1}
          >
            <CheckboxTable.Thead>
              <CheckboxTable.Tr>
                <CheckboxTable.CheckboxTh />
                <CheckboxTable.Th>이름</CheckboxTable.Th>
                <CheckboxTable.Th>휴대전화</CheckboxTable.Th>
                <CheckboxTable.Th>일반전화</CheckboxTable.Th>
                <CheckboxTable.Th>주소</CheckboxTable.Th>
                <CheckboxTable.Th>번지</CheckboxTable.Th>
                <CheckboxTable.Th>고객정보</CheckboxTable.Th>
              </CheckboxTable.Tr>
            </CheckboxTable.Thead>

            <CheckboxTable.Tbody>
              {tableTestData.map((item) => (
                <CheckboxTable.Tr key={item.id} id={item.id}>
                  <CheckboxTable.Td>
                    <CheckboxTable.CheckboxTd item={item} />
                  </CheckboxTable.Td>
                  <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                  <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                  <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                  <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                  <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                </CheckboxTable.Tr>
              ))}
            </CheckboxTable.Tbody>
          </CheckboxTable>
        </TableBox.Inner>
      </TableBox>
      <GrayBox>
        <Stack width={"100%"} gap={2}>
          <CenteredBox gap={1}>
            <Typography width={"150px"}>대기</Typography>
            <Typography>
              🞄 전화걸기 대기명단의 자료는 자동으로 중복제거 됩니다.
            </Typography>
          </CenteredBox>

          <CenteredBox gap={1}>
            <Typography width={"145px"}>통화, 부재중</Typography>

            <RadioGroup value={radioValue} onChange={setRadioValue} row>
              <FormControlLabel
                value="removalDuplication"
                control={<Radio size="small" />}
                label="중복제거"
              />
              <FormControlLabel
                value="selectDuplication"
                control={<Radio size="small" />}
                label="중복자료 선택"
              />
            </RadioGroup>

            <CenteredBox>
              <Stack>
                <Typography>
                  🞄 중복제거 할 경우 통화중, 부재중에 등록된 자료는 등록되지
                  않습니다.
                </Typography>
                <Typography>
                  🞄 중복자료 입력을 선택하면 통화중, 부재중에 있는 전화번호라도
                  대기자료로 등록합니다.
                </Typography>
              </Stack>
            </CenteredBox>
          </CenteredBox>
          <CenteredBox gap={1}>
            <Typography width={"145px"}>인적사항 수정</Typography>

            <RadioGroup value={radioValue2} onChange={setRadioValue2} row>
              <FormControlLabel
                value="stop"
                control={<Radio size="small" />}
                label="동작안함"
              />
              <FormControlLabel
                value="update"
                control={<Radio size="small" />}
                label="중복자료 업데이트"
              />
            </RadioGroup>
          </CenteredBox>
        </Stack>
      </GrayBox>

      <GrayBox>
        <BasicButton sx={{ marginLeft: "auto" }}>선택자료 삭제</BasicButton>
      </GrayBox>

      <TableBox marginBottom={1} gap={2}>
        <TableBox.Inner width={"50%"}>
          <RowDragTable data={data} checkbox={false} setData={setData}>
            <RowDragTable.Th>이름</RowDragTable.Th>
            <RowDragTable.Th>휴대전화</RowDragTable.Th>
            <RowDragTable.Th>일반전화</RowDragTable.Th>
            <RowDragTable.Th>주소</RowDragTable.Th>
            <RowDragTable.Th>번지</RowDragTable.Th>
            <RowDragTable.Th>고객정보</RowDragTable.Th>

            <RowDragTable.Tbody>
              {data.map((item) => (
                <RowDragTable.Tr key={item.id} id={item.id}>
                  <RowDragTable.Td>{item.name}</RowDragTable.Td>
                  <RowDragTable.Td>{item.name}</RowDragTable.Td>
                  <RowDragTable.Td>{item.name}</RowDragTable.Td>
                  <RowDragTable.Td>{item.name}</RowDragTable.Td>
                  <RowDragTable.Td>{item.name}</RowDragTable.Td>
                  <RowDragTable.Td>{item.name}</RowDragTable.Td>
                </RowDragTable.Tr>
              ))}
            </RowDragTable.Tbody>
          </RowDragTable>
        </TableBox.Inner>

        <TableBox.Inner width={"50%"}>
          <CheckboxTable
            data={tableTestData}
            selectedRows={s_3}
            toggleRowsSelection={t_3}
          >
            <CheckboxTable.Thead>
              <CheckboxTable.Tr>
                <CheckboxTable.CheckboxTh />
                <CheckboxTable.Th>이름</CheckboxTable.Th>
                <CheckboxTable.Th>휴대전화</CheckboxTable.Th>
                <CheckboxTable.Th>일반전화</CheckboxTable.Th>
                <CheckboxTable.Th>주소</CheckboxTable.Th>
                <CheckboxTable.Th>번지</CheckboxTable.Th>
                <CheckboxTable.Th>고객정보</CheckboxTable.Th>
              </CheckboxTable.Tr>
            </CheckboxTable.Thead>

            <CheckboxTable.Tbody>
              {tableTestData.map((item) => (
                <CheckboxTable.Tr key={item.id} id={item.id}>
                  <CheckboxTable.CheckboxTd item={item} />
                  <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                  <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                  <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                  <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                  <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                </CheckboxTable.Tr>
              ))}
            </CheckboxTable.Tbody>
          </CheckboxTable>
        </TableBox.Inner>
      </TableBox>
    </Stack>
  );
}
